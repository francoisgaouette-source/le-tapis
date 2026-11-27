-- La Donne sur Supabase (projet « Le Tapis », uwfnwnreohdyaxainvna) : structure de la base.
-- Copie fidèle de ce qui tourne en ligne, relevée le 2026-11-27 (tables, règles de sécurité, fonctions, déclencheurs, droits).
-- Sert de sauvegarde et de référence : pour recréer le projet, exécuter ce fichier dans un projet vide (SQL Editor).
-- Les données elles-mêmes (groupes, joueurs, fiches de jeux) ne sont pas ici.
-- Connexion : compte HoldingAI (Third-Party Auth, Custom OIDC). La personne = auth.jwt()->>'sub'.

-- ============ Tables ============
create table public.admins (
  uid text not null,
  constraint admins_pkey PRIMARY KEY (uid)
);

create table public.groupes (
  id text not null,
  owner text default ''::text not null,
  organizers text[] default '{}'::text[] not null,
  n_players integer default 0 not null,
  archived boolean default false not null,
  deleted boolean default false not null,
  data jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint groupes_pkey PRIMARY KEY (id)
);

create table public.donnees_groupe (
  group_id text not null,
  data jsonb default '{}'::jsonb not null,
  updated_at timestamp with time zone default now() not null,
  constraint donnees_groupe_pkey PRIMARY KEY (group_id)
);

create table public.jeux (
  id text not null,
  auteur text not null,
  data jsonb default '{}'::jsonb not null,
  cree timestamp with time zone default now() not null,
  maj timestamp with time zone default now() not null,
  constraint jeux_pkey PRIMARY KEY (id)
);

create table public.joueurs (
  id text not null,
  group_id text not null,
  acct text default ''::text not null,
  data jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint joueurs_pkey PRIMARY KEY (id)
);

create table public.liens (
  uid text not null,
  player_id text not null,
  group_id text not null,
  at timestamp with time zone default now() not null,
  constraint liens_pkey PRIMARY KEY (uid)
);

create table public.soirees (
  id text not null,
  group_id text not null,
  data jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint soirees_pkey PRIMARY KEY (id)
);

create table public.telephones (
  player_id text not null,
  group_id text not null,
  phone text default ''::text not null,
  e164 text default ''::text not null,
  constraint telephones_pkey PRIMARY KEY (player_id)
);

-- ============ Liens entre tables ============
alter table public.donnees_groupe add constraint donnees_groupe_group_id_fkey FOREIGN KEY (group_id) REFERENCES groupes(id) ON DELETE CASCADE;
alter table public.joueurs add constraint joueurs_group_id_fkey FOREIGN KEY (group_id) REFERENCES groupes(id) ON DELETE CASCADE;
alter table public.liens add constraint liens_group_id_fkey FOREIGN KEY (group_id) REFERENCES groupes(id) ON DELETE CASCADE;
alter table public.liens add constraint liens_player_id_fkey FOREIGN KEY (player_id) REFERENCES joueurs(id) ON DELETE CASCADE;
alter table public.soirees add constraint soirees_group_id_fkey FOREIGN KEY (group_id) REFERENCES groupes(id) ON DELETE CASCADE;
alter table public.telephones add constraint telephones_player_id_fkey FOREIGN KEY (player_id) REFERENCES joueurs(id) ON DELETE CASCADE;
alter table public.telephones add constraint telephones_group_id_fkey FOREIGN KEY (group_id) REFERENCES groupes(id) ON DELETE CASCADE;

-- ============ Index ============
CREATE INDEX joueurs_group_id_idx ON public.joueurs USING btree (group_id);
CREATE INDEX soirees_group_id_idx ON public.soirees USING btree (group_id);
CREATE INDEX telephones_group_id_idx ON public.telephones USING btree (group_id);
CREATE INDEX telephones_e164_idx ON public.telephones USING btree (e164);

-- ============ Fonctions d'identité ============
CREATE OR REPLACE FUNCTION public.moi()
 RETURNS text
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  select nullif(auth.jwt()->>'sub', '')
$function$
;

-- Cellulaire confirmé du compte HoldingAI, au format +15145550000 (vide si aucun)
CREATE OR REPLACE FUNCTION public.mon_numero()
 RETURNS text
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
  select case when coalesce(auth.jwt()->>'phone', '') = '' then ''
              else '+' || regexp_replace(auth.jwt()->>'phone', '\D', '', 'g') end
$function$
;

CREATE OR REPLACE FUNCTION public.mon_joueur()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select player_id from liens where uid = public.moi()
$function$
;

CREATE OR REPLACE FUNCTION public.est_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (select 1 from admins where uid = public.moi())
$function$
;

CREATE OR REPLACE FUNCTION public.dans_groupe(g text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (select 1 from liens where uid = public.moi() and group_id = g)
$function$
;

CREATE OR REPLACE FUNCTION public.organisateur(g text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (select 1 from groupes gr join liens l on l.group_id = gr.id
                 where gr.id = g and l.uid = public.moi() and (gr.owner = l.player_id or l.player_id = any(gr.organizers)))
$function$
;

CREATE OR REPLACE FUNCTION public.proprio(g text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (select 1 from groupes gr join liens l on l.group_id = gr.id
                 where gr.id = g and l.uid = public.moi() and gr.owner <> '' and gr.owner = l.player_id)
$function$
;

CREATE OR REPLACE FUNCTION public.bon_numero(p text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select public.mon_numero() <> '' and exists (select 1 from telephones t where t.player_id = p and t.e164 = public.mon_numero())
$function$
;

-- ============ Fonctions appelées par l'app ============
CREATE OR REPLACE FUNCTION public.creer_groupe(p_groupe text, p_joueur text, p_donnees_groupe jsonb, p_donnees_joueur jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare u text := public.moi();
begin
  if u is null then raise exception 'Connexion requise.'; end if;
  if (select count(*) from groupes g join joueurs j on j.id = g.owner where j.acct = u and not g.deleted) >= 10 then
    raise exception 'Maximum de 10 groupes par compte.';
  end if;
  insert into groupes (id, owner, data) values (p_groupe, p_joueur, coalesce(p_donnees_groupe, '{}'));
  insert into joueurs (id, group_id, acct, data) values (p_joueur, p_groupe, u, coalesce(p_donnees_joueur, '{}'));
  insert into liens (uid, player_id, group_id) values (u, p_joueur, p_groupe)
    on conflict (uid) do update set player_id = excluded.player_id, group_id = excluded.group_id, at = now();
  if public.mon_numero() <> '' then
    insert into telephones (player_id, group_id, phone, e164) values (p_joueur, p_groupe, right(public.mon_numero(), 10), public.mon_numero());
  end if;
end $function$
;

CREATE OR REPLACE FUNCTION public.relier_joueur(p_joueur text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare u text := public.moi(); g text;
begin
  if u is null then raise exception 'Connexion requise.'; end if;
  select group_id into g from joueurs where id = p_joueur;
  if g is null then raise exception 'Joueur introuvable.'; end if;
  if not public.bon_numero(p_joueur) then raise exception 'Ce joueur n''est pas relié à votre cellulaire.'; end if;
  insert into liens (uid, player_id, group_id) values (u, p_joueur, g)
    on conflict (uid) do update set player_id = excluded.player_id, group_id = excluded.group_id, at = now();
  update joueurs set acct = u where id = p_joueur and acct = '';
  return g;
end $function$
;

CREATE OR REPLACE FUNCTION public.mes_groupes()
 RETURNS TABLE(player_id text, group_id text, joueur jsonb, groupe jsonb, owner text, organizers text[], archived boolean, acct text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select j.id, j.group_id, j.data, g.data, g.owner, g.organizers, g.archived, j.acct
  from telephones t join joueurs j on j.id = t.player_id join groupes g on g.id = j.group_id
  where public.mon_numero() <> '' and t.e164 = public.mon_numero() and not g.deleted
$function$
;

-- Les fonctions *_maj et groupe_etat s'exécutent avec les droits de la personne : les règles RLS et les déclencheurs s'appliquent.
CREATE OR REPLACE FUNCTION public.groupe_maj(p_id text, p_patch jsonb, p_owner text DEFAULT NULL::text, p_organizers text[] DEFAULT NULL::text[])
 RETURNS void
 LANGUAGE sql
 SET search_path TO 'public'
AS $function$
  update groupes set data = data || coalesce(p_patch, '{}'::jsonb), owner = coalesce(p_owner, owner), organizers = coalesce(p_organizers, organizers) where id = p_id
$function$
;

CREATE OR REPLACE FUNCTION public.groupe_etat(p_id text, p_archived boolean, p_deleted boolean)
 RETURNS void
 LANGUAGE sql
 SET search_path TO 'public'
AS $function$
  update groupes set archived = coalesce(p_archived, archived), deleted = coalesce(p_deleted, deleted) where id = p_id
$function$
;

CREATE OR REPLACE FUNCTION public.joueur_maj(p_id text, p_patch jsonb)
 RETURNS void
 LANGUAGE sql
 SET search_path TO 'public'
AS $function$
  update joueurs set data = data || coalesce(p_patch, '{}'::jsonb) where id = p_id
$function$
;

CREATE OR REPLACE FUNCTION public.donnees_maj(p_group text, p_patch jsonb)
 RETURNS void
 LANGUAGE sql
 SET search_path TO 'public'
AS $function$
  insert into donnees_groupe (group_id, data, updated_at) values (p_group, coalesce(p_patch, '{}'::jsonb), now())
  on conflict (group_id) do update set data = donnees_groupe.data || excluded.data, updated_at = now()
$function$
;

CREATE OR REPLACE FUNCTION public.soiree_maj(p_id text, p_group text, p_patch jsonb)
 RETURNS void
 LANGUAGE sql
 SET search_path TO 'public'
AS $function$
  insert into soirees (id, group_id, data) values (p_id, p_group, coalesce(p_patch, '{}'::jsonb))
  on conflict (id) do update set data = soirees.data || excluded.data
$function$
;

-- ============ Déclencheurs (protections) ============
CREATE OR REPLACE FUNCTION public.compter_joueurs()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if tg_op = 'INSERT' then
    update groupes set n_players = n_players + 1 where id = new.group_id;
    if (select n_players from groupes where id = new.group_id) > 64 then raise exception 'Maximum de 64 joueurs dans le groupe.'; end if;
    return new;
  else
    update groupes set n_players = greatest(n_players - 1, 0) where id = old.group_id;
    return old;
  end if;
end $function$
;

-- Un joueur, une soirée ou un téléphone ne change jamais de groupe
CREATE OR REPLACE FUNCTION public.garder_groupe()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
begin
  if new.group_id is distinct from old.group_id then raise exception 'Le groupe ne peut pas changer.'; end if;
  return new;
end $function$
;

-- Seul le propriétaire change le propriétaire, les organisateurs, l'archivage ou la suppression
CREATE OR REPLACE FUNCTION public.proteger_groupe()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare est_proprio boolean;
begin
  if current_user not in ('authenticated', 'anon') then return new; end if;
  if new.n_players is distinct from old.n_players or new.id is distinct from old.id then raise exception 'Champ géré par la base.'; end if;
  est_proprio := old.owner <> '' and old.owner = public.mon_joueur();
  if (new.archived is distinct from old.archived or new.deleted is distinct from old.deleted
      or new.owner is distinct from old.owner or new.organizers is distinct from old.organizers) and not est_proprio then
    raise exception 'Seul le propriétaire du groupe peut faire ce changement.';
  end if;
  if old.deleted and not new.deleted then raise exception 'Un groupe supprimé ne revient pas.'; end if;
  return new;
end $function$
;

-- L'auteur et la date de création d'une fiche de jeu sont fixés par la base
CREATE OR REPLACE FUNCTION public.proteger_jeu()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
begin
  if current_user not in ('authenticated', 'anon') then return new; end if;
  if tg_op = 'INSERT' then new.auteur := public.moi(); new.cree := now(); end if;
  if tg_op = 'UPDATE' then new.auteur := old.auteur; new.cree := old.cree; end if;
  new.maj := now();
  if octet_length(new.data::text) > 60000 then raise exception 'Fiche trop longue.'; end if;
  return new;
end $function$
;

CREATE TRIGGER compter_joueurs AFTER INSERT OR DELETE ON public.joueurs FOR EACH ROW EXECUTE FUNCTION compter_joueurs();
CREATE TRIGGER garder_groupe BEFORE UPDATE ON public.joueurs FOR EACH ROW EXECUTE FUNCTION garder_groupe();
CREATE TRIGGER garder_groupe BEFORE UPDATE ON public.soirees FOR EACH ROW EXECUTE FUNCTION garder_groupe();
CREATE TRIGGER garder_groupe BEFORE UPDATE ON public.telephones FOR EACH ROW EXECUTE FUNCTION garder_groupe();
CREATE TRIGGER proteger_groupe BEFORE UPDATE ON public.groupes FOR EACH ROW EXECUTE FUNCTION proteger_groupe();
CREATE TRIGGER proteger_jeu BEFORE INSERT OR UPDATE ON public.jeux FOR EACH ROW EXECUTE FUNCTION proteger_jeu();

-- ============ Sécurité : règles par table (RLS) ============
alter table public.admins enable row level security;
alter table public.donnees_groupe enable row level security;
alter table public.groupes enable row level security;
alter table public.jeux enable row level security;
alter table public.joueurs enable row level security;
alter table public.liens enable row level security;
alter table public.soirees enable row level security;
alter table public.telephones enable row level security;

create policy lire on public.admins for SELECT to authenticated using ((uid = moi()));

create policy creer on public.donnees_groupe for INSERT to authenticated with check (dans_groupe(group_id));
create policy lire on public.donnees_groupe for SELECT to authenticated using (dans_groupe(group_id));
create policy modifier on public.donnees_groupe for UPDATE to authenticated using (dans_groupe(group_id)) with check (dans_groupe(group_id));

create policy lire on public.groupes for SELECT to authenticated using (dans_groupe(id));
create policy modifier on public.groupes for UPDATE to authenticated using (dans_groupe(id)) with check (dans_groupe(id));

-- Les fiches de jeux sont publiques en lecture
create policy ajouter on public.jeux for INSERT to authenticated with check ((moi() IS NOT NULL));
create policy effacer on public.jeux for DELETE to authenticated using (((auteur = moi()) OR est_admin()));
create policy lire on public.jeux for SELECT to anon, authenticated using (true);
create policy modifier on public.jeux for UPDATE to authenticated using (((auteur = moi()) OR est_admin())) with check (true);

create policy ajouter on public.joueurs for INSERT to authenticated with check (organisateur(group_id));
create policy lire on public.joueurs for SELECT to authenticated using (dans_groupe(group_id));
create policy modifier on public.joueurs for UPDATE to authenticated using (dans_groupe(group_id)) with check (dans_groupe(group_id));
create policy retirer on public.joueurs for DELETE to authenticated using (organisateur(group_id));

create policy lire on public.liens for SELECT to authenticated using ((uid = moi()));

create policy groupe on public.soirees for ALL to authenticated using (dans_groupe(group_id)) with check (dans_groupe(group_id));

create policy ecrire on public.telephones for INSERT to authenticated with check ((organisateur(group_id) AND (e164 = ('+1'::text || phone)) AND (EXISTS ( SELECT 1
   FROM joueurs j
  WHERE ((j.id = telephones.player_id) AND (j.group_id = telephones.group_id))))));
create policy effacer on public.telephones for DELETE to authenticated using (organisateur(group_id));
create policy lire on public.telephones for SELECT to authenticated using ((dans_groupe(group_id) OR ((mon_numero() <> ''::text) AND (e164 = mon_numero()))));
create policy modifier on public.telephones for UPDATE to authenticated using (organisateur(group_id)) with check ((organisateur(group_id) AND (e164 = ('+1'::text || phone))));

-- ============ Droits ============
-- Tables : droits par défaut de Supabase pour anon et authenticated (ce sont les règles RLS ci-dessus qui limitent l'accès).
grant select, insert, update, delete, references, trigger, truncate on
  public.admins, public.donnees_groupe, public.groupes, public.jeux, public.joueurs, public.liens, public.soirees, public.telephones
  to anon, authenticated;

-- Fonctions : personne sans compte (anon) ne peut appeler les fonctions de l'app.
revoke execute on function public.bon_numero(text), public.creer_groupe(text, text, jsonb, jsonb), public.dans_groupe(text),
  public.donnees_maj(text, jsonb), public.est_admin(), public.groupe_etat(text, boolean, boolean),
  public.groupe_maj(text, jsonb, text, text[]), public.joueur_maj(text, jsonb), public.mes_groupes(), public.mon_joueur(),
  public.organisateur(text), public.proprio(text), public.relier_joueur(text), public.soiree_maj(text, text, jsonb)
  from public, anon;
-- Les fonctions de déclencheurs ne s'appellent pas directement.
revoke execute on function public.compter_joueurs(), public.garder_groupe(), public.proteger_groupe(), public.proteger_jeu()
  from public, anon, authenticated;

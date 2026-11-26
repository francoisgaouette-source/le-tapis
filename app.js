// La Donne (app.ladonne.ai) : les règles des jeux, le groupe d'amis et les soirées de jeux.
// Aucune étape de compilation. Données : Supabase (projet La Donne), comptes : HoldingAI (compte.holdingai.app).
// Écrans (adresse après #) :
//   (vide)            catalogue des jeux          <id du jeu>        fiche, animation, carnet de points
//   ajouter           ajouter un jeu              modifier-<id>      modifier un jeu qu'on a ajouté
//   soirees           les soirées du groupe       soiree-<id>        une soirée : dates, réponses, jeux
//   nouvelle-soiree   proposer une soirée         groupe             le groupe, les joueurs, les invitations
(function () {
"use strict";
const C = window.APP_CONFIG || {};
const G = window.G || [], SCN = window.SCN || {};
const ADRESSE = (C.HOLDINGAI && C.HOLDINGAI.retour) || location.origin + "/";

/* ---------- Outils ---------- */
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* rien */ } } };
const nouvelId = (p) => p + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const $ = (s) => document.querySelector(s);
const app = document.getElementById("app");
let toastT = null;
function toast(t) {
  let el = $("#toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.textContent = t; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { el.hidden = true; }, 3200);
}
const erreurTexte = (e) => {
  const m = (e && (e.message || e.error_description || e.details)) || String(e || "");
  if (/fetch|network|Failed/i.test(m)) return "Pas de connexion Internet. Réessayez dans un instant.";
  return m.replace(/^.*?exception:\s*/i, "") || "Ça n'a pas fonctionné. Réessayez.";
};
const initiales = (n) => String(n || "?").trim().split(/\s+/).map((x) => x[0]).slice(0, 2).join("").toUpperCase() || "?";
const telAffiche = (p) => { const d = String(p || "").replace(/\D/g, "").slice(-10); return d.length === 10 ? `${d.slice(0, 3)} ${d.slice(3, 6)}-${d.slice(6)}` : p || ""; };
const smsLien = (num, corps) => `sms:${num || ""}${/iPhone|iPad|iPod/.test(navigator.userAgent) ? "&" : "?"}body=${encodeURIComponent(corps)}`;
const fmtDate = (s, court) => {
  const d = new Date(s); if (isNaN(d)) return s;
  const j = new Intl.DateTimeFormat("fr-CA", court ? { weekday: "short", day: "numeric", month: "short" } : { weekday: "long", day: "numeric", month: "long" }).format(d);
  const h = d.getHours() + " h" + (d.getMinutes() ? " " + String(d.getMinutes()).padStart(2, "0") : "");
  return j.charAt(0).toUpperCase() + j.slice(1) + ", " + h;
};
const passee = (s) => { const d = new Date(s); return !isNaN(d) && d.getTime() < Date.now() - 6 * 3600e3; };

/* ---------- Animation des règles (moteur repris de « Règles de jeux ») ---------- */
const RX = /^(-)?(\w+)(?::([a-z]):([^@]*))?(?:@(-?[\d.]+),(-?[\d.]+)(?:,(-?[\d.]+))?)?([!~^]*)$/u;
function stateAt(sc, k) { const m = new Map(); let z = 0; for (let i = 0; i <= k; i++) { for (const [id, v] of [...m]) { if (v.type === "t") m.delete(id); else v.hi = false; }
  for (const s of sc[i][1].split(" ").filter(Boolean)) { const r = RX.exec(s); if (!r) continue; const [, del, id, type, label, x, y, rot, fl] = r; if (del) { m.delete(id); continue; }
    let o = { ...(m.get(id) || { type: "t", label: "", x: 50, y: 50, rot: 0, down: false }) }; if (type) { o.type = type; o.label = (label || "").replace(/_/g, " "); o.down = fl.includes("~"); } else { if (fl.includes("~")) o.down = true; if (fl.includes("^")) o.down = false; }
    if (x != null) { o.x = +x; o.y = +y; if (rot != null) o.rot = +rot; } o.hi = fl.includes("!"); o.z = ++z; m.set(id, o); } } return m; }
const PIPS = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
function inner(o) { if (o.down) return ""; const L = o.label;
  if (o.type === "c") return `<b>${esc(L.slice(0, -1))}</b><i>${esc(L.slice(-1))}</i>`;
  if (o.type === "d") { const [a, b] = L.split("-"); return `<span>${esc(a)}</span><span>${esc(b)}</span>`; }
  if (o.type === "e") { const v = /^[a-z]/.test(L) ? L.slice(1) : L; return [...Array(9)].map((_, j) => `<i class="${(PIPS[v] || []).includes(j) ? "on" : ""}"></i>`).join(""); }
  if (o.type === "q" || o.type === "u") return `<b>${esc(L.slice(1))}</b>`;
  if (o.type === "t") return esc(L); return ""; }
let P = { g: null, k: 0, timer: null };
function draw() { const stg = document.getElementById("stg"); if (!stg || !P.g) return; const sc = SCN[P.g.id], m = stateAt(sc, P.k);
  for (const el of stg.children) if (!m.has(el.dataset.id)) { el.style.opacity = 0; el.classList.remove("hi"); }
  for (const [id, o] of m) { let el = stg.querySelector(`[data-id="${id}"]`);
    if (!el) { el = document.createElement("div"); el.dataset.id = id; el.style.opacity = 0; el.style.left = o.x + "%"; el.style.top = o.y + "%"; el.style.transform = `translate(-50%,-50%) rotate(${o.rot}deg)`; stg.appendChild(el); el.getBoundingClientRect(); }
    const sig = o.type + "|" + o.label + "|" + o.down; if (el.dataset.sig !== sig) { el.dataset.sig = sig; el.className = "tk " + o.type + (o.type === "u" || o.type === "q" ? " u" + o.label[0] : "") + (o.type === "e" && /^[a-z]/.test(o.label) ? " e" + o.label[0] : "") + (o.type === "u" && o.label.length > 4 ? " sm" : "") + (o.down ? " down" : "") + (o.type === "c" && /[♥♦]/.test(o.label) ? " red" : ""); el.innerHTML = inner(o); }
    el.classList.toggle("hi", o.hi); el.style.left = o.x + "%"; el.style.top = o.y + "%"; el.style.zIndex = o.z; el.style.transform = `translate(-50%,-50%) rotate(${o.rot}deg) scale(${o.hi ? 1.1 : 1})`; el.style.opacity = 1; }
  $("#cap").textContent = sc[P.k][0]; $("#cnt").textContent = `${P.k + 1} / ${sc.length}`;
  $("#prv").disabled = P.k === 0; $("#nxt").disabled = P.k === sc.length - 1; $("#ply").textContent = P.timer ? "Pause" : (P.k === sc.length - 1 ? "Revoir" : "Lecture"); }
function stopAnim() { clearInterval(P.timer); P.timer = null; }
function playAnim() { const n = SCN[P.g.id].length; if (P.timer) { stopAnim(); draw(); return; } if (P.k === n - 1) P.k = 0;
  P.timer = setInterval(() => { if (P.k < n - 1) { P.k++; if (P.k === n - 1) stopAnim(); draw(); } else { stopAnim(); draw(); } }, 3400); draw(); }

/* ---------- État ---------- */
const S = {
  session: null,     // { uid, phone, nom } du compte HoldingAI
  sb: null,          // client Supabase
  lien: null,        // { player_id, group_id } : le groupe actif de ce compte
  cands: [],         // groupes où ce cellulaire est inscrit (mes_groupes)
  groupe: null,      // { id, owner, organizers, data }
  joueurs: [],       // [{ id, acct, data }]
  tels: {},          // player_id → numéro (10 chiffres), visible par les membres du groupe
  soirees: [],       // [{ id, data, created_at }]
  remote: [],        // jeux ajoutés par la communauté (table jeux)
  pret: false,       // le groupe a fini de charger
  canal: null,
};
const moiJoueur = () => S.lien && S.joueurs.find((j) => j.id === S.lien.player_id);
const nomJoueur = (id) => { const j = S.joueurs.find((x) => x.id === id); return j ? (j.data.nom || "Sans nom") : "Ancien joueur"; };
const estOrga = () => !!(S.lien && S.groupe && (S.groupe.owner === S.lien.player_id || (S.groupe.organizers || []).includes(S.lien.player_id)));
const estProprio = () => !!(S.lien && S.groupe && S.groupe.owner === S.lien.player_id);

/* ---------- Jeux : catalogue + jeux ajoutés ---------- */
const KINDS = ["Cartes", "Dominos", "Dés", "Société"];
const clampN = (v, d) => { v = Math.round(+v); return v >= 1 && v <= 20 ? v : d; };
function normUser(x, owner, rowId) { const t = (v, n) => String(v == null ? "" : v).slice(0, n); const paras = (v) => t(v, 4000).split(/\n+/).map((s) => s.trim()).filter(Boolean).map(esc);
  const s = [["Mise en place", paras(x.setup)], ["Déroulement", paras(x.play)], ["Fin et points", paras(x.end)]].filter((a) => a[1].length);
  const mn = clampN(x.min, 2), mx = Math.max(mn, clampN(x.max, mn));
  return { id: "u-" + t(rowId || x.id, 40).replace(/[^A-Za-z0-9-]/g, ""), name: t(x.name, 60).trim() || "Sans nom", kind: KINDS.includes(x.kind) ? x.kind : "Société", min: mn, max: mx,
    time: esc(t(x.time, 30).trim() || "—"), gear: t(x.gear, 140).trim() || "—", score: x.score === "low" || x.score === "high" ? x.score : null, quick: t(x.quick, 220).trim(),
    s: s.length ? s : [["Règles", ['<span class="soft">Pas encore de règles.</span>']]], tip: t(x.tip, 300).trim(), user: true, author: t(x.author, 40).trim(), owner, raw: { ...x, id: rowId || x.id } }; }
const all = () => G.concat(S.remote);
const jeuParId = (id) => all().find((g) => g.id === id);
const mine = (g) => g.user && S.session && g.owner === S.session.uid;
async function chargerJeux() {
  try {
    const { data, error } = await S.sb.from("jeux").select("id,auteur,data").order("cree", { ascending: true }).limit(500);
    if (error) throw error;
    S.remote = (data || []).map((r) => normUser(r.data || {}, r.auteur, r.id));
  } catch (e) { /* le catalogue reste utilisable */ }
}
async function enregistrerJeu(raw, effacer) {
  if (effacer) { const { error } = await S.sb.from("jeux").delete().eq("id", raw.id); if (error) throw error; }
  else { const { error } = await S.sb.from("jeux").upsert({ id: raw.id, data: raw }); if (error) throw error; }
  await chargerJeux();
}

/* ---------- Groupe ---------- */
async function chargerGroupe() {
  if (!S.session) { S.pret = true; return; }
  const sb = S.sb;
  try {
    const invite = sessionStorage.getItem("tapis.invite");
    const [l, m] = await Promise.all([sb.from("liens").select("player_id,group_id").maybeSingle(), sb.rpc("mes_groupes")]);
    S.lien = l.data || null;
    S.cands = (m.data || []).filter((c) => !c.archived);
    let cible = null;
    if (invite && S.cands.some((c) => c.player_id === invite)) cible = invite;
    else if (!S.lien && S.cands.length === 1) cible = S.cands[0].player_id;
    if (invite) sessionStorage.removeItem("tapis.invite");
    if (invite && !cible) S.inviteRatee = true;
    if (cible && (!S.lien || S.lien.player_id !== cible)) {
      const r = await sb.rpc("relier_joueur", { p_joueur: cible });
      if (r.error) throw r.error;
      S.lien = { player_id: cible, group_id: r.data };
      if (invite) S.bienvenue = true;
    }
    if (S.lien) await chargerDonneesGroupe();
  } catch (e) { S.erreurGroupe = erreurTexte(e); }
  S.pret = true;
}
async function chargerDonneesGroupe() {
  const sb = S.sb, g = S.lien.group_id;
  const [gr, js, ts, ss] = await Promise.all([
    sb.from("groupes").select("id,owner,organizers,data,deleted").eq("id", g).maybeSingle(),
    sb.from("joueurs").select("id,acct,data").eq("group_id", g),
    sb.from("telephones").select("player_id,phone").eq("group_id", g),
    sb.from("soirees").select("id,data,created_at").eq("group_id", g).order("created_at", { ascending: false }).limit(200),
  ]);
  if (gr.error) throw gr.error;
  if (!gr.data || gr.data.deleted) { S.lien = null; S.groupe = null; return; }
  S.groupe = gr.data;
  S.joueurs = (js.data || []).sort((a, b) => (a.data.nom || "").localeCompare(b.data.nom || "", "fr"));
  S.tels = {}; (ts.data || []).forEach((t) => { S.tels[t.player_id] = t.phone; });
  S.soirees = ss.data || [];
  ecouter();
}
function ecouter() {
  if (S.canal) { S.sb.removeChannel(S.canal); S.canal = null; }
  if (!S.lien) return;
  const g = S.lien.group_id;
  let t = null;
  const rafraichir = () => { clearTimeout(t); t = setTimeout(async () => { try { await chargerDonneesGroupe(); if (/^(soiree|soirees|groupe)/.test(location.hash.slice(1)) && !document.querySelector("form.edit")) route(true); majOnglets(); } catch (e) { /* rien */ } }, 400); };
  S.canal = S.sb.channel("groupe-" + g)
    .on("postgres_changes", { event: "*", schema: "public", table: "soirees", filter: "group_id=eq." + g }, rafraichir)
    .on("postgres_changes", { event: "*", schema: "public", table: "joueurs", filter: "group_id=eq." + g }, rafraichir)
    .subscribe();
}

/* ---------- Soirées : lecture des réponses ---------- */
// data : { titre, lieu, chez, dates:[ "AAAA-MM-JJTHH:MM" ], jeux:[id], places, note, par, fixee, annulee, rep_<joueur>: { <date>: "oui"|"pe"|"non" } }
const repsDe = (s, date) => { const out = { oui: [], pe: [], non: [] };
  S.joueurs.forEach((j) => { const r = (s.data["rep_" + j.id] || {})[date]; if (out[r]) out[r].push(j.id); }); return out; };
const datesDe = (s) => (s.data.fixee ? [s.data.fixee] : (s.data.dates || [])).slice().sort();
const prochaineDate = (s) => datesDe(s).find((d) => !passee(d)) || null;
const aVenir = (s) => !s.data.annulee && !!prochaineDate(s);
const sansReponse = (s) => { if (!S.lien || !aVenir(s)) return false; const r = s.data["rep_" + S.lien.player_id] || {}; return datesDe(s).filter((d) => !passee(d)).some((d) => !r[d]); };

/* ---------- Coquille : barre du haut et onglets ---------- */
const ICO = {
  jeux: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="11" height="15" rx="2" transform="rotate(-8 8 12)"/><rect x="10" y="4" width="11" height="15" rx="2" fill="currentColor" fill-opacity=".15"/></svg>`,
  soirees: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.6" fill="currentColor"/></svg>`,
  groupe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.2c2.6.1 4.3 1.8 5 4.8"/></svg>`,
};
function coquille() {
  document.body.insertAdjacentHTML("afterbegin", `<header class="top"><a class="logo" href="#"><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="1" y="1" width="30" height="30" rx="8" fill="#167a52"/><g transform="rotate(-10 16 16)"><rect x="7" y="7" width="13" height="18" rx="2" fill="#fff"/><text x="13.5" y="20" text-anchor="middle" font-size="10" fill="#d7263d">♥</text></g><circle cx="23" cy="22" r="4" fill="#ffcf33"/></svg>La Donne</a><span class="grp" id="grpNom"></span><button type="button" class="hai-porte-btn" data-hai-porte aria-label="Mon compte (Albert, L’Établi)" title="Mon compte"></button></header>`);
  document.body.insertAdjacentHTML("beforeend", `<nav class="tabs" aria-label="Sections"><a href="#" data-tab="jeux">${ICO.jeux}<span>Jeux</span></a><a href="#soirees" data-tab="soirees"><span class="pt">${ICO.soirees}<i id="badge" hidden></i></span><span>Soirées</span></a><a href="#groupe" data-tab="groupe">${ICO.groupe}<span>Groupe</span></a></nav>`);
}
function majOnglets() {
  const h = location.hash.slice(1);
  const tab = /^(soiree|nouvelle-soiree)/.test(h) ? "soirees" : h === "groupe" ? "groupe" : "jeux";
  document.querySelectorAll("[data-tab]").forEach((a) => { const on = a.dataset.tab === tab; a.classList.toggle("on", on); on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"); });
  const n = S.soirees.filter(sansReponse).length, b = $("#badge");
  if (b) { b.hidden = !n; b.textContent = n; }
  const gn = $("#grpNom"); if (gn) gn.textContent = S.groupe ? (S.groupe.data.nom || "") : "";
}

/* ---------- Écran : connexion requise ---------- */
function ecranConnexion(titre, texte) {
  app.innerHTML = `<div class="felt band"><div class="in"><h1>${esc(titre)}</h1><p class="lede">${esc(texte)}</p></div></div>
  <div class="band"><div class="in"><div class="sec"><h2>Un seul compte pour toutes les apps de L’Établi</h2>
  <p>On se connecte avec son cellulaire. Si un ami vous a ajouté à son groupe, utilisez le même numéro : vous arriverez directement dans son groupe.</p>
  <button class="btn go wide" data-act="connecter" style="margin:6px 0 14px">Continuer avec L’Établi</button></div>
  <p class="note">Les règles des jeux restent ouvertes à tous, sans compte.</p></div></div>`;
}
const attendre = () => { app.innerHTML = `<div class="spin">Chargement…</div>`; };

/* ---------- Écrans : catalogue et fiche de jeu ---------- */
let F = { kind: "Tous", n: 0, q: "" }, confirmClear = false, editConfirm = false;
const dice = `<svg viewBox="0 0 52 64" aria-hidden="true"><rect x="4" y="22" width="28" height="28" rx="6" fill="#d7263d" transform="rotate(-10 18 36)"/><rect x="20" y="12" width="28" height="28" rx="6" fill="#fff" stroke="#e3e0d8" stroke-width="2"/>${[[27, 19], [34, 26], [41, 33]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.8" fill="#18201c"/>`).join("")}<circle cx="13" cy="32" r="2.6" fill="#fff"/><circle cx="22" cy="40" r="2.6" fill="#fff"/></svg>`;
const icon = (k) => k === "Société" ? `<svg viewBox="0 0 52 64" aria-hidden="true"><path d="M26 6a9 9 0 0 1 9 9c0 3-1 5-3 7l14 6c3 1 4 5 1 7l-9 3 8 16c1 3-1 5-4 5H34l-8-12-8 12h-8c-3 0-5-2-4-5l8-16-9-3c-3-2-2-6 1-7l14-6c-2-2-3-4-3-7a9 9 0 0 1 9-9z" fill="#d7263d"/></svg>` : k === "Dés" ? dice : k === "Dominos"
  ? `<svg viewBox="0 0 52 64" aria-hidden="true"><rect x="8" y="4" width="36" height="56" rx="7" fill="#0f5a3c"/><rect x="10" y="6" width="32" height="52" rx="6" fill="#fff"/><line x1="12" y1="32" x2="40" y2="32" stroke="#0f5a3c" stroke-width="2"/>${[[19, 14], [33, 24], [26, 19]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#18201c"/>`).join("")}${[[19, 40], [33, 40], [19, 50], [33, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#d7263d"/>`).join("")}</svg>`
  : `<svg viewBox="0 0 52 64" aria-hidden="true"><g transform="rotate(-12 26 60)"><rect x="6" y="6" width="34" height="50" rx="5" fill="#0f5a3c"/></g><g transform="rotate(8 26 60)"><rect x="12" y="6" width="34" height="50" rx="5" fill="#fff" stroke="#e3e0d8" stroke-width="2"/><text x="29" y="40" text-anchor="middle" font-size="22" fill="#d7263d">♥</text></g></svg>`;
const heroArt = `<svg viewBox="0 0 320 240" aria-hidden="true"><ellipse cx="160" cy="214" rx="130" ry="16" fill="#000" opacity=".22"/>
${[[-24, "♠", "#18201c"], [-8, "♦", "#d7263d"], [8, "♣", "#18201c"], [24, "♥", "#d7263d"]].map(([r, s, c]) => `<g transform="rotate(${r} 150 210)"><rect x="112" y="40" width="80" height="116" rx="9" fill="#fff" stroke="#e6e3dc" stroke-width="2"/><text x="124" y="66" font-family="Rubik" font-weight="800" font-size="20" fill="${c}">A</text><text x="152" y="118" text-anchor="middle" font-size="40" fill="${c}">${s}</text></g>`).join("")}
<g transform="rotate(14 262 150)"><rect x="232" y="94" width="58" height="108" rx="10" fill="#f1efe9"/><rect x="232" y="94" width="58" height="104" rx="10" fill="#fff"/><line x1="238" y1="146" x2="284" y2="146" stroke="#0f5a3c" stroke-width="3"/>
${[[248, 110], [274, 110], [261, 120], [248, 130], [274, 130]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#18201c"/>`).join("")}${[[248, 162], [274, 162], [248, 184], [274, 184], [261, 173]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#d7263d"/>`).join("")}</g></svg>`;
const nbJoueurs = (g) => g.min === g.max ? g.min : g.min + "–" + g.max;
function liste() { const q = F.q.toLowerCase(); return all().filter((g) => (F.kind === "Tous" || g.kind === F.kind) && (!F.n || (F.n >= g.min && (F.n <= g.max || (F.n >= 7 && g.max >= 7)))) && (!q || (g.name + " " + g.quick).toLowerCase().includes(q))); }
const cartes = () => { const l = liste(); return l.length ? l.map((g) => `<a class="game" href="#${g.id}">${icon(g.kind)}<span><b>${esc(g.name)}${g.user ? '<span class="tag">Ajouté</span>' : ""}</b><small>${g.kind} · ${nbJoueurs(g)} joueurs · ${g.time}</small></span></a>`).join("") + `<a class="add" href="#ajouter">+ Ajouter un jeu</a>` : `<div class="empty">Aucun jeu ne correspond. <a href="#ajouter">Ajoutez-le !</a></div>`; };
function accueil() {
  const prochaine = S.soirees.filter(aVenir).sort((a, b) => prochaineDate(a).localeCompare(prochaineDate(b)))[0];
  app.innerHTML = `<div class="felt band"><div class="in hero"><div><h1>Les règles, sans fouiller dans la boîte.</h1><p>Plus de vingt-cinq jeux de cartes, de dominos, de dés et de société, expliqués en deux minutes et en animation. Puis on invite les amis et on fixe la soirée.</p></div>${heroArt}</div></div>
  <div class="band"><div class="in">
  ${prochaine ? `<a class="item" href="#soiree-${prochaine.id}" style="margin-bottom:18px"><span class="when">Prochaine soirée</span><h3>${esc(prochaine.data.titre || "Soirée de jeux")}</h3><div class="meta">${esc(fmtDate(prochaineDate(prochaine)))}${prochaine.data.lieu ? " · " + esc(prochaine.data.lieu) : ""}</div></a>` : ""}
  <div class="tools"><input id="q" type="search" placeholder="Chercher un jeu" value="${esc(F.q)}" aria-label="Chercher un jeu">
  ${["Tous", ...KINDS].map((k) => `<button class="chip${F.kind === k ? " on" : ""}" data-k="${k}">${k}</button>`).join("")}</div>
  <div class="tools"><span class="soft">Joueurs :</span>${[0, 1, 2, 3, 4, 5, 6, 7].map((n) => `<button class="chip${F.n === n ? " on" : ""}" data-n="${n}">${n ? n + (n === 7 ? "+" : "") : "Peu importe"}</button>`).join("")}</div>
  <div class="grid" id="grid">${cartes()}</div></div></div>`;
  $("#q").addEventListener("input", (e) => { F.q = e.target.value; $("#grid").innerHTML = cartes(); });
}
const corps = (x) => (Array.isArray(x) ? x : [x]).map((p) => typeof p === "string" ? `<p>${p}</p>` : p.ol ? `<ol>${p.ol.map((i) => `<li>${i}</li>`).join("")}</ol>` : p.ul ? `<ul>${p.ul.map((i) => `<li>${i}</li>`).join("")}</ul>` : "").join("");
const slug = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function pad(g) { if (!g.score) return ""; const d = store.get("rj-" + g.id, { p: [], r: [] }); const tot = d.p.map((_, j) => d.r.reduce((s, r) => s + (+r[j] || 0), 0));
  const best = tot.length && d.r.length ? (g.score === "low" ? Math.min(...tot) : Math.max(...tot)) : null;
  const lead = best == null ? "" : d.p.filter((_, j) => tot[j] === best);
  const suggestion = !d.p.length && S.joueurs.length ? `<p class="soft" style="margin-top:8px"><button class="btn sm ghost" data-act="pad-groupe">Ajouter les joueurs du groupe</button></p>` : "";
  return `<div class="sec pad" id="points"><h2>Carnet de points</h2><p class="soft">${g.score === "low" ? "Le total le plus bas mène." : "Le total le plus haut mène."}</p>
  ${!d.r.length ? `<div class="names">${d.p.map((p, j) => `<span>${esc(p)}<button data-rmp="${j}" aria-label="Retirer ${esc(p)}">×</button></span>`).join("")}</div>
  <form class="row" id="addp"><input id="pn" placeholder="Prénom du joueur" maxlength="16" autocomplete="off"><button>Ajouter</button></form>${suggestion}` : ""}
  ${d.p.length ? `<div class="scroll" style="margin-top:12px"><table><thead><tr><th>Manche</th>${d.p.map((p) => `<th>${esc(p)}</th>`).join("")}</tr></thead><tbody>
  ${d.r.map((r, i) => `<tr><td>${i + 1}</td>${r.map((v) => `<td>${+v || 0}</td>`).join("")}</tr>`).join("")}
  <tr class="entry"><td>${d.r.length + 1}</td>${d.p.map((_, j) => `<td><input inputmode="numeric" type="number" data-e="${j}" aria-label="Points de ${esc(d.p[j])}"></td>`).join("")}</tr></tbody>
  <tfoot><tr><td>Total</td>${tot.map((t) => `<td class="${t === best ? "lead" : ""}">${t}</td>`).join("")}</tr></tfoot></table></div>
  ${lead ? `<p class="leader">En tête : ${lead.map(esc).join(" et ")}</p>` : ""}
  <div class="row" style="margin:12px 0 14px"><button class="go" id="addr">Ajouter la manche</button>${d.r.length ? `<button id="undo">Annuler la dernière</button>` : ""}<button id="clr">${confirmClear ? "Vraiment tout effacer ?" : "Nouvelle partie"}</button></div>` : '<p class="soft" style="margin-top:10px">Ajoutez au moins deux joueurs.</p>'}</div>`; }
function fiche(g) { const secs = g.s.map(([t]) => t);
  app.innerHTML = `<div class="felt band"><div class="in"><a class="back" href="#">← Tous les jeux</a><h1 style="margin-top:6px">${esc(g.name)}</h1>
  <div class="facts"><div><span>Joueurs</span>${g.min === g.max ? g.min : g.min + " à " + g.max}</div><div><span>Durée</span>${g.time}</div><div><span>Matériel</span>${esc(g.gear)}</div></div>
  <p class="quick">${esc(g.quick)}</p>${g.user ? `<p class="by">Ajouté par ${esc(g.author || "un joueur")}</p>` : ""}</div></div>
  <nav class="nav scroll" aria-label="Sections">${SCN[g.id] ? `<a href="#${g.id}" data-go="animation">Animation</a>` : ""}${secs.map((t) => `<a href="#${g.id}" data-go="${slug(t)}">${esc(t)}</a>`).join("")}${g.score ? `<a href="#${g.id}" data-go="points">Points</a>` : ""}</nav>
  <div class="band"><div class="in">${mine(g) ? `<div class="row" style="margin-bottom:14px"><a class="btnl" href="#modifier-${g.id}">Modifier</a><button id="delg">${editConfirm ? "Vraiment supprimer ?" : "Supprimer"}</button></div>` : ""}
  ${S.lien ? `<div class="row" style="margin-bottom:14px"><a class="btn go" href="#nouvelle-soiree?jeu=${encodeURIComponent(g.id)}">Organiser une soirée de ${esc(g.name)}</a></div>` : ""}
  ${SCN[g.id] ? `<section class="sec anim" id="animation"><h2>En animation</h2><div class="stage" id="stg" role="img" aria-label="Démonstration animée"></div><p class="cap" id="cap" aria-live="polite"></p><div class="ctrl"><button id="prv">Précédent</button><button id="ply" class="go">Lecture</button><button id="nxt">Suivant</button><span id="cnt"></span></div></section>` : ""}
  ${g.s.map(([t, b]) => `<section class="sec" id="${slug(t)}"><h2>${esc(t)}</h2>${corps(b)}</section>`).join("")}
  ${g.tip ? `<div class="tip"><h2>Astuce</h2><p>${esc(g.tip)}</p></div>` : ""}
  <div id="padw">${pad(g)}</div>
  <p class="note">Les règles varient d'une table à l'autre : entendez‑vous sur les variantes avant de brasser.</p></div></div>`; }
function formJeu(g) { const r = g ? g.raw : {}; editConfirm = false;
  if (!S.pret) return attendre();
  if (!S.session) { ecranConnexion("Ajouter un jeu", "Connectez-vous pour partager les règles d'un jeu avec tous les joueurs de La Donne."); return; }
  const f = (id, lab, v, ph, req, n) => `<label for="${id}">${lab}${req ? " *" : ""}</label><input id="${id}" value="${esc(v || "")}" placeholder="${ph}" maxlength="${n}"${req ? " required" : ""}>`;
  const a = (id, lab, v, ph) => `<label for="${id}">${lab}</label><textarea id="${id}" rows="5" placeholder="${ph}" maxlength="4000">${esc(v || "")}</textarea>`;
  app.innerHTML = `<div class="felt band"><div class="in"><a class="back" href="${g ? "#" + g.id : "#"}">← ${g ? "Retour au jeu" : "Tous les jeux"}</a><h1 style="margin-top:6px">${g ? "Modifier le jeu" : "Ajouter un jeu"}</h1><p class="quick">Partagez les règles d'un jeu que vous connaissez. Chaque retour à la ligne devient un paragraphe.</p></div></div>
  <div class="band"><div class="in"><form class="sec form edit" id="gform">
  ${f("fn", "Nom du jeu", r.name, "Ex. : Skyjo", 1, 60)}
  <label for="fk">Type</label><select id="fk">${KINDS.map((k) => `<option${(r.kind || "Cartes") === k ? " selected" : ""}>${k}</option>`).join("")}</select>
  <div class="two"><div>${f("fmin", "Joueurs minimum", r.min || 2, "2", 0, 2)}</div><div>${f("fmax", "Joueurs maximum", r.max || 6, "6", 0, 2)}</div></div>
  ${f("ft", "Durée", r.time, "Ex. : 30 min", 0, 30)}${f("fg", "Matériel", r.gear, "Ex. : 1 jeu de 52 cartes", 0, 140)}
  ${f("fq", "Le jeu en une phrase", r.quick, "Le but du jeu, en une phrase", 1, 220)}
  ${a("fs", "Mise en place", r.setup, "Combien de cartes, comment on installe…")}${a("fp", "Déroulement *", r.play, "Ce qu'on fait à son tour…")}${a("fe", "Fin et points", r.end, "Quand ça s'arrête, qui gagne…")}
  ${f("fa", "Astuce", r.tip, "Un conseil pour bien jouer", 0, 300)}
  <label for="fsc">Carnet de points</label><select id="fsc"><option value=""${!r.score ? " selected" : ""}>Pas de carnet</option><option value="high"${r.score === "high" ? " selected" : ""}>Le plus haut total gagne</option><option value="low"${r.score === "low" ? " selected" : ""}>Le plus bas total gagne</option></select>
  ${f("fau", "Votre prénom (facultatif)", r.author != null ? r.author : (S.session.nom || ""), "Affiché sur la fiche", 0, 40)}
  <p class="soft" id="fmsg" style="margin-top:14px">Le jeu sera visible par tous les joueurs de La Donne. Vous seul pourrez le modifier.</p>
  <button class="go big2">${g ? "Enregistrer" : "Ajouter le jeu"}</button></form></div></div>`;
  $("#fn").focus(); }
async function soumettreJeu() { const v = (id) => document.getElementById(id).value; const old = courant();
  const raw = { id: old && old.user ? old.raw.id : nouvelId("j"), name: v("fn").trim(), kind: v("fk"), min: clampN(v("fmin"), 2), max: clampN(v("fmax"), 6), time: v("ft").trim(), gear: v("fg").trim(), quick: v("fq").trim(), setup: v("fs"), play: v("fp"), end: v("fe"), tip: v("fa").trim(), score: v("fsc") || null, author: v("fau").trim() };
  if (!raw.name || !raw.quick || !raw.play.trim()) { $("#fmsg").textContent = "Il faut au moins un nom, une phrase de résumé et le déroulement."; return; }
  const btn = $("#gform button.go"); btn.disabled = true; btn.textContent = "Enregistrement…";
  try { await enregistrerJeu(raw); location.hash = "u-" + raw.id.replace(/[^A-Za-z0-9-]/g, ""); }
  catch (e) { btn.disabled = false; btn.textContent = "Réessayer"; $("#fmsg").textContent = erreurTexte(e); } }
const courant = () => { const h = location.hash.slice(1).replace(/^modifier-/, ""); return jeuParId(h); };

/* ---------- Écrans : soirées ---------- */
function ecranSansGroupe() {
  const nom = (S.session && S.session.nom) || "";
  app.innerHTML = `<div class="felt band"><div class="in"><h1>Votre groupe de jeu</h1><p class="lede">Créez le groupe, ajoutez vos amis avec leur cellulaire, puis proposez des soirées. Chacun répond en un geste.</p></div></div>
  <div class="band"><div class="in">
  ${S.erreurGroupe ? `<div class="msg err">${esc(S.erreurGroupe)}</div>` : ""}
  ${S.inviteRatee ? `<div class="msg">Cette invitation ne correspond pas à votre cellulaire (${esc(telAffiche(S.session.phone))}). Demandez à votre ami de vérifier le numéro qu'il a inscrit.</div>` : ""}
  ${S.cands.length ? `<div class="sec"><h2>Vos groupes</h2><div class="people">${S.cands.map((c) => `<div class="person"><span class="ini">${esc(initiales((c.groupe || {}).nom))}</span><span class="nm"><b>${esc((c.groupe || {}).nom || "Groupe")}</b><small>Vous : ${esc((c.joueur || {}).nom || "")}</small></span><span class="act"><button class="btn sm go" data-act="relier" data-id="${esc(c.player_id)}">Ouvrir</button></span></div>`).join("")}</div></div>` : ""}
  <form class="sec form edit" id="fgroupe"><h2>Créer un groupe</h2>
  <label for="gnom">Nom du groupe *</label><input id="gnom" required maxlength="40" placeholder="Ex. : Les jeudis de cartes">
  <label for="gmoi">Votre prénom *</label><input id="gmoi" required maxlength="30" value="${esc(nom)}" placeholder="Comme vos amis vous appellent">
  <p class="soft" style="margin-top:14px">Un ami vous a déjà ajouté ? Il n'y a rien à créer : demandez-lui l'invitation par texto, ou vérifiez qu'il a inscrit ce numéro : <b>${esc(telAffiche(S.session.phone))}</b>.</p>
  <button class="go big2">Créer le groupe</button></form></div></div>`;
}
function ecranSoirees() {
  if (!S.pret) return attendre();
  if (!S.session) return ecranConnexion("Les soirées de jeux", "Proposez une date, les amis répondent oui, non ou peut-être, et tout le monde sait qui vient et à quoi on joue.");
  if (!S.pret) return attendre();
  if (!S.lien) return ecranSansGroupe();
  const avenir = S.soirees.filter(aVenir).sort((a, b) => prochaineDate(a).localeCompare(prochaineDate(b)));
  const autres = S.soirees.filter((s) => !aVenir(s)).slice(0, 20);
  const carte = (s) => { const d = prochaineDate(s) || datesDe(s)[datesDe(s).length - 1] || ""; const choix = !s.data.fixee && (s.data.dates || []).length > 1;
    const r = d ? repsDe(s, d) : { oui: [], pe: [] };
    return `<a class="item" href="#soiree-${s.id}"><span class="when${aVenir(s) ? "" : " past"}">${s.data.annulee ? "Annulée" : choix ? (s.data.dates.length + " dates proposées") : esc(fmtDate(d, true))}</span><h3>${esc(s.data.titre || "Soirée de jeux")}</h3>
    <div class="meta">${s.data.lieu ? esc(s.data.lieu) + " · " : ""}${r.oui.length} oui${r.pe.length ? ", " + r.pe.length + " peut-être" : ""}${s.data.places ? " sur " + s.data.places + " places" : ""}${sansReponse(s) ? ' · <b style="color:var(--redT)">À vous de répondre</b>' : ""}</div></a>`; };
  app.innerHTML = `<div class="felt band"><div class="in"><h1>Soirées</h1><p class="lede">${esc(S.groupe.data.nom || "")} · ${S.joueurs.length} joueur${S.joueurs.length > 1 ? "s" : ""}</p></div></div>
  <div class="band"><div class="in">
  ${S.bienvenue ? `<div class="msg">Bienvenue dans le groupe ${esc(S.groupe.data.nom || "")} ! Répondez aux soirées proposées ci-dessous.</div>` : ""}
  <a class="btn go wide" href="#nouvelle-soiree" style="margin-bottom:18px">Proposer une soirée</a>
  ${avenir.length ? `<div class="list">${avenir.map(carte).join("")}</div>` : `<div class="sec center"><p>Aucune soirée prévue.</p><p class="soft">Proposez une ou plusieurs dates : le groupe répond, et vous choisissez la meilleure.</p></div>`}
  ${autres.length ? `<h2 style="margin:28px 0 12px">Passées et annulées</h2><div class="list">${autres.map(carte).join("")}</div>` : ""}
  </div></div>`;
  S.bienvenue = false;
}
function formSoiree(s) {
  if (!S.pret) return attendre();
  if (!S.session) return ecranConnexion("Proposer une soirée", "Connectez-vous pour inviter vos amis.");
  if (!S.pret) return attendre();
  if (!S.lien) return ecranSansGroupe();
  const d = s ? s.data : {};
  const pre = new URLSearchParams(location.hash.split("?")[1] || "").get("jeu");
  const choisis = new Set(d.jeux || (pre ? [pre] : []));
  const dates = (d.dates && d.dates.length ? d.dates : [""]);
  const jeux = all().slice().sort((a, b) => a.name.localeCompare(b.name, "fr"));
  app.innerHTML = `<div class="felt band"><div class="in"><a class="back" href="${s ? "#soiree-" + s.id : "#soirees"}">← ${s ? "Retour à la soirée" : "Soirées"}</a><h1 style="margin-top:6px">${s ? "Modifier la soirée" : "Proposer une soirée"}</h1><p class="lede">Proposez une seule date, ou plusieurs pour trouver celle qui convient au plus grand nombre.</p></div></div>
  <div class="band"><div class="in"><form class="sec form edit" id="fsoiree">
  <label for="st">Titre</label><input id="st" maxlength="60" value="${esc(d.titre || "")}" placeholder="Soirée de jeux">
  <label>Date et heure *</label><div id="dates">${dates.map((x, i) => `<div class="row" style="margin-bottom:8px"><input type="datetime-local" class="sd" value="${esc(x)}" aria-label="Date ${i + 1}"${i === 0 ? " required" : ""}>${i ? `<button type="button" data-act="retirer-date" aria-label="Retirer cette date">×</button>` : ""}</div>`).join("")}</div>
  ${dates.length < 5 ? `<button type="button" class="btn sm ghost" data-act="ajout-date">+ Proposer une autre date</button>` : ""}
  <label for="sl">Où</label><input id="sl" maxlength="80" value="${esc(d.lieu || "")}" placeholder="Ex. : chez Julie, 123 rue des Érables">
  <label for="sp">Nombre de places (facultatif)</label><input id="sp" type="number" inputmode="numeric" min="2" max="40" value="${esc(d.places || "")}" placeholder="Ex. : 6">
  <label>À quoi on joue (facultatif)</label><div class="check">${jeux.map((g) => `<label><input type="checkbox" name="sj" value="${esc(g.id)}"${choisis.has(g.id) ? " checked" : ""}>${esc(g.name)}</label>`).join("")}</div>
  <label for="sn">Note pour le groupe</label><textarea id="sn" rows="3" maxlength="500" placeholder="Apportez vos grignotines !">${esc(d.note || "")}</textarea>
  <p class="soft" id="smsg" style="margin-top:14px"></p>
  <button class="go big2">${s ? "Enregistrer" : "Proposer au groupe"}</button></form></div></div>`;
}
async function soumettreSoiree(s) {
  const dates = [...new Set([...document.querySelectorAll(".sd")].map((i) => i.value).filter(Boolean))].sort();
  if (!dates.length) { $("#smsg").textContent = "Choisissez au moins une date."; return; }
  const patch = { titre: $("#st").value.trim(), lieu: $("#sl").value.trim(), places: clampN($("#sp").value, 0) || null,
    jeux: [...document.querySelectorAll('[name="sj"]:checked')].map((c) => c.value).slice(0, 12), note: $("#sn").value.trim(), dates };
  if (!s) Object.assign(patch, { par: S.lien.player_id, cree: new Date().toISOString(), fixee: dates.length === 1 ? dates[0] : null, annulee: false, ["rep_" + S.lien.player_id]: Object.fromEntries(dates.map((x) => [x, "oui"])) });
  else if (s.data.fixee && !dates.includes(s.data.fixee)) patch.fixee = dates.length === 1 ? dates[0] : null;
  else if (dates.length === 1) patch.fixee = dates[0];
  const id = s ? s.id : nouvelId("s");
  const btn = $("#fsoiree button.go"); btn.disabled = true; btn.textContent = "Enregistrement…";
  try {
    const { error } = await S.sb.rpc("soiree_maj", { p_id: id, p_group: S.lien.group_id, p_patch: patch }); if (error) throw error;
    await chargerDonneesGroupe();
    location.hash = "soiree-" + id + (s ? "" : "?nouvelle=1");
  } catch (e) { btn.disabled = false; btn.textContent = "Réessayer"; $("#smsg").textContent = erreurTexte(e); }
}
function texteInvitationSoiree(s) {
  const d = datesDe(s); const quand = d.length === 1 ? fmtDate(d[0]) : d.length + " dates possibles";
  return `${s.data.titre || "Soirée de jeux"} : ${quand}${s.data.lieu ? ", " + s.data.lieu : ""}. Tu viens ? Réponds ici : ${ADRESSE}#soiree-${s.id}`;
}
function ecranSoiree(id) {
  if (!S.pret) return attendre();
  if (!S.session) return ecranConnexion("Une soirée de jeux", "Connectez-vous avec votre cellulaire pour répondre à l'invitation.");
  if (!S.pret) return attendre();
  if (!S.lien) return ecranSansGroupe();
  const s = S.soirees.find((x) => x.id === id);
  if (!s) { app.innerHTML = `<div class="band"><div class="in"><div class="sec center"><p>Cette soirée n'existe plus ou appartient à un autre groupe.</p><a class="btn go" href="#soirees">Voir les soirées</a></div></div></div>`; return; }
  const d = s.data, moi = S.lien.player_id, mesRep = d["rep_" + moi] || {};
  const peutGerer = estOrga() || d.par === moi;
  const dates = datesDe(s);
  const nouvelle = /nouvelle=1/.test(location.hash);
  const blocDate = (x) => { const r = repsDe(s, x), ok = d.fixee === x, finie = passee(x);
    const plein = d.places && r.oui.length >= d.places;
    return `<div class="dateopt${ok && dates.length > 1 ? " fixed" : ""}"><h3>${esc(fmtDate(x))}${ok && (d.dates || []).length > 1 ? " ✓" : ""}</h3>
    <div class="meta soft"><span class="places${plein ? " full" : ""}">${r.oui.length} oui</span>${r.pe.length ? ` · ${r.pe.length} peut-être` : ""}${r.non.length ? ` · ${r.non.length} non` : ""}${d.places ? ` · ${plein ? "complet" : (d.places - r.oui.length) + " place" + (d.places - r.oui.length > 1 ? "s" : "") + " libre" + (d.places - r.oui.length > 1 ? "s" : "")}` : ""}</div>
    ${!finie && !d.annulee ? `<div class="answer" role="group" aria-label="Votre réponse pour ${esc(fmtDate(x))}">${[["oui", "Oui"], ["pe", "Peut-être"], ["non", "Non"]].map(([k, t]) => `<button type="button" data-act="repondre" data-date="${esc(x)}" data-r="${k}" class="${mesRep[x] === k ? "on" : ""}" aria-pressed="${mesRep[x] === k}">${t}</button>`).join("")}</div>` : ""}
    <div class="pills">${r.oui.map((p) => `<span class="pill oui">${esc(nomJoueur(p))}</span>`).join("")}${r.pe.map((p) => `<span class="pill pe">${esc(nomJoueur(p))} ?</span>`).join("")}${r.non.map((p) => `<span class="pill non">${esc(nomJoueur(p))}</span>`).join("")}</div>
    ${peutGerer && !ok && (d.dates || []).length > 1 && !finie && !d.annulee ? `<button class="btn sm ghost" data-act="fixer" data-date="${esc(x)}" style="margin-top:10px">Choisir cette date</button>` : ""}</div>`; };
  const jeux = (d.jeux || []).map(jeuParId).filter(Boolean);
  const dRef = prochaineDate(s) || dates[0];
  const nbOui = dRef ? repsDe(s, dRef).oui.length : 0;
  const possibles = nbOui >= 2 ? all().filter((g) => nbOui >= g.min && nbOui <= g.max && !(d.jeux || []).includes(g.id)).slice(0, 8) : [];
  const repondus = new Set(S.joueurs.filter((j) => Object.keys(d["rep_" + j.id] || {}).length).map((j) => j.id));
  const aRelancer = S.joueurs.filter((j) => j.id !== moi && !repondus.has(j.id));
  app.innerHTML = `<div class="felt band"><div class="in"><a class="back" href="#soirees">← Soirées</a><h1 style="margin-top:6px">${esc(d.titre || "Soirée de jeux")}</h1>
  <div class="facts">${dates.length === 1 ? `<div><span>Quand</span>${esc(fmtDate(dates[0]))}</div>` : `<div><span>Quand</span>${dates.length} dates proposées</div>`}${d.lieu ? `<div><span>Où</span>${esc(d.lieu)}</div>` : ""}<div><span>Proposée par</span>${esc(nomJoueur(d.par))}</div></div>
  ${d.note ? `<p class="quick">${esc(d.note)}</p>` : ""}</div></div>
  <div class="band"><div class="in">
  ${d.annulee ? `<div class="msg err">Cette soirée est annulée.</div>` : ""}
  ${nouvelle ? `<div class="msg">La soirée est proposée. Le groupe la voit dans l'app; envoyez aussi un texto pour qu'ils la voient tout de suite.<div class="row" style="margin-top:10px"><button class="btn sm go" data-act="partager">Envoyer au groupe</button></div></div>` : ""}
  <section class="sec">${dates.length > 1 && !d.fixee ? `<h2>Quelle date vous convient ?</h2><p class="soft">Répondez pour chaque date.</p>` : `<h2>Vous venez ?</h2>`}${dates.map(blocDate).join("")}</section>
  ${jeux.length ? `<section class="sec"><h2>Au programme</h2><div class="games-mini">${jeux.map((g) => `<a href="#${g.id}">${esc(g.name)} · ${nbJoueurs(g)} j.</a>`).join("")}</div><p class="soft" style="margin-top:10px">Touchez un jeu pour revoir les règles avant la soirée.</p></section>` : ""}
  ${possibles.length ? `<section class="sec"><h2>Aussi possible à ${nbOui}</h2><div class="games-mini">${possibles.map((g) => `<a href="#${g.id}">${esc(g.name)}</a>`).join("")}</div></section>` : ""}
  ${!d.annulee && aVenir(s) ? `<section class="sec"><h2>Inviter</h2>
    ${aRelancer.length ? `<p class="soft">${aRelancer.length} joueur${aRelancer.length > 1 ? "s n'ont" : " n'a"} pas encore répondu.</p><div class="people">${aRelancer.map((j) => `<div class="person"><span class="ini">${esc(initiales(j.data.nom))}</span><span class="nm"><b>${esc(j.data.nom || "")}</b></span><span class="act">${S.tels[j.id] ? `<a class="btn sm ghost" href="${esc(smsLien("+1" + S.tels[j.id], texteInvitationSoiree(s)))}">Texto</a>` : ""}</span></div>`).join("")}</div>` : `<p class="soft">Tout le monde a répondu.</p>`}
    <div class="row" style="margin:12px 0 10px"><button class="btn sm go" data-act="partager">Partager l'invitation</button><a class="btn sm ghost" href="#groupe">Ajouter un joueur</a></div></section>` : ""}
  ${d.fixee && !d.annulee && !passee(d.fixee) ? `<p><button class="btn ghost" data-act="ics">Ajouter à mon calendrier</button></p>` : ""}
  ${peutGerer ? `<div class="row" style="margin-top:18px"><a class="btn ghost" href="#modifier-soiree-${s.id}">Modifier</a>${d.annulee ? `<button class="btn ghost" data-act="reprendre">Remettre au programme</button>` : `<button class="btn danger" data-act="annuler">Annuler la soirée</button>`}<button class="btn danger" data-act="effacer-soiree">Supprimer</button></div>` : ""}
  </div></div>`;
}
let confirmer = null;
async function soireeAction(act, el) {
  const id = location.hash.slice(1).split("?")[0].replace(/^soiree-/, "");
  const s = S.soirees.find((x) => x.id === id); if (!s) return;
  const maj = async (patch) => { const { error } = await S.sb.rpc("soiree_maj", { p_id: id, p_group: S.lien.group_id, p_patch: patch }); if (error) throw error;
    s.data = { ...s.data, ...patch }; route(true); majOnglets(); };
  try {
    if (act === "repondre") { const k = "rep_" + S.lien.player_id; const r = { ...(s.data[k] || {}) }; r[el.dataset.date] = el.dataset.r;
      Object.keys(r).forEach((x) => { if (!(s.data.dates || []).includes(x) && x !== s.data.fixee) delete r[x]; });
      await maj({ [k]: r }); }
    else if (act === "fixer") { await maj({ fixee: el.dataset.date }); toast("Date choisie. Le groupe la voit maintenant."); }
    else if (act === "annuler") { if (confirmer !== act) { confirmer = act; el.textContent = "Vraiment annuler ?"; return; } await maj({ annulee: true }); }
    else if (act === "reprendre") await maj({ annulee: false });
    else if (act === "effacer-soiree") { if (confirmer !== act) { confirmer = act; el.textContent = "Vraiment supprimer ?"; return; }
      const { error } = await S.sb.from("soirees").delete().eq("id", id); if (error) throw error;
      S.soirees = S.soirees.filter((x) => x.id !== id); location.hash = "soirees"; }
    else if (act === "partager") { const t = texteInvitationSoiree(s);
      if (navigator.share) { try { await navigator.share({ text: t }); } catch (e) { /* annulé */ } }
      else { try { await navigator.clipboard.writeText(t); toast("Invitation copiée. Collez-la dans votre groupe de textos."); } catch (e) { location.href = smsLien("", t); } } }
    else if (act === "ics") telechargerIcs(s);
  } catch (e) { toast(erreurTexte(e)); }
  confirmer = null;
}
function telechargerIcs(s) {
  const d = new Date(s.data.fixee), f = new Date(d.getTime() + 3 * 3600e3);
  const z = (x) => x.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const e = (t) => String(t || "").replace(/[\\;,]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//La Donne//FR", "BEGIN:VEVENT", "UID:" + s.id + "@ladonne.ai", "DTSTAMP:" + z(new Date()), "DTSTART:" + z(d), "DTEND:" + z(f),
    "SUMMARY:" + e(s.data.titre || "Soirée de jeux"), "LOCATION:" + e(s.data.lieu), "DESCRIPTION:" + e(ADRESSE + "#soiree-" + s.id), "BEGIN:VALARM", "TRIGGER:-PT3H", "ACTION:DISPLAY", "DESCRIPTION:Soirée de jeux", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" })); a.download = "soiree-de-jeux.ics"; a.click();
}

/* ---------- Écran : groupe ---------- */
function texteInvitationGroupe(j) {
  const moi = moiJoueur();
  return `${moi ? moi.data.nom + " t'invite" : "Tu es invité"} dans le groupe « ${S.groupe.data.nom || "de jeu"} » sur La Donne, pour organiser nos soirées de jeux. Connecte-toi avec ce numéro de cellulaire : ${ADRESSE}?joueur=${j.id}`;
}
function ecranGroupe() {
  if (!S.pret) return attendre();
  if (!S.session) return ecranConnexion("Votre groupe de jeu", "Ajoutez vos amis avec leur cellulaire : ils reçoivent un texto et arrivent directement dans le groupe.");
  if (!S.pret) return attendre();
  if (!S.lien) return ecranSansGroupe();
  const moi = S.lien.player_id, orga = estOrga(), proprio = estProprio();
  const role = (j) => j.id === S.groupe.owner ? "Organisateur principal" : (S.groupe.organizers || []).includes(j.id) ? "Organisateur" : "";
  const autres = S.cands.filter((c) => c.group_id !== S.lien.group_id);
  const nouveau = S.nouveauJoueur && S.joueurs.find((j) => j.id === S.nouveauJoueur);
  app.innerHTML = `<div class="felt band"><div class="in"><h1>${esc(S.groupe.data.nom || "Mon groupe")}</h1><p class="lede">${S.joueurs.length} joueur${S.joueurs.length > 1 ? "s" : ""}. Chacun se connecte avec son cellulaire.</p></div></div>
  <div class="band"><div class="in">
  ${nouveau ? `<div class="msg"><b>${esc(nouveau.data.nom)}</b> est ajouté. Envoyez-lui l'invitation : il se connectera avec son numéro et arrivera dans le groupe.<div class="row" style="margin-top:10px"><a class="btn sm go" href="${esc(smsLien("+1" + S.tels[nouveau.id], texteInvitationGroupe(nouveau)))}">Envoyer le texto</a></div></div>` : ""}
  ${orga ? `<form class="sec form edit" id="fjoueur"><h2>Ajouter un joueur</h2><div class="addrow">
    <div><label for="jn" style="margin-top:0">Prénom *</label><input id="jn" required maxlength="30" autocomplete="off" placeholder="Ex. : Julie"></div>
    <div><label for="jt" style="margin-top:0">Cellulaire *</label><input id="jt" type="tel" required inputmode="tel" autocomplete="off" placeholder="514 555-1234"></div>
    <button class="go" style="min-height:46px">Ajouter</button></div><p class="soft" id="jmsg" style="margin:10px 0 6px">Le numéro sert à reconnaître votre ami quand il se connecte. Il n'est visible que par le groupe.</p></form>` : ""}
  <section class="sec"><h2>Les joueurs</h2><div class="people">${S.joueurs.map((j) => `<div class="person"><span class="ini">${esc(initiales(j.data.nom))}</span>
    <span class="nm"><b>${esc(j.data.nom || "Sans nom")}${j.id === moi ? " (vous)" : ""}</b><small>${[role(j), S.tels[j.id] ? telAffiche(S.tels[j.id]) : "", j.acct ? "" : "pas encore connecté"].filter(Boolean).map(esc).join(" · ")}</small></span>
    <span class="act">${j.id !== moi && !j.acct && S.tels[j.id] ? `<a class="btn sm ghost" href="${esc(smsLien("+1" + S.tels[j.id], texteInvitationGroupe(j)))}">Inviter</a>` : ""}
    ${proprio && j.id !== moi ? `<button class="btn sm ghost" data-act="orga" data-id="${esc(j.id)}" title="Peut ajouter des joueurs et gérer les soirées">${(S.groupe.organizers || []).includes(j.id) ? "Retirer orga" : "Orga"}</button>` : ""}
    ${orga && j.id !== moi && j.id !== S.groupe.owner ? `<button class="btn sm danger" data-act="retirer" data-id="${esc(j.id)}" aria-label="Retirer ${esc(j.data.nom)}">×</button>` : ""}</span></div>`).join("")}</div></section>
  <form class="sec form edit" id="fmoi"><h2>Votre nom dans le groupe</h2><div class="row"><input id="mn" maxlength="30" value="${esc((moiJoueur() || { data: {} }).data.nom || "")}" aria-label="Votre prénom"><button>Enregistrer</button></div><p></p></form>
  ${autres.length ? `<section class="sec"><h2>Vos autres groupes</h2><div class="people">${autres.map((c) => `<div class="person"><span class="ini">${esc(initiales((c.groupe || {}).nom))}</span><span class="nm"><b>${esc((c.groupe || {}).nom || "Groupe")}</b></span><span class="act"><button class="btn sm go" data-act="relier" data-id="${esc(c.player_id)}">Ouvrir</button></span></div>`).join("")}</div></section>` : ""}
  <p><button class="btn ghost" data-act="nouveau-groupe">Créer un autre groupe</button> <button class="btn ghost" type="button" data-hai-inviter>Inviter quelqu'un</button></p>
  <p class="note">Connecté avec le ${esc(telAffiche(S.session.phone))}. Pour changer de compte, touchez le bouton d'Albert en haut à droite.</p>
  </div></div>`;
  S.nouveauJoueur = null;
}
async function ajouterJoueur() {
  const nom = $("#jn").value.trim(), tel = $("#jt").value.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  const msg = $("#jmsg");
  if (!nom) { msg.textContent = "Inscrivez le prénom."; return; }
  if (tel.length !== 10) { msg.textContent = "Le cellulaire doit avoir 10 chiffres, comme 514 555-1234."; return; }
  if (Object.values(S.tels).includes(tel)) { msg.textContent = "Ce numéro est déjà dans le groupe."; return; }
  const btn = $("#fjoueur button.go"); btn.disabled = true;
  const id = nouvelId("p"), g = S.lien.group_id;
  try {
    let r = await S.sb.from("joueurs").insert({ id, group_id: g, data: { nom, ajoute_par: S.lien.player_id } }); if (r.error) throw r.error;
    r = await S.sb.from("telephones").insert({ player_id: id, group_id: g, phone: tel, e164: "+1" + tel });
    if (r.error) { await S.sb.from("joueurs").delete().eq("id", id); throw r.error; }
    await chargerDonneesGroupe(); S.nouveauJoueur = id; route(true);
  } catch (e) { btn.disabled = false; msg.textContent = erreurTexte(e); }
}
async function groupeAction(act, el) {
  const id = el.dataset.id;
  try {
    if (act === "retirer") { if (confirmer !== act + id) { confirmer = act + id; el.textContent = "Retirer ?"; return; }
      let r = await S.sb.from("telephones").delete().eq("player_id", id); if (r.error) throw r.error;
      r = await S.sb.from("joueurs").delete().eq("id", id); if (r.error) throw r.error;
      await chargerDonneesGroupe(); route(true); }
    else if (act === "orga") { const o = new Set(S.groupe.organizers || []); o.has(id) ? o.delete(id) : o.add(id);
      const { error } = await S.sb.rpc("groupe_maj", { p_id: S.groupe.id, p_patch: {}, p_owner: null, p_organizers: [...o] }); if (error) throw error;
      S.groupe.organizers = [...o]; route(true); }
    else if (act === "relier") { el.disabled = true; const r = await S.sb.rpc("relier_joueur", { p_joueur: id }); if (r.error) throw r.error;
      S.lien = { player_id: id, group_id: r.data }; await chargerDonneesGroupe(); majOnglets(); location.hash = "soirees"; route(true); }
    else if (act === "nouveau-groupe") { S.lienAvant = S.lien; S.lien = null; ecranSansGroupe(); }
  } catch (e) { toast(erreurTexte(e)); }
  confirmer = null;
}
async function creerGroupe() {
  const nom = $("#gnom").value.trim(), prenom = $("#gmoi").value.trim();
  if (!nom || !prenom) return;
  const btn = $("#fgroupe button.go"); btn.disabled = true; btn.textContent = "Création…";
  const g = nouvelId("g"), p = nouvelId("p");
  try {
    const { error } = await S.sb.rpc("creer_groupe", { p_groupe: g, p_joueur: p, p_donnees_groupe: { nom }, p_donnees_joueur: { nom: prenom } }); if (error) throw error;
    S.lien = { player_id: p, group_id: g };
    const m = await S.sb.rpc("mes_groupes"); S.cands = (m.data || []).filter((c) => !c.archived);
    await chargerDonneesGroupe(); majOnglets(); location.hash = "groupe"; route(true);
  } catch (e) { btn.disabled = false; btn.textContent = "Créer le groupe"; toast(erreurTexte(e)); if (S.lienAvant) S.lien = S.lienAvant; }
}

/* ---------- Navigation ---------- */
function route(garder) {
  confirmClear = false; editConfirm = false; confirmer = null; stopAnim();
  const h = location.hash.slice(1), base = h.split("?")[0];
  if (S.lienAvant && base !== "groupe") { S.lien = S.lien || S.lienAvant; S.lienAvant = null; }
  majOnglets();
  if (base === "soirees") ecranSoirees();
  else if (base === "nouvelle-soiree") formSoiree(null);
  else if (base.startsWith("modifier-soiree-")) { const s = S.soirees.find((x) => x.id === base.slice(16)); s ? formSoiree(s) : ecranSoirees(); }
  else if (base.startsWith("soiree-")) ecranSoiree(base.slice(7));
  else if (base === "groupe") ecranGroupe();
  else if (base === "ajouter") formJeu(null);
  else if (base.startsWith("modifier-")) { const g = jeuParId(base.slice(9)); g && mine(g) ? formJeu(g) : accueil(); }
  else { const g = jeuParId(base); P = { g: g || null, k: 0, timer: null }; g ? (fiche(g), SCN[g.id] && draw()) : accueil(); }
  if (!garder) window.scrollTo(0, 0);
}

const repad = (g) => { $("#padw").innerHTML = pad(g); };
app.addEventListener("click", (e) => {
  const actEl = e.target.closest("[data-act]");
  if (actEl) {
    const act = actEl.dataset.act;
    if (act === "connecter") { e.preventDefault(); HoldingAI.connecter(); return; }
    if (["repondre", "fixer", "annuler", "reprendre", "effacer-soiree", "partager", "ics"].includes(act)) { e.preventDefault(); soireeAction(act, actEl); return; }
    if (["retirer", "orga", "relier", "nouveau-groupe"].includes(act)) { e.preventDefault(); groupeAction(act, actEl); return; }
    if (act === "ajout-date") { const w = $("#dates"); if (w.children.length < 5) w.insertAdjacentHTML("beforeend", `<div class="row" style="margin-bottom:8px"><input type="datetime-local" class="sd" aria-label="Autre date"><button type="button" data-act="retirer-date" aria-label="Retirer cette date">×</button></div>`); w.lastElementChild.querySelector("input").focus(); return; }
    if (act === "retirer-date") { actEl.parentElement.remove(); return; }
    if (act === "pad-groupe") { const g = courant(); if (!g) return; const d = store.get("rj-" + g.id, { p: [], r: [] }); d.p = S.joueurs.map((j) => (j.data.nom || "").slice(0, 16)).filter(Boolean).slice(0, 8); store.set("rj-" + g.id, d); repad(g); return; }
  }
  const k = e.target.closest("[data-k]"), n = e.target.closest("[data-n]"), go = e.target.closest("[data-go]");
  if (k) { F.kind = k.dataset.k; accueil(); return; }
  if (n) { F.n = +n.dataset.n; accueil(); return; }
  if (go) { e.preventDefault(); document.getElementById(go.dataset.go)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); return; }
  const g = courant(); if (!g) return;
  if (e.target.id === "delg") { if (!editConfirm) { editConfirm = true; e.target.textContent = "Vraiment supprimer ?"; return; } enregistrerJeu(g.raw, true).then(() => { location.hash = ""; }).catch((x) => toast(erreurTexte(x))); return; }
  if (e.target.id === "prv") { stopAnim(); if (P.k > 0) P.k--; draw(); return; }
  if (e.target.id === "nxt") { stopAnim(); if (P.k < SCN[g.id].length - 1) P.k++; draw(); return; }
  if (e.target.id === "ply") { playAnim(); return; }
  const key = "rj-" + g.id, d = store.get(key, { p: [], r: [] });
  const rm = e.target.closest("[data-rmp]");
  if (rm) { d.p.splice(+rm.dataset.rmp, 1); store.set(key, d); repad(g); return; }
  if (e.target.id === "addr") { const v = [...document.querySelectorAll("[data-e]")].map((i) => Math.round(+i.value || 0)); d.r.push(v); store.set(key, d); confirmClear = false; repad(g); document.querySelector("[data-e]")?.focus(); return; }
  if (e.target.id === "undo") { d.r.pop(); store.set(key, d); repad(g); return; }
  if (e.target.id === "clr") { if (!confirmClear) { confirmClear = true; repad(g); return; } confirmClear = false; store.set(key, { p: d.p, r: [] }); repad(g); }
});
app.addEventListener("submit", (e) => {
  const id = e.target.id;
  if (["gform", "fsoiree", "fjoueur", "fgroupe", "fmoi", "addp"].includes(id)) e.preventDefault();
  if (id === "gform") return soumettreJeu();
  if (id === "fsoiree") { const b = location.hash.slice(1).split("?")[0]; return soumettreSoiree(b.startsWith("modifier-soiree-") ? S.soirees.find((x) => x.id === b.slice(16)) : null); }
  if (id === "fjoueur") return ajouterJoueur();
  if (id === "fgroupe") return creerGroupe();
  if (id === "fmoi") { const v = $("#mn").value.trim(); if (!v) return;
    S.sb.rpc("joueur_maj", { p_id: S.lien.player_id, p_patch: { nom: v } }).then(({ error }) => { if (error) throw error; const j = moiJoueur(); if (j) j.data.nom = v; toast("Nom enregistré."); route(true); }).catch((x) => toast(erreurTexte(x))); return; }
  if (id === "addp") { const g = courant(), key = "rj-" + g.id, d = store.get(key, { p: [], r: [] }); const v = $("#pn").value.trim(); if (v && !d.p.includes(v) && d.p.length < 8) { d.p.push(v); store.set(key, d); } repad(g); $("#pn")?.focus(); }
});
app.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.dataset && e.target.dataset.e != null) { e.preventDefault(); $("#addr").click(); } });
addEventListener("hashchange", () => route());

/* ---------- Démarrage ---------- */
(async function demarrer() {
  coquille();
  const q = new URLSearchParams(location.search);
  if (q.get("joueur")) { try { sessionStorage.setItem("tapis.invite", q.get("joueur")); } catch (e) { /* rien */ }
    history.replaceState(null, "", location.pathname + (location.hash || "#soirees")); if (!location.hash) location.hash = "soirees"; }
  let invite = null; try { invite = sessionStorage.getItem("tapis.invite"); } catch (e) { /* rien */ }
  S.sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey, { accessToken: async () => (await HoldingAI.jeton()) || null });
  route();
  const jeuxP = chargerJeux().then(() => { const h = location.hash.slice(1); if (!h || h.startsWith("u-")) route(true); });
  let r = { session: null };
  // Norme commune HoldingAI : compte obligatoire dans toutes les apps; sans session, la barrière d'Albert (porte.js)
  try { r = await HoldingAI.demarrer({ obligatoire: true }); } catch (e) { r = { session: null, erreur: e }; }
  if (r.redirection) return;
  S.session = r.session;
  window.HOLDINGAI_PORTE = Object.assign(window.HOLDINGAI_PORTE || {}, {
    app: "la-donne", nomApp: "La Donne", personnage: "Marcel",
    connecte: !!r.session, prenom: r.session ? r.session.nom : "",
    surDeconnexion: () => { HoldingAI.deconnexion(); location.reload(); },
  });
  if (!r.session) { window.HOLDINGAI_PORTE.barriere = true; if (window.HoldingAIPorte) HoldingAIPorte.barriere(); }
  if (r.erreur) toast(erreurTexte(r.erreur));
  await chargerGroupe();
  await jeuxP;
  if (S.inviteRatee || S.bienvenue) { if (!/^#soiree/.test(location.hash)) location.hash = "soirees"; }
  route(true);
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
})();

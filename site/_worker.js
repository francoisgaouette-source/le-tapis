// Site de La Donne (ladonne.ai) : sert les pages du dossier site/.
// www.ladonne.ai renvoie vers ladonne.ai, comme pour toutes les apps de L’Établi.
export default {
  async fetch(requete, env) {
    const url = new URL(requete.url);
    if (url.hostname === 'www.ladonne.ai') {
      url.hostname = 'ladonne.ai';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(requete);
  },
};

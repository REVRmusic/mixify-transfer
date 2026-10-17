# Mixify Transfer (mixify.fr)

Application web moderne et performante de transfert de playlists musicales entre plateformes, conçue selon les maquettes et l'univers graphique de **Mixify**.

## 🌟 Fonctionnalités

1. **Étape 1/4 : Sélection de la source**
   - Grille complète de plus de 20 services : Spotify, Apple Music, YouTube Music, YouTube, Deezer, TIDAL, Amazon Music, SoundCloud, Qobuz, Beatport, iTunes, Pandora, Anghami, KKBOX, Last.fm, Soundmachine, Boomplay, Audiomack.
   - Support direct des formats génériques : **Texte brut**, **Fichiers** (.csv, .m3u, .json, .txt) et **URLs directes**.
   - Barre de recherche instantanée.
   - Mention stricte de conformité : *Compatibilité Spotify (compte Spotify Premium requis)*.

2. **Étape 2/4 : Méthode d'importation**
   - **Option compte direct** : Téléchargement instantané depuis le compte connecté (ex: Deezer / Mixify).
   - **Option URL** : Collage d'une URL de playlist avec validation et bouton d'exemple en un clic.
   - **Option Fichier & Texte** : Drag & drop avec prévisualisation du nombre de titres.
   - Section d'assistance avec l'illustration des mains pointées vers l'onde sonore, modale FAQ et formulaire de contact direct (`contact@mixify.fr` / `support@mixify.fr`).

3. **Étape 3/4 : Sélection des playlists et favoris**
   - En-tête « Bibliothèque entière » avec compte connecté (*Mixify*) et option « Basculer vers un autre compte ».
   - Catégories de favoris : Titres favoris, Albums favoris, Artistes favoris.
   - Liste des playlists avec pochettes, compteurs de titres sélectionnés (*Mixify - 70's Club*, *Mixify - 80's Club*, *Mixify - 2000's Club*, etc.).
   - Modale d'inspection de playlist permettant d'exclure ou d'ajouter individuellement des morceaux et de renommer la playlist.

4. **Étape 4/4 : Sélection de la destination & Récapitulatif**
   - Choix du service récepteur (Spotify, Apple Music, YouTube Music, etc.).
   - En-tête dynamique `[Source] ➔ [Destination]`.
   - Bannière de crédits / quota technique (*« 731 sélectionnés. 283 sur 500 crédits restants »*).
   - Explication technique de l'allocation des slots API pour préserver la stabilité.

5. **Étape 5 : Moteur de transfert en direct & Exports**
   - Barre de progression animée avec pourcentage en temps réel.
   - Synchronisation titre par titre avec score de correspondance acoustique.
   - Retour sonore discret (Web Audio API) activable/désactivable.
   - Célébration (confettis) dès l'achèvement du transfert.
   - Liens directs d'ouverture vers la plateforme de destination.
   - Export immédiat multi-formats : **CSV**, **M3U**, **JSON**.

## 🚀 Lancement & Développement

```bash
cd mixify-transfer
pnpm install
pnpm dev
```

L'application est accessible en local sur : [http://localhost:5173](http://localhost:5173).

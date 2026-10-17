# Mixify Transfer (mixify.fr)

> Passerelle musicale universelle, moderne & **100% gratuite**, développée pour transférer des playlists entre Spotify, Deezer, Apple Music, YouTube Music, TIDAL, SoundCloud, et plus de 20 plateformes musicales.

---

## 🌐 Liens Publics

- **Site en ligne (Hébergement GitHub Pages Gratuit)** : [https://revrmusic.github.io/mixify-transfer/](https://revrmusic.github.io/mixify-transfer/)
- **Dépôt GitHub** : [https://github.com/REVRmusic/mixify-transfer](https://github.com/REVRmusic/mixify-transfer)

---

## ✨ Points forts & Spécificités

- **100% Gratuit & Illimité** : aucun système de faux crédits, aucun abonnement, aucune restriction artificielle de volume.
- **Design Studio Mixify** : identité sombre (Obsidian), touches néon Émeraude (`#00F5A0`) et Cyan (`#00D9F5`), égaliseur audio animé.
- **Prise en charge de plus de 20 plateformes** : Spotify, Deezer, Apple Music, YouTube Music, TIDAL, Amazon Music, SoundCloud, Qobuz, Beatport, etc.
- **Imports polyvalents** : Compte direct, Lien Web / URL avec auto-détection, fichiers locaux (.CSV, .M3U, .M3U8, .JSON, .TXT) et texte libre.
- **Gestion fine des playlists** : calcul des durées, inspecteur titre par titre avec exclusion/inclusion individuelle.
- **Moteur de réconciliation acoustique en direct** : simulation de matching acoustique avec score de correspondance et signal sonore désactivable.
- **Exports multi-formats** : téléchargement instantané en CSV, M3U8 et JSON.
- **Conformité stricte Spotify** : mention impérative « Compatibilité Spotify » (compte Spotify Premium requis).

---

## 🚀 Développement Local

```bash
# Cloner le dépôt
git clone https://github.com/REVRmusic/mixify-transfer.git
cd mixify-transfer

# Installer les dépendances
pnpm install

# Lancer en local
pnpm dev
```

---

## 🔄 Déploiement Continu Automatisé

Ce projet utilise **GitHub Actions** (`.github/workflows/deploy.yml`) : tout `git push origin main` compile et publie automatiquement la dernière version sur GitHub Pages en moins de 30 secondes, sans frais d'hébergement.

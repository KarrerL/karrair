# Karrair Voyages

Préparateur de voyages personnel au départ de Nice : carte du monde interactive, budget détaillé et programmes jour par jour pour 13 pays (Pologne, Vietnam, Chine, Kazakhstan, Rwanda, Norvège, Estonie, Finlande, Danemark, Chili, Géorgie, Maroc, Japon).

Site 100 % statique (HTML, CSS, JavaScript), sans dépendance ni étape de compilation.

## Lancer en local

Ouvrir `index.html` dans un navigateur suffit. Pour un rendu identique au site en ligne, servir le dossier avec n'importe quel serveur statique, par exemple :

```bash
npx serve .
```

## Publier avec GitHub Pages

1. Créer un dépôt sur GitHub et y déposer le contenu de ce dossier (`index.html` à la racine).
2. Dans le dépôt : **Settings → Pages → Build and deployment → Deploy from a branch**, choisir `main` et `/ (root)`.
3. Le site est publié à l'adresse `https://<ton-pseudo>.github.io/<nom-du-depot>/`.

## Structure

| Chemin | Contenu |
| --- | --- |
| `index.html` | Page unique (en-tête, pied de page, conteneur de l'application) |
| `css/style.css` | Styles, thèmes clair et sombre, animations |
| `js/app.js` | Routeur, carte, calcul des prix, programmes, billet à déchirer |
| `js/data-europe.js`, `js/data-asie.js`, `js/data-monde.js` | Destinations : vols, hôtels, programmes, plats |
| `js/world.js` | Fond de carte Natural Earth 1:50m projeté (Miller) avec noms des pays en français |
| `js/scene.js` | Ciel animé de l'accueil (nuages, avion, traînées) |
| `js/photos.js`, `js/placephotos.js` | Crédits des photos des pays et des lieux |
| `img/` | Photos des pays (grand format et vignettes `img/s/`) et logo |

## Données enregistrées

Les voyages enregistrés, les pays visités, les préférences et le bloc-notes sont stockés dans le `localStorage` du navigateur, uniquement sur l'appareil utilisé.

## Prix

Les prix sont des estimations (vols typiques avec au plus une escale, hôtels 3★, coût de la vie local). Les boutons « Vérifier sur Google Flights » et « Voir les hôtels sur Booking » ouvrent les recherches réelles pour les dates choisies.

## Crédits

- Fond de carte : [Natural Earth](https://www.naturalearthdata.com/) (domaine public), via `world-atlas`.
- Photos : Wikimedia Commons, licences libres (auteurs et licences listés dans `js/photos.js` et sur la page Aide du site). Les licences CC BY-SA imposent de conserver ces crédits.
- Usage personnel.

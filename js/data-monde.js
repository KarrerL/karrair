/* Destinations Afrique et Amériques */
window.DEST = window.DEST || {};

DEST.rw = {
  name: 'Rwanda', city: 'Kigali', region: 'Afrique', iso: '646', ll: [30.06, -1.95], code: 'KGL',
  tag: 'Mille collines et gorilles des montagnes',
  scene: { sky: ['#ffe6a6', '#f3b25c', '#c7643d'], land: ['#2d5a3a', '#183622'], kind: 'hills' },
  flight: { base: 720, overnight: false, stops: 1, air: 'Brussels Airlines', route: 'NCE → BRU → KGL', dur: '≈ 11 h avec escale', alt: 'Ou KLM via Amsterdam, Turkish via Istanbul.', season: 'afr' },
  hotel: { night: 85, area: 'Kiyovu / Kimihurura à Kigali', season: [1.05, 1.05, 0.9, 0.85, 0.85, 1.1, 1.2, 1.2, 1.1, 0.95, 0.9, 1.05] },
  food: 22, local: 6, shop: 60,
  money: 'Franc rwandais (RWF) · 1 € ≈ 1 650 RWF · dollars US propres (après 2009) pour les permis', plug: 'Type C/J (prises françaises OK)', tz: '0 h (été) / +1 h (hiver)', visa: 'Visa à l\'arrivée ou e-visa (irembo.gov.rw) – vérifier la gratuité Francophonie.', lang: 'Kinyarwanda / français / anglais · « Muraho » = bonjour',
  veg: [
    ["Sambaza","Petits poissons frits du lac Kivu, à grignoter avec une bière locale.","Poisson"],
    ["Tilapia grillé","Entier, avec bananes plantain ou frites.","Poisson"],
    ["Isombe","Feuilles de manioc pilées à l'arachide.","Végétarien"],
    ["Ibihaza","Courge mijotée aux haricots.","Végétarien"],
    ["Matoke","Bananes plantain vapeur en sauce.","Végétarien"],
    ["Rolex","Chapati roulé à l'omelette, street-food.","Végétarien"]
  ],
  vegTip: "Les autres goûteront les brochettes de chèvre (akabenzi = porc) ; les buffets « melange » sont pleins de légumineuses, bananes et légumes pour toi.",
  arr: [
    ['', 'Aéroport de Kigali (KGL)', 'Taxi officiel ou Move (≈ 15 000 RWF).', ''],
    ['', 'Hôtel – Kiyovu', 'Repos.', 't25'],
    ['19:00', 'Heaven Restaurant', 'Terrasse sur les collines : tilapia, brochettes pour les autres.', 't5']
  ],
  warnMin: 'Pour les gorilles, comptez au moins 5 jours sur place.',
  stages: [
    { city: 'Kigali', code: 'KGL', min: 1, max: 4, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport KGL', 'Taxi (25 min).', 't25']],
      days: [
        { t: 'Mémoire et marchés', c: 20, s: [
          ['09:00', 'Mémorial du génocide de Kigali (Gisozi)', 'Entrée gratuite, audioguide conseillé. Visite bouleversante (2 h).', 't15', ['09:30', 'Caplaki – village artisanal', 'Marché d\'artisans : paniers agaseke, masques, peintures imigongo.', 't15']],
          ['12:00', 'Marché de Kimironko', 'Tissus kitenge, paniers agaseke, fruits.', 't15'],
          ['13:30', 'Buffet « melange »', 'Déjeuner local.', 'w5'],
          ['15:00', 'Boutiques « Made in Rwanda »', 'Mode rwandaise (Haute Baso, House of Tayo), café et thé à rapporter.', 't15'],
          ['17:00', 'Kigali Convention Centre', 'Coupole illuminée.', 't5'],
          ['19:00', 'Repub Lounge', 'Cuisine rwandaise sur une terrasse en bois : tilapia, isombe, brochettes.', 't10']
        ] },
        { t: 'Nyamirambo à pied', c: 25, s: [
          ['09:00', 'Nyamirambo Women\'s Center', 'Visite guidée du quartier par des habitantes (3 h).', 't15'],
          ['10:00', 'Mosquée verte', 'Le plus vieux quartier de Kigali.', 'w10'],
          ['12:30', 'Déjeuner chez une famille', 'Inclus dans la visite.', 'w10'],
          ['15:00', 'Cours de tissage', 'Atelier de paniers (option).', 'w5'],
          ['18:00', 'Repos – café Question Coffee', 'Café rwandais.', 't15']
        ] }
      ] },
    { city: 'Musanze (Volcans)', code: 'KGL', min: 2, max: 4, prio: 1, go: 90,
      dep: [['', 'Lodge Musanze', 'Bus Virunga Express vers Kigali (2 h).', ''], ['', 'Aéroport KGL', 'Taxi depuis Nyabugogo.', 't40']],
      days: [
        { t: 'Route des volcans', c: 15, s: [
          ['08:00', 'Gare routière de Nyabugogo', 'Bus Virunga Express / Volcano Express (≈ 2 h, ≈ 4 000 RWF).', 't15'],
          ['10:30', 'Musanze', 'Installation au lodge près de Kinigi.', 'b120'],
          ['14:00', 'Lacs jumeaux Burera & Ruhondo', 'Balade en pirogue avec vue sur les volcans.', 't40'],
          ['18:30', 'Dîner au lodge', 'Briefing gorilles, préparez gants et guêtres.', 't40']
        ] },
        { t: 'Gorilles des montagnes', c: 1300, gorilla: true, s: [
          ['06:30', 'Chauffeur privé', 'Indispensable pour rejoindre les départs de sentier (≈ 70 USD/jour).', ''],
          ['07:00', 'QG du parc des Volcans (Kinigi)', 'Café, danses, attribution d\'une famille de gorilles.', 't20'],
          ['08:30', 'Départ du sentier', 'Trajet en 4x4 vers le début de la piste.', 't30'],
          ['09:00', 'Trek en forêt de bambous', '1 à 4 h de marche selon la famille, pistes boueuses.', 'w90'],
          ['11:00', 'Une heure avec les gorilles', 'Exactement 60 minutes, à 7 m. Pas de flash.', 'w5'],
          ['14:00', 'Retour au QG – certificat', '', 'w90'],
          ['19:00', 'Lodge', 'Dîner et repos bien mérités.', 't20']
        ] },
        { t: 'Singes dorés ou tombe de Dian Fossey', c: 90, s: [
          ['07:00', 'QG Kinigi', 'Permis singes dorés (100 USD) ou randonnée Karisoke (75 USD).', 't20'],
          ['08:30', 'Bambouseraie de Sabyinyo', 'Une heure avec les singes dorés, très actifs.', 't30'],
          ['13:00', 'Musanze – Grottes de Musanze', 'Tunnels de lave (option).', 't30'],
          ['16:00', 'Coopérative artisanale', 'Sculptures, paniers, sac de café.', 't10']
        ] }
      ] },
    { city: 'Lac Kivu', code: 'KGL', min: 1, max: 3, prio: 2, go: 10,
      dep: [['', 'Rubavu', 'Bus vers Kigali (3 h 30).', ''], ['', 'Aéroport KGL', 'Taxi.', 't40']],
      days: [
        { t: 'Gisenyi sur le lac Kivu', c: 20, s: [
          ['09:00', 'Bus Musanze → Rubavu', 'Express (1 h 30).', ''],
          ['11:00', 'Plage publique de Rubavu', 'Le lac Kivu, sans hippopotames ni crocodiles.', 'b90'],
          ['13:00', 'Calafia Café', 'Terrasse sur le lac : sambaza frits et tilapia.', 'w15'],
          ['15:00', 'Promenade des pêcheurs', 'Chants des pêcheurs au départ des barques au coucher du soleil.', 'w20'],
          ['17:30', 'Brasserie Bralirwa (extérieur) & sources chaudes', '', 't15']
        ] }
      ] },
    { city: 'Nyungwe', code: 'KGL', min: 1, max: 2, prio: 3, go: 70,
      dep: [['', 'Nyungwe', 'Transfert vers Kigali (5 h).', ''], ['', 'Aéroport KGL', '', 'c300']],
      days: [
        { t: 'Passerelle de canopée', c: 60, s: [
          ['07:00', 'Transfert Rubavu → Nyungwe', 'Route Congo-Nile (≈ 5 h), chauffeur.', ''],
          ['13:00', 'Centre d\'Uwinka', 'Accueil du parc.', 'c300'],
          ['14:00', 'Canopy Walkway', 'Passerelle suspendue à 50 m au-dessus de la forêt (60 USD).', 'w30'],
          ['17:00', 'Plantation de thé de Gisakura', 'Vue sur les théiers.', 'c20']
        ] }
      ] }
  ],
  free: ['Parc de l\'Akagera (safari big five)', 'Randonnée sur le volcan Bisoke et son lac de cratère', 'Huye (Butare) et le musée ethnographique']
};

DEST.cl = {
  name: 'Chili', city: 'Santiago', region: 'Amériques', iso: '152', ll: [-70.65, -33.45], code: 'SCL',
  tag: 'Andes, ports colorés et ciels du désert',
  scene: { sky: ['#ffd0a0', '#ff8f6b', '#7b3f8c'], land: ['#5b2f55', '#2f1830'], kind: 'mountains' },
  flight: { base: 1050, overnight: true, stops: 1, air: 'Air France', route: 'NCE → CDG → SCL', dur: '≈ 17 h avec escale', alt: 'Iberia/LATAM via Madrid souvent moins cher.', season: 'sud' },
  hotel: { night: 78, area: 'Lastarria ou Bellavista', season: [1.2, 1.2, 1.05, 0.95, 0.85, 0.85, 0.95, 0.9, 1, 1, 1.1, 1.2] },
  food: 28, local: 5, shop: 60,
  money: 'Peso chilien (CLP) · 1 € ≈ 1 050 CLP', plug: 'Type C/L (prises françaises OK)', tz: '−5 h / −4 h selon saison', visa: 'Sans visa 90 jours.', lang: 'Espagnol · « Hola »',
  veg: [
    ["Caldillo de congrio","Soupe de congre chère à Pablo Neruda.","Poisson"],
    ["Ceviche chilien","Poisson cru mariné au citron, coriandre et oignon.","Poisson"],
    ["Empanada de queso ou de mariscos","Chausson au fromage ou aux fruits de mer.","Poisson"],
    ["Machas a la parmesana","Couteaux gratinés au parmesan.","Poisson"],
    ["Humitas","Pâte de maïs au basilic cuite dans la feuille.","Végétarien"],
    ["Pastel de choclo végétarien","Gratin de maïs, version sans viande à demander.","Végétarien"]
  ],
  vegTip: "Le pays est un long littoral : le poisson est excellent partout. Les autres goûteront le completo et l'asado.",
  arr: [
    ['', 'Aéroport de Santiago (SCL)', 'Bus Centropuerto/TurBus vers Los Héroes (≈ 2 500 CLP).', ''],
    ['', 'Métro jusqu\'à Universidad Católica', 'Ligne 1.', 'b40'],
    ['', 'Hôtel – Lastarria', 'Repos.', 'm10:Ligne 1'],
    ['17:00', 'Cerro Santa Lucía', 'Colline-jardin au cœur de la ville.', 'w5'],
    ['19:30', 'Bocanáriz (Lastarria)', 'Bar à vins chiliens : ceviche et machas a la parmesana.', 't15']
  ],
  stages: [
    { city: 'Santiago', code: 'SCL', min: 1, max: 5, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport SCL', 'Uber (35 min).', 't35']],
      days: [
        { t: 'Centre historique et Bellavista', c: 15, s: [
          ['09:30', 'Plaza de Armas', 'Cathédrale métropolitaine.', ''],
          ['10:30', 'Musée d\'art précolombien', 'Momies Chinchorro et textiles andins.', 'w3', ['10:30', 'Paseo Ahumada & galerías', 'Rues piétonnes et galeries commerçantes du centre.', 'w3']],
          ['12:00', 'La Moneda', 'Palais présidentiel, relève de la garde (jours pairs/impairs selon mois).', 'w8'],
          ['13:30', 'Mercado Central & La Vega', 'Le marché aux poissons : caldillo de congrio chez Donde Augusto.', 'w15'],
          ['15:30', 'Bellavista – boutiques de lapis-lazuli', 'Bijoux en lapis-lazuli, la pierre nationale chilienne.', 'w15'],
          ['17:00', 'Cerro San Cristóbal (funiculaire)', 'Vue sur les Andes au coucher du soleil.', 'w5'],
          ['20:00', 'Patio Bellavista', 'Dîner.', 'k5']
        ] },
        { t: 'Cajón del Maipo', c: 50, s: [
          ['07:30', 'Excursion Cajón del Maipo', 'Minibus vers la vallée andine.', ''],
          ['10:00', 'Embalse El Yeso', 'Lac turquoise à 2 500 m.', 'c150'],
          ['13:00', 'Pique-nique andin', 'Inclus.', 'w5'],
          ['16:00', 'Termas / San José de Maipo', '', 'c60'],
          ['19:00', 'Retour Santiago', '', 'c90']
        ] }
      ] },
    { city: 'Valparaíso', code: 'SCL', min: 1, max: 3, prio: 2, go: 15,
      dep: [['', 'Valparaíso', 'Bus vers l\'aéroport de Santiago (1 h 30).', ''], ['', 'Aéroport SCL', '', 'b90']],
      days: [
        { t: 'Collines et street-art', c: 12, s: [
          ['08:00', 'Terminal Alameda', 'Bus Turbus/Pullman vers Valparaíso (1 h 45).', 'm15'],
          ['10:00', 'Plaza Sotomayor', 'Port historique.', 'b105'],
          ['10:30', 'Ascensor Reina Victoria', 'Funiculaire de 1903.', 'w10'],
          ['11:00', 'Cerro Alegre & Concepción', 'Murs peints, escaliers colorés.', 'k2'],
          ['13:00', 'Café Vinilo', 'Déjeuner.', 'w5'],
          ['15:00', 'Feria de antigüedades (Av. Argentina)', 'Marché aux puces et antiquités le week-end, objets de marine.', 't10'],
          ['18:00', 'Viña del Mar', 'Plage et horloge fleurie (métro Merval).', 'tr20']
        ] }
      ] },
    { city: 'San Pedro de Atacama', code: 'CJC', min: 2, max: 5, prio: 2, go: 90,
      dep: [['', 'San Pedro', 'Navette Transvip vers Calama (1 h 30).', ''], ['', 'Aéroport de Calama', 'Vol vers Santiago puis correspondance.', 'c90']],
      days: [
        { t: 'Vallée de la Lune', c: 40, s: [
          ['', 'Vol Santiago → Calama', 'JetSmart/Sky (2 h), navette jusqu\'à San Pedro (1 h 30).', 'f120'],
          ['14:00', 'Calle Caracoles', 'Rue en adobe.', 'c90'],
          ['16:00', 'Valle de la Luna', 'Dunes, sel et coucher du soleil sur les Andes.', 'c20'],
          ['21:00', 'Tour astronomique', 'Le ciel le plus pur du monde.', 'c15']
        ] },
        { t: 'Geysers del Tatio', c: 70, s: [
          ['04:30', 'Départ excursion', 'Montée à 4 320 m (vêtements chauds).', ''],
          ['06:30', 'Geysers del Tatio', 'Fumerolles au lever du soleil.', 'c90'],
          ['09:00', 'Vado Putana & village de Machuca', 'Lamas, flamants, empanadas de queso de chèvre.', 'c30'],
          ['14:00', 'Laguna Cejar', 'Flotter dans l\'eau salée.', 'c90']
        ] },
        { t: 'Lagunes altiplaniques', c: 65, s: [
          ['07:00', 'Excursion Lagunas Altiplánicas', 'Miscanti et Miñiques à 4 200 m.', ''],
          ['10:00', 'Salar de Atacama – Laguna Chaxa', 'Flamants roses.', 'c90'],
          ['12:00', 'Lagunas Miscanti & Miñiques', '', 'c60'],
          ['16:00', 'Retour San Pedro', 'Souvenirs : alpaga, cuivre.', 'c90']
        ] }
      ] }
  ],
  free: ['Persa Bío Bío : le plus grand marché aux puces de Santiago (week-end)', 'Pueblito Los Dominicos : village d\'artisans', 'Vallée de Casablanca (vignobles)']
};

DEST.ma = {
  name: 'Maroc', city: 'Marrakech', region: 'Afrique', iso: '504', ll: [-7.99, 31.63], code: 'RAK',
  tag: 'Souks, riads et neiges de l\'Atlas',
  scene: { sky: ['#ffd8a8', '#f39a5a', '#c8553d'], land: ['#a2492f', '#6b2b1d'], kind: 'dunes' },
  flight: { base: 140, overnight: false, stops: 0, air: 'easyJet / Royal Air Maroc', route: 'NCE → RAK direct', dur: '≈ 2 h 45', alt: 'Vols directs plusieurs fois par semaine.', season: 'eu' },
  hotel: { night: 68, area: 'Riad dans la médina (Mouassine / Riad Zitoun)', season: [0.9, 0.95, 1.1, 1.2, 1.05, 0.9, 0.85, 0.85, 1, 1.15, 1, 1.15] },
  food: 18, local: 3, shop: 70,
  money: 'Dirham (MAD) · 1 € ≈ 10,8 MAD · espèces dans les souks', plug: 'Type C/E (comme en France)', tz: '−1 h (été) / même heure (hiver) ; change pendant le Ramadan', visa: 'Sans visa 90 jours.', lang: 'Darija / français · « Salam »',
  veg: [
    ["Sardines grillées au port d'Essaouira","Choisies sur l'étal, grillées devant toi.","Poisson"],
    ["Tajine de poisson","Chermoula, pommes de terre, poivrons et olives.","Poisson"],
    ["Pastilla aux fruits de mer","Feuilleté sucré-salé, version poisson.","Poisson"],
    ["Tajine de légumes","Courgettes, carottes, pruneaux et citron confit.","Végétarien"],
    ["Zaalouk et taktouka","Salades cuites d'aubergine et de poivron.","Végétarien"],
    ["Msemen et amlou","Crêpes feuilletées, pâte d'amande-argan-miel.","Végétarien"]
  ],
  vegTip: "Tanjia et méchoui pour les autres. Pour toi, attention : la harira et le couscous du vendredi sont souvent préparés avec un bouillon de viande.",
  arr: [
    ['', 'Aéroport Marrakech-Menara (RAK)', 'Bus 19 (30 MAD) ou transfert du riad.', ''],
    ['', 'Bab Agnaou / Jemaa el-Fna', 'Les voitures n\'entrent pas dans la médina.', 'b25:Bus 19'],
    ['', 'Riad', 'Thé à la menthe d\'accueil.', 'w10'],
    ['19:00', 'Jemaa el-Fna', 'Conteurs, musiciens gnaoua, jus d\'orange (4-5 MAD).', 'w10'],
    ['20:00', 'Terrasse des Épices', 'Dîner tajine de légumes.', 'w8']
  ],
  stages: [
    { city: 'Marrakech', code: 'RAK', min: 1, max: 6, prio: 1,
      dep: [['', 'Riad', 'Check-out.', ''], ['', 'Aéroport RAK', 'Taxi (20 min, ≈ 100 MAD).', 't20']],
      days: [
        { t: 'Médina et palais', c: 22, s: [
          ['09:00', 'Koutoubia', 'Le minaret repère de la ville.', ''],
          ['09:45', 'Tombeaux saadiens', 'Salle des douze colonnes.', 'w15'],
          ['11:00', 'Palais de la Bahia', 'Zelliges, stucs et jardins.', 'w15'],
          ['12:30', 'Café des Épices (Rahba Kedima)', 'Déjeuner sur le toit.', 'w15'],
          ['14:00', 'Médersa Ben Youssef', 'École coranique, chef-d\'œuvre mérinide.', 'w10'],
          ['15:30', 'Souks Semmarine & des teinturiers', 'Babouches, lanternes, tapis : négociez (≈ 50 % du prix).', 'w5'],
          ['17:30', 'Hammam Mouassine', 'Hammam traditionnel + gommage au savon noir.', 'w10'],
          ['20:00', 'Le Jardin', 'Dîner dans un riad-jardin.', 'w5']
        ] },
        { t: 'Majorelle et Gueliz', c: 25, s: [
          ['08:30', 'Jardin Majorelle', 'Bleu Majorelle, réserver en ligne (≈ 170 MAD).', 't15'],
          ['10:00', '33 rue Majorelle', 'Concept-store de créateurs marocains en face du jardin.', 'w2'],
          ['11:00', 'Marché aux puces de Bab El Khemis', 'Brocante géante : portes anciennes, lanternes, tapis, vaisselle.', 't15'],
          ['13:00', 'Amal Center', 'Restaurant associatif (formation de femmes) : couscous, tajines.', 't15'],
          ['16:00', 'Jardin Secret', 'Riad-jardin restauré dans la médina.', 't15'],
          ['18:00', 'Rooftop Nomad', 'Coucher du soleil sur la médina.', 'w8']
        ] },
        { t: 'Vallée de l\'Ourika / Imlil', c: 35, s: [
          ['08:30', 'Grand taxi vers Imlil', 'Atlas, 1 h 30.', ''],
          ['10:00', 'Imlil', 'Village berbère au pied du Toubkal.', 'c90'],
          ['10:30', 'Randonnée vers Aroumd', 'Sentier muletier (2 h aller-retour), vue sur les sommets.', 'w60'],
          ['13:00', 'Déjeuner chez l\'habitant', 'Tajine de légumes au feu de bois.', 'w60'],
          ['17:00', 'Retour Marrakech', '', 'c90']
        ] },
        { t: 'Désert d\'Agafay', c: 60, s: [
          ['15:00', 'Départ vers Agafay', 'Désert de pierre à 45 min.', ''],
          ['16:00', 'Balade à dromadaire', 'Coucher de soleil sur l\'Atlas.', 'c45'],
          ['19:30', 'Dîner sous tente', 'Musique et feu de camp.', 'w5'],
          ['22:00', 'Retour Marrakech', '', 'c45']
        ] }
      ] },
    { city: 'Essaouira', code: 'RAK', min: 1, max: 3, prio: 2, go: 15,
      dep: [['', 'Essaouira', 'Bus Supratours vers Marrakech (3 h).', ''], ['', 'Aéroport RAK', 'Taxi.', 't20']],
      days: [
        { t: 'La cité des alizés', c: 10, s: [
          ['07:30', 'Gare Supratours / CTM', 'Bus vers Essaouira (3 h, ≈ 90 MAD).', 't10'],
          ['11:00', 'Port d\'Essaouira', 'Barques bleues.', 'b180'],
          ['11:30', 'Skala de la Ville', 'Remparts et canons, décor de Game of Thrones.', 'w10'],
          ['13:00', 'Taros', 'Déjeuner en terrasse.', 'w5'],
          ['15:00', 'Atelier de thuya', 'Marqueterie, coffrets.', 'w5'],
          ['17:00', 'Plage', 'Kitesurf et coucher de soleil.', 'w10']
        ] }
      ] }
  ],
  free: ['Aït-Ben-Haddou et Ouarzazate (2 jours)', 'Cascades d\'Ouzoud', 'Cours de cuisine marocaine']
};

/* Destinations Europe du Nord / Est.
   Format d'une étape : [heure, lieu, description, trajet depuis l'étape précédente]
   Trajet : w=à pied, m=métro, b=bus, tr=train, t=taxi/VTC, f=avion, k=téléphérique/funiculaire, o=bateau, c=minibus/excursion  (+ minutes, + ":détail")
   c = coût activités par personne (€) pour la journée */
window.DEST = window.DEST || {};

DEST.pl = {
  name: 'Pologne', city: 'Varsovie', region: 'Europe', iso: '616', ll: [21.01, 52.23], code: 'WAW',
  tag: 'Vieille ville renaissante, halles et bazars',
  scene: { sky: ['#f4c27a', '#e98a5b', '#6d4a7a'], land: ['#4b3b5c', '#2f2440'], kind: 'spires' },
  flight: { base: 160, overnight: false, stops: 0, air: 'LOT Polish Airlines / Wizz Air', route: 'NCE → WAW direct', dur: '2 h 25', alt: 'Vols directs quotidiens LOT ; Wizz Air certains jours, souvent moins cher.', season: 'eu' },
  hotel: { night: 72, area: 'Śródmieście (Nowy Świat) ou vieille ville', season: [0.8, 0.8, 0.9, 1, 1.05, 1.15, 1.2, 1.2, 1.05, 0.95, 0.9, 1.1] },
  food: 26, local: 4, shop: 70,
  money: 'Złoty (PLN) · 1 € ≈ 4,25 PLN', plug: 'Type E (comme en France)', tz: 'Même heure qu\'à Nice', visa: 'Aucun visa (UE). Carte d\'identité suffit.', lang: 'Polonais · « Dzień dobry » = bonjour',
  veg: [
    ["Pierogi ruskie","Raviolis pomme de terre et fromage blanc, oignons dorés. Le classique sans viande.","Végétarien"],
    ["Pstrąg z grilla","Truite des Tatras grillée au beurre, servie avec pommes de terre à l'aneth.","Poisson"],
    ["Śledź w śmietanie","Hareng mariné à la crème et aux pommes, l'entrée polonaise par excellence.","Poisson"],
    ["Oscypek grillé","Fromage fumé de brebis des Tatras, avec confiture d'airelles.","Végétarien"],
    ["Placki ziemniaczane","Galettes de pommes de terre, crème aigre ou sauce aux champignons.","Végétarien"],
    ["Zapiekanka","Demi-baguette gratinée aux champignons, en-cas de rue des halles.","Végétarien"]
  ],
  vegTip: "Tes amis goûteront bigos et żurek ; pour toi, pierogi ruskie, truite ou hareng. Attention : le żurek et le barszcz sont souvent préparés avec un bouillon de viande.",
  arr: [
    ['', 'Aéroport Chopin (WAW)', 'Suivez « Trains ». Billet ZTM 75 minutes aux bornes (4,40 PLN).', ''],
    ['', 'Gare Warszawa Śródmieście', 'Train S2 ou S3 direct depuis l\'aéroport.', 'tr25:S2 / S3'],
    ['', 'Hôtel – Śródmieście', 'Dépôt des bagages.', 'w10'],
    ['19:00', 'Rynek Starego Miasta', 'La place du Marché reconstruite à l\'identique après 1945, et sa sirène.', 't10'],
    ['20:00', 'Zapiecek (rue Freta)', 'Pierogi maison dans un décor de vieille auberge.', 'w5']
  ],
  stages: [
    { city: 'Varsovie', code: 'WAW', min: 1, max: 8, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Gare Warszawa Śródmieście', 'Train S2 ou S3 vers l\'aéroport (billet ZTM 4,40 PLN).', 'w10'], ['', 'Aéroport Chopin (WAW)', 'Arrivée 2 h avant le vol.', 'tr25:S2 / S3']],
      days: [
        { t: 'Vieille ville, voie royale et halles', c: 5, s: [
          ['09:00', 'Plac Zamkowy', 'Place du Château et colonne de Sigismond.', 't10'],
          ['09:20', 'Rynek Starego Miasta', 'Façades peintes, puits, statue de la sirène de Varsovie.', 'w5'],
          ['10:00', 'Barbacane et remparts', 'Fortification rouge du XVIe siècle.', 'w5'],
          ['10:20', 'Rue Freta (Nouvelle Ville)', 'Maison natale de Marie Curie au n° 16, boutiques d\'ambre.', 'w5'],
          ['11:00', 'Krakowskie Przedmieście', 'La voie royale : université, église Sainte-Croix où repose le cœur de Chopin.', 'w15'],
          ['12:30', 'Bar Mleczny Familijny (Nowy Świat 39)', 'Un « bar à lait » de l\'époque communiste : pierogi, soupes, crêpes pour 25 à 35 PLN.', 'w10'],
          ['14:00', 'Pijalnia Czekolady E. Wedel (ul. Szpitalna 8)', 'Chocolat chaud Wedel depuis 1851 ; tablettes et boîtes en métal à rapporter.', 'w8'],
          ['15:00', 'Hala Mirowska', 'Halles de 1901 : fruits, fromages oscypek, cornichons, miel, fleurs.', 't10'],
          ['16:00', 'Hala Gwardii', 'Halle voisine : street-food polonais et brocanteurs.', 'w2'],
          ['19:30', 'Restauracja Polka (ul. Świętojańska 2)', 'Cuisine polonaise dans la vieille ville : hareng, truite, pierogi ; canard et żurek pour les autres.', 't10']
        ] },
        { t: 'Puces de Koło et shopping polonais', c: 0, s: [
          ['08:30', 'Bazar Na Kole (ul. Obozowa)', 'Le grand marché aux puces d\'antiquités : objets de l\'ère soviétique, vaisselle, médailles, affiches. Samedi et dimanche matin uniquement ; en semaine, voir les halles.', 't20'],
          ['11:30', 'Hala Koszyki', 'Ancienne halle restaurée : épiceries fines, vodkas polonaises, cafés.', 't20'],
          ['13:00', 'Déjeuner à Hala Koszyki', 'Comptoirs polonais : placki, zapiekanka, poisson fumé.', 'w2'],
          ['14:30', 'Rue Mokotowska', 'Boutiques de créateurs polonais : mode, bijoux, céramique.', 'w10'],
          ['16:00', 'Cepelia (ul. Marszałkowska)', 'Artisanat populaire : découpages wycinanki, broderies, poupées, céramique de Bolesławiec.', 'w15'],
          ['17:00', 'Złote Tarasy', 'Centre commercial sous verre : marques polonaises Reserved, Mohito, House, Wittchen (maroquinerie), Inglot (maquillage).', 'w10'],
          ['19:30', 'U Fukiera (Rynek Starego Miasta 27)', 'Maison historique sur la place du Marché : truite, pierogi ; gibier pour les autres.', 't10']
        ] },
        { t: 'Praga, le Varsovie brut', c: 15, s: [
          ['10:00', 'Bazar Różyckiego (ul. Targowa)', 'Le plus vieux bazar de la ville (1864) : vêtements, bric-à-brac, snacks.', 't15'],
          ['11:00', 'Rue Ząbkowska', 'Immeubles d\'avant-guerre, cours avec petits autels, street-art.', 'w5'],
          ['11:45', 'Musée de la vodka polonaise (Koneser)', 'Dans une distillerie de briques rouges, dégustation à la fin.', 'w5', ['11:45', 'Place Koneser', 'Ancienne distillerie de briques rouges devenue quartier de boutiques et cafés.', 'w5']],
          ['13:00', 'Warszawa Wschodnia (Soho Factory)', 'Bistrot polonais dans une usine reconvertie, ouvert tard.', 't10'],
          ['14:30', 'Neon Muzeum (Soho Factory)', 'Les enseignes lumineuses de la Pologne communiste.', 'w2', ['14:30', 'Ateliers de Soho Factory', 'Ateliers d\'artistes et concept-stores dans d\'anciennes usines.', 'w2']],
          ['16:30', 'Palais de la Culture et de la Science', 'Terrasse panoramique du 30e étage, à 114 m (≈ 40 PLN).', 't15'],
          ['19:30', 'Gościniec Polskie Pierogi (Krakowskie Przedmieście)', 'Pierogi en tout genre : au fromage, aux champignons, au saumon.', 't10']
        ] },
        { t: 'Łazienki, Wilanów et la Vistule', c: 15, s: [
          ['09:30', 'Parc Łazienki – Palais sur l\'Isle', 'Paons, écureuils, monument Chopin (concerts gratuits le dimanche de mai à septembre).', 'b15:Bus 116'],
          ['12:00', 'Palais de Wilanów (jardins)', 'Le « Versailles polonais » et ses jardins baroques.', 'b30:Bus 116'],
          ['13:30', 'Kuźnia Kulturalna (Wilanów)', 'Déjeuner polonais près du palais.', 'w5'],
          ['16:00', 'Jardin sur le toit de la bibliothèque universitaire (BUW)', 'Jardin gratuit sur le toit, vue sur la Vistule.', 'b40'],
          ['17:00', 'Boulevards de la Vistule', 'Promenade au bord du fleuve, plages urbaines en été.', 'w10'],
          ['19:30', 'Dawne Smaki (Nowy Świat 49)', 'Cuisine polonaise traditionnelle : hareng à la crème, pierogi, truite.', 't10']
        ] }
      ] }
  ],
  free: ['Żelazowa Wola, maison natale de Chopin (1 h de route)', 'Łódź en train (1 h 15) : rue Piotrkowska et halles de Manufaktura', 'Marché aux puces de Koło le week-end']
};

DEST.no = {
  name: 'Norvège', city: 'Tromsø', region: 'Europe', iso: '578', ll: [18.96, 69.65], code: 'TOS',
  tag: 'Fjords arctiques et ciel qui ondule',
  scene: { sky: ['#06142e', '#0b3a5c', '#1c6b6b'], land: ['#e7eef5', '#9fb3c8'], kind: 'aurora' },
  flight: { base: 330, overnight: false, stops: 1, air: 'Norwegian / SAS', route: 'NCE → OSL → TOS', dur: '≈ 7 h avec escale', alt: 'Retour possible depuis Oslo si vous finissez par la capitale.', season: 'nord' },
  hotel: { night: 145, area: 'Centre de Tromsø (Storgata)', season: [1.3, 1.35, 1.25, 1, 0.9, 1, 1.1, 1.05, 0.95, 1.05, 1.15, 1.3] },
  food: 55, local: 8, shop: 80,
  money: 'Couronne norvégienne (NOK) · 1 € ≈ 11,7 NOK · carte bancaire partout', plug: 'Type F (comme en France)', tz: 'Même heure qu\'à Nice', visa: 'Espace Schengen : carte d\'identité suffit.', lang: 'Norvégien · « Hei » = bonjour',
  veg: [
    ["Fiskesuppe","Soupe crémeuse aux poissons du Nord, LE plat de Tromsø.","Poisson"],
    ["Skrei","Cabillaud arctique, de janvier à avril, poêlé au beurre.","Poisson"],
    ["Saumon et truite fumés","Sur pain de seigle avec œufs brouillés au petit-déjeuner.","Poisson"],
    ["Bacalao","Morue salée mijotée tomate-poivron, plat de pêcheurs.","Poisson"],
    ["Brunost sur gaufre","Fromage brun caramélisé sur gaufres en cœur.","Végétarien"],
    ["Skillingsbolle","Grosse brioche à la cannelle des cafés norvégiens.","Végétarien"]
  ],
  vegTip: "Le groupe pourra goûter renne et agneau. Attention au « hvalbiff » : c'est de la baleine, pas du poisson.",
  arr: [
    ['', 'Aéroport de Tromsø (TOS)', 'Flybussen devant le terminal (≈ 15 min, ≈ 120 NOK).', ''],
    ['', 'Arrêt Prostneset / centre', 'Descente au port.', 'b15:Flybussen'],
    ['', 'Hôtel', 'Dépôt des bagages.', 'w5'],
    ['19:00', 'Storgata', 'Rue principale, vitrines et lumières.', 'w3'],
    ['19:30', 'Bardus Bistro', 'Bistrot local : poisson arctique du jour, fiskesuppe.', 'w5']
  ],
  stages: [
    { city: 'Tromsø', code: 'TOS', min: 2, max: 7, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Arrêt Flybussen centre', 'Bus aéroport.', 'w5'], ['', 'Aéroport TOS', 'Arrivée 2 h avant.', 'b15:Flybussen']],
      days: [
        { t: 'Chasse aux aurores boréales', c: 150, aurora: true, s: [
          ['10:00', 'Cathédrale arctique', 'Traversée du pont de Tromsø (1 km, vue sur le détroit).', ''],
          ['11:30', 'Fjellheisen (téléphérique)', 'Montée au mont Storsteinen, 421 m, vue sur toute l\'île.', 'w15'],
          ['13:30', 'Retour centre – Smørtorget', 'Déjeuner gaufres brunost et soupe du jour.', 'b15:Bus 26'],
          ['15:00', 'Stortorget & Storgata', 'Marché du port et boutiques de laine (Dale of Norway) ; petite sieste ensuite, la nuit sera longue.', 'w5'],
          ['18:30', 'Point de RDV de l\'excursion', 'Minibus « aurora chase » vers la Finlande ou les fjords selon la météo (6-8 h, vêtements thermiques fournis).', 'w5'],
          ['21:00', 'Site d\'observation', 'Feu de camp, chocolat chaud, photos des aurores.', 'c90'],
          ['01:30', 'Retour à l\'hôtel', 'Dépose en centre-ville.', 'c90']
        ] },
        { t: 'Marché du port et boutiques du Nord', c: 25, s: [
          ['10:00', 'Stortorget – marché du port', 'Petit marché : peaux de renne, artisanat sámi, morue séchée (tørrfisk).', ''],
          ['10:45', 'Husfliden Tromsø', 'Artisanat norvégien : pulls tricotés, couteaux, étains, bonnets.', 'w5'],
          ['11:30', 'Polaria', 'Aquarium arctique en forme de blocs de glace basculés, phoques barbus.', 'w12', ['11:30', 'Boutiques de Storgata', 'Dale of Norway et Devold (laine), Norrøna (outdoor norvégien).', 'w5']],
          ['13:00', 'Fiskekompaniet (quai)', 'Déjeuner fiskesuppe face au port.', 'w10'],
          ['14:30', 'Mack Ølhallen', 'La brasserie la plus au nord du monde : boutique et dégustation.', 'w8'],
          ['15:30', 'Épicerie Mydland / Rema 1000', 'Brunost, poisson fumé, chocolat Freia et Kvikk Lunsj à rapporter.', 'w5'],
          ['16:30', 'Prestvannet', 'Lac sur les hauteurs, rennes parfois.', 'b10:Bus 24'],
          ['19:00', 'Emma\'s Drømmekjøkken', 'Cuisine du Nord : skrei ou omble pour toi, renne pour les autres.', 'b10']
        ] },
        { t: 'Rennes et culture sámi', c: 140, s: [
          ['09:00', 'Point de RDV excursion', 'Bus vers un camp sámi (≈ 30 min).', ''],
          ['10:00', 'Camp sámi', 'Nourrir les rennes, traîneau, joik et récit dans la lavvu (tente).', 'c30'],
          ['14:00', 'Retour en ville', 'Dépose centre.', 'c30'],
          ['15:30', 'Boutiques Storgata', 'Pulls Dale of Norway, bonnets, cartes postales.', 'w5'],
          ['19:30', 'Skarven (Strandtorget)', 'Brasserie de poisson sur le port : fiskesuppe, bacalao, crevettes.', 'w10']
        ] },
        { t: 'Fjords de Kvaløya', c: 95, s: [
          ['09:00', 'Location / excursion fjords', 'Tour en minibus de Kvaløya et Sommarøy (6 h).', ''],
          ['10:30', 'Ersfjordbotn', 'Fjord encadré de pics, plage de sable.', 'c40'],
          ['12:30', 'Sommarøy', 'Île aux maisons sur pilotis, eaux turquoise.', 'c50'],
          ['15:30', 'Retour Tromsø', 'Dépose centre.', 'c60'],
          ['16:30', 'Pust (sauna flottant)', 'Sauna sur le port + saut dans l\'eau arctique.', 'w5']
        ] }
      ] },
    { city: 'Oslo', code: 'OSL', min: 1, max: 4, prio: 3, go: 85,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Oslo S (gare centrale)', 'Flytoget, train express aéroport.', 'w8'], ['', 'Aéroport OSL', 'Arrivée 2 h avant.', 'tr20:Flytoget']],
      days: [
        { t: 'Opéra, fjord et Munch', c: 25, s: [
          ['', 'Vol Tromsø → Oslo', 'Norwegian/SAS (1 h 50). Flytoget jusqu\'à Oslo S.', 'f110'],
          ['13:00', 'Opéra d\'Oslo', 'Marchez sur le toit en marbre qui plonge dans le fjord.', 'w5'],
          ['14:00', 'MUNCH', 'Le Cri et 20 étages de vue sur le fjord.', 'w5', ['14:00', 'Bjørvika – Barcode', 'Quartier d\'architecture et boutiques le long du fjord.', 'w5']],
          ['16:30', 'Aker Brygge & Tjuvholmen', 'Quais, architecture, coucher de soleil.', 'w25'],
          ['19:00', 'Mathallen', 'Halle gourmande de Vulkan : comptoirs de fruits de mer et de charcuterie.', 't10']
        ] },
        { t: 'Vigeland, puces et Grünerløkka', c: 15, s: [
          ['09:30', 'Parc Vigeland', '200 sculptures de Gustav Vigeland, gratuit.', 'm10:T-bane'],
          ['11:00', 'Vestkanttorget', 'Marché aux puces du samedi : vaisselle, pulls, vinyles, objets vintage.', 'w15'],
          ['12:30', 'Musée Fram (Bygdøy)', 'Le vrai bateau polaire d\'Amundsen, à visiter de l\'intérieur.', 'b20:Bus 30', ['12:30', 'Aker Brygge', 'Quais, boutiques et kiosques de crevettes.', 'b15']],
          ['15:30', 'Grünerløkka', 'Friperies Fretex, créateurs norvégiens, Markveien.', 'b30'],
          ['17:00', 'Mathallen', 'Halle gourmande : brunost, poisson fumé, aquavit à rapporter.', 'w8'],
          ['19:30', 'Schrøder Restaurant', 'Brasserie norvégienne d\'habitués : morue, saumon, boulettes pour les autres.', 'w10']
        ] }
      ] }
  ],
  free: ['Randonnée sur Tromsdalstinden (été) ou raquettes (hiver)', 'Croisière baleines (novembre–janvier)', 'Bibliothèque de Tromsø et cafés du port']
};

DEST.fi = {
  name: 'Finlande', city: 'Rovaniemi', region: 'Europe', iso: '246', ll: [25.73, 66.5], code: 'RVN',
  tag: 'Laponie, saunas et lumières du nord',
  scene: { sky: ['#0a1631', '#173c63', '#2a7a6f'], land: ['#e9f0f6', '#a9bfd3'], kind: 'aurora' },
  flight: { base: 320, overnight: false, stops: 1, air: 'Finnair', route: 'NCE → HEL → RVN', dur: '≈ 6 h 30 avec escale', alt: 'Ou train de nuit Helsinki → Rovaniemi (≈ 12 h, cabine ≈ 90 €).', season: 'nord' },
  hotel: { night: 125, area: 'Centre de Rovaniemi (Koskikatu)', season: [1.45, 1.35, 1.25, 1, 0.8, 0.85, 0.95, 0.95, 0.95, 1, 1.3, 1.6] },
  food: 48, local: 7, shop: 70,
  money: 'Euro', plug: 'Type F (comme en France)', tz: '+1 h par rapport à Nice', visa: 'UE : carte d\'identité suffit.', lang: 'Finnois · « Moi » = salut',
  veg: [
    ["Lohikeitto","Soupe de saumon à la crème et à l'aneth, réconfortante après le froid.","Poisson"],
    ["Muikku frits","Petits poissons de lac croustillants, servis avec mayonnaise à l'ail.","Poisson"],
    ["Graavilohi","Saumon gravlax maison, sur pain noir.","Poisson"],
    ["Karjalanpiirakka","Tourte carélienne au riz, beurre aux œufs.","Végétarien"],
    ["Leipäjuusto","Fromage « qui couine » passé au four, confiture de plaquebières.","Végétarien"],
    ["Korvapuusti","Roulé cannelle-cardamome avec un café.","Végétarien"]
  ],
  vegTip: "En Laponie, le sauté de renne (poronkäristys) est partout pour les autres ; il y a toujours un saumon ou un omble arctique à la carte.",
  arr: [
    ['', 'Aéroport de Rovaniemi (RVN)', 'Navette Airport Bus calée sur les vols (≈ 15 min, ≈ 8 €).', ''],
    ['', 'Hôtel – centre', 'Dépôt des bagages.', 'b15:Airport Bus'],
    ['19:00', 'Pont Jätkänkynttilä', 'Pont illuminé sur la Kemijoki.', 'w10'],
    ['19:45', 'Nili', 'Cuisine laponne au feu de bois : saumon et omble arctique pour toi, renne pour les autres.', 'w10']
  ],
  stages: [
    { city: 'Rovaniemi', code: 'RVN', min: 2, max: 7, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Arrêt Airport Bus', 'Navette.', 'w5'], ['', 'Aéroport RVN', 'Arrivée 1 h 30 avant.', 'b15']],
      days: [
        { t: 'Arktikum et nuit des aurores', c: 135, aurora: true, s: [
          ['10:00', 'Arktikum', 'Musée de l\'Arctique sous un tunnel de verre de 172 m pointé vers le nord.', 'w15', ['10:00', 'Boutiques du centre (Koskikatu)', 'Marimekko, Kalevala Koru (bijoux), artisanat lapon et couteaux puukko.', 'w10']],
          ['13:00', 'Café Kauppayhtiö', 'Café rétro, soupe et sandwichs végé.', 'w15'],
          ['14:30', 'Ounasvaara', 'Colline boisée : marche en forêt (raquettes en hiver).', 'b10:Bus 5'],
          ['17:00', 'Hôtel', 'Repos et couches thermiques.', 'b10'],
          ['20:00', 'RDV excursion aurores', 'Minibus vers un lac loin des lumières, feu de camp (3-4 h).', 'w5'],
          ['21:00', 'Lac gelé', 'Observation et photos des aurores boréales.', 'c30'],
          ['00:00', 'Retour hôtel', '', 'c30']
        ] },
        { t: 'Village du Père Noël et huskies', c: 120, s: [
          ['09:30', 'Bus 8 (Santa\'s Express)', 'Depuis le centre.', ''],
          ['10:00', 'Village du Père Noël – Cercle polaire', 'Franchir la ligne du cercle polaire, poste du Père Noël.', 'b20:Bus 8'],
          ['12:00', 'Ferme de huskies (voisine)', 'Balade en traîneau 5 km.', 'c10'],
          ['14:30', 'Retour en ville', '', 'b20:Bus 8'],
          ['15:30', 'Lordi\'s Square & boutiques', 'Couteaux puukko, laine, bougies, Marimekko.', 'w5'],
          ['19:00', 'Roka Kitchen', 'Petites assiettes nordiques.', 'w5']
        ] },
        { t: 'Sauna et rivière', c: 30, s: [
          ['10:00', 'Marché de Rovaniemi (Lordi\'s Square)', 'Stands d\'artisanat lapon, baies, fromage leipäjuusto, fourrures.', ''],
          ['12:00', 'Berges de la Kemijoki', 'Promenade le long de la rivière (gelée en hiver).', 'w5'],
          ['13:00', 'Mariza', 'Cantine finlandaise, buffet légumes à petit prix.', 'w10'],
          ['16:00', 'Sauna public / Arctic Bath (si budget)', 'Sauna traditionnel + bain froid.', 't10'],
          ['19:30', 'Monte Rosa', 'Dîner en ville.', 't10']
        ] }
      ] },
    { city: 'Helsinki', code: 'HEL', min: 1, max: 4, prio: 3, go: 70,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Gare centrale', 'Train I/P vers l\'aéroport.', 'w8'], ['', 'Aéroport HEL', 'Arrivée 2 h avant.', 'tr30:Train I/P']],
      days: [
        { t: 'Helsinki à pied', c: 12, s: [
          ['', 'Vol Rovaniemi → Helsinki', 'Finnair (1 h 20), puis train I/P jusqu\'à la gare centrale.', 'f80'],
          ['12:30', 'Place du Sénat & cathédrale', 'Le cœur blanc et vert de la ville.', 'w10'],
          ['13:30', 'Halle du vieux marché (Vanha kauppahalli)', 'Déjeuner : soupes et karjalanpiirakka.', 'w8'],
          ['15:00', 'Église Temppeliaukio', 'Église creusée dans le rocher.', 't10'],
          ['16:30', 'Bibliothèque Oodi', 'Architecture spectaculaire, terrasse gratuite.', 'w15'],
          ['19:00', 'Savotta (place du Sénat)', 'Cuisine finlandaise traditionnelle : lohikeitto, muikku.', 'w15']
        ] },
        { t: 'Suomenlinna et sauna Löyly', c: 35, s: [
          ['09:30', 'Place du marché (Kauppatori)', 'Ferry HSL depuis l\'embarcadère.', 'w10'],
          ['10:00', 'Forteresse de Suomenlinna', 'Île-forteresse UNESCO, à parcourir à pied.', 'o15'],
          ['14:00', 'Kauppatori – tentes du marché', 'Soupe de saumon et muikku frits au bord de l\'eau, puis Design District (Iittala, Artek).', 'o15'],
          ['16:00', 'Marché aux puces de Hietalahti', 'Puces en plein air (mai–septembre) et halle gourmande toute l\'année.', 'w15'],
          ['17:30', 'Löyly', 'Sauna public design au bord de la mer.', 'w15'],
          ['19:30', 'Kallio', 'Quartier populaire, dîner dans un bistrot.', 't15']
        ] }
      ] }
  ],
  free: ['Randonnée dans le parc national de Pyhä-Luosto (excursion)', 'Ranua Wildlife Park (ours polaires)', 'Tallinn en ferry depuis Helsinki (2 h)']
};

DEST.dk = {
  name: 'Danemark', city: 'Copenhague', region: 'Europe', iso: '208', ll: [12.57, 55.68], code: 'CPH',
  tag: 'Vélos, canaux et façades pastel',
  scene: { sky: ['#bfe1f2', '#7fb6d8', '#4b7ea8'], land: ['#2c4a6a', '#1b3049'], kind: 'harbor' },
  flight: { base: 140, overnight: false, stops: 0, air: 'Norwegian / SAS', route: 'NCE → CPH direct', dur: '2 h 15', alt: 'Plusieurs vols directs par semaine toute l\'année.', season: 'eu' },
  hotel: { night: 150, area: 'Vesterbro ou Indre By', season: [0.8, 0.8, 0.9, 1, 1.1, 1.25, 1.35, 1.3, 1.1, 0.95, 0.9, 1.05] },
  food: 52, local: 7, shop: 80,
  money: 'Couronne danoise (DKK) · 1 € ≈ 7,46 DKK · paiement sans contact partout', plug: 'Type F/K (prises françaises OK)', tz: 'Même heure qu\'à Nice', visa: 'UE : carte d\'identité suffit.', lang: 'Danois · « Hej » = salut',
  veg: [
    ["Smørrebrød au hareng","Tartine de seigle au hareng mariné (sild), oignon rouge et câpres.","Poisson"],
    ["Stjerneskud","« Étoile filante » : filets de plie frits et vapeur, crevettes, sauce rémoulade.","Poisson"],
    ["Fiskefrikadeller","Boulettes de poisson, sauce rémoulade et pommes de terre.","Poisson"],
    ["Smørrebrød pomme de terre","Pommes de terre nouvelles, mayonnaise et ciboulette croustillante.","Végétarien"],
    ["Wienerbrød","La viennoiserie danoise du matin.","Végétarien"],
    ["Flødeboller","Têtes au chocolat et guimauve.","Végétarien"]
  ],
  vegTip: "Dans les restos de smørrebrød, les autres prendront frikadeller ou rôti de porc ; pour toi la moitié de la carte est au poisson.",
  arr: [
    ['', 'Aéroport de Copenhague (CPH)', 'Métro M2 au terminal 3 (≈ 4,50 €).', ''],
    ['', 'Kongens Nytorv', 'Sortie métro.', 'm15:M2'],
    ['', 'Hôtel', 'Dépôt des bagages.', 'w10'],
    ['19:00', 'Nyhavn', 'Canal aux façades colorées.', 'w5'],
    ['20:00', 'Nyhavns Færgekro', 'Maison de 1765 sur le canal : buffet de harengs, smørrebrød ; frikadeller pour les autres.', 'w5']
  ],
  stages: [
    { city: 'Copenhague', code: 'CPH', min: 1, max: 8, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Métro M2', 'Direction Lufthavnen.', 'w8'], ['', 'Aéroport CPH', 'Arrivée 2 h avant.', 'm15:M2']],
      days: [
        { t: 'Le Copenhague royal', c: 25, s: [
          ['09:00', 'Torvehallerne', 'Halles gourmandes : smørrebrød, poissonnier, café.', 'm5'],
          ['10:00', 'Jardins du roi (Kongens Have)', 'Le plus vieux parc royal, devant le château de Rosenborg.', 'w5'],
          ['12:00', 'Amalienborg', 'Relève de la garde à 12:00.', 'w15'],
          ['12:30', 'La Petite Sirène', 'Le long du quai Langelinie.', 'w15'],
          ['14:00', 'Kastellet', 'Citadelle en étoile, remparts verts.', 'w5'],
          ['16:00', 'Strøget', 'Rue piétonne : shopping, Illums Bolighus.', 'w20'],
          ['17:00', 'Tour Ronde (Rundetaarn)', 'Rampe en colimaçon, vue sur les toits.', 'w5'],
          ['19:00', 'Restaurant Puk (Vandkunsten)', 'Bistrot danois de 1750 : stjerneskud et smørrebrød au hareng pour toi.', 'w10']
        ] },
        { t: 'Puces et design danois', c: 0, s: [
          ['09:00', 'Marché aux puces d\'Israels Plads', 'Le samedi d\'avril à novembre : porcelaine Royal Copenhagen, vinyles, lampes vintage.', ''],
          ['11:00', 'Torvehallerne', 'Halles gourmandes : smørrebrød, réglisse Lakrids by Bülow à rapporter.', 'w3'],
          ['12:30', 'Søstrene Grene & Flying Tiger (Strøget)', 'Les enseignes danoises de déco et d\'objets à petits prix.', 'w12'],
          ['14:00', 'Illums Bolighus', 'Le grand magasin du design danois : Hay, Georg Jensen, Royal Copenhagen.', 'w5'],
          ['15:30', 'Magasin du Nord (Kongens Nytorv)', 'Grand magasin historique : mode danoise (Ganni, Samsøe Samsøe), épicerie fine au sous-sol.', 'w5'],
          ['17:00', 'Ravnsborggade (Nørrebro)', 'La rue des antiquaires et des brocantes.', 'b15'],
          ['19:30', 'Kødbyens Fiskebar', 'Bar à poissons dans l\'ancien quartier des abattoirs ; quelques plats de viande pour les autres.', 'b15']
        ] },
        { t: 'Christiania et canaux', c: 20, s: [
          ['10:00', 'Visite en bateau des canaux', 'Départ de Nyhavn (1 h).', ''],
          ['11:30', 'Christianshavn', 'Quartier des canaux.', 'w10'],
          ['12:00', 'Église du Sauveur', 'Escalier extérieur en spirale jusqu\'au sommet.', 'w5'],
          ['13:00', 'Christiania', 'Ville libre, ateliers et jardins (photos interdites sur Pusher Street).', 'w5'],
          ['15:00', 'Copenhill', 'Usine à déchets avec piste de ski et sentier sur le toit.', 'w25'],
          ['19:00', 'Reffen', 'Street-food sur l\'eau (avril–septembre).', 'b15']
        ] },
        { t: 'Vesterbro et Tivoli', c: 30, s: [
          ['10:00', 'Superkilen', 'Parc urbain multiculturel de Nørrebro.', 'b15'],
          ['11:30', 'Cimetière Assistens', 'Tombes d\'Andersen et Kierkegaard, lieu de pique-nique local.', 'w10'],
          ['13:00', 'Kødbyen', 'Ancien quartier des abattoirs devenu food-hub.', 'b15'],
          ['15:00', 'Værnedamsvej & Istedgade', 'Rue des épiceries fines, fromagers et boutiques de créateurs danois.', 'w10'],
          ['17:30', 'Jardins de Tivoli', 'Parc d\'attractions historique (fermé hors saison, sauf Halloween et Noël).', 'w5']
        ] },
        { t: 'Kronborg et la Riviera danoise', c: 20, s: [
          ['09:30', 'København H', 'Train Øresundstog vers Helsingør.', 'w10'],
          ['10:30', 'Rue Stengade (Helsingør)', 'Vieille ville marchande aux maisons colorées, boutiques et brocantes.', 'tr50'],
          ['12:00', 'Halvandet / port d\'Helsingør', 'Déjeuner smørrebrød et fish & chips face à la Suède.', 'w10'],
          ['13:30', 'Château de Kronborg', 'Le château d\'Hamlet, casemates souterraines.', 'w10'],
          ['16:30', 'Retour Copenhague', '', 'tr50']
        ] }
      ] }
  ],
  free: ['Malmö en train par le pont de l\'Øresund (35 min)', 'Roskilde : cathédrale et musée des Vikings', 'Dragør, village de pêcheurs aux toits de chaume (bus 350S)']
};

DEST.ee = {
  name: 'Estonie', city: 'Tallinn', region: 'Europe', iso: '233', ll: [24.75, 59.44], code: 'TLL',
  tag: 'Remparts médiévaux et forêts de tourbières',
  scene: { sky: ['#cfe3f0', '#8ab2cf', '#3f6d91'], land: ['#26445c', '#162b3b'], kind: 'spires' },
  flight: { base: 210, overnight: false, stops: 1, air: 'airBaltic', route: 'NCE → RIG → TLL', dur: '≈ 5 h avec escale', alt: 'Alternative : Finnair via Helsinki.', season: 'eu' },
  hotel: { night: 85, area: 'Vanalinn (vieille ville) ou Kalamaja', season: [0.8, 0.8, 0.85, 0.95, 1.05, 1.25, 1.35, 1.3, 1.05, 0.9, 0.85, 1.1] },
  food: 32, local: 4, shop: 55,
  money: 'Euro', plug: 'Type F (comme en France)', tz: '+1 h par rapport à Nice', visa: 'UE : carte d\'identité suffit.', lang: 'Estonien · « Tere » = bonjour',
  veg: [
    ["Kiluvõileib","Tartine de pain noir aux sprats marinés et œuf : l'en-cas national.","Poisson"],
    ["Räim","Harengs de la Baltique poêlés, purée et cornichons.","Poisson"],
    ["Mulgipuder sans lardons","Purée orge et pomme de terre, à demander sans lard.","Végétarien"],
    ["Kama","Céréales grillées mélangées au kéfir, avec baies.","Végétarien"],
    ["Leib","Pain noir de seigle, servi à chaque repas.","Végétarien"],
    ["Kohuke","Barre de fromage blanc enrobée de chocolat.","Végétarien"]
  ],
  vegTip: "Les autres trouveront boudin et porc rôti ; les poissons de la Baltique (sprat, hareng, sandre) sont partout pour toi.",
  arr: [
    ['', 'Aéroport de Tallinn (TLL)', 'Tram 4 devant le terminal (2 €, ou carte bancaire au valideur).', ''],
    ['', 'Arrêt Hobujaama', 'Porte de la vieille ville.', 'm20:Tram 4'],
    ['', 'Hôtel', 'Dépôt des bagages.', 'w5'],
    ['19:00', 'Raekoja plats', 'Place de l\'Hôtel de ville gothique.', 'w5'],
    ['19:30', 'Olde Hansa', 'Banquet médiéval aux chandelles : poisson fumé et soupe d\'orge pour toi.', 'w2']
  ],
  stages: [
    { city: 'Tallinn', code: 'TLL', min: 1, max: 7, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Arrêt Hobujaama', 'Tram 4 direction Lennujaam.', 'w5'], ['', 'Aéroport TLL', 'Arrivée 2 h avant.', 'm20:Tram 4']],
      days: [
        { t: 'Ville basse et Toompea', c: 15, s: [
          ['09:30', 'Porte Viru', 'Entrée par les tours médiévales.', ''],
          ['10:00', 'Raekoja plats & pharmacie de 1422', 'Une des plus vieilles pharmacies d\'Europe.', 'w5'],
          ['11:00', 'Église Sainte-Catherine & passage Katariina', 'Ruelle des artisans verriers.', 'w5'],
          ['12:30', 'Rataskaevu 16', 'Cuisine estonienne : sandre ou harengs de la Baltique.', 'w5'],
          ['14:00', 'Cathédrale Alexandre-Nevski', 'Coupoles russes sur Toompea.', 'w8'],
          ['14:30', 'Belvédère Kohtuotsa', 'La carte postale des toits rouges.', 'w5'],
          ['15:00', 'Belvédère Patkuli', 'Vue sur le port et les remparts.', 'w5'],
          ['16:30', 'Promenade des remparts (Hellemann)', 'Marche sur le chemin de ronde.', 'w12']
        ] },
        { t: 'Kalamaja et Telliskivi', c: 15, s: [
          ['10:00', 'Balti Jaam Market', 'Marché couvert : fruits, antiquités, street-food.', ''],
          ['11:30', 'Telliskivi Loomelinnak', 'Usine reconvertie : street-art, créateurs, Fotografiska.', 'w5'],
          ['13:00', 'F-hoone', 'Déjeuner industriel-chic.', 'w1'],
          ['14:30', 'Maisons en bois de Kalamaja', 'Quartier de pêcheurs colorés.', 'w10'],
          ['15:30', 'Lennusadam', 'Hangars à hydravions en béton, sous-marin à visiter de l\'intérieur.', 'w15', ['15:30', 'Kalamaja – boutiques de créateurs', 'Céramique, lin, laine estonienne dans les rues de bois.', 'w10']],
          ['18:00', 'Promenade de Noblessner', 'Port reconverti, coucher de soleil.', 'w15']
        ] },
        { t: 'Tourbière de Viru (Lahemaa)', c: 55, s: [
          ['08:30', 'Départ excursion', 'Minibus vers le parc national de Lahemaa.', ''],
          ['09:30', 'Sentier de la tourbière de Viru', 'Caillebotis de 3,5 km au milieu des marais et pins nains.', 'c60'],
          ['12:00', 'Manoir de Palmse', 'Domaine balte-allemand.', 'c20'],
          ['14:30', 'Village de pêcheurs d\'Altja', 'Granges en bois et rochers erratiques.', 'c20'],
          ['17:30', 'Retour Tallinn', '', 'c60']
        ] },
        { t: 'Kadriorg et souvenirs', c: 14, s: [
          ['10:00', 'Parc de Kadriorg', 'Jardins du palais baroque de Pierre le Grand, étang aux cygnes.', 'm15:Tram 1'],
          ['12:00', 'Quartier Rotermann', 'Boutiques estoniennes : chocolat Kalev, liqueur Vana Tallinn, design local.', 't15'],
          ['14:00', 'Vieille ville – boutiques', 'Lin, laine, bois de genévrier, massepain de Kalev.', 'm15'],
          ['19:00', 'Kohvik Komeet', 'Dîner et desserts.', 'w8']
        ] }
      ] }
  ],
  free: ['Ferry pour Helsinki (2 h) en aller-retour', 'Tartu, ville étudiante (2 h 15 de train)', 'Île de Saaremaa (excursion 2 jours)']
};

DEST.ge = {
  name: 'Géorgie', city: 'Tbilissi', region: 'Europe', iso: '268', ll: [44.79, 41.72], code: 'TBS',
  tag: 'Balcons sculptés, bains soufrés, Caucase',
  scene: { sky: ['#ffd7a8', '#f29a6b', '#9b4f6a'], land: ['#6b3a4f', '#3e2134'], kind: 'mountains' },
  flight: { base: 300, overnight: false, stops: 1, air: 'Pegasus / Turkish Airlines', route: 'NCE → IST/SAW → TBS', dur: '≈ 7 h avec escale', alt: 'Arrivées souvent de nuit (≈ 3-4 h du matin).', season: 'eu' },
  hotel: { night: 48, area: 'Sololaki ou vieille ville (Kala)', season: [0.85, 0.85, 0.9, 1, 1.1, 1.15, 1.2, 1.2, 1.15, 1.05, 0.9, 0.95] },
  food: 18, local: 3, shop: 50,
  money: 'Lari (GEL) · 1 € ≈ 3,1 GEL', plug: 'Type C/F (comme en France)', tz: '+2 h (été) / +3 h (hiver)', visa: 'Sans visa jusqu\'à 1 an avec passeport français.', lang: 'Géorgien · « Gamarjoba » = bonjour',
  veg: [
    ["Khachapuri adjaruli","Barque de pain, fromage fondu, œuf et beurre.","Végétarien"],
    ["Kalmakhi","Truite de rivière grillée à l'estragon et à la grenade.","Poisson"],
    ["Badrijani nigvzit","Aubergines roulées à la pâte de noix.","Végétarien"],
    ["Lobio","Haricots rouges épicés en pot de terre, avec le pain mchadi.","Végétarien"],
    ["Khinkali aux champignons ou au fromage","Gros raviolis à pincer ; les autres prendront ceux au bœuf-porc.","Végétarien"],
    ["Churchkhela","Noix enrobées de jus de raisin.","Végétarien"]
  ],
  vegTip: "Une supra (festin géorgien) contient toujours pkhali, aubergines et fromages : tu mangeras très bien à côté du mtsvadi (brochettes) des autres.",
  arr: [
    ['', 'Aéroport de Tbilissi (TBS)', 'Taxi Bolt (≈ 25-30 GEL) ou bus 337 (1 GEL).', ''],
    ['', 'Hôtel – Sololaki', 'Repos (arrivée souvent de nuit).', 't25'],
    ['17:00', 'Place de la Liberté', 'Point de départ de la balade.', 'w8'],
    ['19:30', 'Shavi Lomi / Café Littera', 'Cuisine géorgienne revisitée.', 't10']
  ],
  stages: [
    { city: 'Tbilissi', code: 'TBS', min: 1, max: 6, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport TBS', 'Bolt (25 min).', 't25']],
      days: [
        { t: 'Vieille ville et bains soufrés', c: 30, s: [
          ['09:30', 'Place de la Liberté', 'Statue de saint Georges.', ''],
          ['10:00', 'Rue Kote Abkhazi', 'Balcons en bois, cours intérieures.', 'w8'],
          ['10:30', 'Téléphérique de Rike → Narikala', 'Montée à la forteresse (2,5 GEL).', 'w10'],
          ['11:00', 'Mère de Géorgie (Kartlis Deda)', 'Statue géante, vue sur la ville.', 'w8'],
          ['12:00', 'Jardin botanique', 'Cascade cachée.', 'w10'],
          ['13:30', 'Abanotubani', 'Coupoles des bains, quartier persan.', 'w10'],
          ['14:00', 'Bains Chreli (Orbeliani)', 'Bain soufré privé + gommage (kisi) 1 h.', 'w2'],
          ['16:00', 'Pont de la Paix', 'Passerelle de verre sur la Koura.', 'w10'],
          ['16:45', 'Marché du Pont sec', 'Brocante en plein air tous les jours : objets soviétiques, cornes à vin, émaux, tapis.', 'w10'],
          ['19:30', 'Barbarestan', 'Recettes d\'un livre de cuisine du XIXe s.', 't10']
        ] },
        { t: 'Marché du Pont sec et Fabrika', c: 5, s: [
          ['10:00', 'Dry Bridge Market', 'Brocante soviétique, cornes à vin, émaux (week-end au top).', ''],
          ['12:00', 'Rue Agmashenebeli', 'Avenue restaurée, façades XIXe.', 'w20'],
          ['13:00', 'Fabrika', 'Usine soviétique reconvertie, street-art.', 'w5'],
          ['15:00', 'Bazar Dezerter', 'Le grand marché alimentaire : churchkhela, sel svane, fromages, sauce tkemali, épices.', 't10'],
          ['17:00', 'Église de la Sainte-Trinité (Sameba)', 'Plus grande cathédrale du Caucase.', 't10'],
          ['19:00', 'Shavi Lomi', 'Dîner.', 't10']
        ] },
        { t: 'Mtskheta (ancienne capitale)', c: 8, s: [
          ['09:30', 'Station Didube', 'Marshrutka vers Mtskheta (1 GEL).', 'm15:Métro'],
          ['10:15', 'Monastère de Jvari', 'Taxi jusqu\'à la colline, vue sur la confluence.', 'b25'],
          ['11:30', 'Cathédrale de Svetitskhoveli', 'UNESCO, cœur spirituel du pays.', 't15'],
          ['13:00', 'Salobie Bia', 'Lobio et pain chaud.', 'w10'],
          ['15:00', 'Retour Tbilissi', '', 'b30']
        ] }
      ] },
    { city: 'Kazbegi', code: 'TBS', min: 1, max: 3, prio: 2, go: 15,
      dep: [['', 'Kazbegi', 'Marshrutka vers Tbilissi (3 h).', ''], ['', 'Aéroport TBS', 'Bolt depuis Didube.', 't30']],
      days: [
        { t: 'Route militaire et Gergeti', c: 20, s: [
          ['09:00', 'Station Didube', 'Marshrutka Tbilissi → Stepantsminda (≈ 3 h, 15 GEL).', ''],
          ['10:30', 'Forteresse d\'Ananouri', 'Arrêt photo sur le lac (selon le chauffeur).', 'b90'],
          ['12:30', 'Stepantsminda', 'Installation.', 'b90'],
          ['13:30', 'Montée à Gergeti Trinity', 'Sentier forestier (1 h 30) vers l\'église face au Kazbek.', 'w90'],
          ['17:00', 'Redescente', '', 'w60'],
          ['19:00', 'Terrasse du Rooms Hotel Kazbegi', 'Dîner face au Kazbek : truite kalmakhi, khinkali au fromage.', 'w15']
        ] },
        { t: 'Vallée de Juta', c: 25, s: [
          ['08:30', 'Taxi 4x4', 'Vers le village de Juta (45 min).', ''],
          ['09:30', 'Juta', 'Randonnée vers la Fifth Season et les pics de Chaukhi.', 'c45'],
          ['13:00', 'Fifth Season', 'Déjeuner face aux montagnes.', 'w90'],
          ['16:00', 'Retour Stepantsminda', '', 'c45']
        ] }
      ] },
    { city: 'Kakhétie', code: 'TBS', min: 1, max: 2, prio: 3, go: 10,
      dep: [['', 'Sighnaghi', 'Marshrutka/taxi vers Tbilissi (2 h).', ''], ['', 'Aéroport TBS', '', 't30']],
      days: [
        { t: 'Sighnaghi et le vin en amphore', c: 30, s: [
          ['09:00', 'Gare routière Samgori', 'Marshrutka Tbilissi → Sighnaghi (2 h).', 'm15:Métro'],
          ['11:30', 'Remparts de Sighnaghi', 'Ville aux 23 tours, vue sur la vallée d\'Alazani.', 'b120'],
          ['13:00', 'Pheasant\'s Tears', 'Déjeuner et dégustation de vin en qvevri.', 'w5'],
          ['15:30', 'Monastère de Bodbe', 'Tombe de sainte Nino.', 't10']
        ] }
      ] }
  ],
  free: ['Gori et la cité troglodyte d\'Uplistsikhe', 'David Gareja (monastère à la frontière azérie)', 'Borjomi et ses eaux minérales']
};

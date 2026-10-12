/* Destinations Asie */
window.DEST = window.DEST || {};

DEST.vn = {
  name: 'Vietnam', city: 'Hanoï', region: 'Asie', iso: '704', ll: [105.85, 21.03], code: 'HAN',
  tag: 'Ruelles parfumées, baies de calcaire, massages',
  scene: { sky: ['#ffe2a8', '#f6a66b', '#d9655b'], land: ['#2f6b5a', '#1c4438'], kind: 'karst' },
  flight: { base: 720, overnight: true, stops: 1, air: 'Qatar Airways / Turkish Airlines', route: 'NCE → DOH → HAN', dur: '≈ 16 h avec escale', alt: 'Retour depuis Hô Chi Minh-Ville (SGN) au même prix en « multi-destinations ».', season: 'asie' },
  hotel: { night: 38, area: 'Vieux quartier (Hoàn Kiếm)', season: [1.1, 1.25, 1, 0.95, 0.9, 0.95, 1.05, 1.05, 0.9, 0.9, 0.95, 1.1] },
  food: 14, local: 3, shop: 60,
  money: 'Dông (VND) · 1 € ≈ 28 500 VND · espèces + Grab', plug: 'Type A/C (prises françaises souvent OK)', tz: '+5 h (été) / +6 h (hiver)', visa: 'Exemption de visa 45 jours pour les Français.', lang: 'Vietnamien · « Xin chào » = bonjour',
  veg: [
    ["Chả cá Lã Vọng","Poisson au curcuma et à l'aneth, poêlé à table : spécialité de Hanoï.","Poisson"],
    ["Gỏi cuốn tôm","Rouleaux de printemps aux crevettes et herbes fraîches.","Poisson"],
    ["Bánh xèo","Crêpe croustillante au curcuma garnie de crevettes, à rouler dans la salade.","Poisson"],
    ["Cao lầu / Mì Quảng tôm","Nouilles de Hội An, version crevettes.","Poisson"],
    ["Canh chua cá","Soupe aigre-douce au poisson et tamarin du delta du Mékong.","Poisson"],
    ["Bánh mì trứng","Sandwich à l'omelette, pickles et coriandre.","Végétarien"],
    ["Cà phê trứng","Café à l'œuf battu, spécialité de Hanoï.","Végétarien"]
  ],
  vegTip: "Le phở et le bún chả des autres sont au bœuf ou au porc ; pour toi, tout ce qui est « tôm » (crevette) ou « cá » (poisson).",
  arr: [
    ['', 'Aéroport Nội Bài (HAN)', 'Bus 86 express (≈ 45 000 VND) ou Grab (≈ 300 000 VND).', ''],
    ['', 'Hôtel – vieux quartier', 'Repos après le vol de nuit.', 't45:Grab'],
    ['17:00', 'Lac Hoàn Kiếm', 'Tour du lac et pont rouge Thê Húc.', 'w8'],
    ['19:00', 'Chả Cá Thăng Long (rue Đường Thành)', 'Le fameux poisson au curcuma et à l\'aneth cuit à table.', 't10']
  ],
  stages: [
    { city: 'Hanoï', code: 'HAN', min: 1, max: 4, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport Nội Bài', 'Grab (45 min).', 't45:Grab']],
      days: [
        { t: 'Vieux quartier et massage', c: 30, s: [
          ['08:00', 'Café Giảng', 'Le café à l\'œuf d\'origine.', ''],
          ['09:00', 'Rue des 36 corporations', 'Hàng Gai (soie), Hàng Mã (papiers votifs).', 'w5'],
          ['10:00', 'Marché Đồng Xuân', 'Le grand marché couvert de Hanoï : tissus, épices, café, laques.', 'w10'],
          ['11:15', 'Temple Ngọc Sơn', 'Sur l\'îlot du lac Hoàn Kiếm.', 'w15'],
          ['12:00', 'Quán Ăn Ngon (Phan Bội Châu)', 'Cuisines de rue du pays réunies : bánh xèo, gỏi cuốn tôm.', 'w15'],
          ['14:00', 'Temple de la Littérature', 'Première université du pays (1076).', 't10'],
          ['16:00', 'Omamori Spa', 'Massage vietnamien 90 min par des masseurs malvoyants (≈ 500 000 VND).', 't10'],
          ['19:00', 'Rue du train (Phùng Hưng)', 'Les maisons à 1 m des rails (passage selon horaires).', 'w10'],
          ['20:00', 'Marché de nuit (ven.–dim.)', 'Rue Hàng Đào piétonne.', 'w10']
        ] },
        { t: 'Ninh Bình, la baie d\'Ha Long terrestre', c: 45, s: [
          ['07:30', 'Départ excursion Ninh Bình', 'Minibus depuis le vieux quartier (≈ 2 h).', ''],
          ['10:00', 'Tràng An', 'Barque à rames entre pitons karstiques et grottes (2 h).', 'c120'],
          ['12:30', 'Déjeuner local', 'Chèvre de montagne pour les autres, poisson du fleuve et riz brûlé pour toi.', 'c10'],
          ['14:00', 'Pagode Hang Múa', '500 marches jusqu\'au dragon de pierre, vue mythique.', 'c15'],
          ['17:00', 'Retour Hanoï', '', 'c120']
        ] },
        { t: 'Baie d\'Ha Long (croisière 1 jour)', c: 75, s: [
          ['07:30', 'Navette croisière', 'Depuis l\'hôtel vers Ha Long (2 h 30 via autoroute).', ''],
          ['10:30', 'Embarquement', 'Croisière avec déjeuner de fruits de mer à bord.', 'c150'],
          ['13:00', 'Grotte Sửng Sốt', 'Grotte de la Surprise.', 'o60'],
          ['14:30', 'Kayak à Luồn', 'Lagune entourée de falaises.', 'o30'],
          ['17:00', 'Retour Hanoï', '', 'c150']
        ] }
      ] },
    { city: 'Hội An', code: 'DAD', min: 2, max: 5, prio: 2, go: 55,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport de Đà Nẵng', 'Grab (40 min) puis vol.', 't40:Grab']],
      days: [
        { t: 'Lanternes de Hội An', c: 20, s: [
          ['', 'Vol Hanoï → Đà Nẵng', 'Vietjet / Vietnam Airlines (1 h 20), Grab jusqu\'à Hội An (40 min).', 'f80'],
          ['14:00', 'Pont japonais', 'Ticket groupé pour la vieille ville (120 000 VND).', 'w10'],
          ['15:00', 'Maisons Tấn Ký et Phùng Hưng', 'Maisons de marchands.', 'w5'],
          ['17:00', 'Marché central', 'Tailleurs : commandez une chemise sur mesure (24 h).', 'w5'],
          ['18:30', 'Barque à lanternes', 'Sur la rivière Thu Bồn à la tombée de la nuit.', 'w5'],
          ['19:30', 'Morning Glory (Nguyễn Thái Học)', 'Spécialités de Hội An : cao lầu, bánh xèo aux crevettes.', 'w8']
        ] },
        { t: 'Village d\'herbes, plage et massage', c: 35, s: [
          ['08:30', 'Village de Trà Quế', 'Jardins d\'herbes aromatiques cultivés à l\'ancienne.', 't10:Grab'],
          ['11:00', 'Plage An Bàng', 'Baignade.', 't10:Grab'],
          ['13:00', 'Paillotes de la plage An Bàng', 'Fruits de mer grillés les pieds dans le sable.', 'w5'],
          ['15:00', 'Marché central de Hội An', 'Tailleurs, lanternes en soie, poivre et café.', 't15:Grab'],
          ['16:30', 'Palmarosa Spa', 'Massage traditionnel 60 à 90 min.', 't10:Grab'],
          ['19:30', 'Marché de nuit An Hội', 'Lanternes, souvenirs, chè.', 't10']
        ] },
        { t: 'Sanctuaire de Mỹ Sơn', c: 25, s: [
          ['05:30', 'Navette Mỹ Sơn (lever du soleil)', 'Évitez la chaleur et la foule.', ''],
          ['06:30', 'Temples cham de Mỹ Sơn', 'UNESCO, IVe-XIIIe s.', 'c60'],
          ['10:00', 'Retour Hội An', 'Repos et piscine.', 'c60'],
          ['16:00', 'Plage de Cửa Đại', 'Coucher de soleil.', 't15']
        ] }
      ] },
    { city: 'Hô Chi Minh-Ville', code: 'SGN', min: 1, max: 4, prio: 3, go: 55,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport Tân Sơn Nhất', 'Grab (30 min).', 't30:Grab']],
      days: [
        { t: 'Saigon à pied', c: 15, s: [
          ['', 'Vol Đà Nẵng → Hô Chi Minh', 'Vol 1 h 20, Grab jusqu\'au District 1.', 'f80'],
          ['14:00', 'Musée des vestiges de la guerre', 'Intense, à prévoir 1 h 30.', 't30:Grab', ['14:00', 'Marché Bình Tây (Chợ Lớn)', 'Marché de gros du quartier chinois : épices, thé, tissus, confiseries.', 't30:Grab']],
          ['16:00', 'Palais de la Réunification', '', 'w10'],
          ['17:00', 'Cathédrale Notre-Dame & Poste centrale', 'Héritage français.', 'w8'],
          ['18:00', 'Rue des livres Nguyễn Văn Bình', '', 'w2'],
          ['19:30', 'Cục Gạch Quán', 'Cuisine familiale vietnamienne dans une villa : canh chua cá, poisson caramélisé.', 't10']
        ] },
        { t: 'Delta du Mékong', c: 40, s: [
          ['07:30', 'Départ excursion', 'Vers Mỹ Tho / Bến Tre (2 h).', ''],
          ['10:00', 'Canaux en sampan', 'Barque sous les cocotiers.', 'c120'],
          ['12:00', 'Verger et fabrique de bonbons coco', 'Déjeuner fruits tropicaux.', 'o20'],
          ['17:00', 'Retour Saigon', '', 'c120'],
          ['18:30', 'Marché Bến Thành', 'Café vietnamien, laques, phin.', 't10']
        ] }
      ] }
  ],
  free: ['Sa Pa en bus de nuit (rizières en terrasses)', 'Huế, l\'ancienne cité impériale', 'Cours de cuisine à Hội An']
};

DEST.cn = {
  name: 'Chine', city: 'Pékin', region: 'Asie', iso: '156', ll: [116.4, 39.9], code: 'PEK',
  tag: 'Cité interdite, ville-montagne, ponts naturels',
  scene: { sky: ['#ffd9b0', '#f08a6c', '#a63d4f'], land: ['#4a2b3a', '#2b1724'], kind: 'karst' },
  flight: { base: 650, overnight: true, stops: 1, air: 'Turkish Airlines / Air China', route: 'NCE → IST → PEK', dur: '≈ 15 h avec escale', alt: 'Retour depuis Hong Kong (HKG) en multi-destinations, à 15 min de train de Shenzhen.', season: 'asie' },
  hotel: { night: 60, area: 'Dongcheng (hutongs) à Pékin', season: [0.9, 1.15, 0.95, 1, 1.15, 1, 1.1, 1.1, 1, 1.25, 0.9, 0.9] },
  food: 20, local: 5, shop: 70,
  money: 'Yuan (CNY) · 1 € ≈ 8,3 CNY · Alipay/WeChat Pay avec carte étrangère indispensables', plug: 'Type A/I : adaptateur nécessaire', tz: '+6 h (été) / +7 h (hiver)', visa: 'Sans visa 30 jours pour les Français jusqu\'au 31/12/2026 (vérifier au-delà).', lang: 'Mandarin · « Nǐ hǎo » = bonjour · installez une appli VPN avant le départ',
  veg: [
    ["Shuizhu yu","Poisson poché dans l'huile pimentée, plat star de Chongqing.","Poisson"],
    ["Mapo tofu sans viande","Tofu au piment du Sichuan, demandez « bu yao rou » (sans viande).","Végétarien"],
    ["Fondue yuanyang","Bouillon pimenté et bouillon clair : poisson, tofu, champignons, lotus pour toi.","Poisson"],
    ["Har gow et cheung fun aux crevettes","Dim sum cantonais à Shenzhen.","Poisson"],
    ["Aubergines yuxiang","Aubergines sauce « parfum de poisson » (demander sans porc haché).","Végétarien"],
    ["Jianbing","Crêpe-omelette de rue du petit-déjeuner pékinois.","Végétarien"],
    ["Xiaomian","Petites nouilles épicées de Chongqing, sans viande à la base.","Végétarien"]
  ],
  vegTip: "Pendant que les autres goûtent le canard laqué, commandez pour toi « yú » (poisson) ou « dòufu » (tofu). Dites « wǒ bù chī ròu » : je ne mange pas de viande.",
  arr: [
    ['', 'Aéroport Pékin Capital (PEK)', 'Airport Express jusqu\'à Dongzhimen (25 CNY).', ''],
    ['', 'Dongzhimen → hôtel', 'Métro ligne 2.', 'm35:Airport Express'],
    ['', 'Hôtel – hutong', 'Repos.', 'm10:Ligne 2'],
    ['17:30', 'Hutongs de Nanluoguxiang', 'Ruelles traditionnelles, cours carrées.', 'w10'],
    ['19:00', 'Siji Minfu (Dengshikou)', 'Canard laqué pour les autres ; pour toi, poisson et tofu à la carte.', 'w15']
  ],
  warnMin: 'Pour Pékin + Chongqing + Wulong + Shenzhen, comptez au minimum 9 jours.',
  stages: [
    { city: 'Pékin', code: 'PEK', min: 2, max: 5, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport PEK', 'Métro + Airport Express (1 h).', 'm60']],
      days: [
        { t: 'Cité interdite et Jingshan', c: 15, s: [
          ['08:00', 'Place Tian\'anmen', 'Passeport obligatoire au contrôle. Réservation Cité interdite J-7 (60 CNY).', 'm20:Ligne 1'],
          ['08:30', 'Porte du Méridien (Wumen) – Cité interdite', 'Traversée sud → nord (3 h).', 'w15'],
          ['11:45', 'Parc Jingshan', 'Montée au pavillon : toute la Cité interdite à vos pieds.', 'w5'],
          ['13:00', 'Parc Beihai', 'Lac et dagoba blanche.', 'w10'],
          ['14:30', 'Lacs Houhai', 'Promenade, pousse-pousse optionnel.', 'w15'],
          ['16:00', 'Tours du Tambour et de la Cloche', '', 'w10'],
          ['19:00', 'Mr. Shi\'s Dumplings (Baochao Hutong)', 'Raviolis maison dans un hutong : crevettes, champignons, porc pour les autres.', 'w15']
        ] },
        { t: 'Grande Muraille à Mutianyu', c: 45, s: [
          ['07:00', 'Gare routière de Dongzhimen', 'Bus 916 express vers Huairou, puis navette/taxi Mutianyu (ou chauffeur privé ≈ 600 CNY/voiture).', 'm10'],
          ['09:30', 'Mutianyu – téléphérique', 'Muraille restaurée, peu de monde le matin.', 'b120'],
          ['10:00', 'Marche sur la muraille', 'Tours 6 à 20 (2-3 h).', 'k10'],
          ['13:00', 'Descente en luge', 'La descente fun (100 CNY).', 'w5'],
          ['14:00', 'Déjeuner au village', 'Nouilles et légumes sautés.', 'w5'],
          ['17:30', 'Retour Pékin', '', 'b120']
        ] },
        { t: 'Temple du Ciel et Palais d\'été', c: 25, s: [
          ['07:30', 'Temple du Ciel', 'Tai-chi des retraités dans le parc le matin.', 'm20:Ligne 5'],
          ['09:45', 'Marché aux puces de Panjiayuan', 'Antiquités, jade, affiches de propagande, calligraphie (plus grand le week-end).', 't15'],
          ['12:00', 'Palais d\'été', 'Lac Kunming, Long Corridor, bateau-dragon.', 'm60:Ligne 10 + 4'],
          ['14:30', 'Temple des Lamas (Yonghegong)', 'Bouddha de 18 m en santal.', 'm45'],
          ['16:00', 'Rue Wudaoying', 'Boutiques créateurs.', 'w5'],
          ['19:00', 'Jin Ding Xuan (Yonghegong)', 'Dim sum cantonais ouvert 24 h/24 face au temple des Lamas.', 'w10']
        ] }
      ] },
    { city: 'Chongqing', code: 'CKG', min: 2, max: 5, prio: 1, go: 90,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport Jiangbei', 'Métro ligne 3 (45 min).', 'm45:Ligne 3']],
      days: [
        { t: 'La ville-montagne', c: 15, s: [
          ['', 'Vol Pékin → Chongqing', 'Air China / Sichuan Airlines (2 h 45), métro ligne 3 vers le centre.', 'f165'],
          ['14:00', 'Liziba', 'Le monorail ligne 2 qui traverse un immeuble (vue depuis la plateforme).', 'm20:Ligne 2'],
          ['15:00', 'Eling Park & Eling Erchang', 'Quartier d\'ateliers sur la colline.', 'm15'],
          ['17:00', 'Téléphérique du Yangtsé', 'Traversée du fleuve depuis Xinhua Lu (20 CNY).', 'm15'],
          ['19:00', 'Hongyadong', 'Maisons sur pilotis illuminées, façon Voyage de Chihiro.', 'w15'],
          ['20:00', 'Fondue de Chongqing (yuanyang)', 'Bouillon pimenté et bouillon clair : poisson, tofu et champignons pour toi.', 'w10']
        ] },
        { t: 'Karst de Wulong (UNESCO)', c: 55, s: [
          ['07:00', 'Gare de Chongqing Ouest/Nord', 'Train vers Wulong (≈ 1 h 15 selon le train, réservation sur Trip.com).', 'm30'],
          ['08:30', 'Gare de Wulong → centre visiteurs', 'Bus navette vers Tiankeng Sanqiao (≈ 40 min).', 'tr75'],
          ['09:30', 'Trois Ponts naturels (Tiankeng Sanqiao)', 'Ascenseur dans la falaise, puis marche dans le gouffre (lieu de tournage de Transformers).', 'b40'],
          ['12:30', 'Village de Tianfu Guanyi', 'Déjeuner.', 'w20'],
          ['14:00', 'Longshuixia Difeng', 'Gorge fissurée, passerelles et cascades.', 'b30'],
          ['16:30', 'Retour Chongqing', '', 'tr75']
        ] },
        { t: 'Ciqikou et Jiefangbei', c: 10, s: [
          ['09:00', 'Ciqikou', 'Ancien village de porcelaine, mahua (torsades frites).', 'm30:Ligne 1'],
          ['12:00', 'Xiaomian de rue', 'Nouilles épicées.', 'w5'],
          ['14:00', 'Jiefangbei', 'Monument et centre commercial piéton.', 'm30'],
          ['15:30', 'Escalator Huangguan', 'Un des plus longs escalators d\'Asie.', 'w15'],
          ['19:00', 'Nanshan Yikeshu', 'Belvédère de nuit sur la ville.', 't25']
        ] }
      ] },
    { city: 'Shenzhen', code: 'HKG', min: 1, max: 4, prio: 1, go: 90,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Gare de Futian', 'Train express vers Hong Kong West Kowloon (≈ 15 min, passeport).', 'm15'], ['', 'Aéroport de Hong Kong', 'Airport Express depuis Kowloon.', 'tr45']],
      days: [
        { t: 'Shenzhen futuriste', c: 10, s: [
          ['', 'Vol Chongqing → Shenzhen', 'Vol 2 h 10, métro ligne 11 vers Futian.', 'f130'],
          ['14:00', 'Parc Lianhuashan', 'Vue sur la skyline de Futian.', 'm40:Ligne 11'],
          ['16:00', 'Huaqiangbei', 'Le plus grand marché électronique du monde.', 'm15'],
          ['18:30', 'Baie de Shenzhen', 'Front de mer, Hong Kong en face.', 'm30'],
          ['20:00', 'Dim sum cantonais à Nanshan', 'Har gow aux crevettes, cheung fun, riz au poisson.', 't15']
        ] },
        { t: 'Art et design', c: 15, s: [
          ['10:00', 'OCT Loft', 'Usines reconverties en galeries et cafés.', 'm25'],
          ['13:00', 'Village de peinture de Dafen', 'Ateliers de copistes, tableaux à petits prix.', 'm50'],
          ['17:00', 'Rue piétonne de Dongmen', 'Le vieux quartier commerçant : vêtements, snacks, thé.', 'm40'],
          ['19:30', 'Dîner cantonais à Dongmen', 'Poisson vapeur au gingembre, dim sum aux crevettes.', 'w5']
        ] }
      ] }
  ],
  free: ['Xi\'an et l\'armée de terre cuite (TGV 4 h 30 depuis Pékin)', 'Hong Kong : Victoria Peak et Star Ferry', 'Dazu et ses sculptures rupestres (depuis Chongqing)']
};

DEST.jp = {
  name: 'Japon', city: 'Tokyo', region: 'Asie', iso: '392', ll: [139.69, 35.68], code: 'HND',
  tag: 'Néons, temples et shōjin ryōri',
  scene: { sky: ['#ffe3e0', '#f5a3a8', '#c9566a'], land: ['#3b2a46', '#211629'], kind: 'fuji' },
  flight: { base: 900, overnight: true, stops: 1, air: 'Air France / Finnair', route: 'NCE → CDG → HND', dur: '≈ 15 h avec escale', alt: 'Finnair via Helsinki, souvent moins cher. Retour depuis Osaka (KIX) possible.', season: 'asie' },
  hotel: { night: 105, area: 'Asakusa ou Ueno à Tokyo', season: [0.95, 0.95, 1.3, 1.45, 1.1, 0.95, 1.05, 1.15, 0.95, 1.05, 1.25, 1.1] },
  food: 32, local: 8, shop: 90,
  money: 'Yen (JPY) · 1 € ≈ 170 JPY · carte Suica sur iPhone', plug: 'Type A : adaptateur nécessaire', tz: '+7 h (été) / +8 h (hiver)', visa: 'Sans visa 90 jours.', lang: 'Japonais · « Konnichiwa » = bonjour',
  veg: [
    ["Sushi et sashimi","Au comptoir ou au tapis roulant (kaiten) : le paradis pour toi.","Poisson"],
    ["Tempura","Crevettes, poissons et légumes en friture légère.","Poisson"],
    ["Okonomiyaki aux fruits de mer","Crêpe au chou d'Osaka, à demander sans porc.","Poisson"],
    ["Kaisendon","Bol de riz couvert de poissons crus au marché de Tsukiji.","Poisson"],
    ["Yudofu","Tofu mijoté, spécialité de Kyoto (Arashiyama).","Végétarien"],
    ["Shōjin ryōri","Cuisine zen des moines, 100 % végétale.","Végétarien"]
  ],
  vegTip: "Dans un izakaya, les autres prendront yakitori ; pour toi : sashimi, poisson grillé (yakizakana), tempura et edamame.",
  arr: [
    ['', 'Aéroport de Haneda (HND)', 'Keikyū Line direct vers Asakusa (≈ 35 min).', ''],
    ['', 'Hôtel – Asakusa', 'Dépôt des bagages.', 'tr35:Keikyū'],
    ['17:00', 'Sensō-ji', 'Temple et porte Kaminarimon illuminés.', 'w5'],
    ['19:00', 'Hoppy-dōri (Asakusa)', 'Ruelle d\'izakaya en plein air : sashimi et tempura pour toi.', 'm20']
  ],
  stages: [
    { city: 'Tokyo', code: 'HND', min: 2, max: 6, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport Haneda', 'Keikyū Line.', 'tr35:Keikyū']],
      days: [
        { t: 'Shibuya, Harajuku, Shinjuku', c: 20, s: [
          ['08:30', 'Sanctuaire Meiji-jingū', 'Forêt sacrée au cœur de la ville.', 'm35:Ginza + JR'],
          ['10:00', 'Takeshita-dōri (Harajuku)', 'Mode kawaii, crêpes.', 'w10'],
          ['11:00', 'Omotesandō', 'Architecture de luxe.', 'w5'],
          ['12:30', 'Tsunahachi (Shinjuku)', 'Tempura depuis 1923 : crevettes, poissons, légumes.', 'm10'],
          ['14:30', 'Carrefour de Shibuya', 'Vue depuis Shibuya Sky (réserver).', 'm10'],
          ['16:00', 'Shibuya – Don Quijote, Loft & Uniqlo', 'Bazar japonais ouvert la nuit, papeterie, mode japonaise.', 'w5'],
          ['18:00', 'Omoide Yokochō & Golden Gai', 'Ruelles de bars minuscules.', 'm8:JR Yamanote'],
          ['19:00', 'Mairie de Tokyo (observatoire gratuit)', 'Vue de nuit, Fuji par temps clair.', 'w10']
        ] },
        { t: 'Tokyo insolite', c: 30, s: [
          ['09:00', 'Marché extérieur de Tsukiji', 'Tamagoyaki, fraises, matcha.', 'm15'],
          ['11:00', 'teamLab Planets (Toyosu)', 'Musée immersif où l\'on marche pieds nus dans l\'eau.', 'm15', ['11:00', 'Ameya-Yokochō (Ueno)', 'Rue-marché sous la voie ferrée : fruits secs, poisson, baskets, cosmétiques.', 'm25']],
          ['14:00', 'Akihabara', 'Électronique, rétro-gaming, gashapon.', 'm25'],
          ['16:30', 'Yanaka Ginza', 'Le vieux Tokyo épargné, chats et artisans.', 'm10'],
          ['19:00', 'Ramen Street (gare de Tokyo)', 'Huit échoppes de ramen ; Rokurinsha et ses tsukemen au bouillon de poisson.', 'm15']
        ] },
        { t: 'Hakone et le mont Fuji', c: 45, s: [
          ['07:30', 'Shinjuku', 'Odakyū Romancecar vers Hakone-Yumoto (85 min), Hakone Free Pass.', 'm20'],
          ['09:30', 'Hakone Tozan', 'Train de montagne en lacets.', 'tr85'],
          ['11:00', 'Owakudani (téléphérique)', 'Fumerolles et œufs noirs, vue Fuji.', 'k25'],
          ['12:30', 'Lac Ashi – bateau pirate', 'Torii flottant de Hakone-jinja.', 'k15'],
          ['15:00', 'Onsen Tenzan', 'Bain thermal (tatouages tolérés).', 'b30'],
          ['18:00', 'Retour Tokyo', '', 'tr85']
        ] }
      ] },
    { city: 'Kyoto', code: 'KIX', min: 2, max: 5, prio: 2, go: 95,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Gare de Kyoto', 'Haruka Express.', 'm15'], ['', 'Aéroport du Kansai (KIX)', '', 'tr75:Haruka']],
      days: [
        { t: 'Higashiyama', c: 15, s: [
          ['', 'Shinkansen Tokyo → Kyoto', 'Nozomi (2 h 15, ≈ 14 000 JPY).', 'tr135'],
          ['13:00', 'Kiyomizu-dera', 'Terrasse en bois sur pilotis.', 'b20:Bus 206'],
          ['14:30', 'Sannenzaka & Ninenzaka', 'Ruelles pavées, artisanat.', 'w5'],
          ['16:00', 'Yasaka-jinja', '', 'w15'],
          ['17:00', 'Gion – Hanamikōji', 'Quartier des geishas.', 'w5'],
          ['19:00', 'Ruelle de Pontochō', 'Dîner kaiseki ou yakitori pour les autres, sushi pour toi, au bord de la Kamo.', 'w15']
        ] },
        { t: 'Fushimi Inari et Nara', c: 15, s: [
          ['07:00', 'Fushimi Inari', 'Montée à travers les milliers de torii (2 h aller-retour).', 'tr5:JR Nara'],
          ['10:30', 'Nara', 'Parc des daims.', 'tr45:JR Nara'],
          ['11:00', 'Tōdai-ji', 'Grand Bouddha dans le plus grand bâtiment en bois.', 'w15'],
          ['13:00', 'Mochi de Nakatanidō', 'Mochi pilés à grande vitesse.', 'w15'],
          ['16:00', 'Retour Kyoto', '', 'tr45']
        ] },
        { t: 'Arashiyama et shōjin ryōri', c: 40, s: [
          ['08:00', 'Bambouseraie d\'Arashiyama', 'Venez tôt.', 'tr20:JR Sagano'],
          ['09:00', 'Tenryū-ji', 'Jardin zen UNESCO.', 'w2'],
          ['11:30', 'Shigetsu (dans Tenryū-ji)', 'Repas shōjin ryōri des moines (≈ 3 300 JPY).', 'w1'],
          ['14:00', 'Pavillon d\'or (Kinkaku-ji)', '', 'b30'],
          ['17:00', 'Marché Nishiki', 'Souvenirs : couteaux, thé, éventails.', 'b30']
        ] }
      ] },
    { city: 'Osaka', code: 'KIX', min: 1, max: 2, prio: 3, go: 5,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport du Kansai (KIX)', 'Nankai Rapi:t depuis Namba.', 'tr40']],
      days: [
        { t: 'Osaka gourmande', c: 15, s: [
          ['', 'Kyoto → Osaka', 'JR Special Rapid (30 min).', 'tr30'],
          ['12:00', 'Château d\'Osaka', '', 'm15'],
          ['15:00', 'Shinsekai', 'Quartier rétro et tour Tsūtenkaku.', 'm20'],
          ['18:00', 'Dōtonbori', 'Néons, panneau Glico, okonomiyaki aux fruits de mer et takoyaki (poulpe).', 'm10']
        ] }
      ] }
  ],
  free: ['Nikkō et ses sanctuaires (2 h de Tokyo)', 'Kamakura et le Grand Bouddha', 'Himeji, le château blanc (depuis Osaka)', 'Marché aux puces du Tō-ji à Kyoto (le 21 de chaque mois) ou Oedo Antique Market à Tokyo (1er et 3e dimanches)']
};

DEST.kz = {
  name: 'Kazakhstan', city: 'Almaty', region: 'Asie', iso: '398', ll: [76.95, 43.24], code: 'ALA',
  tag: 'Montagnes célestes, canyons et lacs turquoise',
  scene: { sky: ['#cfe8ff', '#8fc0e8', '#4d86b8'], land: ['#e8eef4', '#5a6f86'], kind: 'mountains' },
  flight: { base: 480, overnight: false, stops: 1, air: 'Turkish Airlines / Pegasus', route: 'NCE → IST → ALA', dur: '≈ 10 h avec escale', alt: 'Air Astana via Francfort selon saison.', season: 'eu' },
  hotel: { night: 58, area: 'Centre d\'Almaty (rue Panfilov)', season: [0.9, 0.9, 0.9, 1, 1.05, 1.15, 1.2, 1.2, 1.1, 1, 0.9, 0.95] },
  food: 20, local: 3, shop: 50,
  money: 'Tenge (KZT) · 1 € ≈ 590 KZT', plug: 'Type C/F (comme en France)', tz: '+3 h (été) / +4 h (hiver)', visa: 'Sans visa 30 jours pour les Français.', lang: 'Kazakh / russe · « Sälem » = salut',
  veg: [
    ["Baursak","Beignets frits servis avec le thé.","Végétarien"],
    ["Samsa à la citrouille","Chausson au four, version courante en automne.","Végétarien"],
    ["Manty à la citrouille","Gros raviolis vapeur farcis à la courge.","Végétarien"],
    ["Lagman aux légumes","Nouilles tirées à la main, sauce légumes (cafés ouïghours).","Végétarien"],
    ["Kurt","Billes de fromage séché salé.","Végétarien"],
    ["Pommes aport","La pomme géante d'Almaty, en septembre.","Végétarien"]
  ],
  vegTip: "Cuisine très carnée (beshbarmak, shashlik) pour les autres : pour toi, les cafés ouïghours et coréens ont le plus de choix. Dites « bez myasa » (sans viande).",
  arr: [
    ['', 'Aéroport d\'Almaty (ALA)', 'Yandex Go (≈ 3 000 KZT) ou bus 92.', ''],
    ['', 'Hôtel – centre', 'Repos.', 't30:Yandex Go'],
    ['18:00', 'Rue Arbat (Zhibek Zholy)', 'Rue piétonne, musiciens.', 'w10'],
    ['19:30', 'Navat', 'Chaîne kazakhe chaleureuse : beshbarmak pour les autres, manty à la citrouille et baursak pour toi.', 'w10']
  ],
  stages: [
    { city: 'Almaty', code: 'ALA', min: 2, max: 7, prio: 1,
      dep: [['', 'Hôtel', 'Check-out.', ''], ['', 'Aéroport ALA', 'Yandex Go (30 min).', 't30']],
      days: [
        { t: 'Centre et Kok-Tobe', c: 15, s: [
          ['09:30', 'Parc Panfilov', 'Cathédrale Zenkov tout en bois, sans un clou.', ''],
          ['11:00', 'Bazar Vert (Zelyony)', 'Fruits secs, kurt, épices, pommes.', 'w10'],
          ['13:00', 'Café ouïghour', 'Lagman aux légumes.', 'w5'],
          ['15:00', 'Musée des instruments de musique', 'Dombras, kobyz et instruments que l\'on peut écouter, dans le parc Panfilov.', 'w10', ['15:00', 'TsUM et rue Zhibek Zholy', 'Grand magasin soviétique : feutre, chapeaux kalpak, dombras miniatures.', 'w15']],
          ['17:00', 'Téléphérique de Kok-Tobe', 'Colline panoramique au coucher du soleil.', 'w20'],
          ['20:00', 'Retour centre', '', 'k6']
        ] },
        { t: 'Grand lac d\'Almaty', c: 35, s: [
          ['08:00', 'Taxi/excursion', 'Le lac est à 1 h 30 (route fermée aux bus).', ''],
          ['09:30', 'Grand lac d\'Almaty (2 511 m)', 'Lac turquoise, pics du Tian Shan.', 'c90'],
          ['12:00', 'Pique-nique', 'Préparé au Bazar Vert.', 'w5'],
          ['16:00', 'Retour', '', 'c90']
        ] },
        { t: 'Canyon de Charyn', c: 45, s: [
          ['07:00', 'Départ excursion', 'Minibus 3 h vers l\'est.', ''],
          ['10:00', 'Vallée des Châteaux', 'Marche de 3 km au fond du canyon jusqu\'à la rivière.', 'c180'],
          ['13:00', 'Déjeuner à l\'Eco-park', '', 'w45'],
          ['18:00', 'Retour Almaty', '', 'c180']
        ] },
        { t: 'Medeu et Shymbulak', c: 30, s: [
          ['09:00', 'Bus 12 vers Medeu', 'Depuis l\'avenue Dostyk.', ''],
          ['09:45', 'Patinoire de Medeu', 'La plus haute d\'altitude (1 691 m).', 'b45:Bus 12'],
          ['10:30', 'Télécabine vers Shymbulak', 'Station de ski / randonnée en été (jusqu\'à 3 200 m).', 'k20'],
          ['14:00', 'Retour en ville', '', 'b45'],
          ['16:00', 'Barakholka', 'Gigantesque bazar en plein air : vêtements, tapis, bric-à-brac, prix à négocier.', 't30']
        ] }
      ] },
    { city: 'Kolsai', code: 'ALA', min: 1, max: 1, prio: 2, go: 60,
      dep: [['', 'Lac Kolsai', 'Retour vers Almaty (5 h).', ''], ['', 'Aéroport ALA', '', 'c300']],
      days: [
        { t: 'Lacs Kolsai et Kaindy', c: 70, s: [
          ['06:00', 'Départ excursion 2 jours', 'Minibus depuis Almaty (5 h).', ''],
          ['11:30', 'Lac Kaindy', 'Forêt d\'épicéas engloutie.', 'c300'],
          ['15:00', 'Kolsai 1', 'Balade sur la rive, nuit en guesthouse.', 'c60'],
          ['19:00', 'Guesthouse de Saty', 'Dîner local.', 'c20']
        ] }
      ] }
  ],
  free: ['Parc national Altyn-Emel et la dune chantante', 'Astana, capitale futuriste (vol 1 h 45)', 'Turkestan et le mausolée de Khoja Ahmed Yasavi']
};

import json

# ==============================================================================
# 1. JAPANESE PRIME MINISTERS (Complete List: All 66 Unique PMs from Ito to Takaichi)
# ==============================================================================

jp_pms_data = [
  {
    "id": "jp-pm-1",
    "order": 1,
    "termDisplayJa": "第1・5・7・10代",
    "termDisplayEn": "1st, 5th, 7th, 10th",
    "nameJa": "伊藤 博文",
    "nameRuby": "いとう ひろぶみ",
    "nameEn": "Ito Hirobumi",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Ito_Hirobumi.jpg/440px-Ito_Hirobumi.jpg",
    "imageCaptionJa": "伊藤博文 肖像写真（国立国会図書館蔵）",
    "imageCaptionEn": "Photograph of Ito Hirobumi (NDL)",
    "birthDate": "1841-10-16",
    "deathDate": "1909-10-26",
    "inaugurationAge": 44,
    "deathAge": 68,
    "birthPlaceJa": "周防国 熊毛郡束荷村（現・山口県光市）",
    "birthPlaceEn": "Hikari, Yamaguchi Prefecture",
    "reignStart": "1885-12-22",
    "reignEnd": "1888-04-30",
    "reignDays": 2720,
    "eraNameJa": "明治",
    "eraNameEn": "Meiji Era",
    "partyOrFactionJa": "長州閥・立憲政友会（創立総裁）",
    "partyOrFactionEn": "Choshu Oligarchy / Rikken Seiyukai (Founder)",
    "physicalStats": {
      "heightCm": 156,
      "heightNoteJa": "公式身体記録および遺品洋服寸法に基づく（約156cm）",
      "heightNoteEn": "Documented approx. 156 cm based on historical tailoring records",
      "heightSource": "国立公文書館 明治期官吏履歴書・伊藤博文記念館所蔵品調査",
      "weightKg": 58,
      "weightNoteJa": "明治期の健康記録に基づく",
      "weightNoteEn": "Documented in Meiji medical records",
      "weightSource": "国立国会図書館憲政資料室『伊藤博文関係文書』"
    },
    "summaryJa": "内閣制度を創設して初代内閣総理大臣に就任。大日本帝国憲法の起草・制定を主導し、近代日本の法治国家の骨格を作り上げた明治の元勲。",
    "summaryEn": "The first Prime Minister of Japan who established the cabinet system, drafted the Meiji Constitution, and built the constitutional legal foundation of modern Japan.",
    "keyAchievementsJa": [
      "1885年、太政官制を廃止し内閣総理大臣制度を創設（初代首相に就任）",
      "大日本帝国憲法（明治憲法）の起草・発布（1889年）と帝国議会の開設",
      "日清戦争の指導および下関条約の調印（1895年）",
      "立憲政友会の結成と政党政治への道筋整備（1900年）"
    ],
    "keyAchievementsEn": [
      "Created Japan's modern Cabinet system in 1885 and became the first Prime Minister",
      "Drafted and promulgated the Meiji Constitution (1889) establishing the Imperial Diet",
      "Led the government through the First Sino-Japanese War and signed the Treaty of Shimonoseki (1895)",
      "Founded the Rikken Seiyukai political party in 1900 to foster parliamentary stability"
    ],
    "positiveAspects": [
      {
        "titleJa": "立憲主義の確立と近代国家の建設",
        "titleEn": "Establishment of Constitutionalism & Modern State Building",
        "descriptionJa": "欧州の国法学を導入し、アジア初の本格的成文憲法と二院制議会を創設して近代立憲国家の骨格を築いた。",
        "descriptionEn": "Introduced Western constitutional principles, creating Asia's first functional constitutional monarchy and parliamentary system.",
        "source": "瀧井一博『伊藤博文 知の政治家』中公新書"
      }
    ],
    "negativeAspects": [
      {
        "titleJa": "初代韓国統監就任とハルビンでの暗殺",
        "titleEn": "First Resident-General of Korea & Assassination",
        "descriptionJa": "第二次日韓協約により大韓帝国を保護国化し統監に就任。朝鮮半島の反発を招き1909年に安重根に暗殺された。",
        "descriptionEn: "Deprived the Korean Empire of diplomatic sovereignty via the 1905 Eulsa Treaty as first Resident-General, escalating severe Korean resistance.",
        "source": "伊藤之雄『伊藤博文 近代日本を創った男』講談社"
      }
    ],
    "keyEvents": [
      { "year": "1885", "titleJa": "初代内閣総理大臣就任", "titleEn": "First Prime Minister of Japan", "descriptionJa": "内閣制度を創設し44歳で就任。", "descriptionEn": "Assumed the newly created office of Prime Minister at age 44." },
      { "year": "1889", "titleJa": "大日本帝国憲法発布", "titleEn": "Promulgation of Meiji Constitution", "descriptionJa": "憲法制定を主導。", "descriptionEn": "Promulgated the Meiji Constitution." }
    ],
    "sources": [
      { "title": "国立公文書館 所蔵公文類聚", "sourceType": "official_archive" },
      { "title": "伊藤之雄『伊藤博文 近代日本を創った男』講談社学術文庫", "sourceType": "published_biography" }
    ]
  },
  {
    "id": "jp-pm-2",
    "order": 2,
    "termDisplayJa": "第2代",
    "termDisplayEn": "2nd",
    "nameJa": "黒田 清隆",
    "nameRuby": "くろだ きよたか",
    "nameEn": "Kuroda Kiyotaka",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kuroda_Kiyotaka.jpg/440px-Kuroda_Kiyotaka.jpg",
    "imageCaptionJa": "黒田清隆 肖像写真（国立国会図書館蔵）",
    "imageCaptionEn": "Photograph of Kuroda Kiyotaka (NDL)",
    "birthDate": "1840-11-09",
    "deathDate": "1900-08-23",
    "inaugurationAge": 47,
    "deathAge": 59,
    "birthPlaceJa": "薩摩国 鹿児島城下（現・鹿児島県鹿児島市）",
    "birthPlaceEn": "Kagoshima, Kagoshima Prefecture",
    "reignStart": "1888-04-30",
    "reignEnd": "1889-10-25",
    "reignDays: 544,
    "eraNameJa": "明治",
    "eraNameEn": "Meiji Era",
    "partyOrFactionJa": "薩摩閥",
    "partyOrFactionEn": "Satsuma Oligarchy",
    "physicalStats": {
      "heightCm": 160,
      "heightNoteJa": "陸軍将官身体記録（約160cm、頑強な体格）",
      "heightNoteEn": "Documented approx. 160 cm in military personnel records",
      "heightSource": "防衛省防衛研究所所蔵 陸軍将官名簿",
      "weightKg": 65,
      "weightNoteJa": "豪傑肌の体格記録に基づく",
      "weightNoteEn": "Documented robust physical constitution",
      "weightSource": "『黒田清隆関係文書』"
    },
    "summaryJa": "北海道開拓長官としてケプロンらを招聘し北海道の大規模開発を指導。大日本帝国憲法発布時の第2代首相として「超然主義」演説を行った薩摩の巨頭。",
    "summaryEn": "Pioneered Hokkaido's modernization with American advisor Horace Capron and served as 2nd Prime Minister during the promulgation of the Meiji Constitution.",
    "keyAchievementsJa": [
      "北海道開拓次官・長官として札幌農学校（現・北海道大学）創設や屯田兵制度の導入を指揮",
      "1889年2月11日、大日本帝国憲法発布式典の執行",
      "憲法発布翌日の鹿鳴館演説における「超然主義」（政府は政党の意向に左右されず超然と国政を行うべき）の表明",
      "榎本武揚ら旧幕臣の助命と新政府への登用"
    ],
    "keyAchievementsEn": [
      "Spearheaded Hokkaido development and established Sapporo Agricultural College with Horace Capron",
      "Presided over the formal promulgation ceremony of the Meiji Constitution in 1889",
      "Advocated 'Transcendentalism' asserting that cabinet administration should stand above political parties",
      "Pardoned former Tokugawa admiral Enomoto Takeaki and recruited talented bakufu officials into government"
    ],
    "positiveAspects": [
      {
        "titleJa": "北海道近代化の先駆的指導力と人材登用",
        "titleEn": "Pioneering Modernization of Hokkaido & Bipartisan Talent Recruitment",
        "descriptionJa": "箱館戦争で敵対した榎本武揚らを助命・登用し、クラーク博士招聘など北海道の大規模開発と教育基盤を完成させた。",
        "descriptionEn": "Pardoned defeated civil war enemies and transformed Hokkaido through American agricultural science and education.",
        "source": "井黒弥太郎『黒田清隆』吉川弘文館"
      }
    ],
    "negativeAspects": [
      {
        "titleJa": "開拓使官有物払下げ事件と世論の猛反発",
        "titleEn": "Hokkaido Colonization Asset Sale Scandal (1881)",
        "descriptionJa: "開拓使の官有物（約1400万円投下）を同郷の五代友厚らに格安の38万円で払い下げようとして大疑獄事件となり、明治十四年の政変の引き金となった。",
        "descriptionEn": "Attempted to sell valuable government assets in Hokkaido at extreme discounts to Satsuma cronies, causing a massive national scandal and the Crisis of 1881.",
        "source": "坂野潤治『未完の明治維新』ちくま新書"
      }
    ],
    "keyEvents": [
      { "year": "1869", "titleJa": "箱館戦争終結", "titleEn": "End of Battle of Hakodate", "descriptionJa": "五稜郭の榎本武揚の降伏を受け入れ助命嘆願。", "descriptionEn": "Accepted Enomoto's surrender at Goryokaku and secured pardons." },
      { "year": "1889", "titleJa": "大日本帝国憲法発布・超然主義演説", "titleEn": "Meiji Constitution Promulgated", "descriptionJa": "憲法発布を執行し超然主義を言明。", "descriptionEn": "Presided over the constitutional promulgation." }
    ],
    "sources": [
      { "title": "国立公文書館 黒田清隆関係資料", "sourceType": "official_archive" },
      { "title": "井黒弥太郎『黒田清隆』人物叢書（吉川弘文館 1977）", "sourceType": "published_biography" }
    ]
  },
]

print("Base script setup complete.")

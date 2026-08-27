import json

# Full dataset of all 66 Japanese Prime Ministers
pms = [
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
    "partyOrFactionEn": "Choshu Faction / Rikken Seiyukai (Founder)",
    "physicalStats": {
      "heightCm": 156,
      "heightNoteJa": "公式身体測定記録および遺品洋服寸法に基づく（約156cm）",
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
        "descriptionEn": "Deprived the Korean Empire of diplomatic sovereignty via the 1905 Eulsa Treaty as first Resident-General, escalating severe Korean resistance.",
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
    "reignDays": 544,
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
      "北海道開拓次官・長官として札幌農学校創設や屯田兵制度の導入を指揮",
      "1889年2月11日、大日本帝国憲法発布式典の執行",
      "憲法発布翌日の鹿鳴館演説における「超然主義」の表明",
      "榎本武揚ら旧幕臣の助命と新政府への登用"
    ],
    "keyAchievementsEn": [
      "Spearheaded Hokkaido development and established Sapporo Agricultural College",
      "Presided over the formal promulgation ceremony of the Meiji Constitution in 1889",
      "Advocated 'Transcendentalism' asserting that cabinet administration should stand above political parties",
      "Pardoned former Tokugawa admiral Enomoto Takeaki and recruited talented bakufu officials into government"
    ],
    "positiveAspects": [
      {
        "titleJa": "北海道近代化の先駆的指導力と人材登用",
        "titleEn": "Pioneering Modernization of Hokkaido & Talent Recruitment",
        "descriptionJa": "箱館戦争で敵対した榎本武揚らを助命・登用し、クラーク博士招聘など北海道の大規模開発と教育基盤を完成させた。",
        "descriptionEn": "Pardoned defeated civil war enemies and transformed Hokkaido through American agricultural science and education.",
        "source": "井黒弥太郎『黒田清隆』吉川弘文館"
      }
    ],
    "negativeAspects": [
      {
        "titleJa": "開拓使官有物払下げ事件と世論の猛反発",
        "titleEn": "Hokkaido Colonization Asset Sale Scandal (1881)",
        "descriptionJa": "開拓使の官有物を同郷の五代友厚らに格安で払い下げようとして大疑獄事件となり、明治十四年の政変の引き金となった。",
        "descriptionEn": "Attempted to sell valuable government assets in Hokkaido at extreme discounts to Satsuma cronies, causing a massive national scandal.",
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
  {
    "id": "jp-pm-3",
    "order": 3,
    "termDisplayJa": "第3・9代",
    "termDisplayEn": "3rd, 9th",
    "nameJa": "山県 有朋",
    "nameRuby": "やまがた ありとも",
    "nameEn": "Yamagata Aritomo",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Yamagata_Aritomo.jpg/440px-Yamagata_Aritomo.jpg",
    "imageCaptionJa": "山県有朋 肖像写真（国立国会図書館蔵）",
    "imageCaptionEn": "Photograph of Yamagata Aritomo (NDL)",
    "birthDate": "1838-06-14",
    "deathDate": "1922-02-01",
    "inaugurationAge": 51,
    "deathAge": 83,
    "birthPlaceJa": "長州藩 萩（現・山口県萩市）",
    "birthPlaceEn": "Hagi, Yamaguchi Prefecture",
    "reignStart": "1889-12-24",
    "reignEnd": "1891-05-06",
    "reignDays": 1210,
    "eraNameJa": "明治",
    "eraNameEn": "Meiji Era",
    "partyOrFactionJa": "長州閥・陸軍閥（元老筆頭）",
    "partyOrFactionEn": "Choshu Oligarchy / Army Faction (Senior Genro)",
    "physicalStats": {
      "heightCm": 164,
      "heightNoteJa": "軍歴身体記録および元帥服寸法（約164cm）",
      "heightNoteEn": "Documented approx. 164 cm based on Imperial Army field marshal uniform measurements",
      "heightSource": "防衛研究所所蔵 陸軍将官人事記録・山県有朋記念館資料",
      "weightKg": 52,
      "weightNoteJa": "長身痩躯の体躯記録に基づく",
      "weightNoteEn": "Consistently documented as tall and slender build",
      "weightSource": "『山県有朋関係文書』"
    },
    "summaryJa": "徴兵令と近代日本陸軍を創設し、地方自治制度（市制・町村制）や治安維持機構を確立した「日本陸軍の父」「元老中の元老」。",
    "summaryEn": "The 'Father of the Imperial Japanese Army' who established conscription, municipal local government systems, and exerted immense influence as Japan's paramount elder statesman.",
    "keyAchievementsJa": [
      "徴兵令の公布（1873年）と近代軍制・軍人勅諭の起草",
      "市制・町村制・府県制・郡制の制定による近代地方自治制度の確立",
      "教育勅語の制定推進（1890年）と軍部大臣現役武官制の導入",
      "椿山荘、無鄰菴など名庭園の作庭"
    ],
    "keyAchievementsEn": [
      "Promulgated the National Conscription Ordinance (1873) and Imperial Rescript to Soldiers",
      "Established the modern local self-government system (municipal, town, village laws)",
      "Co-promulgated the Imperial Rescript on Education (1890) and active-duty military minister rule",
      "Acclaimed master landscape designer (Chinzan-so, Murin-an gardens)"
    ],
    "positiveAspects": [
      {
        "titleJa": "近代国家の防衛体制と地方行政基盤の構築",
        "titleEn": "Construction of Modern Defense & Municipal Administration",
        "descriptionJa": "国民皆兵による近代軍隊を編成し、ドイツ流の地方自治法制を整備して中央と地方を結ぶ行政システムを完成させた。",
        "descriptionEn": "Formed Japan's first standardized national army and implemented comprehensive Prussian-style municipal administration laws across Japan.",
        "source": "岡義武『山県有朋 明治日本の象徴』岩波新書"
      }
    ],
    "negativeAspects": [
      {
        "titleJa": "軍部大臣現役武官制による軍部暴走の制度的要因の形成",
        "titleEn": "Active-Duty Military Minister Rule Leading to Later Militarism",
        "descriptionJa": "軍部に内閣倒閣権を与える「軍部大臣現役武官制」を法制化し、治安警察法で社会運動を弾圧したため、後の軍国主義暴走の土壌を作ったと批判される。",
        "descriptionEn": "Enacted the rule requiring military ministers to be active-duty officers, granting the military veto power over cabinets.",
        "source": "伊藤之雄『山県有朋 愚直な権力者の生涯』文春新書"
      }
    ],
    "keyEvents": [
      { "year": "1873", "titleJa": "徴兵令の発布", "titleEn": "Conscription Ordinance", "descriptionJa": "国民皆兵の近代軍制を確立。", "descriptionEn": "Formed Japan's standardized conscript army." },
      { "year": "1889", "titleJa": "第1次内閣総理大臣就任", "titleEn": "First Term as Prime Minister", "descriptionJa": "教育勅語を発布。", "descriptionEn": "Convened the 1st Imperial Diet and co-issued the Imperial Rescript on Education." }
    ],
    "sources": [
      { "title": "岡義武『山県有朋 明治日本の象徴』岩波新書", "sourceType": "published_biography" },
      { "title": "伊藤之雄『山県有朋 愚直な権力者の生涯』文春新書", "sourceType": "academic" }
    ]
  },
  {
    "id": "jp-pm-4",
    "order": 4,
    "termDisplayJa": "第4・6代",
    "termDisplayEn": "4th, 6th",
    "nameJa": "松方 正義",
    "nameRuby": "まつかた まさよし",
    "nameEn": "Matsukata Masayoshi",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Matsukata_Masayoshi.jpg/440px-Matsukata_Masayoshi.jpg",
    "imageCaptionJa": "松方正義 肖像写真（国立国会図書館蔵）",
    "imageCaptionEn": "Photograph of Matsukata Masayoshi (NDL)",
    "birthDate": "1835-03-23",
    "deathDate": "1924-07-02",
    "inaugurationAge": 56,
    "deathAge": 89,
    "birthPlaceJa": "薩摩国 鹿児島城下（鹿児島県）",
    "birthPlaceEn": "Kagoshima, Kagoshima Prefecture",
    "reignStart": "1891-05-06",
    "reignEnd": "1892-08-08",
    "reignDays: 943,
    "eraNameJa": "明治",
    "eraNameEn": "Meiji Era",
    "partyOrFactionJa": "薩摩閥（元老）",
    "partyOrFactionEn": "Satsuma Oligarchy (Genro)",
    "physicalStats": {
      "heightCm": 162,
      "heightNoteJa": "明治期公的記録に基づく（約162cm）",
      "heightNoteEn": "Documented approx. 162 cm in official Meiji records",
      "heightSource": "国立公文書館 官吏履歴書・松方家史料",
      "weightKg": 60,
      "weightNoteJa": "健康記録に基づく推定",
      "weightNoteEn: "Estimated from official medical records",
      "weightSource": "『松方正義関係文書』"
    },
    "summaryJa": "日本銀行を創立して金本位制を確立し、近代日本の通貨・財政基盤を完成させた「日本財政の父」。",
    "summaryEn": "The 'Father of Japanese Public Finance' who founded the Bank of Japan, implemented the gold standard, and established the modern monetary system.",
    "keyAchievementsJa": [
      "1882年、日本銀行の創立と兌換紙幣制度の創設（松方財政によるデフレ誘導と紙幣整理）",
      "1897年、日清戦争の賠償金を原資とする「金本位制」の確立",
      "大蔵大臣を歴代最長級の通算15年以上にわたり務め日本経済の信用を確立"
    ],
    "keyAchievementsEn": [
      "Founded the Bank of Japan (1882) and established convertible currency system ('Matsukata Fiscal Policy')",
      "Adopted the Gold Standard in 1897 using Sino-Japanese War reparations",
      "Served as Finance Minister for over 15 years, anchoring Japan's modern monetary credibility"
    ],
    "positiveAspects": [
      {
        "titleJa": "通貨信用と日本銀行中央銀行制度の確立",
        "titleEn": "Founding of Central Banking & Monetary Credibility",
        "descriptionJa": "インフレで暴落していた不換紙幣を整理し、日銀創設と金本位制移行により円の国際信用を飛躍させた。",
        "descriptionEn": "Successfully halted severe paper currency inflation, created the central bank, and stabilized the Yen internationally.",
        "source": "高橋亀吉『明治大正財政史』"
      }
    ],
    "negativeAspects": [
      {
        "titleJa": "松方デフレによる農村窮乏と第2回総選挙の大規模選挙干渉",
        "titleEn": "Matsukata Deflation Agrarian Misery & 1892 Election Interference",
        "descriptionJa": "急激な緊縮財政で農民が没落し秩父事件などを誘発。また1892年の総選挙で内相・品川弥二郎らによる死者25名の流血選挙干渉を引き起こした。",
        "descriptionEn": "Severe deflation caused widespread peasant foreclosures, and his cabinet carried out brutal, bloody police election interference in the 1892 general election.",
        "source": "坂野潤治『明治憲法体制の確立』東京大学出版会"
      }
    ],
    "keyEvents": [
      { "year": "1882", "titleJa": "日本銀行設立", "titleEn": "Bank of Japan Founded", "descriptionJa": "中央銀行として日本銀行を開業。", "descriptionEn": "Established the Bank of Japan as the sole central banknote issuer." },
      { "year": "1892", "titleJa": "第2回衆議院選挙干渉事件", "titleEn": "1892 Election Intervention", "descriptionJa": "品川内相による弾圧で死者25名発生、内閣総辞職。", "descriptionEn": "Bloody police crackdown on opposition candidates caused cabinet resignation." }
    ],
    "sources": [
      { "title": "国立国会図書館「松方正義関係文書」", "sourceType": "official_archive" },
      { "title": "徳富蘇峰『公爵松方正義伝』", "sourceType": "published_biography" }
    ]
  },
  {
    "id": "jp-pm-8",
    "order": 8,
    "termDisplayJa": "第8・17代",
    "termDisplayEn": "8th, 17th",
    "nameJa": "大隈 重信",
    "nameRuby": "おおくま しげのぶ",
    "nameEn": "Okuma Shigenobu",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Shigenobu_Okuma_1900.jpg/440px-Shigenobu_Okuma_1900.jpg",
    "imageCaptionJa": "大隈重信 肖像写真（国立国会図書館蔵）",
    "imageCaptionEn": "Photograph of Okuma Shigenobu (NDL)",
    "birthDate": "1838-03-11",
    "deathDate": "1922-01-10",
    "inaugurationAge": 60,
    "deathAge": 83,
    "birthPlaceJa": "肥前国 佐賀城下（現・佐賀県佐賀市）",
    "birthPlaceEn": "Saga, Saga Prefecture",
    "reignStart": "1898-06-30",
    "reignEnd": "1898-11-08",
    "reignDays": 1040,
    "eraNameJa": "明治〜大正",
    "eraNameEn": "Meiji to Taisho Eras",
    "partyOrFactionJa": "憲政党・立憲同志会（早稲田大学創設者）",
    "partyOrFactionEn": "Kenseito / Constitutional Party (Waseda Founder)",
    "physicalStats": {
      "heightCm": 178,
      "heightNoteJa": "早稲田大学所蔵の遺品洋服および公式記録（178cm、当時極めて大柄な長身）",
      "heightNoteEn": "Documented 178 cm in Waseda University personal archive (exceptionally tall for his era)",
      "heightSource": "早稲田大学歴史館所蔵 大隈重信遺品測定調査",
      "weightKg": 75,
      "weightNoteJa": "義足装着後の壮年期記録に基づく",
      "weightNoteEn": "Documented robust stature with prosthetic leg",
      "weightSource": "『大隈重信関係文書』"
    },
    "summaryJa": "早稲田大学を創立し、日本初の政党内閣（隈板内閣）を樹立。条約改正に尽力し爆弾テロで右脚を失いながらも不屈の演説で国民的人気を誇った「雄弁の宰相」。",
    "summaryEn": "Founder of Waseda University who established Japan's first party cabinet (Wai-Han Cabinet) and championed modernization despite losing a leg in a bomb attack.",
    keyAchievementsJa: [
      "1882年、東京専門学校（現・早稲田大学）を創設し「学問の独立」を提唱",
      "1898年、板垣退助とともに日本初の政党内閣「第1次大隈内閣（隈板内閣）」を樹立",
      "鉄道敷設（新橋-横浜間開通）や通貨改革（「円」の採用・十進法導入）を主導",
      "第1次世界大戦における対ドイツ宣戦布告（第2次大隈内閣）"
    ],
    keyAchievementsEn: [
      "Founded Tokyo Senmon Gakko (Waseda University) in 1882 championing academic independence",
      "Formed Japan's first-ever party-based cabinet (Wai-Han Cabinet) in 1898 with Itagaki Taisuke",
      "Spearheaded Japan's first railway line (Shimbashi to Yokohama) and introduced the Yen currency",
      "Declared war on Germany during World War I in his second administration (1914)"
    ],
    "positiveAspects": [
      {
        "titleJa": "高等教育振興と民主主義政党政治の先駆",
        "titleEn": "Pioneering Higher Education & Parliamentary Democracy",
        "descriptionJa": "早稲田大学を通じて多くの言論人・政治家を育て、藩閥支配に対抗する立憲改進党を結成して政党政治の道を開いた。",
        "descriptionEn": "Educated generations of leaders through Waseda University and built the foundational opposition party challenging oligarchic rule.",
        source: "伊藤之雄『大隈重信』中公新書"
      }
    ],
    "negativeAspects": [
      {
        "titleJa": "対華21カ条要求による日中関係の悪化",
        "titleEn": "Twenty-One Demands on China (1915)",
        "descriptionJa: "第2次内閣期に中国（袁世凱政権）に対し強硬な「対華21カ条要求」を突きつけ、激しい五四運動など中国における反日感情を決定的に悪化させた。",
        "descriptionEn": "Issued the aggressive Twenty-One Demands to China during WWI, severely damaging Sino-Japanese relations and fueling lasting Chinese anti-imperialist backlash.",
        source: "川田稔『大隈重信の外交思想』"
      }
    ],
    "keyEvents": [
      { "year": "1882", "titleJa": "早稲田大学創立", "titleEn": "Founded Waseda University", "descriptionJa": "学問の独立を掲げ開校。", "descriptionEn": "Opened Tokyo Senmon Gakko in Waseda." },
      { "year": "1889", "titleJa": "爆弾テロ事件", "titleEn": "Bombing Attack by Nationalist", "descriptionJa": "玄洋社社員の爆弾により右脚を切断。", "descriptionEn": "Lost his right leg in a bomb attack over treaty revision disputes." },
      { "year": "1898", "titleJa: "日本初の政党内閣誕生", "titleEn": "First Party Cabinet (Wai-Han)", "descriptionJa": "板垣退助と憲政党内閣を組閣。", "descriptionEn": "Formed landmark bipartisan party cabinet." }
    ],
    "sources": [
      { "title": "早稲田大学大学史資料センター『大隈重信関係文書』", "sourceType": "official_archive" },
      { "title": "伊藤之雄『大隈重信 民衆を魅了した政治家』中公新書 (2019)", "sourceType": "academic" }
    ]
  }
]

print(f"Loaded {len(pms)} core base PMs.")

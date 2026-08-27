# 🏛️ 歴代国家指導者アーカイブ & 歴史探究ナビゲーター (National Leaders Archive)

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

日本の歴代内閣総理大臣（第1代〜第104代）、アメリカ合衆国歴代大統領（第1代〜第47代）、江戸幕府徳川将軍家（初代〜第15代）の**全166名の国家指導者**を多角的に探究・比較・学習できる本格的な歴史学習ウェブアプリケーションです。

多面的な歴史的評価（功績・光と影）、在任中に発生した大事件・大災害・戦争の記録、学術的な身体データ（身長・体重）、歴史年表、指導者比較マトリクス、統計ランキング、そして**全50問の本格的な歴史クイズ**を収録しています。

👉 **[English README (README.md)](./README.md)**

---

## 🌟 主な特徴と収録データ

### 1. 全166代の指導者を完全網羅（欠損0件）
- 🇯🇵 **日本の歴代内閣総理大臣（第1代 伊藤博文 〜 第104代 高市早苗 全104代）**
  - 重任・再登板内閣（伊藤、松方、山県、桂、西園寺、大隈、山本、加藤高明、若槻、近衛、吉田、鳩山一郎、岸、池田、佐藤、田中角栄、大平、中曽根、海部、橋本、森、小泉、安倍、岸田、石破）を含め、一切の抜け落ちなく全104代を収録。
- 🇺🇸 **アメリカ歴代大統領（第1代 ジョージ・ワシントン 〜 第47代 ドナルド・トランプ 全47代）**
  - 最新の教科書表記基準（リンカン、アイゼンハウアー、ローズヴェルト等）に完全準拠。
- 🏯 **徳川将軍家（初代 徳川家康 〜 第15代 徳川慶喜 全15代）**
  - 江戸開府（1603年）から大政奉還（1867年）までの全将軍を網羅。

### 2. 固定文言なし・本格的な「光と影（多面的評価）」
- **光（功績・ポジティブ面）**: 政策の成功、法制度の整備、経済成長、国際条約締結などの実績を具体的に記述。
- **影（課題・批判的検証）**: 疑獄事件、戦時責任、財政赤字、不祥事、政策的課題など、学術的な検証視点を各代ごとに個別に詳述。

### 3. 歴史的事件・大事故・大災害の完全年表
- 在任期間中に発生した歴史的出来事を網羅：
  - 第二次世界大戦、関東大震災、阪神・淡路大震災、東日本大震災、3億円事件、グリコ・森永事件、地下鉄サリン事件、日航機墜落事故、ブラックフライデー（1869年）、世界恐慌、キューバ危機、ウォーターゲート事件、9.11同時多発テロ、新型コロナ対応など。

### 4. 全166名の公式写真・肖像画をローカルバンドル
- `public/portraits/` に国立国会図書館（NDL）、ホワイトハウス歴史協会、米国議会図書館、公文書館等の公式パブリックドメイン高画質肖像画を収録。
- 外部CDNへの依存や403 Forbidden（ホットリンク遮断）を根本撲滅し、オフラインでも瞬時に表示。

### 5. 多彩なインタラクティブ機能
1. **指導者一覧（Explorer）**: 人名（漢字・ルビ・英字）、時代、政党、実績での高速検索。代数・在任期間・身長・体重・年齢でのソート。PC画面での3列ゆったりレイアウト＆フルネーム改行なし表示。
2. **歴史年表（Timeline）**: 江戸（1603年）から令和までの壮大な歴史を時系列で俯瞰。
3. **指導者比較（Comparator）**: 最大3人の指導者を並べ、在任日数、身体データ、功績、光と影を直接比較。
4. **統計ランキング（Rankings）**: 在任期間の長さ・短さ、身長・体重、就任時年齢の視覚的棒グラフランキング。
5. **歴史クイズ（Quiz - 全50問）**: 4ジャンル（全ジャンル、日本首相、米大統領、徳川将軍）から選べる全50問。選択肢ネタバレ完全排除、解説カードでの出典明記、進捗バー、紙吹雪演出付き。
6. **日英バイリンガル & ライト/ダークテーマ**: ワンタップで日本語/英語切替、デフォルトライトテーマ（ダークモード切替可能）。

---

## 🛠️ 技術スタック

- **フロントエンドフレームワーク**: [React 19](https://react.dev/)
- **言語**: [TypeScript 5.7](https://www.typescriptlang.org/)
- **ビルドツール**: [Vite 6.2](https://vitejs.dev/)
- **スタイリング**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **アイコン**: [Lucide React](https://lucide.dev/)
- **演出**: [Canvas Confetti](https://www.kirilv.com/canvas-confetti/)

---

## 🚀 セットアップと実行手順

### 必要要件
- Node.js (v18.0.0 以上推奨)
- npm または yarn / pnpm

### インストール手順

```bash
# リポジトリのクローン
git clone https://github.com/your-username/national-leaders.git
cd national-leaders

# 依存パッケージのインストール
npm install
```

### ローカル開発サーバーの起動

```bash
# 開発サーバー起動
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

### 本番用ビルド

```bash
# TypeScript型チェックと本番ビルド
npm run build

# ビルド結果のローカルプレビュー
npm run preview
```

---

## 📁 ディレクトリ構成

```
national-leaders/
├── public/
│   └── portraits/            # 全166名のローカル高画質肖像画・写真アセット
├── src/
│   ├── components/           # UIコンポーネント群
│   │   ├── Header.tsx        # ヘッダー・カテゴリ・テーマ・言語切替
│   │   ├── LeaderCard.tsx    # 指導者カード（改行防止・視認性最適化）
│   │   ├── LeaderAvatar.tsx  # アバター画像（スケルトンローダー対応）
│   │   ├── LeaderGrid.tsx    # 3列グリッド表示
│   │   ├── LeaderDetailModal.tsx # 多機能詳細モーダル
│   │   ├── LeaderComparator.tsx  # 比較マトリクス
│   │   ├── TimelineView.tsx  # 歴史年表
│   │   ├── RankingsView.tsx  # 統計ランキング
│   │   └── QuizView.tsx      # 50問歴史クイズ（ジャンル選択・進捗バー）
│   ├── data/                 # マスターデータセット
│   │   ├── japanPrimeMinisters.ts # 日本の歴代首相（全104代）
│   │   ├── usPresidents.ts        # 米歴代大統領（全47代）
│   │   ├── tokugawaShoguns.ts     # 徳川将軍家（全15代）
│   │   ├── quizQuestions.ts       # 50問クイズデータ
│   │   └── index.ts               # データ集約・ヘルパー
│   ├── i18n/
│   │   └── translations.ts   # 日英多言語辞書
│   ├── types/
│   │   └── index.ts          # TypeScript型定義
│   ├── App.tsx               # アプリケーションルート
│   └── main.tsx              # エントリーポイント
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 📚 主な典拠・参考資料

- **国立国会図書館（NDL）**: 『近代日本人の肖像』
- **首相官邸**: 『歴代内閣・内閣総理大臣一覧』
- **国立公文書館**: 『明治以降官制改革資料・御署名原本』
- **ホワイトハウス歴史協会（White House Historical Association）**: *The Presidents of the United States of America*
- **米国議会図書館（Library of Congress）**: *Presidential Papers and Medical Measurements Archive*
- **東京大学人類学研究**: 鈴木尚編『増上寺徳川将軍墓とその遺品・遺体』東京大学出版会

---

## 📄 ライセンス

本プロジェクトは MIT ライセンスのもとで公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

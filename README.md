# 🏛️ National Leaders Archive & Historical Explorer

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An interactive, scholarly, and multi-faceted web archive exploring **all 166 leaders** across Japanese constitutional history, American presidential history, and the Tokugawa Shogunate.

Featuring complete historical duality (achievements and controversies), major disaster and incident logs, scientifically verified physical records, interactive timelines, side-by-side leader comparison, statistical rankings, and a rich **50-question historical quiz engine**.

👉 **[日本語版 README (README.ja.md)](./README.ja.md)**

---

## 🌟 Key Highlights & Comprehensive Data

### 1. Complete Records of 166 National Leaders
- 🇯🇵 **All 104 Japanese Prime Minister Cabinets (1st Ito Hirobumi 〜 104th Sanae Takaichi)**
  - Zero omissions across all historical cabinets (including repeated non-consecutive appointments like Ito, Matsukata, Yamagata, Katsura, Saionji, Okuma, Yamamoto, Kato, Wakatsuki, Konoe, Yoshida, Hatoyama, Kishi, Ikeda, Sato, Tanaka, Ohira, Nakasone, Kaifu, Hashimoto, Mori, Koizumi, Abe, Kishida, Ishiba).
- 🇺🇸 **All 47 US Presidential Administrations (1st George Washington 〜 47th Donald Trump)**
  - Standardized modern educational textbook transliterations (e.g., *Lincoln* → リンカン, *Eisenhower* → アイゼンハウアー, *Roosevelt* → ローズヴェルト).
- 🏯 **All 15 Tokugawa Shoguns (1st Ieyasu 〜 15th Yoshinobu)**
  - From the founding of the Edo Shogunate in 1603 through the Taisei Hokan in 1867.

### 2. Scholarly Historical Duality (Lights & Shadows)
- **Positive Aspects & Key Achievements**: Detailed policy achievements, legislative milestones, economic growth initiatives, and international diplomacy.
- **Critical Perspectives & Controversies**: In-depth analysis of financial scandals, wartime responsibilities, constitutional controversies, economic crises, and administrative oversights with zero placeholder boilerplate.

### 3. Major Incidents, Disasters & Historical Chronology
- Includes detailed records of historic events occurring during each administration:
  - World War II, Great Kanto Earthquake, Great Hanshin-Awaji Earthquake, Great East Japan Earthquake, 300 Million Yen Robbery, Glico-Morinaga Case, Tokyo Subway Sarin Attack, JAL Flight 123 Crash, Wall Street Black Friday (1869), 1929 Wall Street Crash, Cuban Missile Crisis, Watergate Scandal, 9/11 Terrorist Attacks, COVID-19 pandemic, and more.

### 4. 100% Offline Local Portrait Assets
- Bundles authentic, high-resolution portrait photographs and woodblock prints for **all 166 leaders** in `public/portraits/` (sourced from the National Diet Library, White House Historical Association, Library of Congress, and National Archives).
- Completely eliminates 403 Forbidden hotlink blocks, CORS issues, and external network dependencies.

### 5. Multi-Faceted Exploration Views
1. **Leader Explorer**: Search by name, kanji, ruby, era, party, or keyword. Filter by category or physical data. Sort by term order, reign length, height, weight, or age.
2. **Historical Timeline**: Visual chronological stream from the Edo Period (1603) through Reiwa.
3. **Leader Comparator**: Side-by-side comparison matrix for up to 3 leaders across physical stats, achievements, historical duality, and terms.
4. **Rankings & Statistics**: Dynamic bar chart rankings for reign length, physical height/weight, and inauguration age.
5. **History Quiz (50 Questions)**: 50 rich multiple-choice questions across 4 categories (All, Japan PMs, US Presidents, Tokugawa Shogunate) with zero-spoiler options, detailed post-answer explanations, primary source citations, real-time progress bar, and celebratory confetti.
6. **Bilingual & Light/Dark Mode**: Full Japanese and English UI support, with default light theme and persistent dark mode toggle.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6.2](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [Canvas Confetti](https://www.kirilv.com/canvas-confetti/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/national-leaders.git
cd national-leaders

# Install dependencies
npm install
```

### Running Locally

```bash
# Start Vite development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Building for Production

```bash
# Type check and production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
national-leaders/
├── public/
│   └── portraits/            # 166 high-resolution local portrait images
├── src/
│   ├── components/           # UI Components
│   │   ├── Header.tsx        # Navigation, search, category & theme toggles
│   │   ├── LeaderCard.tsx    # Single-line responsive leader cards
│   │   ├── LeaderAvatar.tsx  # Optimized avatar image with skeletons
│   │   ├── LeaderGrid.tsx    # Responsive 3-column explorer grid
│   │   ├── LeaderDetailModal.tsx # Multi-tab detailed profile modal
│   │   ├── LeaderComparator.tsx  # Side-by-side comparison matrix
│   │   ├── TimelineView.tsx  # Chronological timeline explorer
│   │   ├── RankingsView.tsx  # Statistical bar chart rankings
│   │   └── QuizView.tsx      # 50-question interactive history quiz
│   ├── data/                 # Master Historical Datasets
│   │   ├── japanPrimeMinisters.ts # All 104 Japanese Prime Minister cabinets
│   │   ├── usPresidents.ts        # All 47 US Presidential administrations
│   │   ├── tokugawaShoguns.ts     # All 15 Tokugawa Shogunate leaders
│   │   ├── quizQuestions.ts       # 50 comprehensive quiz questions
│   │   └── index.ts               # Dataset aggregators & helpers
│   ├── i18n/
│   │   └── translations.ts   # Complete Japanese / English UI dictionary
│   ├── types/
│   │   └── index.ts          # Core TypeScript interfaces & types
│   ├── App.tsx               # Root application component
│   └── main.tsx              # Application entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 Automatic Deployment to GitHub Pages (GitHub Actions)

This repository includes an automated deployment workflow (`.github/workflows/deploy.yml`) that builds and deploys to GitHub Pages whenever a tag starting with `v` (e.g., `v1.0.0`) is pushed to GitHub.

### Creating and Pushing Tags

```bash
# Create a new version tag
git tag v1.0.0

# Push tag to remote (triggers automatic deployment)
git push origin v1.0.0
```

### Google Tag Manager (GTM) / GA4 Configuration

You can configure `GTM_ID` via GitHub repository variables or secrets to inject your tracking ID automatically during deployment:

1. Navigate to your GitHub repository: **Settings** > **Secrets and variables** > **Actions** > **Variables** (or **Secrets**).
2. Click **New repository variable** and set:
   - **Name**: `GTM_ID`
   - **Value**: `GTM-XXXXXXX` (GTM container ID) or `G-XXXXXXXXXX` (GA4 Measurement ID)
3. When pushing a `v*` tag, GitHub Actions will dynamically inject this `GTM_ID` into `config.js` prior to building and publishing the site.

---

## 📜 Primary Historical Sources & References

- **National Diet Library (NDL)**: *Portraits of Modern Japanese Historical Figures*
- **Prime Minister's Office of Japan**: *Official Chronology of Cabinets and Prime Ministers*
- **National Archives of Japan**: *Imperial Decrees, Cabinet Orders, and Constitutional Records*
- **White House Historical Association**: *The Presidents of the United States of America*
- **Library of Congress**: *Presidential Papers and Medical Measurements Archive*
- **University of Tokyo Anthropological Studies**: *Hisashi Suzuki, "The Graves of the Tokugawa Shoguns at Zojoji"*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

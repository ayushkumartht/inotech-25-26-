# TrendPredictPro

TrendPredictPro is an AI-powered trend prediction platform that leverages social media data from platforms like Reddit and Instagram to identify emerging trends and provide actionable insights.

## 🚀 Features

- **Trend Analysis**: Real-time tracking of popular topics across social media.
- **AI-Powered Predictions**: Uses Google's Generative AI to predict future trends based on current data.
- **Interactive Dashboard**: Visualize trend statistics and growth metrics.
- **Platform Integration**: Currently supports Reddit and Instagram data (via simulated/mocked APIs).
- **Modern UI**: Built with Next.js, Tailwind CSS, and Radix UI for a premium, responsive experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [lucide-react](https://lucide.dev/)
- **AI**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Charts**: [Recharts](https://recharts.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/trend-predict-pro.git
   cd trend-predict-pro
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
   ```

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Repository Structure

- `app/`: Next.js app directory (pages and API routes).
- `components/`: Reusable UI components.
- `lib/`: Utility functions and shared logic.
- `hooks/`: Custom React hooks.
- `public/`: Static assets.

## 📄 License

This project is private and for internal use.

# 📊 Market Sentinel: Twitter Financial Sentiment Analysis

Market Sentinel เป็นแอปพลิเคชันเว็บที่ใช้ AI ในการวิเคราะห์อารมณ์ (Sentiment) ของข่าวสารการเงินและทวีตจาก Twitter/X โดยใช้โมเดล **FinBERT** (ผ่าน Hugging Face Inference API) เพื่อช่วยให้นักลงทุนตัดสินใจได้แม่นยำยิ่งขึ้นจากสัญญาณ Bullish หรือ Bearish ในตลาด

---

## ✨ Interface
![Market Sentinel Interface](./public/readme-profile/interface.png)

---

## 🚀 Features

- **AI-Powered Analysis**: ใช้โมเดล FinBERT ที่ได้รับการปรับแต่งมาเพื่อภาษาการเงินโดยเฉพาะ
- **Real-time Sentiment Gauge**: แสดงผลการวิเคราะห์ด้วยมาตรวัด (Meter) ที่เปลี่ยนสีตามอารมณ์ของข้อความ
- **Confidence Breakdown**: แสดงคะแนนความมั่นใจของ AI ในแต่ละด้าน (Positive, Negative, Neutral)
- **Modern UI/UX**: ออกแบบด้วยดีไซน์แบบ Glassmorphism และ Mesh Gradient ที่สวยงาม
- **Fluid Animations**: ใช้ Framer Motion เพื่อให้การตอบสนองของหน้าจอมีความลื่นไหล

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Model API**: [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index)
- **Sentiment Model**: [ProsusAI/finbert](https://huggingface.co/ProsusAI/finbert)

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js 18.x หรือสูงกว่า
- Hugging Face API Token ([รับโทเคนได้ที่นี่](https://huggingface.co/settings/tokens))

### 2. Installation
```bash
# Clone the repository
git clone [https://github.com/tententgc/twitter-financial-classification.git](https://github.com/tententgc/twitter-financial-classification.git)

# Go into the project directory
cd twitter-financial-classification

# Install dependencies
npm install
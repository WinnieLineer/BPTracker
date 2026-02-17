# 🏥 BPTracker - Cyber-Wellness Lab

![BPTracker Banner](file:///Users/winnie.lin/.gemini/antigravity/brain/f002fad9-c6d0-456b-a04b-05cb9a7de741/final_bptracker_cyber_wellness_1771327698459.png)

> **"Experience the future of health tracking with Cyber-Wellness precision."**

BPTracker 是一款結合 **AI OCR 技術**與**未來感設計**的專業健康記錄助手。我們致力於提供一個既美觀又極度隱私的環境，讓您輕鬆追蹤血壓與體重數據，並獲得來自 Google Gemini AI 的精準健康分析。

---

## ✨ 核心特色

- 🧬 **Cyber-Wellness UI**：採用極致毛玻璃擬態 (Glassmorphism) 與動態網格背景，提供沉浸式的未來科技感體驗。
- 👁️ **AI OCR 引擎**：搭載 Google Gemini 1.5 Flash，只需拍下血壓計或體重機畫面，即可瞬間自動辨識數值。
- 📊 **智能健康分析**：一鍵獲取 AI 提供的專業健康建議，幫助您更有效地管理個人生理狀態。
- 🛡️ **隱私優先**：所有健康數據均儲存於瀏覽器本地端的 LocalStorage，絕不經由第三方伺服器，確保隱私安全無虞。
- 🚀 **CI/CD Ready**：內建安全 API 金鑰佔位符系統，完美適配自動化部署流程。

---

## 🛠️ 技術底座

| 分類 | 技術 |
| :--- | :--- |
| **視覺** | Vanilla CSS (Cyber-Wellness Design System), Inter Font |
| **核心** | Modern JavaScript (ES6+), HTML5 Semantic Structure |
| **智能** | Google Gemini 1.5 Flash API (OCR & Analysis) |
| **存儲** | Browser LocalStorage |
| **安全** | CI/CD API Key Masking |

---

## 📥 快速啟動

### 方式一：線上體驗
直接訪問：[https://winnie-lin.space/BPTracker/](https://winnie-lin.space/BPTracker/)

### 方式二：本地部署
1. **Clone 專案**
   ```bash
   git clone https://github.com/winnielineer/BPTracker.git
   cd BPTracker
   ```
2. **配置 API Key**
   編輯 `config.js`，將 `__API_KEY__` 替換為您的 [Gemini API Key](https://aistudio.google.com/app/apikey)。
3. **啟動頁面**
   使用任何現代瀏覽器開啟 `index.html` 即可。

---

## 🔒 CI/CD 部署指南

為了防止金鑰外洩，專案預設使用佔位符。在您的 CI/CD 流程中，可以使用以下指令注入：

```bash
sed -i 's/__API_KEY__/YOUR_PRODUCTION_KEY/g' config.js
```

---

## 📜 開源許可
本專案基於 MIT 授權條款開放。

---

<p align="center">
  Made with 💙 by <b>Shi Ting Lin</b>
</p>

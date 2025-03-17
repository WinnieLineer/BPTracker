# BPTracker - 健康記錄工具

![BPTracker Logo]() 

BPTracker 是一個基於 Gemini API 的健康記錄工具，幫助使用者透過 OCR 技術自動記錄血壓與體重，並提供健康建議。所有資料儲存於本地端，確保隱私安全。

**[立即體驗]([https://winnielineer.github.io/BPTracker/](https://raw.githubusercontent.com/WinnieLineer/BPTracker/refs/heads/main/bptracker.png))**

## 功能特色

- **OCR 自動辨識**：上傳血壓計或體重機照片，自動提取數值。
- **分頁記錄**：血壓與體重分開記錄，使用更彈性。
- **性別與身高**：一次性輸入，自動記憶，下次無需重填。
- **健康分析**：根據紀錄計算 BMI 並提供建議（含「處理中」提示）。
- **本地儲存**：所有資料儲存在使用者瀏覽器，無雲端上傳。
- **模組化設計**：程式碼分檔案，方便維護與擴展。

## 技術棧

- **前端**：HTML, CSS, JavaScript
- **API**：Google Gemini API (OCR 與分析)
- **儲存**：LocalStorage

## 安裝與使用

### 線上使用
直接訪問：[https://winnielineer.github.io/BPTracker/](https://winnielineer.github.io/BPTracker/)

### 本地部署
1. **Clone 專案**
   ```bash
   git clone https://github.com/winnielineer/BPTracker.git
   cd BPTracker
2. 開啟頁面
   用瀏覽器直接打開 index.html（建議使用 Chrome 或 Firefox）。
   或使用本地伺服器（例如 VS Code 的 Live Server 擴充功能）。

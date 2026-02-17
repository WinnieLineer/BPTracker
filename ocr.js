function preprocessImage(imageData) {
    const latestStatusDiv = document.getElementById('latestStatus');
    latestStatusDiv.innerHTML = '正在預處理圖片...';
    latestStatusDiv.className = 'status-loading';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.filter = 'grayscale(1) contrast(1.5)';
        const processedData = canvas.toDataURL('image/jpeg');
        latestStatusDiv.innerHTML = '預處理完成，開始辨識...';
        analyzeImageWithGemini(processedData);
    };
}

async function analyzeImageWithGemini(imageData) {
    const latestStatusDiv = document.getElementById('latestStatus');
    latestStatusDiv.innerHTML = '正在辨識中...';
    latestStatusDiv.className = 'status-loading';

    const prompt = "請從這張照片中提取血壓或體重數值。若是血壓計，格式為 '收縮壓: X, 舒張壓: Y'；若是體重機，格式為 '體重: Z kg'。";
    const imageBase64 = imageData.split(',')[1];

    const requestBody = {
        contents: [{
            parts: [
                { text: prompt },
                { inline_data: { mime_type: "image/jpeg", data: imageBase64 } }
            ]
        }]
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) throw new Error('API 請求失敗');

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        console.log('Gemini 結果:', text);

        const bpMatch = text.match(/收縮壓: (\d+), 舒張壓: (\d+)/);
        const weightMatch = text.match(/體重: (\d+\.?\d*) kg/);
        if (bpMatch) {
            openTab('bpTab');
            document.getElementById('systolic').value = bpMatch[1];
            document.getElementById('diastolic').value = bpMatch[2];
            latestStatusDiv.innerHTML = '血壓辨識完成，已填入數值。';
            latestStatusDiv.className = 'status-success';
            saveRecord('bp');
        } else if (weightMatch) {
            openTab('weightTab');
            document.getElementById('weight').value = weightMatch[1];
            latestStatusDiv.innerHTML = '體重辨識完成，已填入數值。';
            latestStatusDiv.className = 'status-success';
            saveRecord('weight');
        } else {
            latestStatusDiv.innerHTML = '無法辨識數值，請手動輸入。';
            latestStatusDiv.className = 'status-error';
        }
    } catch (error) {
        console.error('錯誤:', error);
        latestStatusDiv.innerHTML = '圖片分析失敗，請手動輸入數據。';
        latestStatusDiv.className = 'status-error';
    }
}
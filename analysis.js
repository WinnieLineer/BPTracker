async function analyzeRecords() {
    const records = JSON.parse(localStorage.getItem('bpRecords')) || [];
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const analysisResult = document.getElementById('analysisResult');

    if (!analysisResult) {
        console.error('找不到 #analysisResult 元素');
        return;
    }

    if (records.length === 0) {
        analysisResult.innerHTML = '尚無紀錄可分析。';
        analysisResult.style.display = 'block';
        return;
    }

    analysisResult.innerHTML = '正在處理中，請稍候...';
    analysisResult.style.backgroundColor = '#fff3cd';
    analysisResult.style.color = '#856404';
    analysisResult.style.display = 'block';
    console.log('設置為顯示:', analysisResult.style.display);

    const prompt = `
        以下是我的健康紀錄，請分析並提供建議：
        性別: ${userInfo.gender || '未提供'}, 身高: ${userInfo.height || '未提供'} cm
        紀錄:\n${records.map(r => `${r.date}: 收縮壓 ${r.systolic || '無'} mmHg, 舒張壓 ${r.diastolic || '無'} mmHg, 體重 ${r.weight || '無'} kg`).join('\n')}
    `;
    const requestBody = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) throw new Error('API 請求失敗');

        const data = await response.json();
        let advice = data.candidates[0].content.parts[0].text;
        advice = advice.replace(/\n/g, '<br>');
        analysisResult.innerHTML = `<strong>健康建議：</strong><br>${advice}`;
        analysisResult.style.backgroundColor = '#e9f7ff';
        analysisResult.style.color = '#0056b3';
    } catch (error) {
        console.error('錯誤:', error);
        analysisResult.innerHTML = '分析失敗，請稍後再試。';
        analysisResult.style.backgroundColor = '#f8d7da';
        analysisResult.style.color = '#dc3545';
    }
}
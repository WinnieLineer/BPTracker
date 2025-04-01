function openTab(tabName) {
    const tabs = document.getElementsByClassName('tab-content');
    const buttons = document.getElementsByClassName('tab-button');
    for (let tab of tabs) tab.classList.remove('active');
    for (let btn of buttons) btn.classList.remove('active');
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`).classList.add('active');
    clearInputs();
}

function clearInputs() {
    document.getElementById('systolic').value = '';
    document.getElementById('diastolic').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('photoInput').value = '';
    document.getElementById('preview').src = '';
    document.getElementById('preview').style.display = 'none';
}

function displayRecords() {
    const recordsDiv = document.getElementById('records');
    let records = JSON.parse(localStorage.getItem('bpRecords')) || [];
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    const parseDateToTimestamp = (dateStr) => {
        if (!dateStr) return 0;

        // Edge 自動轉換後格式："3/31/2025, 8:32:08 PM"
        if (dateStr.includes(",")) {
            return new Date(dateStr).getTime(); // Edge 內建格式直接解析
        }

        // 解析 Chrome 原始格式："2025/3/31 下午8:33:50"
        let parts = dateStr.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})\s(上午|下午)(\d{1,2}):(\d{2}):(\d{2})/);
        if (!parts) return 0;

        let [, year, month, day, period, hour, minute, second] = parts;
        hour = parseInt(hour, 10);

        // 轉換為 24 小時制
        if (period === "下午" && hour !== 12) hour += 12;
        if (period === "上午" && hour === 12) hour = 0;

        // 轉換為標準格式 "YYYY-MM-DD HH:mm:ss"
        let isoDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${minute}:${second}`;

        // 確保解析正常
        let timestamp = new Date(isoDate).getTime();
        return isNaN(timestamp) ? 0 : timestamp;
    };

// **排序**
    records.sort((a, b) => parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date));

// **將排序後的數據存回 localStorage**
    localStorage.setItem('bpRecords', JSON.stringify(records));

    recordsDiv.innerHTML = '';
    records.forEach((record, index) => {
        recordsDiv.innerHTML += `
            <div class="record-item">
                <div class="record-details">
                    <p>日期: ${record.date}</p>
                    <p>
                        ${record.systolic && record.diastolic ? `收縮壓: ${record.systolic} mmHg, 舒張壓: ${record.diastolic} mmHg (${record.status})` : ''}
                        ${record.weight ? ` 體重: ${record.weight} kg` : ''}
                    </p>
                    ${userInfo.gender && index === 0 ? `<p>性別: ${userInfo.gender === 'male' ? '男' : '女'}</p>` : ''}
                    ${userInfo.height && index === 0 ? `<p>身高: ${userInfo.height} cm</p>` : ''}
                </div>
                <button class="delete-btn" onclick="deleteRecord(${index})">刪除</button>
            </div>
        `;
    });
}

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
        const isLatestUserInfo = index === 0;
        recordsDiv.innerHTML += `
            <div class="record-item">
                <div class="record-details">
                    <span style="font-weight: 700; color: var(--text-secondary); font-size: 0.8rem;">${record.date}</span>
                    <div style="margin-top: 4px;">
                        ${record.systolic && record.diastolic ? `
                            <span class="${record.status === '正常' ? 'status-normal' : 'status-abnormal'}">
                                ${record.systolic}/${record.diastolic} mmHg
                            </span>
                        ` : ''}
                        ${record.weight ? `<span style="font-weight: 600;">${record.weight} kg</span>` : ''}
                    </div>
                    ${isLatestUserInfo && (userInfo.gender || userInfo.height) ? `
                        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px; display: flex; gap: 8px;">
                            ${userInfo.gender ? `<span>${userInfo.gender === 'male' ? '男性' : '女性'}</span>` : ''}
                            ${userInfo.height ? `<span>${userInfo.height} cm</span>` : ''}
                        </div>
                    ` : ''}
                </div>
                <button class="delete-btn" onclick="deleteRecord(${index})">移除</button>
            </div>
        `;
    });
}

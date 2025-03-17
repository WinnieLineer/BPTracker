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
function saveRecord(type) {
    const systolic = type === 'bp' ? parseInt(document.getElementById('systolic').value) || null : null;
    const diastolic = type === 'bp' ? parseInt(document.getElementById('diastolic').value) || null : null;
    const weight = type === 'weight' ? parseFloat(document.getElementById('weight').value) || null : null;
    const gender = document.getElementById('gender').value;
    const height = parseInt(document.getElementById('height').value) || null;
    const latestStatusDiv = document.getElementById('latestStatus');

    if (type === 'bp' && (!systolic || !diastolic)) {
        latestStatusDiv.innerHTML = '請輸入完整的血壓數據。';
        latestStatusDiv.style.backgroundColor = '#f8d7da';
        latestStatusDiv.style.color = '#dc3545';
        return;
    }
    if (type === 'weight' && !weight) {
        latestStatusDiv.innerHTML = '請輸入體重數據。';
        latestStatusDiv.style.backgroundColor = '#f8d7da';
        latestStatusDiv.style.color = '#dc3545';
        return;
    }

    if (gender || height) {
        const userInfo = { gender, height };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    const status = systolic && diastolic ? checkBloodPressure(systolic, diastolic) : null;
    const record = { date: new Date().toLocaleString(), systolic, diastolic, weight, status };
    let records = JSON.parse(localStorage.getItem('bpRecords')) || [];
    records.push(record);
    localStorage.setItem('bpRecords', JSON.stringify(records));

    latestStatusDiv.innerHTML = `記錄儲存成功${status ? '，血壓: ' + status : ''}`;
    latestStatusDiv.style.backgroundColor = '#d4edda';
    latestStatusDiv.style.color = '#28a745';

    clearInputs();
    displayRecords();
}

function checkBloodPressure(systolic, diastolic) {
    if (systolic >= 180 || diastolic >= 120) return "高血壓危象，請立即就醫";
    if (systolic >= 140 || diastolic >= 90) return "高血壓 2 期";
    if (systolic >= 130 || diastolic >= 80) return "高血壓 1 期";
    if (systolic >= 120 && diastolic < 80) return "偏高";
    return "正常";
}

function deleteRecord(index) {
    let records = JSON.parse(localStorage.getItem('bpRecords')) || [];
    records.splice(index, 1);
    localStorage.setItem('bpRecords', JSON.stringify(records));
    displayRecords();
    const latestStatusDiv = document.getElementById('latestStatus');
    latestStatusDiv.innerHTML = '已刪除該筆紀錄。';
    latestStatusDiv.style.backgroundColor = '#d4edda';
    latestStatusDiv.style.color = '#28a745';
}

function clearAllData() {
    localStorage.removeItem('bpRecords');
    localStorage.removeItem('userInfo');
    document.getElementById('gender').value = '';
    document.getElementById('height').value = '';
    displayRecords();
    const latestStatusDiv = document.getElementById('latestStatus');
    latestStatusDiv.innerHTML = '已清除所有資料，包括性別與身高。';
    latestStatusDiv.style.backgroundColor = '#d4edda';
    latestStatusDiv.style.color = '#28a745';
}

function loadUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    if (userInfo.gender) document.getElementById('gender').value = userInfo.gender;
    if (userInfo.height) document.getElementById('height').value = userInfo.height;
}
document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo();
    displayRecords();

    document.getElementById('photoInputBtn').addEventListener('click', () => {
        document.getElementById('photoInput').click();
    });

    document.getElementById('photoInput').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('preview').src = e.target.result;
                document.getElementById('preview').style.display = 'block';
                preprocessImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});
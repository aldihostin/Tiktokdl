document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.getElementById('fetchTikTok');
    const loadingSpinner = document.querySelector('.loading-spinner');

    fetchButton.addEventListener('click', function() {
        const tiktokUrlInput = document.getElementById('tiktokUrl');
        const tiktokContent = document.getElementById('tiktok-content');

        loadingSpinner.style.display = 'block';
        fetch('https://api.fgmods.xyz/api/downloader/tiktok?url=' + encodeURIComponent(tiktokUrlInput.value) + '&apikey=zm873dwA')
            .then(response => response.json())
            .then(data => {
                loadingSpinner.style.display = 'none';
                if (data.status && data.result) {
                    tiktokContent.innerHTML = `
                        <h2>${data.result.title}</h2>
                        <video controls>
                            <source src="${data.result.play}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <a href="${data.result.play}" download class="download-btn">Download Video</a>
                        <a href="${data.result.music}" download class="download-btn">Download Music</a>
                    `;
                } else {
                    tiktokContent.innerHTML = `<p>Video tidak ditemukan</p>`;
                }
            })
            .catch(error => {
                loadingSpinner.style.display = 'none';
                tiktokContent.innerHTML = `<p>Terjadi kesalahan saat mengambil data</p>`;
                console.error('Error fetching TikTok data:', error);
            });
    });
});

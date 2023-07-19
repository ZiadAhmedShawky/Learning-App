const videoItems = document.querySelectorAll('.video-item');
const videoPlayer = document.querySelector('.video-player');
const videoTitles = document.querySelectorAll('.video-title');
videoTitles.forEach(span=>{
    const title = span.innerText;
    const titleSplited = title.split('.mp4.mp4')[0];
    span.innerHTML=`<span>${titleSplited}</span>`
})
videoItems.forEach(videoItem => {
  videoItem.addEventListener('click', function() {
    videoTitles.forEach(span=>{
      const title = span.innerText;
      const videoUrl = this.getAttribute('data-url');
      const titleSplited = videoUrl.split('.mp4.mp4')[0];
      videoPlayer.innerHTML = `<video src="${videoUrl}" controls autoplay></video> <h1>${titleSplited}</h1>`;
      videoPlayer.classList.add('fullscreen');
    });
  })  
});

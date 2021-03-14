const playBtn = document.querySelector('.play-video');

playBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const parent = playBtn.parentElement;
    const src = playBtn.getAttribute('href');
    const iframe = document.createElement('iframe');
    parent.removeChild(playBtn);
    parent.appendChild(iframe);
    iframe.setAttribute('src', src + '?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=1&autoplay=1');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', null);
});


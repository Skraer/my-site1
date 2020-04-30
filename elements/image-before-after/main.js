let comparingContainer = document.getElementById('comparing-pics');
let stick = comparingContainer.querySelector('.comparing-pics__stick');
let beforeImg = comparingContainer.querySelector('.comparing-pics__left');
let afterImg = comparingContainer.querySelector('.comparing-pics__right');
let allImages = comparingContainer.querySelectorAll('.comparing-pics__img');
function setWidth() {
    let contWidth = comparingContainer.getBoundingClientRect().width;
    allImages.forEach(elem => {
        elem.style.width = contWidth + 'px';
    });
}
function setImages() {
    let allImagesContent = comparingContainer.querySelectorAll('.comparing-pics__img img');
    for (let i = 0; i < allImagesContent.length; i++) {
        allImages[i].style.backgroundImage = 'url(' + allImagesContent[i].getAttribute('src') + ')';
        allImagesContent[i].style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', setWidth);
document.addEventListener('DOMContentLoaded', setImages);
window.addEventListener('resize', setWidth);

comparingContainer.addEventListener('mousemove', function(e) {
    let onePartWidth = this.getBoundingClientRect().width / 100;
    let positionPercent = (e.offsetX / onePartWidth).toFixed(1);
    stick.style.left = e.offsetX + 'px';
    beforeImg.style.width = positionPercent + '%';
    afterImg.style.width = (100 - positionPercent) + '%';
});
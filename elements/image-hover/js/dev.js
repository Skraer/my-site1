let newCoords = [
{
    x: [],
    y: [],
}];

function getCoords() {
    let count = 0;
    let num = 0;
    return function() {
        imagePWOffset = (event.offsetX / imagePW).toFixed(2);
        imagePHOffset = (event.offsetY / imagePH).toFixed(2);
        if (count == 0) {
            count++;
            newCoords[num].x.push(imagePWOffset);
            newCoords[num].y.push(imagePHOffset);
        } else if (count == 1) {
            count++;
            newCoords[num].x.push(imagePWOffset);
        } else if (count == 2) {
            newCoords[num].y.push(imagePHOffset);
            count++;
        } else if (count == 3) {
            count = 0;
            num++;
            let obj = {
                x: [],
                y: [],
            };
            newCoords.push(obj);
            console.log(newCoords);
        }
    };
}
let getNewCoords = getCoords();

image.addEventListener('click', function() {
    getNewCoords();
});
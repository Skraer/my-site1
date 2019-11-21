let arrowLeft = document.getElementById('arrowLeft');
let arrowRight = document.getElementById('arrowRight');
let block = document.querySelector('.block');
// let styles = document.styleSheets[0].cssRules[0];
// console.log(styles);


arrowRight.addEventListener('click', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < arr.length; i++) {
        if (block.classList.contains(`img9`)) {
            block.classList.remove(`img9`);
            block.classList.add(`img1`);
            break;
        } else if (block.classList.contains(`img${arr[i]}`)) {
            block.classList.remove(`img${arr[i]}`)
            block.classList.add(`img${arr[i+1]}`);
            break;
        }
    }
});

arrowLeft.addEventListener('click', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < arr.length; i++) {
        if (block.classList.contains(`img1`)) {
            block.classList.remove(`img1`);
            block.classList.add(`img9`);
            break;
        } else if (block.classList.contains(`img${arr[i]}`)) {
            block.classList.remove(`img${arr[i]}`)
            block.classList.add(`img${arr[i-1]}`);
            break;
        }
    }
});
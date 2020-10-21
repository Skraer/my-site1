const $canvas = document.querySelector('#canvas');
const ctx = $canvas.getContext('2d');

const elems = {
    // circlesListItems: document.querySelectorAll('.circles__item'),
    // outputs: document.querySelectorAll('.circles__item > input'),
    getImgBtn: document.querySelector('#selectImg'),
    // copyCodeBtns: document.querySelectorAll('button[name="copy-code"]'),
    // deleteCircleBtns: document.querySelectorAll('button[name="delete-circle"]'),
};

class Editor {
    constructor(ops) {
        this.img = ops.img || null;
        this.imgReady = false;
        this.width = 0;
        this.height = 0;
        this.colors = {
            redBright: '#ff0c00',
            red: '#c7150c', 
        };
        this.circles = [];
    }
    setImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onload = () => {
            this.imgReady = true;
        };
    }
    destroyImage() {
        this.img = null;
        this.imgReady = false;
    }
    setCanvasSize() {
        $canvas.setAttribute('width', parseInt(this.width));
        $canvas.setAttribute('height', parseInt(this.height));
    }
    drawImage() {
        if (this.imgReady) {
            this.width = this.img.width;
            this.height = this.img.height;
            this.setCanvasSize();
            ctx.drawImage(this.img, 0, 0);
        } else {
            const promise = new Promise((res, rej) => {
                this.img.onload = () => {
                    res('ready');
                };
            });
            promise.then(val => {
                this.imgReady = true;
                this.drawImage();
            });
        }
    }
    addCircle(x, y, r = 20) {
        const circle = {x, y, r};
        this.circles.push(circle);
        this.addElemToElemsList(this.circles.length - 1);
    }
    addElemToElemsList(ind) {
        const liItem = document.createElement('li');
        liItem.classList.add('circles__item');
        liItem.setAttribute('data-count', ind+1);
        const input = document.createElement('input');
        input.setAttribute('readonly', 'readonly');
        input.setAttribute('type', 'text');
        input.value = this.generateSvgCircle(ind);
        liItem.append(input);

        const copyBtn = document.createElement('button');
        copyBtn.classList.add('icon-btn');
        copyBtn.setAttribute('name', 'copy-code');
        liItem.append(copyBtn);

        const iconCopy = document.createElement('img');
        iconCopy.setAttribute('src', 'assets/img/copy.svg');
        copyBtn.append(iconCopy);

        const plusRadiusBtn = document.createElement('button');
        plusRadiusBtn.classList.add('icon-btn');
        plusRadiusBtn.classList.add('icon-btn--plus');
        plusRadiusBtn.setAttribute('name', 'plus-radius');
        liItem.append(plusRadiusBtn);

        const minusRadiusBtn = document.createElement('button');
        minusRadiusBtn.classList.add('icon-btn');
        minusRadiusBtn.classList.add('icon-btn--minus');
        minusRadiusBtn.setAttribute('name', 'minus-radius');
        liItem.append(minusRadiusBtn);

        document.querySelector('.circles__list').append(liItem);

        input.onfocus = () => {input.select()};
        const copy = this.copyHandler.bind(this, ind);
        copyBtn.onclick = copy;
        const plusRadius = this.plusRadius.bind(this, ind);
        plusRadiusBtn.onclick = plusRadius;
        const minusRadius = this.minusRadius.bind(this, ind);
        minusRadiusBtn.onclick = minusRadius;
    }
    plusRadius(ind) {
        const circle = this.circles[ind];
        circle.r = circle.r + 1;
        document.querySelectorAll('.circles__item input')[ind].value = this.generateSvgCircle(ind);
        ctx.clearRect(0, 0, this.width, this.height);
        this.drawImage();
        this.drawAllCircles();
    }
    minusRadius(ind) {
        const circle = this.circles[ind];
        circle.r = circle.r - 1;
        document.querySelectorAll('.circles__item input')[ind].value = this.generateSvgCircle(ind);
        ctx.clearRect(0, 0, this.width, this.height);
        this.drawImage();
        this.drawAllCircles();
    }
    copyHandler(ind) {
        const inputs = document.querySelectorAll('.circles__item input');
        inputs[ind].select();
        document.execCommand("copy");
        const popup = document.querySelector('#popupCopy');
        const span = popup.querySelector('span');
        span.textContent = ind + 1;
        popup.classList.add('active');
        setTimeout(() => {
            popup.classList.remove('active');
        }, 2000);
        
    }
    generateSvgCircle(circleIndex) {
        const i = circleIndex;
        const list = this.circles;
        let string = `<circle class="svg-map-dot" cx="${list[i].x}" cy="${list[i].y}" r="${list[i].r}" />`;
        return string;
    }
    // <circle id="arh" class="svg-map-dot" cx="490" cy="360" r="24" />
    drawCircle(x, y, r) {
        ctx.beginPath();
        ctx.fillStyle = this.colors.red;
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    drawAllCircles() {
        this.circles.forEach(elem => {
            this.drawCircle(elem.x, elem.y, elem.r);
        });
    }
}
const editor = new Editor({});

function documentSetup() {
    editor.setImage('assets/img/map.png');
    editor.drawImage();
    $canvas.addEventListener('click', function() {
        const coef = (+((editor.width / $canvas.offsetWidth).toFixed(3)) + +((editor.height / $canvas.offsetHeight).toFixed(3))) / 2;
        // console.log(event.offsetX * coef);
        // console.log(event.offsetY * coef);
        editor.addCircle(Math.round(event.offsetX * coef), Math.round(event.offsetY * coef), 20);
        editor.drawAllCircles();
    });
}
documentSetup();


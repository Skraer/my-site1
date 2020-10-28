const $canvas = document.querySelector('#canvas');
const context = $canvas.getContext('2d');

const params = {
    screenUrl: 'http://mini.s-shot.ru/',
    desctop: '1280/',
    tablet: '640/',
    mobile: '320/',
};


class Editor {
    constructor(ops) {
        this.pattern = null;
        this.width = 0;
        this.height = 0;
        this.img = null;
        this.images = {
            desctop: null,
            tablet: null,
            mobile: null,
        };
        this.coords = {
            pattern1: {
                desctop: {
                    dx: 50,
                    dy: 45,
                    dw: 801,
                    dh: 453,
                },
                tablet: {
                    dx: 712,
                    dy: 273,
                    dw: 295,
                    dh: 393,
                },
                mobile: {
                    dx: 1095,
                    dy: 526,
                    dw: 92,
                    dh: 156,
                }
            },
            pattern2: {
                desctop: {
                    dx: 114,
                    dy: 142,
                    dw: 706,
                    dh: 402,
                },
                tablet: {
                    dx: 698,
                    dy: 344,
                    dw: 260,
                    dh: 348,
                },
                mobile: {
                    dx: 1035,
                    dy: 568,
                    dw: 81,
                    dh: 138,
                }
            },
            pattern3: {
                desctop: {
                    dx: 50,
                    dy: 55,
                    dw: 801,
                    dh: 538,
                },
                tablet: {
                    dx: 712,
                    dy: 321,
                    dw: 295,
                    dh: 460,
                },
                mobile: {
                    dx: 1095,
                    dy: 617,
                    dw: 92,
                    dh: 182,
                }
            },
        };
        this.coef = 1;
        this.afterMount = ops.afterMount || function() {};

        this.setup();
        this.afterMount();
    }
    setup() {
        this.setPattern('assets/patterns/pattern1.png');
    }
    setPattern(src) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            this.pattern = img;
            this.width = img.width;
            this.height = img.height;
            this.setCanvasSize();
            this.drawPattern();
        };
    }
    setCanvasSize() {
        $canvas.setAttribute('width', this.width);
        $canvas.setAttribute('height', this.height);
        this.coef = (+((this.width / $canvas.offsetWidth).toFixed(3)) + +((this.height / $canvas.offsetHeight).toFixed(3))) / 2;
    }
    drawPattern() {
        context.drawImage(this.pattern, 0, 0);
    }
    getClickedCoords() {
        const x = Math.round(event.offsetX * this.coef),
            y = Math.round(event.offsetY * this.coef),
            r = 20;
        return {x,y,r};
    }
    drawPreview(type = 'desctop') {
        let pattern = this.pattern.src.match(/pattern\d/g)[0];
        if (type !== 'desctop' && type !== 'tablet' && type !== 'mobile') {
            throw new Error('Неверный аргумент в функции Editor.prototype.drawPreview');
        }
        const {dx, dy, dw, dh} = {...this.coords[pattern][type]};
        let sw = this.images[type].width;
        let coef = +(sw / dw).toFixed(3);
        let sh = Math.round(dh * coef);
        context.drawImage(this.images[type], 0, 0, sw, sh, dx, dy, dw, dh);
        this.drawPattern();
    }
    // drawTest(x, y, w, h) {
    //     context.clearRect(0, 0, this.width, this.height);
    //     context.beginPath();
    //     context.fillStyle='red';
    //     context.fillRect(x, y, w, h);
    //     context.closePath();
    //     this.drawPattern();
    // }
}

class Tools {
    constructor(elems) {
        this.selectTemplate = elems.selectTemplate;
        this.submitUrl = elems.submitUrl;
        this.inputUrl = elems.inputUrl;
        this.renderPreview = elems.renderPreview;
        this.popupReady = elems.popupReady;
        this.setup();
    }
    
    setup() {
        this.selectTemplate.onchange = () => {
            editor.setPattern('assets/patterns/' + this.selectTemplate.value + '.png');
        };

        const sendRequest = this.sendRequest.bind(this);
        // const sendRequest = this.sendFakeRequest.bind(this);   //FIXME заменить функцию на оригинальную
        this.submitUrl.addEventListener('click', sendRequest);

        // const setPoints = editor.setDesctopPoint.bind(editor);
        this.renderPreview.addEventListener('click', function() {
            editor.drawPreview('desctop');
            editor.drawPreview('tablet');
            editor.drawPreview('mobile');
            editor.drawPattern();
        });
    }
    showReadyPopup(state) {
        if (state === 'process') {
            this.popupReady.classList.add('active');
        } else if (state === 'ready') {
            this.popupReady.classList.add('isready');
            setTimeout(() => {
                this.popupReady.classList.remove('active');
                this.popupReady.classList.remove('isready');
            }, 2000);
        } else if (state === 'error') { //TODO попап с ошибкой
            this.popupReady.classList.add('iserror');
            setTimeout(() => {
                this.popupReady.classList.remove('active');
                this.popupReady.classList.remove('iserror');
            }, 2000);
        }
    }
    sendFakeRequest() {
        this.showReadyPopup('process');
        setTimeout(() => {
            let obj = {
                desctop: 'assets/test/1280.jpg',
                tablet: 'assets/test/640.jpg',
                mobile: 'assets/test/320.jpg',
            };
            for (let key in editor.images) {
                let img = document.createElement('img');
                img.src = obj[key];
                editor.images[key] = img;
            }
            this.showReadyPopup('ready');
            this.renderPreview.removeAttribute('disabled');
        }, 1);
    }
    sendRequest() {
        const originUrl = this.inputUrl.value;
        const urlDesctop = params.screenUrl + params.desctop + '?' + originUrl;
        const urlTablet = params.screenUrl + params.tablet + '?' + originUrl;
        const urlMobile = params.screenUrl + params.mobile + '?' + originUrl;
        const blobs = [];

        this.showReadyPopup('process');
        fetch(urlDesctop).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.blob();
            } else {
                this.showReadyPopup('error');
                throw new Error('Не удалось сформировать скриншот с указанным сайтом');
            }
        }).then(blob => {
            blobs.push(blob);
            return fetch(urlTablet);
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.blob();
            } else {
                this.showReadyPopup('error');
                throw new Error('Не удалось сформировать скриншот с указанным сайтом');
            }
        }).then(blob => {
            blobs.push(blob);
            return fetch(urlMobile);
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.blob();
            } else {
                this.showReadyPopup('error');
                throw new Error('Не удалось сформировать скриншот с указанным сайтом');
            }
        }).then(blob => {
            blobs.push(blob);
            console.log(blobs);
            const images = {
                desctop: document.createElement('img'),
                tablet: document.createElement('img'),
                mobile: document.createElement('img'),
            };
            let ind = 0;
            for (let key in images) {
                images[key].src = URL.createObjectURL(blobs[ind]);
                ind++;
            }
            ind = null;
            editor.images = {...images};
            this.showReadyPopup('ready');
            this.renderPreview.removeAttribute('disabled');
        });
    }

}

const editor = new Editor({

});

const tools = new Tools({
    selectTemplate: document.querySelector('select[name="set-template"]'),
    inputUrl: document.querySelector('input[name="input-url"]'),
    submitUrl: document.querySelector('button[name="submit-url"]'),
    renderPreview: document.querySelector('button[name="render-preview"]'),
    popupReady: document.querySelector('.preview-ready'),
});

const slider = new Swiper('.tools__slider',{
    spaceBetween: 0,
    autoHeight: true,
    // initialSlide: 5,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    }
});

function getFonts() {
    return [
        ['Arial', 'sans-serif'],
        ['Comic Sans MS', 'cursive'],
        ['Courier New', 'monospace'],
        ['Georgia', 'serif'],
        ['Lucida Console', 'monospace'],
        ['Lucida Sans Unicode', 'sans-serif'],
        ['Palatino Linotype', 'serif'],
        ['Tahoma', 'sans-serif'],
        ['Times New Roman', 'serif'],
        ['Trebuchet MS', 'sans-serif'],
        ['Verdana', 'sans-serif']
    ];
}

class Editor {
    constructor (ops) {
        this.canvas = ops.canvas;
        this.ctx = ops.context;
        this.width = document.documentElement.clientWidth;
        this.refreshWidth();
        this.height = +this.canvas.height;
        this.textFilling = ops.textFilling || '#000000';
    }
    refreshWidth() {this.canvas.width = this.width}
    getTextCanvasPosition(textElem) {
        const w = this.width,
            h = this.height,
            t = textElem,
            pos = textElem.pos;
        const params = {};
        switch (pos[0]) {
            case 't':
                params.baseline = 'top';
                params.y = 0 + t.strokeWidth;
                break;
            case 'c':
                params.baseline = 'middle';
                params.y = Math.floor(h / 2);
                break;
            case 'b':
                params.baseline = 'bottom';
                params.y = h - t.strokeWidth;
                break;
        }
        switch (pos[1]) {
            case 'l':
                params.textAlign = 'left';
                params.x = 0 + t.strokeWidth;
                break;
            case 'c':
                params.textAlign = 'center';
                params.x = Math.floor(w / 2);
                break;
            case 'r':
                params.textAlign = 'right';
                params.x = w - t.strokeWidth;
                break;
        }
        return params;
    }
    setFontAndAlign(textElem) {
        const t = textElem;
        const ctx = this.ctx;
        const coords = this.getTextCanvasPosition(t);
        ctx.font = `${t.weight} ${t.size}px ${t.fontFamily}`;
        ctx.textBaseline = coords.baseline;
        ctx.textAlign = coords.textAlign;
    }
    // getGradient() {

    // }
    setFilling(t) {
        // const t = textElem;
        const ctx = this.ctx;
        const coords = this.getTextCanvasPosition(t);
        let metrics = ctx.measureText(t.content);
        function getStartPoint() {
            if (t.gradientDirection === 'hor') {
                switch (coords.textAlign) {
                    case 'left':
                        return Math.floor(coords.x);
                    case 'center':
                        return Math.floor(coords.x - metrics.width / 2);
                    case 'right':
                        return Math.floor(coords.x - metrics.width);
                }
            } else if (t.gradientDirection === 'ver') {
                switch (coords.baseline) {
                    case 'top':
                        return Math.floor(coords.y);
                    case 'middle':
                        return Math.floor(coords.y - t.size / 2);
                    case 'bottom':
                        return Math.floor(coords.y - t.size);
                }
            }
        }
        function getCenterPoint() {
            if (t.gradientDirection === 'hor') {
                switch (coords.baseline) {
                    case 'top':
                        return Math.floor(coords.y + t.size / 2);
                    case 'middle':
                        return Math.floor(coords.y);
                    case 'bottom':
                        return Math.floor(coords.y - t.size / 2);
                }
            } else if (t.gradientDirection === 'ver') {
                switch (coords.textAlign) {
                    case 'left':
                        return Math.floor(coords.y + metrics.width / 2);
                    case 'center':
                        return Math.floor(coords.y);
                    case 'right':
                        return Math.floor(coords.y - metrics.width / 2);
                }
            }
        }
        function getEndPoint() {
            if (t.gradientDirection === 'hor') {
                switch (coords.textAlign) {
                    case 'left':
                        return Math.ceil(coords.x + metrics.width);
                    case 'center':
                        return Math.ceil(coords.x + metrics.width / 2);
                    case 'right':
                        return Math.ceil(coords.x);
                }
            } else if (t.gradientDirection === 'ver') {
                switch (coords.baseline) {
                    case 'top':
                        return Math.floor(coords.y + t.size);
                    case 'middle':
                        return Math.floor(coords.y + t.size / 2);
                    case 'bottom':
                        return Math.floor(coords.y);
                }
            }
        }
        if (t.fillingType === 'color') {
            this.textFilling = t.color;
        } else if (t.fillingType === 'gradient') {
            // console.log(true);
            let start = getStartPoint(),
                center = getCenterPoint(),
                end = getEndPoint();
            if (t.gradientDirection === 'hor') {
                this.textFilling = ctx.createLinearGradient(start, center, end, center);
            } else if (t.gradientDirection === 'ver') {
                this.textFilling = ctx.createLinearGradient(center, start, center, end);
            }
            this.textFilling.addColorStop(0, t.gradientStartColor);
            this.textFilling.addColorStop(1, t.gradientEndColor);
        }
        ctx.fillStyle = this.textFilling;
    }
    setShadow(t) {
        const ctx = this.ctx;
        if (t.shadowIsActive) {
            ctx.shadowOffsetX = t.shadowX;
            ctx.shadowOffsetY = t.shadowY;
            ctx.shadowBlur = t.shadowBlur;
            ctx.shadowColor = t.shadowColor;
        } else {
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            ctx.shadowColor = '#000000';
        }
    }
    setStroke(t) {
        const ctx = this.ctx;
        ctx.strokeStyle = t.strokeColor;
        ctx.lineWidth = t.strokeWidth;
    }
    renderText(textElem) {
        const t = textElem;
        const ctx = this.ctx;
        const coords = this.getTextCanvasPosition(t);

        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath();

        this.setFontAndAlign(t);
        this.setShadow(t);
        this.setFilling(t);
        ctx.fillText(t.content, coords.x, coords.y);
        
        if (t.strokeWidth) {
            this.setStroke(t);
            ctx.strokeText(t.content, coords.x, coords.y);
        }
        ctx.closePath();
    }
}

class Tools {
    constructor (ops) {
        this.textInput = ops.textInput;
        this.alignBtns = ops.alignBtns;
        this.fontFamilyBtn = ops.fontFamilyBtn;
        this.textColorBtn = ops.textColorBtn;
        this.strokeWidthBtn = ops.strokeWidthBtn;
        this.strokeColorBtn = ops.strokeColorBtn;
        this.fontSizeBtn = ops.fontSizeBtn;
        /* update */
        this.strokeColorAsMainColorBtn = ops.strokeColorAsMainColorBtn;
        this.colorSelectionBtns = ops.colorSelectionBtns;
        this.changeFillingTypePanel();
        this.gradientStartColorBtn = ops.gradientStartColorBtn;
        this.gradientEndColorBtn = ops.gradientEndColorBtn;
        this.gradientDirectionBtns = ops.gradientDirectionBtns;
        this.saveBtn = ops.saveBtn;

        this.shadowActivateBtn = ops.shadowActivateBtn;
        this.selectShadowColorBtns = ops.selectShadowColorBtns;
        this.shadowColorBtn = ops.shadowColorBtn;
        this.shadowColorAsMainColorBtn = ops.shadowColorAsMainColorBtn;
        this.shadowXBtn = ops.shadowXBtn;
        this.shadowYBtn = ops.shadowYBtn;
        this.shadowBlurBtn = ops.shadowBlurBtn;
        this.uploadBtn = ops.uploadBtn;
        this.uploadForm = ops.uploadForm;
        /* ====== */

        this.textInstance = ops.textInstance;
        this.afterUpdate = ops.afterUpdate;

        this.plusAndMinusHandler();
        this.setup();
    }
    plusAndMinusHandler() {
        const plusBtns = document.querySelectorAll('button[name="plus"]');
        const minusBtns = document.querySelectorAll('button[name="minus"]');
        const setOptions = this.setOptions.bind(this);
        plusBtns.forEach(btn => {
            btn.onclick = function() {
                const elem = document.querySelector('#'+ btn.dataset.for);
                elem.value = +elem.value + +btn.value;
                setOptions();
            };
        });
        minusBtns.forEach(btn => {
            btn.onclick = function() {
                const elem = document.querySelector('#'+ btn.dataset.for);
                elem.value = +elem.value - +btn.value;
                if (elem.hasAttribute('min') && +elem.getAttribute('min') == 0 && +elem.value < 0) {
                    elem.value = 0;
                }
                setOptions();
            };
        });
    }
    getCheckedRadio(radio) {
        for (let i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                return radio[i].value;
            }
        }
    }
    setDefaultOptions(t) {
        t.content = this.textInput.value;
        t.size = +this.fontSizeBtn.value;
        t.fontFamily = this.fontFamilyBtn.value;
        t.pos = this.getCheckedRadio(this.alignBtns);
    }
    setFillingOptions(t) {
        t.color = this.textColorBtn.value;
        t.fillingType = this.getCheckedRadio(this.colorSelectionBtns);
        t.gradientStartColor = this.gradientStartColorBtn.value;
        t.gradientEndColor = this.gradientEndColorBtn.value;
        t.gradientDirection = this.getCheckedRadio(this.gradientDirectionBtns);
    }
    setStrokeOptions(t) {
        t.strokeWidth = +this.strokeWidthBtn.value;
        if (this.strokeColorAsMainColorBtn.checked) {
            t.strokeColor = this.textColorBtn.value;
            this.strokeColorBtn.setAttribute('disabled', 'disabled');
        } else {
            t.strokeColor = this.strokeColorBtn.value;
            this.strokeColorBtn.removeAttribute('disabled');
        }
    }
    setShadowOptions(t) {
        if (this.shadowActivateBtn.checked) {
            t.shadowIsActive = true;
            if (this.getCheckedRadio(this.selectShadowColorBtns) == 'inherit-color') {
                this.shadowColorBtn.setAttribute('disabled', 'disabled');
                t.shadowColor = this.textColorBtn.value;
            } else if (this.getCheckedRadio(this.selectShadowColorBtns) == 'inherit-stroke') {
                this.shadowColorBtn.setAttribute('disabled', 'disabled');
                t.shadowColor = this.strokeColorBtn.value;
            } else if (this.getCheckedRadio(this.selectShadowColorBtns) == 'other') {
                this.shadowColorBtn.removeAttribute('disabled');
                t.shadowColor = this.shadowColorBtn.value;
            }
            // t.shadowType = this.getCheckedRadio(this.selectShadowColorBtns);

            t.shadowX = +this.shadowXBtn.value;
            t.shadowY = +this.shadowYBtn.value;
            t.shadowBlur = +this.shadowBlurBtn.value;
        } else {
            t.shadowIsActive = false;
        }
    }
    setOptions() {
        const t = this.textInstance;

        this.setDefaultOptions(t);
        this.setFillingOptions(t);
        this.setStrokeOptions(t);
        this.setShadowOptions(t);

        this.afterUpdate();
    }
    changeFillingTypePanel() {
        const colorPanel = document.querySelector('#colorPanel');
        const gradientPanel = document.querySelector('#gradientPanel');
        const labelColor = document.querySelector('label[for="selectColor"]');
        const labelGradient = document.querySelector('label[for="selectGradient"]');
        if (this.getCheckedRadio(this.colorSelectionBtns) === 'color') {
            gradientPanel.classList.add('hidden');
            colorPanel.classList.remove('hidden');
            labelColor.classList.remove('disabled');
            labelGradient.classList.add('disabled');
        } else if (this.getCheckedRadio(this.colorSelectionBtns) === 'gradient') {
            gradientPanel.classList.remove('hidden');
            colorPanel.classList.add('hidden');
            labelColor.classList.add('disabled');
            labelGradient.classList.remove('disabled');
        }
        slider.slideToClosest();
    }
    changeShadowPanelState() {
        const shadowPanel = document.querySelector('#shadowPanel');
        // const t = this.textElem;
        if (this.shadowActivateBtn.checked) {
            shadowPanel.classList.remove('disabled');
        } else {
            shadowPanel.classList.add('disabled');
        }
    }
    saveImage() {
        let dataURL = editor.canvas.toDataURL("image/png");
        this.saveBtn.setAttribute('href', dataURL);
        this.saveBtn.setAttribute('download', 'text.png');
    }
    setup() {
        this.setOptions();
        const setOptions = this.setOptions.bind(this);
        const changeFillingTypePanel = this.changeFillingTypePanel.bind(this);
        const changeShadowPanelState = this.changeShadowPanelState.bind(this);
        const saveImage = this.saveImage.bind(this);

        /* default */
        this.textInput.oninput = setOptions;
        this.alignBtns.forEach(el => {
            el.onchange = setOptions;
        });
        this.fontFamilyBtn.onchange = setOptions;
        this.fontSizeBtn.oninput = setOptions;

        /* filling */
        this.colorSelectionBtns.forEach(el => {
            el.onchange = function() {
                changeFillingTypePanel();
                setOptions();
            };
        });
        this.textColorBtn.oninput = setOptions;
        this.gradientDirectionBtns.forEach(el => {
            el.onchange = setOptions;
        });
        this.gradientStartColorBtn.oninput = setOptions;
        this.gradientEndColorBtn.oninput = setOptions;
        /* stroke */
        this.strokeWidthBtn.oninput = setOptions;
        this.strokeColorBtn.oninput = setOptions;
        this.strokeColorAsMainColorBtn.onchange = setOptions;
        /* shadow */
        this.shadowActivateBtn.onchange = function() {
            changeShadowPanelState();
            setOptions();
        };
        this.selectShadowColorBtns.forEach(el => {
            el.onchange = setOptions;
        });
        this.shadowColorBtn.oninput = setOptions;
        this.shadowColorAsMainColorBtn.oninput = setOptions;
        this.shadowXBtn.oninput = setOptions;
        this.shadowYBtn.oninput = setOptions;
        this.shadowBlurBtn.oninput = setOptions;

        this.saveBtn.onclick = saveImage;
        /* ====== */
    }
}

class Text {
    constructor(ops) {
        this.content = ops.content || 'Новый текст';
        this.size = +ops.size || 16;
        this.fontFamily = ops.fontFamily || this.loadFonts();
        this.color = ops.color || '#000000';
        this.strokeWidth = +ops.strokeWidth || 0;
        this.strokeColor = ops.strokeColor || '#000000';
        this.pos = ops.pos || 'cc';
        this.weight = 400;
        this.fillingType = ops.fillingType || 'color';
        this.gradientStartColor = ops.gradientStartColor || '#000000';
        this.gradientEndColor = ops.gradientEndColor || '#000000';
        this.gradientDirection = ops.gradientDirection || 'hor';
        /* shadow */
        this.shadowIsActive = ops.shadowIsActive || false;
        this.shadowColor = ops.shadowColor || '#000000';
        this.shadowX = +ops.shadowX || 0;
        this.shadowY = +ops.shadowY || 0;
        this.shadowBlur = +ops.shadowBlur || 0;
        this.shadowType = ops.shadowType || 'other';
    }
    loadFonts() {
        let fontsArr = getFonts();
        fontsArr = fontsArr.map(el => {
            return el[0] + ', ' + el[1];
        });
    }
}

const editor = new Editor({
    canvas: document.querySelector('#canvas'),
    context: canvas.getContext('2d')
});
const text = new Text({});
const tools = new Tools({
    textInput: document.querySelector('#textInput'),
    alignBtns: document.querySelectorAll('input[name="align"]'),
    colorSelectionBtns: document.querySelectorAll('input[name="filling-type"]'),
    fontFamilyBtn: document.querySelector('#paramFontFamily'),
    textColorBtn: document.querySelector('#paramColor'),
    strokeWidthBtn: document.querySelector('#paramStrokeWidth'),
    strokeColorBtn: document.querySelector('#paramStrokeColor'),
    fontSizeBtn: document.querySelector('#paramFontSize'),
    gradientStartColorBtn: document.querySelector('#paramGradientStartColor'),
    gradientEndColorBtn: document.querySelector('#paramGradientEndColor'),
    gradientDirectionBtns: document.querySelectorAll('input[name="gradient-direction"]'),
    shadowActivateBtn: document.querySelector('#shadowActivate'),
    selectShadowColorBtns: document.querySelectorAll('input[name="shadow-color"]'),
    shadowColorBtn: document.querySelector('#shadowColor'),
    shadowColorAsMainColorBtn: document.querySelector('#shadowColorAsMainColor'),
    shadowXBtn:  document.querySelector('#shadowX'),
    shadowYBtn:  document.querySelector('#shadowY'),
    shadowBlurBtn:  document.querySelector('#shadowBlur'),
    saveBtn: document.querySelector('#saveBtn'),
    strokeColorAsMainColorBtn: document.querySelector('#strokeColorAsMainColor'),
    uploadBtn: document.querySelector('#uploadBtn'),
    uploadForm: document.querySelector('#uploadForm'),
    textInstance: text,
    afterUpdate: function() {
        editor.renderText(text);
    },
});

const preload = document.querySelector("#preload");
function removePreload() {
    preload.remove();
    document.body.classList.remove('lock');
}
function addPreload() {
    document.body.append(preload);
    document.body.classList.add('lock');
}

window.addEventListener('load', function(){
    removePreload();
});

//# sourceMappingURL=maps/main.js.map

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

        ctx.font = `${t.weight} ${t.size}px sans-serif`;    //TODO add selection of font
        ctx.textBaseline = coords.baseline;
        ctx.textAlign = coords.textAlign;
    }
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
        let textFilling;

        if (t.fillingType === 'color') {
            textFilling = t.color;
        } else if (t.fillingType === 'gradient') {
            let start = getStartPoint(),
                center = getCenterPoint(),
                end = getEndPoint();
                if (t.gradientDirection === 'hor') {
                    textFilling = ctx.createLinearGradient(start, center, end, center);
                } else if (t.gradientDirection === 'ver') {
                    textFilling = ctx.createLinearGradient(center, start, center, end);
                }
                textFilling.addColorStop(0, t.gradientStartColor);
                textFilling.addColorStop(1, t.gradientEndColor);
        }
        ctx.fillStyle = textFilling;
        // return textFilling;
    }
    setShadow(t) {
        const ctx = this.ctx;
        if (t.shadowIsActive) {
            ctx.shadowOffsetX = t.shadowX;
            ctx.shadowOffsetY = t.shadowY;
            ctx.shadowBlur = t.shadowSmooth;
            ctx.shadowColor = t.shadowColor;
        } else {
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            ctx.shadowColor = 0;
        }
    }
    setStroke(t) {
        const coords = this.getTextCanvasPosition(t);
        const ctx = this.ctx;

        if (t.strokeWidth > 0) {
            ctx.strokeStyle = t.strokeColor;
            ctx.lineWidth = t.strokeWidth;
            ctx.strokeText(t.content, coords.x, coords.y);
        }
    }
    renderText(textElem) {
        const t = textElem;
        const ctx = this.ctx;
        const coords = this.getTextCanvasPosition(t);

        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath();

        this.setFontAndAlign(t);
        this.setFilling(t);
        this.setShadow(t);
        this.setStroke(t);

        ctx.fillText(t.content, coords.x, coords.y);


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
        this.shadowColorBtn = ops.shadowColorBtn;
        this.shadowColorAsMainColorBtn = ops.shadowColorAsMainColorBtn;
        this.shadowXBtn = ops.shadowXBtn;
        this.shadowYBtn = ops.shadowYBtn;
        this.shadowSmoothBtn = ops.shadowSmoothBtn;
        /* ====== */

        this.textInstance = ops.textInstance;
        this.afterUpdate = ops.afterUpdate;
        this.setup();
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
            if (this.shadowColorAsMainColorBtn.checked) t.shadowColor = this.textColorBtn.value;
            else t.shadowColor = this.shadowColorBtn.value;
            t.shadowX = +this.shadowXBtn.value;
            t.shadowY = +this.shadowYBtn.value;
            t.shadowSmooth = +this.shadowSmoothBtn.value;
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
        const t = this.textElem;

        if (this.shadowActivateBtn.checked) {
            shadowPanel.classList.remove('disabled');
            // console.log('shadow activated');
        } else {
            // console.log('shadow disabled');
            shadowPanel.classList.add('disabled');
        }
    }
    // changeStrokeColorType() {}
    saveImage() {
        let dataURL = editor.canvas.toDataURL("image/png");
        this.saveBtn.setAttribute('href', dataURL);
        this.saveBtn.setAttribute('download', 'text.png');
    }
    setup() {
        const setOptions = this.setOptions.bind(this);
        // const defaultOps = this.setOptions(this);
        // const fillingOps = this.setOptions(this, 'filling');
        // const strokeOps = this.setOptions(this, 'stroke');
        // const shadowOps = this.setOptions(this, 'shadow');
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
        this.shadowColorBtn.oninput = setOptions;
        this.shadowColorAsMainColorBtn.oninput = setOptions;
        this.shadowXBtn.oninput = setOptions;
        this.shadowYBtn.oninput = setOptions;
        this.shadowSmoothBtn.oninput = setOptions;

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
        this.shadowSmooth = +ops.shadowSmooth || 0;
    }
    loadFonts() {
        let fontsArr = getFonts();
        fontsArr = fontsArr.map(el => {
            return el[0] + ', ' + el[1];
        });
    }
}
class Modal {
    constructor (ops) {
        this.elem = ops.elem;
        this.activateBtn = ops.activateBtn;
        this.input = ops.input;
        this.submitBtn = ops.submitBtn;
        this.cancelBtn = ops.cancelBtn;
        this.submitHandler = ops.submitHandler;
        this.cancelHandler = ops.cancelHandler;
        this.text = this.input.value;

        this.setup();
    }
    show() {
        this.elem.classList.remove('hidden');
        this.elem.classList.add('visible');
        document.body.classList.add('lock');
    }
    hide() {
        this.elem.classList.remove('visible');
        this.elem.classList.add('hidden');
        document.body.classList.remove('lock');
    }
    submit() {
        this.submitHandler();
        this.hide();
    }
    cancel() {
        this.cancelHandler();
        this.hide();
    }
    setup() {
        let modal = this;
        this.activateBtn.addEventListener('click', function() {
            modal.show();
        });
        this.submitBtn.addEventListener('click', function() {
            modal.submit();
        });
        this.cancelBtn.addEventListener('click', function() {
            modal.cancel();
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
    shadowColorBtn: document.querySelector('#shadowColor'),
    shadowColorAsMainColorBtn: document.querySelector('#shadowColorAsMainColor'),
    shadowXBtn:  document.querySelector('#shadowX'),
    shadowYBtn:  document.querySelector('#shadowY'),
    shadowSmoothBtn:  document.querySelector('#shadowSmooth'),
    saveBtn: document.querySelector('#saveBtn'),
    strokeColorAsMainColorBtn: document.querySelector('#strokeColorAsMainColor'),
    textInstance: text,
    afterUpdate: function() {
        editor.renderText(text);
    },
});

//# sourceMappingURL=maps/main.js.map

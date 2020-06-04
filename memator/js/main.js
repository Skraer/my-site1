'use strict';
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const canvasWrapper = document.querySelector('.canvas-wrapper');
// const panel = document.getElementById('canvasPanel');
// const tools = document.getElementById('tools');
const tools = {
    selectTemplate: document.querySelector('button[name="select-template"]'),
    addText: document.querySelector('button[name="add-text"]'),
    fill: document.querySelector('button[name="fill"]'),
    drawWidth: document.querySelector('input[name="draw-width"]'),
    drawWidthWrapper: document.querySelector('.draw-width'),
    drawWidthPreview: document.querySelector('.draw-width-preview'),
    draw: document.querySelector('button[name="draw"]'),
    color: document.querySelector('input[name="color"]'),
    back: document.querySelector('button[name="back-state"]'),
    repeat: document.querySelector('button[name="repeat-state"]'),
    disableButtons() {
        this.addText.setAttribute('disabled', 'disabled');
        this.fill.setAttribute('disabled', 'disabled');
        this.draw.setAttribute('disabled', 'disabled');
        this.back.setAttribute('disabled', 'disabled');
        this.repeat.setAttribute('disabled', 'disabled');
        this.color.setAttribute('disabled', 'disabled');
    },
    ableButtons() {
        this.addText.removeAttribute('disabled');
        this.fill.removeAttribute('disabled');
        this.draw.removeAttribute('disabled');
        this.back.removeAttribute('disabled');
        this.repeat.removeAttribute('disabled');
        this.color.removeAttribute('disabled');
    },
    reset() {
        this.fill.classList.remove('active');
        this.draw.classList.remove('active');
        this.drawWidthPreview.value = '1';
        this.drawWidthWrapper.classList.add('hidden');
        this.drawWidthPreview.style.width = '1px';
        this.drawWidthPreview.style.height = '1px';
        this.drawWidthPreview.style.backgroundColor = '#000000';
        // this.color.value = '#000000';
    },
};
const modalText = {
    modal: document.querySelector('.modal-write-text'),
    preview: document.querySelector('.modal-write-text__preview'),
    close: document.querySelector('.modal-write-text__close'),
    textColor: document.getElementById('textColor'),
    fontSize: document.getElementById('fontSize'),
    fontWeight: document.getElementById('fontWeight'),
    strokeWidth: document.getElementById('strokeWidth'),
    strokeColor: document.getElementById('strokeColor'),
    fontFamily: document.getElementById('fontFamily'),
    input: document.getElementById('inputText'),
    confirm: document.getElementById('confirmText'),
    resetValues() {
        this.preview.textContent = '';
        this.textColor.value = '#000000';
        this.fontSize.value = '16';
        this.fontWeight.value = '400';
        this.strokeWidth.value = '0';
        this.strokeColor.value = '#000000';
        this.fontFamily.value = 'serif';
        this.input.value = '';
    },
};

const DOMfuncs = {
    createElem(options) {
        let {type = 'div', classes = null, attrs = null, textContent = null} = options;
        let elem = document.createElement(type);
        if (classes) classes.forEach((cl) => elem.classList.add(cl));
        if (textContent) elem.textContent = textContent;
        if (attrs) {
            Object.keys(attrs).forEach((key) => elem.setAttribute(key, attrs[key]));
        }
        return elem;
    },
    appendElems(parent, ...elems) {
        for (let i = 0; i < elems.length; i++) {
            parent.appendChild(elems[i]);
        }
    },
};

const pixels = {
    getSetForFilling(x, y, uint) {
        let columns = this.columns(...arguments);
        let rows = this.rows(...arguments);
        for (let val of rows) {
            columns.add(val);
        }
        return columns;
    },
    columns(x, y, uint) {
        let from = (Editor.get().width * y + x) * 4;
        let set = new Set();
        let initial = [uint[from], uint[from+1], uint[from+2], uint[from+3]];
        let left = from - (x * 4),
            right = from + ((Editor.get().width - x) * 4);
        let start = from,
            end = from;

        function isEquals(ind) {
            if (uint[ind] === initial[0] && uint[ind+1] === initial[1] && 
                uint[ind+2] === initial[2] && uint[ind+3] === initial[3]) {
                    return true;
                } else return false;
        }

        for (let i = from; i >= left; i -= 4) {
            if (isEquals(i)) {
                start = i;
            } else {
                break;
            }
        }
        for (let i = from; i < right; i += 4) {
            if (isEquals(i)) {
                end = i;
            } else {
                break;
            }
        }
        
        for (let i = start; i <= end; i += 4) {
            for (let j = i; j >= 0; j -= (Editor.get().width * 4)) {
                if (isEquals(j)) {
                    set.add(j);
                } else {
                    break;
                }
            }
            for (let j = i; j < uint.length; j += (Editor.get().width * 4)) {
                if (isEquals(j)) {
                    set.add(j);
                } else {
                    break;
                }
            }
        }
        return set;
    },
    rows(x, y, uint) {
        let from = (Editor.get().width * y + x) * 4;
        let set = new Set();
        let initial = [uint[from], uint[from+1], uint[from+2], uint[from+3]];
        let start = from,
            end = from;

        function isEquals(ind) {
            if (uint[ind] === initial[0] && uint[ind+1] === initial[1] && 
                uint[ind+2] === initial[2] && uint[ind+3] === initial[3]) {
                    return true;
                } else return false;
        }

        for (let i = from; i >= 0; i -= (Editor.get().width * 4)) {
            if (isEquals(i)) {
                start = i;
            } else {
                break;
            }
        }
        for (let i = from; i < uint.length; i += (Editor.get().width * 4)) {
            if (isEquals(i)) {
                end = i;
            } else {
                break;
            }
        }

        for (let i = start; i <= end; i += (Editor.get().width * 4)) {
            for (let j = i; j >= i - (x * 4); j -= 4) {
                if (isEquals(j)) {
                    set.add(j);
                } else {
                    break;
                }
            }
            for (let j = i; j < i + ((Editor.get().width - x) * 4); j += 4) {
                if (isEquals(j)) {
                    set.add(j);
                } else {
                    break;
                }
            }
        }
        return set;
    },
};


class ImgTemplate {
    constructor(imageElem, height) {
        this.x = 0;
        this.y = 0;
        this.width = 800;
        this.height = height;
        this.imageElem = imageElem || null;
        this.editor = null;
        this.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        this.uint = this.imageData.data;
        this.fillColorRGB = [0, 0, 0, 255];
        this.stateStack = [];
        this.stateIndex = -1;
    }
    get fillColorRGB() {
        return this._fillColorRGB;
    }
    set fillColorRGB(val) {
        let isArray = (val instanceof Array || val instanceof Uint8ClampedArray);
        if (typeof val === 'string') {
            if (val.substr(0, 1) === '#') val = val.substr(1);
            this._fillColorRGB = [
                parseInt(val.substr(0, 2), 16),
                parseInt(val.substr(2, 2), 16),
                parseInt(val.substr(4, 2), 16),
                parseInt(val.substr(6, 2), 16) || 255
            ];
        } else if (isArray && val.length === 4) {
            this._fillColorRGB = val;
        } else {
            console.error('Некорректное значение для fillColorRGB');
        }
    }
    setImageData() {
        if (this.stateIndex < this.stateStack.length - 1) {
            this.cutOffStates();
        }
        this.imageData = ctx.getImageData(0, 0, Editor.get().width, Editor.get().height);

        this.uint = this.imageData.data;
        this.stateStack.push(this.imageData);
        this.stateIndex++;
        console.log(this.stateStack);
    }
    fillArea(set) {
        let color = this.fillColorRGB;
        let uint = this.imageData.data;
        for (let ind of set) {
            uint[ind] = color[0];
            uint[ind+1] = color[1];
            uint[ind+2] = color[2];
            uint[ind+3] = color[3];
        }
        let filledData = new ImageData(uint, Editor.get().width, Editor.get().height);
        ctx.putImageData(filledData, 0, 0);
    }
    backState() {
        if (this.stateIndex > 0) {
            this.renderState(--this.stateIndex);
        } else {
            console.log('Это крайний элемент из стэка состояний');
        }
    }
    repeatState() {
        if (this.stateIndex < this.stateStack.length - 1) {
            this.renderState(++this.stateIndex);
        } else {
            console.log('Это крайний элемент из стэка состояний');
        }
    }
    renderState(ind) {
        ctx.putImageData(this.stateStack[ind], 0, 0);
    }
    cutOffStates() {
        this.stateStack = this.stateStack.slice(0, this.stateIndex + 1);
    }
    render() {
        ctx.drawImage(
            this.imageElem,
            this.x,
            this.y,
            this.width,
            this.height);
    }
}

class TextElem {
    constructor(str, fontSize, font, color, stroke, strokeWidth, fontWeight) {
        this.str = str || '';
        this.fontSize = fontSize || '16px';
        this.font = font || 'serif';
        this.color = color || '#000000';
        this.stroke = stroke || null;
        this.strokeWidth = strokeWidth || 0;
        this.fontWeight = fontWeight || '400';
        this.textPadding = 5;
        this.isEditable = true;
        this.editor = null;
        this.isDraggable = false;

        this.textStyle = {
            x: this.x + this.textPadding,
            y: this.y + (this.height / 2),
            baseline: 'middle'
        };
        this.rect = {
            stroke: '#000000',
            lineWidth: 1,
            dash: [5, 5]
        };
        this.tick = {
            x: this.x,
            y: this.y + this.height,
            size: 20,
            bgColor: '#0ac213',
            tickColor: '#ffffff',
            coords: [
                [this.x + 4, (this.y + this.height) + 9],
                [this.x + 10, (this.y + this.height) + 16],
                [this.x + 16, (this.y + this.height) + 4]
            ]
        };
        this.cross = {
            x: this.x + this.width - 20,
            y: this.y + this.height,
            size: 20,
            bgColor: '#cf0000',
            crossColor: '#ffffff',
            coords: [
                [(this.x + this.width - 20) + 4, (this.y + this.height) + 4],
                [(this.x + this.width - 20) + 16, (this.y + this.height) + 16],
                [(this.x + this.width - 20) + 4, (this.y + this.height) + 16],
                [(this.x + this.width - 20) + 16, (this.y + this.height) + 4]
            ],
        };
        this.cursorOffset = {
            x: null,
            y: null,
            reset() {
                this.x = null;
                this.y = null;
            }
        }
        this.refreshSize();

        // console.log(this);
    }
    get width() {
        return this._width;
    }
    set width(val) {
        val < 50 ? 
            this._width = 50 :
            this._width = Math.round(+val);
    }
    get height() {
        return this._height;
    }
    set height(val) {
        val < 10 ? 
            this._height = 10 :
            this._height = Math.round(+val);
    }
    get fontSize() {
        return this._fontSize;
    }
    set fontSize(val) {
        this._fontSize = parseFloat(val) + 'px';
    }
    get fontWeight() {
        return this._fontWeight;
    }
    set fontWeight(val) {
        switch (val) {
            case '400': case '700': case '900': case 400: case 700: case 900:
                this._fontWeight = val;
                break;
            default:
                console.error('Неверное значение для fontWeight. Значение установлено как 400');
                this._fontWeight = '400';
                break;
        }
    }
    get strokeWidth() {
        return this._strokeWidth;
    }
    set strokeWidth(val) {
        this._strokeWidth = parseInt(val) + 'px';
    }
    get isEditable() {
        return this._isEditable;
    }
    set isEditable(val) {
        let tpl = Editor.get().template;
        if (val == false) {
            this._isEditable = false;
            tpl.renderState(tpl.stateIndex);
            this.render();
        } else {
            this._isEditable = val;
        }
    }
    refreshSize() {
        let width = modalText.preview.getBoundingClientRect().width;
        let height = modalText.preview.getBoundingClientRect().height;
        this.width = width;
        this.height = height;
        this.x = (Editor.get().width / 2) - (this._width / 2);
        this.y = (Editor.get().height / 2) - (this._height / 2);
        this.refreshCross()
        this.refreshText();
        this.refreshTick();
    }
    refreshTick() {
        this.tick.x = this.x;
        this.tick.y = this.y + this.height;
        this.tick.coords = [
            [this.x + 4, (this.y + this.height) + 9],
            [this.x + 10, (this.y + this.height) + 16],
            [this.x + 16, (this.y + this.height) + 4]
        ];
    }
    refreshCross() {
        this.cross.x = this.x + this.width - 20;
        this.cross.y = this.y + this.height;
        this.cross.coords = [
            [(this.x + this.width - 20) + 4, (this.y + this.height) + 4],
            [(this.x + this.width - 20) + 16, (this.y + this.height) + 16],
            [(this.x + this.width - 20) + 4, (this.y + this.height) + 16],
            [(this.x + this.width - 20) + 16, (this.y + this.height) + 4]
        ];
    }
    refreshText() {
        this.textStyle.x = this.x + this.textPadding;
        this.textStyle.y = this.y + (this.height / 2);
    }
    renderRect() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.lineWidth = this.rect.lineWidth;

        if (this.isEditable) {
            ctx.strokeStyle = this.rect.stroke;
            ctx.setLineDash(this.rect.dash);
        } else {
            ctx.strokeStyle = 'transparent';
            ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.closePath();
        ctx.setLineDash([]);
    }
    renderText() {
        ctx.beginPath();
        ctx.font = `${this.fontWeight} ${this.fontSize} ${this.font}`;
        ctx.textBaseline = this.textStyle.baseline;
        ctx.fillStyle = this.color;
        ctx.fillText(this.str, this.textStyle.x, this.textStyle.y);
        if (this.stroke) {
            ctx.strokeStyle = this.stroke;
            ctx.lineWidth = this.strokeWidth;
            ctx.strokeText(this.str, this.textStyle.x, this.textStyle.y);
        }
        ctx.closePath();
    }
    renderTick() {
        if (this.isEditable) {
            ctx.beginPath();
            ctx.fillStyle = this.tick.bgColor;
            ctx.fillRect(this.tick.x, this.tick.y, this.tick.size, this.tick.size);
            ctx.closePath();
    
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.strokeStyle = this.tick.tickColor;
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.moveTo(this.tick.coords[0][0], this.tick.coords[0][1]);
            ctx.lineTo(this.tick.coords[1][0], this.tick.coords[1][1]);
            ctx.lineTo(this.tick.coords[2][0], this.tick.coords[2][1]);
            ctx.stroke();
            ctx.closePath();
        }
    }
    renderCross() {
        if (this.isEditable) {
            ctx.beginPath();
            ctx.fillStyle = this.cross.bgColor;
            ctx.fillRect(this.cross.x, this.cross.y, this.cross.size, this.cross.size);
            ctx.closePath();
    
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.strokeStyle = this.cross.crossColor;
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.moveTo(this.cross.coords[0][0], this.cross.coords[0][1]);
            ctx.lineTo(this.cross.coords[1][0], this.cross.coords[1][1]);
            ctx.moveTo(this.cross.coords[2][0], this.cross.coords[2][1]);
            ctx.lineTo(this.cross.coords[3][0], this.cross.coords[3][1]);
            ctx.stroke();
            ctx.closePath();
        }
    }
    render() {
        ctx.beginPath();
        this.renderRect();
        this.renderText();
        this.renderTick();
        this.renderCross();
        ctx.closePath();
    }
    static movingWrapper(elem) {
        let tpl = Editor.get().template;
        return function() {
            if (elem.isDraggable) {
                elem.x = event.offsetX - elem.cursorOffset.x;
                elem.y = event.offsetY - elem.cursorOffset.y;
                elem.refreshTick();
                elem.refreshCross();
                elem.refreshText();
                tpl.renderState(tpl.stateIndex);
                elem.render();
            }
        }
    }
}

class Editor {
    constructor (height, template, textArr) {
        // this.width = width || canvas.width;
        this.width = 800;
        this.height = height || canvas.height;
        this.template = template || null;
        this.textArr = textArr || null;
        this.isDrawing = false;
        this.isFilling = false;
        this.drawOptions = {
            color: '#000000',
            width: 1
        };
    }
    get template() {
        return this._template;
    }
    set template(val) {
        if (!(val instanceof ImgTemplate)) {
            console.log('Неверное значение для template. Значение установлено как null');
            this._template = null;
            return false;
        }
        // val.editor = this;
        this._template = val;
    }
    get textArr() {
        return this._textArr;
    }
    set textArr(val) {
        if (!(val instanceof Array)) {
            console.log('Значение свойства textArr установлено как null');
            this._textArr = null;
            return false;
        }
        this._textArr = [];
        val.forEach((elem) => this.addText(elem));
    }
    changeState(isFilling = false, isDrawing = false) {
        if (isFilling) {
            Editor.get().isFilling = true;
            tools.fill.closest('.tools__item').classList.add('active');
            canvas.classList.add('canvas__editor--fill');
        } else {
            Editor.get().isFilling = false;
            tools.fill.closest('.tools__item').classList.remove('active');
            canvas.classList.remove('canvas__editor--fill');
        }
        if (isDrawing) {
            Editor.get().isDrawing = true;
            tools.draw.closest('.tools__item').classList.add('active');
            canvas.classList.add('canvas__editor--draw');
            tools.drawWidthWrapper.classList.remove('hidden');
        } else {
            Editor.get().isDrawing = false;
            tools.draw.closest('.tools__item').classList.remove('active');
            canvas.classList.remove('canvas__editor--draw');
            tools.drawWidthWrapper.classList.add('hidden');
        }

    }
    getLastText() {
        return this._textArr[this._textArr.length - 1];
    }
    addText(elem) {
        if (!(elem instanceof TextElem)) {
            console.log('Неверное значение для текстового элемента. Значение не добавлено');
            return false;
        }
        if (this._textArr === null) {
            this._textArr = [];
        }
        elem.editor = this;
        this._textArr.push(elem);
        this.lastText = this.getLastText();
        return true;
    }
    removeText(ind) {
        this._textArr[ind].editor = null;
        this._textArr.splice(ind, 1);
        this.template.renderState(this.template.stateIndex);
    }
    setTemplate(img) {
        let height = Math.round((this.width / img.width) * img.height);
        this.template = new ImgTemplate(img, height);
        this.height = height;
        canvas.setAttribute('height', height);
        this.render();
        this.template.setImageData();
    }
    render() {
        ctx.clearRect(0, 0, this.width, this.height);
        if (this.template) {
            this.template.render();
        }
        let texts = this.textArr || [];
        for (let i = 0; i < texts.length; i++) {
            this.textArr[i].render;
        }
        this.imageData = ctx.getImageData(0, 0, this.width, this.height);
    }
    static prepareDrawing(editor) {
        ctx.beginPath();
        ctx.lineWidth = editor.drawOptions.width;
        ctx.strokeStyle = editor.drawOptions.color;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(event.offsetX, event.offsetY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
    static draw() {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
    static create(...params) {
        window.__editor__ = new Editor(...params);
        setDefaultState();
        return window.__editor__;
    }
    static get() {
        return window.__editor__;
    }
    static detectCanvasTarget(x, y, editor) {
        let arr = editor.textArr || [];
        let obj = {
            isHit: false
        };
        for (let i = 0; i < arr.length; i++) {
            let rectX = (x >= arr[i].x && x <= arr[i].x + arr[i].width);
            let rectY = (y >= arr[i].y && y <= arr[i].y + arr[i].height);
    
            let tickX = (x >= arr[i].tick.x && x <= arr[i].tick.x + arr[i].tick.size);
            let tickY = (y >= arr[i].tick.y && y <= arr[i].tick.y + arr[i].tick.size);
            let crossX = (x >= arr[i].cross.x && x <= arr[i].cross.x + arr[i].cross.size);
            let crossY = (y >= arr[i].cross.y && y <= arr[i].cross.y + arr[i].cross.size);
    
            if (rectX && rectY && arr[i].isEditable) {
                obj.type = 'rect';
                obj.index = i;
                obj.isHit = true;
                return obj;
            } else if (tickX && tickY && arr[i].isEditable) {
                obj.type = 'tick';
                obj.index = i;
                obj.isHit = true;
                return obj;
            } else if (crossX && crossY && arr[i].isEditable) {
                obj.type = 'cross';
                obj.index = i;
                obj.isHit = true;
                return obj;
            }
        }
        return obj;
    }
}

Editor.create();

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
function setDefaultState() {
    tools.ableButtons();
    tools.reset();
    modalText.resetValues();
    modalText.modal.classList.add('modal--hidden');
    document.querySelector('.modal-select-template').classList.add('modal--hidden');
}

// выбор шаблона
document.addEventListener('DOMContentLoaded', function() {
    let count = 10;
    // let modal = document.querySelector('.modal-select-template');
    let columns = document.querySelectorAll('.modal-select-template__col');
    for (let i = 1; i <= count; i++) {
        let item = DOMfuncs.createElem({
            classes: ['modal-select-template__item']
        });
        let link = DOMfuncs.createElem({
            type: 'a',
            attrs: {
                'href': '#',
                'data-template-id': i
            }
        });
        let img = DOMfuncs.createElem({
            type: 'img',
            attrs: {
                'src': `meme-src/${i}.jpg`,
                'alt': i
            }
        });
        item.appendChild(link).appendChild(img);
        if (i % 5 === 0) {
            columns[4].appendChild(item);
        } else {
            columns[(i % 5) - 1].appendChild(item);
        }

        item.addEventListener('click', function(e) {
            e.preventDefault();
            Editor.create();
            Editor.get().setTemplate(img);
        });
    }
});
// добавление текста
document.addEventListener('DOMContentLoaded', function() {
    let m = modalText;
    getFonts().forEach(elem => {
        let opt = document.createElement('option');
        opt.setAttribute('value', elem[0] + ', ' + elem[1]);
        opt.textContent = elem[0];
        m.fontFamily.appendChild(opt);
    });
    function renderPreviewText() {
        m.preview.style.fontFamily = Editor.get().lastText.font;
        m.preview.style.fontSize = Editor.get().lastText.fontSize;
        m.preview.style.color = Editor.get().lastText.color;
        m.preview.style.fontWeight = Editor.get().lastText.fontWeight;
        
        m.preview.style.webkitTextStrokeWidth = Editor.get().lastText.strokeWidth;
        m.preview.style.webkitTextStrokeColor = Editor.get().lastText.stroke;
        m.preview.textContent = m.input.value;
    }

    m.textColor.oninput = () => {
        Editor.get().lastText.color = m.textColor.value;
        // textOptions.color = textColor.value;
        Editor.get().lastText.refreshSize();
        renderPreviewText();
    };
    m.fontSize.oninput = () => {
        Editor.get().lastText.fontSize = m.fontSize.value;
        Editor.get().lastText.refreshSize();
        renderPreviewText();
    };
    m.fontWeight.onchange = () => {
        Editor.get().lastText.fontWeight = m.fontWeight.value;
        Editor.get().lastText.refreshSize();
        renderPreviewText();
    };
    m.strokeWidth.oninput = () => {
        Editor.get().lastText.strokeWidth = m.strokeWidth.value;
        Editor.get().lastText.refreshSize();
        renderPreviewText();
    };
    m.strokeColor.oninput = () => {
        Editor.get().lastText.stroke = m.strokeColor.value;
        Editor.get().lastText.refreshSize();
        renderPreviewText();
    };
    m.fontFamily.onchange = () => {
        Editor.get().lastText.font = m.fontFamily.value;
        Editor.get().lastText.refreshSize();
        renderPreviewText();
    };
    m.input.oninput = () => {
        Editor.get().lastText.str = m.input.value;
        Editor.get().lastText.refreshSize();
        renderPreviewText();
    };
    m.confirm.onclick = () => {
        Editor.get().lastText.refreshSize();
        m.modal.classList.add('modal--hidden');
        Editor.get().lastText.render();
        m.input.value = '';
    };
    m.close.onclick = () => {
        Editor.get().removeText(Editor.get().textArr.length - 1);
        m.modal.classList.add('modal--hidden');
    };
});
// деактивация инструментов
document.addEventListener('DOMContentLoaded', function() {
    tools.disableButtons();
});

tools.selectTemplate.addEventListener('click', function() {
    Editor.get().changeState(false, false);
    let modal = document.querySelector('.modal-select-template');
    modal.classList.contains('modal--hidden') ?
        modal.classList.remove('modal--hidden') :
        modal.classList.add('modal--hidden');
});

tools.addText.addEventListener('click', function() {
    Editor.get().changeState(false, false);
    let m = modalText;
    let text = new TextElem(m.input.value, m.fontSize.value, m.fontFamily.value, 
        m.textColor.value, m.strokeColor.value, m.strokeWidth.value, 
        m.fontWeight.value);
    Editor.get().addText(text);

    m.modal.classList.contains('modal--hidden') ?
        m.modal.classList.remove('modal--hidden') :
        m.modal.classList.add('modal--hidden');
    m.input.value = '';
    m.preview.textContent = '';
});

tools.fill.addEventListener('click', function() {
    if (Editor.get().template) {
        Editor.get().changeState(!Editor.get().isFilling, false);
        Editor.get().template.fillColorRGB = tools.color.value;
    } else {
        alert('Сначала выберите шаблон!');
    }
});
tools.color.addEventListener('input', function() {
    let preview = document.querySelector('.draw-width-preview');
    if (Editor.get().template !== null) {
        Editor.get().template.fillColorRGB = this.value;
    }
    Editor.get().drawOptions.color = this.value;

    preview.style.backgroundColor = this.value;
});
tools.draw.addEventListener('click', function() {
    Editor.get().changeState(false, !Editor.get().isDrawing);
});
tools.drawWidth.addEventListener('input', function() {
    let preview = document.querySelector('.draw-width-preview');
    Editor.get().drawOptions.width = this.value;

    preview.style.width = this.value + 'px';
    preview.style.height = this.value + 'px';
});
tools.back.addEventListener('click', function() {
    Editor.get().template.backState();
});
tools.repeat.addEventListener('click', function() {
    Editor.get().template.repeatState();
});

canvas.addEventListener('mousemove', function(e) {
    let x = e.offsetX,
        y = e.offsetY;
    let target = Editor.detectCanvasTarget(x, y, Editor.get());
    let {type, index, isHit} = target;
    switch (type) {
        case 'rect':
            canvas.style.cursor = 'move';
            break;
        case 'tick':
        case 'cross':
            canvas.style.cursor = 'pointer';
            break;
        default:
            canvas.style.cursor = '';
            break;
    }
});
canvas.addEventListener('click', function(e) {
    let x = e.offsetX,
        y = e.offsetY;
    let target = Editor.detectCanvasTarget(x, y, Editor.get());
    let {type, index, isHit} = target;
    if (isHit) {
        let elem = Editor.get().textArr[index];
        switch (type) {
            case 'rect':
                break;
            case 'tick':
                elem.isEditable = false;
                Editor.get().template.setImageData();
                break;
            case 'cross':
                Editor.get().removeText(index);
                break;
            default:
                console.log('Ошибочка');
                break;
        }
    }

    if (Editor.get().isFilling) {
        let uint = Editor.get().template.uint;
        let set = pixels.getSetForFilling(x, y, uint);
        Editor.get().template.fillArea(set);
        // console.log(true);
        
        // Editor.get().template.setImageData();
        // console.log(Editor.get().template.stateIndex);
        
    }
});
canvas.addEventListener('mousedown', function(e) {
    let x = e.offsetX,
        y = e.offsetY;
    let target = Editor.detectCanvasTarget(x, y, Editor.get());
    let {type, index, isHit} = target;
    if (isHit) {
        let elem = Editor.get().textArr[index];
        if (type === 'rect' && elem.isDraggable === false) {
            elem.isDraggable = true;
            elem.cursorOffset.x = x - elem.x;
            elem.cursorOffset.y = y - elem.y;
            window.movingTextElem = TextElem.movingWrapper(elem);
            canvas.addEventListener('mousemove', window.movingTextElem);
        }
    }

    if (Editor.get().isDrawing) {
        Editor.prepareDrawing(Editor.get());
        canvas.addEventListener('mousemove', Editor.draw);
    }
});
canvas.addEventListener('mouseup', function(e) {
    let x = e.offsetX,
        y = e.offsetY;
    let target = Editor.detectCanvasTarget(x, y, Editor.get());
    let {type, index, isHit} = target;
    if (isHit) {
        let elem = Editor.get().lastText;
        if (type === 'rect' && elem.isDraggable === true) {
            elem.isDraggable = false;
            canvas.removeEventListener('mousemove', window.movingTextElem);
            window.movingTextElem = null;
            elem.cursorOffset.reset();
        }
    }

    if (Editor.get().isDrawing) {
        canvas.removeEventListener('mousemove', Editor.draw);
        // console.log(true);
        
    }
    if (Editor.get().isDrawing || 
        Editor.get().isFilling) {
        Editor.get().template.setImageData();
    }
});








function dev() {
    let img = new Image();
    img.src = '../meme-src/6.jpg';
    img.onload = () => {
        Editor.get().setTemplate(img);
        if (Editor.get().template !== null) {
            Editor.get().changeState(!Editor.get().isFilling, false);
        }
    };
}
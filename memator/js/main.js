let canvas = document.getElementById('mainCanvas');
let ctx = canvas.getContext('2d');
let canvasWrapper = document.querySelector('.canvas-wrapper');
let panel = document.getElementById('canvasPanel');



// let selectTemplateBtn = panel.querySelector('button[name="select-template"]');
// let addTextBtn = panel.querySelector('button[name="add-text"]');
// let fillColorInput = panel.querySelector('input[name="fill-color"]');
// let fillBtn = panel.querySelector('button[name="fill"]');
// let drawBtn = panel.querySelector('button[name="draw"]');

const fontsEmbedded = [
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

const supportFuncs = {
    createElem(options) {
        let {type = 'div', classes = null, attrs = null, textContent = null} = options;
        let elem = document.createElement(type);
        if (classes) {
            for (let i = 0; i < classes.length; i++) {
                elem.classList.add(classes[i]);
            }
        }
        if (attrs) {
            for (let key in attrs) {
                elem.setAttribute(key, attrs[key]);
            }
        }
        if (textContent) {
            elem.textContent = textContent;
        }
        return elem;
    },
    appendElems(parent, ...elems) {
        for (let i = 0; i < elems.length; i++) {
            parent.appendChild(elems[i]);
        }
    },
    detectCanvasTarget(e, arr) {
        arr = arr || [];
        let obj = {
            isHit: false
        };
    
        for (let i = 0; i < arr.length; i++) {
            let rectX = (e.offsetX >= arr[i].x && e.offsetX <= arr[i].x + arr[i].width);
            let rectY = (e.offsetY >= arr[i].y && e.offsetY <= arr[i].y + arr[i].height);
    
            let tickX = (e.offsetX >= arr[i].tick.x && e.offsetX <= arr[i].tick.x + arr[i].tick.size);
            let tickY = (e.offsetY >= arr[i].tick.y && e.offsetY <= arr[i].tick.y + arr[i].tick.size);
            let crossX = (e.offsetX >= arr[i].cross.x && e.offsetX <= arr[i].cross.x + arr[i].cross.size);
            let crossY = (e.offsetY >= arr[i].cross.y && e.offsetY <= arr[i].cross.y + arr[i].cross.size);
    
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
    },
    compareSiblingPixels(from, x, y, uint, set) {
        let targetColor = [uint[from], uint[from+1], uint[from+2], uint[from+3]];
        let width = test.width * 4;
        // let row = y * 4;
        // let set = new Set();
        let index;
        const isEquals = (ind) => {
            if (uint[ind] === targetColor[0] &&
                uint[ind+1] === targetColor[1] &&
                uint[ind+2] === targetColor[2] &&
                uint[ind+3] === targetColor[3]) 
                {
                    return true;
                } else {return false;}
        }
        
        index = from + width;
        if (y + 1 < test.height && isEquals(index) && !set.has(index)) {
            set.add(index);
            for (let val of this.compareSiblingPixels(index, x, y + 1, uint, set)) {
                set.add(val);
            }
        }
        index = from - 4;
        if (x - 1 >= 0 && isEquals(index) && !set.has(index)) {
            set.add(index);
            for (let val of this.compareSiblingPixels(index, x - 1, y, uint, set)) {
                set.add(val);
            }
        }
        index = from + 4;
        if (x + 1 < test.width && isEquals(index) && !set.has(index)) {
            set.add(index);
            for (let val of this.compareSiblingPixels(index, x + 1, y, uint, set)) {
                set.add(val);
            }
        }
        return set;
    },
    movingTextElem: null
};

const pixels = {
    columns(x, y, uint) {
        let from = (test.width * y + x) * 4;
        let set = new Set();
        let initial = [uint[from], uint[from+1], uint[from+2], uint[from+3]];
        let left = from - (x * 4),
            right = from + ((test.width - x) * 4);

        function isEquals(ind) {
            if (uint[ind] === initial[0] && uint[ind+1] === initial[1] && 
                uint[ind+2] === initial[2] && uint[ind+3] === initial[3]) {
                    return true;
                } else return false;
        }
        
        for (let j = from; j >= left; j -= 4) {
            if (isEquals(j)) {
                for (let i = j; i >= 0; i -= (test.width * 4)) {
                    if (isEquals(i)) {
                        set.add(i);
                    } else {
                        break;
                    }
                }
                for (let i = j; i < uint.length; i += (test.width * 4)) {
                    if (isEquals(i)) {
                        set.add(i);
                    } else {
                        break;
                    }
                }
            } else {
                break;
            }
        }
        for (let j = from; j < right; j += 4) {
            if (isEquals(j)) {
                for (let i = j; i >= 0; i -= (test.width * 4)) {
                    if (isEquals(i)) {
                        set.add(i);
                    } else {
                        break;
                    }
                }
                for (let i = j; i < uint.length; i += (test.width * 4)) {
                    if (isEquals(i)) {
                        set.add(i);
                    } else {
                        break;
                    }
                }
            } else {
                break;
            }
        }
        return set;
    },
    rows(x, y, uint) {
        let from = (test.width * y + x) * 4;
        let set = new Set();
        let initial = [uint[from], uint[from+1], uint[from+2], uint[from+3]];

        function isEquals(ind) {
            if (uint[ind] === initial[0] && uint[ind+1] === initial[1] && 
                uint[ind+2] === initial[2] && uint[ind+3] === initial[3]) {
                    return true;
                } else return false;
        }

        for (let j = from; j >= 0; j -= (test.width * 4)) {
            if (isEquals(j)) {
                for (let i = j; i >= j - (x * 4); i -= 4) {
                    if (isEquals(i)) {
                        set.add(i);
                    } else {
                        break;
                    }
                }
                for (let i = j; i < j + ((test.width - x) * 4); i += 4) {
                    if (isEquals(i)) {
                        set.add(i);
                    } else {
                        break;
                    }
                }
            } else {
                break;
            }
        }
        for (let j = from; j < uint.length; j += (test.width * 4)) {
            if (isEquals(j)) {
                for (let i = j; i >= j - (x * 4); i -= 4) {
                    if (isEquals(i)) {
                        set.add(i);
                    } else {
                        break;
                    }
                }
                for (let i = j; i < j + ((test.width - x) * 4); i += 4) {
                    if (isEquals(i)) {
                        set.add(i);
                    } else {
                        break;
                    }
                }
            } else {
                break;
            }
        }
        return set;
    },
};

class ImgTemplate {
    constructor(imageElem, x, y, width, height, url) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.url = url || null;
        this.imageElem = imageElem || null;
        this.editor = null;
        // this.imageData = this.setImageData();
        this.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        this.uint = this.imageData.data;
        this.fillColorRGB = [0, 0, 0, 255];
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
        this.imageData = ctx.getImageData(0, 0, this.editor.width, this.editor.height);
        this.uint = this.imageData.data;
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
        this.imageData = new ImageData(uint, this.editor.width, this.editor.height);
        ctx.putImageData(this.imageData, 0, 0);
    }
    static render(template) {
        let x = template.x,
            y = template.y,
            width = template.width,
            height = template.height,
            img = template.imageElem;
        ctx.drawImage(img, x, y, width, height);

    }
}

class TextElem {
    constructor(str, fontSize, font, color, stroke, strokeWidth, fontWeight, width) {
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

        (width < 50) ? 
            this.width = 50 :
            this.width = width;
        this.height = +parseFloat(this.fontSize) + this.textPadding;

        this.x = (canvas.offsetWidth / 2) - (this.width / 2);
        this.y = (canvas.offsetHeight / 2) - (this.height / 2);

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
            reset: function() {
                this.x = null;
                this.y = null;
            }
        }
    }
    get fontSize() {
        return this._fontSize;
    }
    set fontSize(val) {
        if (typeof val === 'number') this._fontSize = val + 'px';
        else if (typeof val === 'string' && !isNaN(+parseFloat(val)) && +parseFloat(val) > 0) {
            this._fontSize = +parseFloat(val) + 'px';
        } else {
            console.error(new Error('Неверное значение для fontSize. Значение установлено как 16px'));
            this._fontSize = '16px';
        }
    }
    get fontWeight() {
        return this._fontWeight;
    }
    set fontWeight(val) {
        switch (val) {
            case '400':
            case '700':
            case '900':
                this._fontWeight = val;
                break;
            default:
                console.error('Неверное значение для fontWeight. Значение установлено как 400');
                this._fontWeight = '400';
                break;
        }
    }
    get isEditable() {
        return this._isEditable;
    }
    set isEditable(val) {
        if (!(typeof val === 'boolean')) {
            console.error('Значение isEditable должно быть true либо false');
            return;
        } else {
            if (val === false) {
                this._isEditable = false;
                Editor.render(this.editor);
            } else {
                this._isEditable = val;
            }
        }
    }
    get isDraggable() {
        return this._isDraggable;
    }
    set isDraggable(val) {
        if (typeof val !== 'boolean') {
            console.error('Значение isDraggable должно быть true либо false');
            return;
        } else {
            this._isDraggable = val;
        }
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
    static render(elem) {
        ctx.beginPath();
        elem.renderRect();
        elem.renderText();
        elem.renderTick();
        elem.renderCross();
        ctx.closePath();
    }
    static movingWrapper(elem) {
        return function() {
            if (elem.isDraggable) {
                elem.x = event.offsetX - elem.cursorOffset.x;
                elem.y = event.offsetY - elem.cursorOffset.y;
                elem.refreshTick();
                elem.refreshCross();
                elem.refreshText();
                Editor.render(elem.editor);
            }
        }
    }
}

class Editor {
    constructor (width, height, template, textArr) {
        this.width = width || canvas.width;
        this.height = height || canvas.height;
        this.template = template || null;
        this.textArr = textArr || null;
        this.isDrawing = false;
        this.isFilling = false;
        this.drawOptions = {
            color: '#000000',
            width: 5
        };
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
        return true;
    }
    removeText(ind) {
        this._textArr[ind].editor = null;
        this._textArr.splice(ind, 1);
        Editor.render(this);
    }
    setTemplate(img) {
        let height = Math.round((canvas.offsetWidth / img.width) * img.height);
        let width = canvas.offsetWidth;
        this.template = new ImgTemplate(img, 0, 0, width, height, img.getAttribute('src'));
        this.width = width;
        this.height = height;
        canvas.setAttribute('height', height);
        Editor.render(this);
        this.template.setImageData();
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
        val.editor = this;
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
        val.forEach((elem) => {
            this.addText(elem);
        });
    }
    static render(editor) {
        ctx.clearRect(0, 0, editor.width, editor.height);
        if (editor.template) {
            ImgTemplate.render(editor.template);
        }
        let texts = editor.textArr || [];
        for (let i = 0; i < texts.length; i++) {
            TextElem.render(editor.textArr[i]);
        }
        editor.imageData = ctx.getImageData(0, 0, editor.width, editor.height);
    }
    static prepareDrawing(editor) {
        ctx.beginPath();
        ctx.lineWidth = editor.drawOptions.width;
        ctx.strokeStyle = editor.drawOptions.color;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(event.offsetX, event.offsetY);
    }
    static draw() {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
}

class Modal {
    constructor (elem1, elem2 = null) {
        this.elem1 = elem1;
        this.elem2 = this.createElem({
            type: 'input',
            attrs: {
                'name': 'name'
            }
        });
        // this.element = 
    }
    createElem(options) {
        let {type = 'div', classes = null, attrs = null, textContent = null} = options;
        let elem = document.createElement(type);
        if (classes) {
            for (let i = 0; i < classes.length; i++) {
                elem.classList.add(classes[i]);
            }
        }
        if (attrs) {
            for (let key in attrs) {
                elem.setAttribute(key, attrs[key]);
            }
        }
        if (textContent) {
            elem.textContent = textContent;
        }
        return elem;
    }
}


let test = new Editor();

function getModalTemplates(count) {
    let modal = supportFuncs.createElem({
        classes: ['modal-select-template', 'modal']
    });
    for (let i = 1; i <= count; i++) {
        let item = supportFuncs.createElem({
            classes: ['modal-select-template__item']
        });
        let link = supportFuncs.createElem({
            type: 'a',
            attrs: {
                'href': '#',
                'data-template-id': i
            }
        });
        let img = supportFuncs.createElem({
            type: 'img',
            attrs: {
                'src': `meme-src/${i}.jpg`,
                'alt': i
            }
        });
        modal.appendChild(item).appendChild(link).appendChild(img);

        item.addEventListener('click', function(e) {
            e.preventDefault();
            test.setTemplate(img);
            canvasWrapper.removeChild(modal);
        });
    }
    return modal;
}
function getModalText() {
    const closeModal = () => {modal.parentElement.removeChild(modal);};
// МОДАЛКА
    let modal = supportFuncs.createElem({
        classes: ['modal-write-text', 'modal']
    });
// ПРЕВЬЮ
    let preview = supportFuncs.createElem({
        classes: ['modal-write-text__preview']
    });
// КОНТЕНТ МОДАЛКИ
    let modalInner = supportFuncs.createElem({
        classes: ['modal-write-text__content']
    });
// КОНТЕЙНЕР ПАРАМЕТРОВ
    let params = supportFuncs.createElem({
        classes: ['modal-write-text__params']
    });
// ЦВЕТ
    let labelColorInput;
    let colorInput;
    let colorInputWrapper = function() {
        let wrapper = supportFuncs.createElem({
            classes: ['modal-write-text__color']
        });
        labelColorInput = supportFuncs.createElem({
            type: 'label',
            attrs: {'for': 'textColor'},
            textContent: 'Цвет текста'
        });
        colorInput = supportFuncs.createElem({
            type: 'input',
            attrs: {'type': 'color', 'id': 'textColor'}
        });
        supportFuncs.appendElems(wrapper, labelColorInput, colorInput);
        return wrapper;
    }();
// РАЗМЕР ШРИФТА
    let labelFontSizeInput;
    let fontSizeInput;
    let fontSizeWrapper = function() {
        let wrapper = supportFuncs.createElem({
            classes: ['modal-write-text__fontsize']
        });
        labelFontSizeInput = supportFuncs.createElem({
            type: 'label',
            attrs: {'for': 'fontSize'},
            textContent: 'Размер шрифта:'
        });
        fontSizeInput = supportFuncs.createElem({
            type: 'input',
            attrs: {'type': 'number', 'value': '16', 'id': 'fontSize'}
        });
        supportFuncs.appendElems(wrapper, labelFontSizeInput, fontSizeInput);
        return wrapper;
    }();
// ЖИРНОСТЬ ШРИФТА
    let fontWeightSelect = function() {
        let wrapper = supportFuncs.createElem({
            type: 'select',
            classes: ['modal-write-text__font-weight'],
            attrs: {'id': 'fontWeight'}
        });
        let arr = [];
        let weights = {
            '400': 'Обычный',
            '700': 'Жирный',
            '900': 'Очень жирный'
        };
        arr.push(supportFuncs.createElem({
            type: 'option',
            textContent: 'Жирность шрифта',
            attrs: {
                'value': '400',
                'disabled': 'disabled',
                'selected': 'selected'
            }
        }));
        for (let key in weights) {
            let option = supportFuncs.createElem({
                type: 'option',
                textContent: weights[key],
                attrs: {'value': key}
            });
            arr.push(option);
        }
        supportFuncs.appendElems(wrapper, ...arr);
        return wrapper;
    }();
// ОБВОДКА ТЕКСТА РАЗМЕР
    let labelStrokeWidth;
    let strokeWidthInput;
    let strokeWidthWrapper = function() {
        let wrapper = supportFuncs.createElem({
            classes: ['modal-write-text__stroke-width']
        });
        labelStrokeWidth = supportFuncs.createElem({
            type: 'label',
            attrs: {'for': 'strokeWidth'},
            textContent: 'Толщина обводки:'
        });
        strokeWidthInput = supportFuncs.createElem({
            type: 'input',
            attrs: {
                'type': 'number',
                'id': 'strokeWidth',
                'value': '0'
            }
        });
        supportFuncs.appendElems(wrapper, labelStrokeWidth, strokeWidthInput);
        return wrapper;
    }();
// ОБВОДКА ТЕКСТА ЦВЕТ
    let labelStrokeColor;
    let strokeColorInput;
    let strokeColorWrapper = function() {
        let wrapper = supportFuncs.createElem({
            classes: ['modal-write-text__stroke-color']
        });
        labelStrokeColor = supportFuncs.createElem({
            type: 'label',
            attrs: {'for': 'strokeColor'},
            textContent: 'Цвет обводки:'
        });
        strokeColorInput = supportFuncs.createElem({
            type: 'input',
            attrs: {
                'type': 'color',
                'id': 'strokeColor'
            }
        });
        supportFuncs.appendElems(wrapper, labelStrokeColor, strokeColorInput);
        return wrapper;
    }();
// СЕМЕЙСТВО ШРИФТА
    let fontFamilySelect = function() {
        let wrapper = supportFuncs.createElem({
            type: 'select',
            classes: ['modal-write-text__font-family'],
        });
        let arr = [];
        arr.push(supportFuncs.createElem({
            type: 'option',
            textContent: 'Выберите шрифт',
            attrs: {
                'disabled': 'disabled',
                'selected': 'selected',
                'value': ''
            }
        }));
        for (let i = 0; i < fontsEmbedded.length; i++) {
            let [name, family] = [fontsEmbedded[i][0], fontsEmbedded[i][1]];
            let option = supportFuncs.createElem({
                type: 'option',
                attrs: {
                    'value': name + ', ' + family,
                },
                textContent: name
            });
            arr.push(option);
        }
        supportFuncs.appendElems(wrapper, ...arr);
        return wrapper;
    }();
// ПОЛЕ ВВОДА
    let input = supportFuncs.createElem({
        type: 'input',
        classes: ['modal-write-text__input'],
        attrs: {'type': 'text'}
    });
// КНОПКА ПОДТВЕРЖДЕНИЯ
    let btn = supportFuncs.createElem({
        type: 'button',
        classes: ['modal-write-text__btn'],
        attrs: {'name': 'confirm-text'},
        textContent: 'Ok'
    });
// КРЕСТИК ДЛЯ ЗАКРЫТИЯ
    let closeBtn = supportFuncs.createElem({
        classes: ['modal-write-text__close']
    });

    supportFuncs.appendElems(params, 
        colorInputWrapper, 
        fontSizeWrapper, 
        fontWeightSelect,
        strokeWidthWrapper,
        strokeColorWrapper,
        fontFamilySelect);
    supportFuncs.appendElems(modalInner, params, input, btn);
    supportFuncs.appendElems(modal, preview, modalInner, closeBtn);

    closeBtn.addEventListener('click', closeModal);
    
    let textOptions = {
        fontFamily: (+fontFamilySelect.value ? fontFamilySelect.value : 'serif'),
        fontSize: fontSizeInput.value + 'px',
        color: colorInput.value,
        fontWeight: fontWeightSelect.value,
        strokeWidth: (strokeWidthInput.value || 0) + 'px',
        strokeColor: strokeColorInput.value,
    }
    function renderPreviewText() {
        preview.style.fontFamily = textOptions.fontFamily;
        preview.style.fontSize = textOptions.fontSize;
        preview.style.color = textOptions.color;
        preview.style.fontWeight = textOptions.fontWeight;
        
        preview.style.webkitTextStrokeWidth = textOptions.strokeWidth + 'px';
        preview.style.webkitTextStrokeColor = textOptions.strokeColor;
        preview.textContent = input.value;
    }
    input.addEventListener('input', renderPreviewText);

    colorInput.addEventListener('input', function() {
        textOptions.color = this.value;
        renderPreviewText();
    });
    fontSizeInput.addEventListener('input', function() {
        textOptions.fontSize = this.value + 'px';
        renderPreviewText();
    });
    fontWeightSelect.addEventListener('change', function() {
        textOptions.fontWeight = this.value;
        renderPreviewText();
    });
    strokeWidthInput.addEventListener('input', function() {
        textOptions.strokeWidth = this.value;
        renderPreviewText();
    });
    strokeColorInput.addEventListener('input', function() {
        textOptions.strokeColor = this.value;
        renderPreviewText();
    });
    fontFamilySelect.addEventListener('change', function() {
        textOptions.fontFamily = this.value;
        renderPreviewText();
    });

    btn.addEventListener('click', function() {
        let width = preview.getBoundingClientRect().width;
        
        let text = 
            new TextElem(input.value, textOptions.fontSize, textOptions.fontFamily, 
                textOptions.color, textOptions.strokeColor, textOptions.strokeWidth, 
                textOptions.fontWeight, width);
        
        test.addText(text);
        closeModal();
        Editor.render(test);
    });
    return modal;
}

const buttons = {
    selectTemplate: panel.querySelector('button[name="select-template"]'),
    addText: panel.querySelector('button[name="add-text"]'),
    fillColor: panel.querySelector('input[name="fill-color"]'),
    fill: panel.querySelector('button[name="fill"]'),
    drawColor: panel.querySelector('input[name="draw-color"]'),
    drawWidth: panel.querySelector('input[name="draw-width"]'),
    draw: panel.querySelector('button[name="draw"]'),
};

buttons.selectTemplate.addEventListener('click', function() {
    let modal = getModalTemplates(10);
    canvasWrapper.appendChild(modal);
});

buttons.addText.addEventListener('click', function() {
    let modal = getModalText();
    canvasWrapper.appendChild(modal);
});

buttons.fill.addEventListener('click', function() {
    if (test.template !== null) {
        test.isFilling = !test.isFilling;
        this.classList.toggle('canvas__btn--active');
        test.template.fillColorRGB = buttons.fillColor.value;
        canvas.classList.toggle('canvas__editor--fill');
    } else {
        alert('Сначала выберите шаблон!');
    }
});

buttons.fillColor.addEventListener('input', function() {
    if (test.template !== null) {
        test.template.fillColorRGB = this.value;
    }
});;

buttons.draw.addEventListener('click', function() {
    this.classList.toggle('canvas__btn--active');
    canvas.classList.toggle('canvas__editor--draw');
    test.isDrawing = !test.isDrawing;
});
buttons.drawColor.addEventListener('input', function() {
    test.drawOptions.color = this.value;
});
buttons.drawWidth.addEventListener('input', function() {
    if (this.value < 1) this.value = 1;
    test.drawOptions.width = this.value;
});

canvas.addEventListener('mousemove', function(e) {
    let target = supportFuncs.detectCanvasTarget(e, test.textArr);
    switch (target.type) {
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
    let target = supportFuncs.detectCanvasTarget(e, test.textArr);
    if (target.isHit) {
        let elem = test.textArr[target.index];
        switch (target.type) {
            case 'rect':
                break;
            case 'tick':
                elem.isEditable = false;
                break;
            case 'cross':
                test.removeText(target.index);
                break;
            default:
                console.log('Ошибочка');
                break;
        }
    }
    if (test.isFilling) {
        let uint = test.template.uint;
        let set;
        set = pixels.columns(event.offsetX, event.offsetY, uint);
        test.template.fillArea(set);
        set = pixels.rows(event.offsetX, event.offsetY, uint);
        test.template.fillArea(set);
    }
});
canvas.addEventListener('mousedown', function(e) {
    let target = supportFuncs.detectCanvasTarget(e, test.textArr);
    if (target.isHit) {
        let elem = test.textArr[target.index];
        if (target.type === 'rect' && elem.isDraggable === false) {
            elem.isDraggable = true;
            elem.cursorOffset.x = 
                e.offsetX - elem.x;
            elem.cursorOffset.y = 
                e.offsetY - elem.y;
    
            supportFuncs.movingTextElem = TextElem.movingWrapper(elem);
            canvas.addEventListener('mousemove', supportFuncs.movingTextElem);
        }
    }
    if (test.isDrawing) {
        Editor.prepareDrawing(test);
        canvas.addEventListener('mousemove', Editor.draw);
    }
});
canvas.addEventListener('mouseup', function(e) {
    let target = supportFuncs.detectCanvasTarget(e, test.textArr);
    if (target.isHit) {
        let elem = test.textArr[target.index];
        if (target.type === 'rect' && elem.isDraggable === true) {
            elem.isDraggable = false;
            canvas.removeEventListener('mousemove', supportFuncs.movingTextElem);
            supportFuncs.movingTextElem = null;
            elem.cursorOffset.reset();
        }
    }
    if (test.isDrawing) {
        canvas.removeEventListener('mousemove', Editor.draw);
    }
});








function dev() {
    let img = new Image();
    img.src = '../meme-src/6.jpg';
    img.onload = () => {
        test.setTemplate(img);
        if (test.template !== null) {
            test.isFilling = !test.isFilling;
            buttons.fill.classList.toggle('canvas__btn--active');
            test.template.fillColorRGB = buttons.fillColor.value;
            canvas.classList.toggle('canvas__editor--fill');
        }
        
    };
}
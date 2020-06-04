function getModalTemplates(count) {
    let modal = DOMfuncs.createElem({
        classes: ['modal-select-template', 'modal']
    });
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
        modal.appendChild(item).appendChild(link).appendChild(img);

        item.addEventListener('click', function(e) {
            e.preventDefault();
            Editor.get().setTemplate(img);
            canvasWrapper.removeChild(modal);
        });
    }
    return modal;
}
function getModalText() {
    const closeModal = () => {modal.parentElement.removeChild(modal);};
// МОДАЛКА
    let modal = DOMfuncs.createElem({
        classes: ['modal-write-text', 'modal']
    });
// ПРЕВЬЮ
    let preview = DOMfuncs.createElem({
        classes: ['modal-write-text__preview']
    });
// КОНТЕНТ МОДАЛКИ
    let modalInner = DOMfuncs.createElem({
        classes: ['modal-write-text__content']
    });
// КОНТЕЙНЕР ПАРАМЕТРОВ
    let params = DOMfuncs.createElem({
        classes: ['modal-write-text__params']
    });
// ЦВЕТ
    let labelColorInput;
    let colorInput;
    let colorInputWrapper = function() {
        let wrapper = DOMfuncs.createElem({
            classes: ['modal-write-text__color']
        });
        labelColorInput = DOMfuncs.createElem({
            type: 'label',
            attrs: {'for': 'textColor'},
            textContent: 'Цвет текста'
        });
        colorInput = DOMfuncs.createElem({
            type: 'input',
            attrs: {'type': 'color', 'id': 'textColor'}
        });
        DOMfuncs.appendElems(wrapper, labelColorInput, colorInput);
        return wrapper;
    }();
// РАЗМЕР ШРИФТА
    let labelFontSizeInput;
    let fontSizeInput;
    let fontSizeWrapper = function() {
        let wrapper = DOMfuncs.createElem({
            classes: ['modal-write-text__fontsize']
        });
        labelFontSizeInput = DOMfuncs.createElem({
            type: 'label',
            attrs: {'for': 'fontSize'},
            textContent: 'Размер шрифта:'
        });
        fontSizeInput = DOMfuncs.createElem({
            type: 'input',
            attrs: {'type': 'number', 'value': '16', 'id': 'fontSize'}
        });
        DOMfuncs.appendElems(wrapper, labelFontSizeInput, fontSizeInput);
        return wrapper;
    }();
// ЖИРНОСТЬ ШРИФТА
    let fontWeightSelect = function() {
        let wrapper = DOMfuncs.createElem({
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
        arr.push(DOMfuncs.createElem({
            type: 'option',
            textContent: 'Жирность шрифта',
            attrs: {
                'value': '400',
                'disabled': 'disabled',
                'selected': 'selected'
            }
        }));
        for (let key in weights) {
            let option = DOMfuncs.createElem({
                type: 'option',
                textContent: weights[key],
                attrs: {'value': key}
            });
            arr.push(option);
        }
        DOMfuncs.appendElems(wrapper, ...arr);
        return wrapper;
    }();
// ОБВОДКА ТЕКСТА РАЗМЕР
    let labelStrokeWidth;
    let strokeWidthInput;
    let strokeWidthWrapper = function() {
        let wrapper = DOMfuncs.createElem({
            classes: ['modal-write-text__stroke-width']
        });
        labelStrokeWidth = DOMfuncs.createElem({
            type: 'label',
            attrs: {'for': 'strokeWidth'},
            textContent: 'Толщина обводки:'
        });
        strokeWidthInput = DOMfuncs.createElem({
            type: 'input',
            attrs: {
                'type': 'number',
                'id': 'strokeWidth',
                'value': '0'
            }
        });
        DOMfuncs.appendElems(wrapper, labelStrokeWidth, strokeWidthInput);
        return wrapper;
    }();
// ОБВОДКА ТЕКСТА ЦВЕТ
    let labelStrokeColor;
    let strokeColorInput;
    let strokeColorWrapper = function() {
        let wrapper = DOMfuncs.createElem({
            classes: ['modal-write-text__stroke-color']
        });
        labelStrokeColor = DOMfuncs.createElem({
            type: 'label',
            attrs: {'for': 'strokeColor'},
            textContent: 'Цвет обводки:'
        });
        strokeColorInput = DOMfuncs.createElem({
            type: 'input',
            attrs: {
                'type': 'color',
                'id': 'strokeColor'
            }
        });
        DOMfuncs.appendElems(wrapper, labelStrokeColor, strokeColorInput);
        return wrapper;
    }();
// СЕМЕЙСТВО ШРИФТА
    let fontFamilySelect = function() {
        let wrapper = DOMfuncs.createElem({
            type: 'select',
            classes: ['modal-write-text__font-family'],
        });
        let arr = [];
        arr.push(DOMfuncs.createElem({
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
            let option = DOMfuncs.createElem({
                type: 'option',
                attrs: {
                    'value': name + ', ' + family,
                },
                textContent: name
            });
            arr.push(option);
        }
        DOMfuncs.appendElems(wrapper, ...arr);
        return wrapper;
    }();
// ПОЛЕ ВВОДА
    let input = DOMfuncs.createElem({
        type: 'input',
        classes: ['modal-write-text__input'],
        attrs: {'type': 'text'}
    });
// КНОПКА ПОДТВЕРЖДЕНИЯ
    let btn = DOMfuncs.createElem({
        type: 'button',
        classes: ['modal-write-text__btn'],
        attrs: {'name': 'confirm-text'},
        textContent: 'Ok'
    });
// КРЕСТИК ДЛЯ ЗАКРЫТИЯ
    let closeBtn = DOMfuncs.createElem({
        classes: ['modal-write-text__close']
    });

    DOMfuncs.appendElems(params, 
        colorInputWrapper, 
        fontSizeWrapper, 
        fontWeightSelect,
        strokeWidthWrapper,
        strokeColorWrapper,
        fontFamilySelect);
    DOMfuncs.appendElems(modalInner, params, input, btn);
    DOMfuncs.appendElems(modal, preview, modalInner, closeBtn);

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
        
        Editor.get().addText(text);
        closeModal();
        Editor.render(Editor.get());
    });
    return modal;
}
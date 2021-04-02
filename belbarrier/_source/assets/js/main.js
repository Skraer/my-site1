class GateForm {
    constructor(selector, {onSubmit, onIncorrect, formSelector}) {
        this.selector = selector;
        this.el = document.querySelector(selector);
        this.btn = this.el.querySelector('.gate-form__submit');
        this.onSubmit = onSubmit || function(){};
        this.onIncorrect = onIncorrect || function(){alert('Выбраны не все значения!')};
        this.form = document.querySelector(formSelector);
        this.mainImg = [
            this.el.querySelector('.gate-form__img img').getAttribute('src'),
            this.el.querySelector('.gate-form__img img').getAttribute('data-src')
        ];
        
        this.setup();
    }
    getFormData() {
        const inputs = this.el.querySelectorAll('input');
        // const names = new Set();
        const data = {};
        let allow = true;
        inputs.forEach(input => {
            const name = input.getAttribute('name');
            // names.add(name);
            
            if ((input.getAttribute('type') === 'checkbox' || input.getAttribute('type') === 'radio') && input.checked) {
                data[name] = data[name] ? 
                    data[name] + ', ' + input.value : 
                    input.value;
                // data[name] = input.value;
            } else if ((input.getAttribute('type') === 'number' || input.getAttribute('type') === 'text') && input.value.length > 0) {
                data[name] = input.value;
            }

        });
        inputs.forEach(input => {
            const name = input.getAttribute('name');
            if (!data[name] && input.getAttribute('type') !== 'checkbox') {
                allow = false;
            }
        });
        return allow ? data : false;
    }
    getInputs(data) {
        const inputs = [];
        for (let key in data) {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', key);
            input.setAttribute('value', data[key]);
            inputs.push(input);
        }
        return inputs;
    }
    changeImage(i) {
        let changable = true;
        this.mainImg.forEach(el => {
            if (el === undefined || el === null) changable = false;
        });
        if (changable) {
            const img = this.el.querySelector('.gate-form__img img');
            img.setAttribute('src', this.mainImg[i]);
        }
    }
    togglePanels(action = 'auto') {
        const typeInputs = this.el.querySelectorAll('input[name="gate-type"]');
        const panelInputs = this.el.querySelectorAll('input[name="gate-panel"]');
        const panelLabels = this.el.querySelectorAll('input[name="gate-panel"] + label');
        function hide() {
            for (let i = 1; i < panelInputs.length; i++) {
                panelInputs[i].checked = false;
                panelLabels[i].style.display = 'none';
            }
        }
        function show() {
            panelLabels.forEach(label => {
                label.style.display = '';
            });
        }
        switch (action) {
            case 'show':
                show();
                break;
            case 'hide':
                hide();
                break;
            case 'auto':
                typeInputs[0].checked ? show() : hide();
                break;
            default:
                break;
        }
    }
    getPanelIndex() {
        const panelInputs = this.el.querySelectorAll('input[name="gate-panel"]');
        // console.log(panelInputs);
        for (let i = 0; i < panelInputs.length; i++) {
            if (panelInputs[i].checked) return i;
        }
    }
    _setupInputs() {
        const setOutput = (name, val) => {
            const span = this.el.querySelector('.output span[data-output="' + name + '"]');
            if (span !== null) {
                span.innerText = val;
            }
        }
        const setOutputById = (id, val) => {
            const span = this.el.querySelector('.output span[data-output-by-id="' + id + '"]');
            if (span !== null) {
                span.innerText = val;
            }
        }
        const cb = this.el.querySelectorAll('input[type=checkbox]');
        const radio = this.el.querySelectorAll('input[type=radio]');
        const number = this.el.querySelectorAll('input[type=number]');
        cb.forEach(inp => {
            inp.addEventListener('change', e => {
                const id = inp.getAttribute('id');

                if (this.el.querySelector('.output span[data-output-by-id="' + id + '"]') !== null) {
                    inp.checked ?
                        setOutputById(id, 'Да') :
                        setOutputById(id, 'Нет');
                } else {
                    inp.checked ?
                        setOutput(inp.getAttribute('name'), 'Да') :
                        setOutput(inp.getAttribute('name'), 'Нет');
                }
            });
        });
        radio.forEach((inp, idx) => {
            inp.addEventListener('change', e => {
                setOutput(inp.getAttribute('name'), inp.value);
                if (this.selector.match('.garage') && inp.getAttribute('name') == 'gate-type') {
                    this.togglePanels();
                    if (this.getPanelIndex() === undefined) {
                        setOutput('gate-panel', '-');
                    }
                }
                if (inp.getAttribute('name') == 'gate-type') {
                    this.changeImage(idx);
                }
            });
        });
        number.forEach(inp => {
            inp.addEventListener('change', e => {
                setOutput(inp.getAttribute('name'), inp.value);
            });
        });
    }
    clearHiddenInputs() {
        const inputs = this.form.querySelectorAll('input[type="hidden"][name^="gate"]');
        inputs.forEach(input => {
            input.remove();
        });
    }
    setup() {
        this.el.addEventListener('submit', e => {
            e.preventDefault();
            const data = this.getFormData();
            if (data) {
                this.clearHiddenInputs();
                const inputs = this.getInputs(data);
                inputs.forEach(inp => {this.form.appendChild(inp)});
                this.onSubmit();
            } else {
                this.onIncorrect();
            }
        });
        this._setupInputs();
        // if (this.selector.match('.garage')) {
        //     this.togglePanels('hide');
        // }
    }
}

class InfoTooltips {
    constructor() {
        this.elems = document.querySelectorAll('.info');
        this.contentItems = document.querySelectorAll('.info .info__content');
        this.btns = document.querySelectorAll('.info .info__btn');
        this.tooltip = null;
        this.setup();
    }
    getTooltipElem(elem) {
        const tooltip = elem.cloneNode(true);
        tooltip.classList = '';
        tooltip.classList.add('info-tooltip');
        return tooltip;
    }
    setTooltip(x, y) {
        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
        document.body.append(this.tooltip);
    }
    removeTooltip() {
        this.tooltip.remove();
        this.tooltip = null;
    }
    setup() {
        this.btns.forEach((btn, idx) => {
            btn.addEventListener('mouseenter', e => {
                const x = (e.pageX + 20);
                const y = (e.pageY + 5);
                this.tooltip = this.getTooltipElem(this.contentItems[idx]);
                this.setTooltip(x, y);
            });
            btn.addEventListener('mouseleave', e => {
                this.removeTooltip();
            });
        });
    }
}

let activeModal = null;

class Modal {
    constructor(selector, {onCall}) {
        this.selector = selector;
        this.el = document.querySelector(this.selector);
        if (this.el) {
            this.onCall = onCall || function(){};
            this.overlay = this.el.querySelector('.modal__overlay');
            this.closeBtn = this.el.querySelector('.modal__close');
            this.setup();
        }
    }
    showModal(disableAnimation = false) {
        activeModal = this;
        if (disableAnimation) {
            this.el.classList.add('active');
        } else {
            this.el.classList.remove('hiding');
            this.el.classList.add('active');
            this.el.classList.add('showing');
            setTimeout(() => {
                this.el.classList.remove('showing');
            }, 250);
        }
        document.body.classList.add('lock');
        this.onCall();
    }
    hideModal(disableAnimation = false) {
        activeModal = null;
        if (disableAnimation) {
            this.el.classList.remove('active');
        } else {
            this.el.classList.remove('showing');
            this.el.classList.add('hiding');
            setTimeout(() => {
                this.el.classList.remove('active');
                this.el.classList.remove('hiding');
            }, 250);
        }
        document.body.classList.remove('lock');
    }
    showingHandler() {
        this.el.classList.contains('active') ?
            this.hideModal() :
            this.showModal();
    }
    setup() {
        this.closeBtn.addEventListener('click', (e) => {
            this.hideModal();
        });
        this.overlay.addEventListener('mousedown', (e) => {
            if (e.target === this.overlay) {
                this.hideModal();
            }
        });
    }
}


function sendForm(form, onSuccess = null) {
    onSuccess = onSuccess || function(){};
    event.preventDefault();
    if (validateForm(form)) {
        var xhr = new XMLHttpRequest();
        var body = serialize(form);
        xhr.open('POST', './mail.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                form.reset();
                onSuccess();
                form.setAttribute('data-done', null);
                if (form.hasAttribute('data-after')) {
                    activeModal ? activeModal.hideModal() : void(0);
                    const id = form.getAttribute('data-after');
                    afterModals[id].showModal();
                }
            }
        };
        xhr.send(body);
    } else {
        incorrectFormData.showModal();
        // alert('Введите корректные данные');
    }
}
function validateForm(form) {
	var regTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
	var inputTel = form.querySelector('input[name="tel"]');
    var inputName = form.querySelector('input[name="name"]');
    var allow = true;
    if (inputTel && !inputTel.value.match(regTel)) allow = false;
    if (inputName && inputName.value.length < 2) allow = false;
    return allow;
}
function serialize(form) {
	if (!form || form.nodeName !== "FORM") {
		return false;
	}
	var i, j, q = [];
	for (i = form.elements.length - 1; i >= 0; i = i - 1) {
		if (form.elements[i].name === "") {
			continue;
		}
		switch (form.elements[i].nodeName) {
			case 'INPUT':
				switch (form.elements[i].type) {
					case 'text':
					case 'tel':
					case 'email':
					case 'hidden':
					case 'password':
					case 'button':
					case 'reset':
					case 'submit':
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
					case 'checkbox':
						writeCommaCheckbox(form, i, q);
						break;
					case 'radio':
						if (form.elements[i].checked) {
							q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						}
						break;
				}
				break;
			case 'file':
				break;
			case 'TEXTAREA':
				q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
				break;
			case 'SELECT':
				switch (form.elements[i].type) {
					case 'select-one':
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
					case 'select-multiple':
						for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
							if (form.elements[i].options[j].selected) {
								q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
							}
						}
						break;
				}
				break;
			case 'BUTTON':
				switch (form.elements[i].type) {
					case 'reset':
					case 'submit':
					case 'button':
						q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
						break;
				}
				break;
		}
	}
	return q.join("&");
}

const tooltips = new InfoTooltips();

const ownModal = new Modal('#ownForm', {
    onCall: function() {
        const form = ownModal.el.querySelector('form');
        if (form && form.hasAttribute('data-done')) {
            ownModal.hideModal(true);
            const id = form.getAttribute('data-after');
            afterModals[id].showModal();
        }
    }
});
const garageGateModal = new Modal('#garageGateForm', {
    onCall: function() {
        const form = garageGateModal.el.querySelector('form');
        if (form && form.hasAttribute('data-done')) {
            garageGateModal.hideModal(true);
            const id = form.getAttribute('data-after');
            afterModals[id].showModal();
        }
    }
});
const swingGateModal = new Modal('#swingGateForm', {
    onCall: function() {
        const form = swingGateModal.el.querySelector('form');
        if (form && form.hasAttribute('data-done')) {
            swingGateModal.hideModal(true);
            const id = form.getAttribute('data-after');
            afterModals[id].showModal();
        }
    }
});
const slidingGateModal = new Modal('#slidingGateForm', {
    onCall: function() {
        const form = slidingGateModal.el.querySelector('form');
        if (form && form.hasAttribute('data-done')) {
            slidingGateModal.hideModal(true);
            const id = form.getAttribute('data-after');
            afterModals[id].showModal();
        }
    }
});
const callModal = new Modal('#callMe', {
    onCall: function() {
        const form = callModal.el.querySelector('form');
        if (form && form.hasAttribute('data-done')) {
            callModal.hideModal(true);
            const id = form.getAttribute('data-after');
            afterModals[id].showModal();
        }
    }
});
const thanksCalc = new Modal('#thanksCalc', {});
const thanksCall = new Modal('#thanksCall', {});
const incorrectFields = new Modal('#incorrectFields', {});
const incorrectFormData = new Modal('#incorrectFormData', {});
const afterModals = {
    thanksCalc, thanksCall
};

const ownGateForm = new GateForm('.own .gate-form', {
    formSelector: '#ownForm form',
    onSubmit: function() {
        ownModal.showModal();
    },
    onIncorrect: function() {
        incorrectFields.showModal();
    },
});
const garageGateForm = new GateForm('.garage .gate-form', {
    formSelector: '#garageGateForm form',
    onSubmit: function() {
        garageGateModal.showModal();
    },
    onIncorrect: function() {
        incorrectFields.showModal();
    }
});
const slidingGateForm = new GateForm('.sliding .gate-form', {
    formSelector: '#slidingGateForm form',
    onSubmit: function() {
        slidingGateModal.showModal();
    },
    onIncorrect: function() {
        incorrectFields.showModal();
    }
});
const swingGateForm = new GateForm('.swing .gate-form', {
    formSelector: '#swingGateForm form',
    onSubmit: function() {
        swingGateModal.showModal();
    },
    onIncorrect: function() {
        incorrectFields.showModal();
    }
});

const showModalCallBtn = document.querySelector('#showModalCall');
showModalCallBtn.addEventListener('click', function() {
    callModal.showModal();
});
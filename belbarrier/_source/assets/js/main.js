class GateForm {
    constructor(selector, {onSubmit}) {
        this.el = document.querySelector(selector);
        this.btn = this.el.querySelector('.gate-form__submit');
        this.onSubmit = onSubmit || function(){};
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
                data[name] = input.value;
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
    changeImage() {
        const img = this.el.querySelector('.gate-form__img img');
        const newSrc = img.getAttribute('data-src');
        const oldSrc = img.getAttribute('src');
        img.setAttribute('data-src', oldSrc);
        img.setAttribute('src', newSrc);
        
    }
    _setupInputs() {
        const setOutput = (name, val) => {
            const span = this.el.querySelector('.output span[data-output="' + name + '"]');
            span.innerText = val;
        }
        const cb = this.el.querySelectorAll('input[type=checkbox]');
        const radio = this.el.querySelectorAll('input[type=radio]');
        const number = this.el.querySelectorAll('input[type=number]');
        cb.forEach(inp => {
            inp.addEventListener('change', e => {
                inp.checked ?
                    setOutput(inp.getAttribute('name'), 'Да') :
                    setOutput(inp.getAttribute('name'), 'Нет');
            });
        });
        radio.forEach(inp => {
            inp.addEventListener('change', e => {
                setOutput(inp.getAttribute('name'), inp.value);
                if (inp.getAttribute('name') == 'own-type') {
                    console.log(true);
                    this.changeImage();
                }
            });
        });
        number.forEach(inp => {
            inp.addEventListener('change', e => {
                setOutput(inp.getAttribute('name'), inp.value);
            });
        });

    }
    setup() {
        this.el.addEventListener('submit', e => {
            e.preventDefault();
            const data = this.getFormData();
            let inputs = data ? this.getInputs(data) : null;
            if (inputs) {
                inputs.forEach(inp => {
                    document.querySelector('#ownForm form').appendChild(inp);
                });
                this.onSubmit();
            } else {
                alert('Выбраны не все значения!');
            }
        });
        this._setupInputs();
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
        console.log(body);
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
        alert('Введите корректные данные');
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
const afterModals = {
    thanksCalc, thanksCall
};


const ownGateForm = new GateForm('.own .gate-form', {
    onSubmit: function() {
        ownModal.showModal();
    }
});

const showModalCallBtn = document.querySelector('#showModalCall');
showModalCallBtn.addEventListener('click', function() {
    callModal.showModal();
});
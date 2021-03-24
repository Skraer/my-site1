const faqItems = document.querySelectorAll('.faq__item');
if (faqItems) {
    faqItems.forEach(item => {
        item.addEventListener('click', e => {
            const title = e.target.closest('.faq__title');
            if (title) item.classList.toggle('shown');
        });
    });
}

const productCarts = document.querySelectorAll('.product-item__cart');
if (productCarts) {
    productCarts.forEach(cart => {
        const btnMinus = cart.querySelector('.product-item__cart-btn[name="cart-action"][value="minus"]');
        const btnPlus = cart.querySelector('.product-item__cart-btn[name="cart-action"][value="plus"]');
        const input = cart.querySelector('input.product-item__cart-input');
        btnMinus.addEventListener('click', e => {

        });
    });
}

class ProductItemCart {
    constructor(element) {
        if (typeof element === 'string') {
            this.el = document.querySelector(element);
        } else if (element instanceof HTMLElement) {
            this.el = element;
        } else {
            throw new Error('Ошибка');
        }
        this.btnMinus = this.el.querySelector('.product-item__cart-btn[name="cart-action"][value="minus"]');
        this.btnPlus = this.el.querySelector('.product-item__cart-btn[name="cart-action"][value="plus"]');
        this.input = this.el.querySelector('.product-item__cart-input');
        this.setup();
    }
    _validateDecimal(input) {
        const validCodes = [
            8,9,
            37,38,39,40,
            48,49,50,51,52,53,54,55,56,57,
            96,97,98,99,100,101,102,103,104,105
        ];
        input.addEventListener('keydown', e => {
            if (!validCodes.includes(e.keyCode)) {
                e.preventDefault();
            }
        });
    }
    increase() {
        const curVal = this.input.value;
        if (isNaN(parseInt(curVal))) {
            this.input.value = 1;
        } else {
            this.input.value = parseInt(curVal) + 1;
        }
    }
    decrease() {
        const curVal = this.input.value;
        if (isNaN(parseInt(curVal))) {
            this.input.value = 0;
        } else {
            parseInt(curVal) > 0 ? this.input.value = parseInt(curVal) - 1 : void(0);
        }
    }
    setup() {
        this._validateDecimal(this.input);
        this.btnPlus.addEventListener('click', e => {
            this.increase();
        });
        this.btnMinus.addEventListener('click', e => {
            this.decrease();
        });
    }
}


class Modal {
    constructor(selector, {onCall}) {
        this.selector = selector;
        this.el = document.querySelector(this.selector);
        if (this.el) {
            this.callBtn = document.querySelector('[data-call="' + this.el.getAttribute('id') + '"]');
            this.onCall = onCall || function(){};
            this.overlay = this.el.querySelector('.modal__overlay');
            this.closeBtn = this.el.querySelector('.modal__close');
            this.setup();
        }
    }
    showModal(disableAnimation = false) {
        // activeModal = this;
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
        // activeModal = null;
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
        this.callBtn.addEventListener('click', e => {
            this.showModal();
        });
    }
}

const callMe = new Modal('#callMe', {});
const productPhoto = new Modal('#productPhoto', {});

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

if (document.querySelectorAll('.product-item__cart')) {
    const productCarts = document.querySelectorAll('.product-item__cart');
    productCarts.forEach(cart => {
        const productItemCart = new ProductItemCart(cart);
    });
}
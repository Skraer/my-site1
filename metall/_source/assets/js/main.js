const faqItems = document.querySelectorAll('.faq__item');
if (faqItems) {
    faqItems.forEach(item => {
        item.addEventListener('click', e => {
            const title = e.target.closest('.faq__title');
            if (title) item.classList.toggle('shown');
        });
    });
}

function getCurrencyNum(val) {
    val = String(val).split('').reverse();
    for (let i = 3; i < val.length; i+=4) {
        val.splice(i, 0, ' ');
    }
    return val.reverse().join('');
}
function createElem({tag = 'div', classNames, attrs, html}) {
    const elem = document.createElement(tag);
    if (classNames) classNames.forEach(cls => {elem.classList.add(cls)});
    for (let attr in attrs) {
        elem.setAttribute(attr, attrs[attr]);
    }
    if (!isNullableValue(html)) elem.innerHTML = html;
    return elem;
}

function isNullableValue(val) {
    if (val instanceof Array) {
        for (let i = 0; i < val.length; i++) {
            if (val[i] === null || val[i] === undefined || val[i] === false) return true;
        }
    } else {
        if (val === null || val === undefined || val === false) return true;
    }
    return false;
}

class Toast {
    constructor({selector, time, timeAnim}) {
        this.selector = selector || '.toast';
        this.el = document.querySelector(this.selector);
        this.time = time || 2500;
        this.timeAnim = timeAnim || 500;
        this.isShowing = false;
        this.timer = null;
        if (this.el) {
            this.setup();
        }
    }
    showToast() {
        clearTimeout(this.timer);
        if (this.isShowing) {
            this.el.classList.remove('show');
            this.isShowing = false;
        }
        setTimeout(() => {
            this.el.classList.add('show');
            this.isShowing = true;
        }, 0);
        this.timer = setTimeout(() => {
            this.el.classList.remove('show');
            this.isShowing = false;
            clearTimeout(this.timer);
        }, this.time);
    }
    hideToast() {
        this.el.classList.remove('show');
        clearTimeout(this.timer);
    }
    setup() {
        this.el.style.animationDuration = this.timeAnim / 1000 + 's';
        this.el.addEventListener('click', e => {
            this.hideToast();
        });
    }
}
const toastProductAdded = new Toast({
    selector: '#productAdded',
    timeAnim: 300
});

class Cart {
    constructor({cartBtnSelector}) {
        this.cartBtn = document.querySelector(cartBtnSelector);
        this.setup();
        this.updateBtn();
    }
    updateBtn() {
        const innerLink = this.cartBtn.querySelector('a.cart-btn__link');
        const val = this.getCartCount();
        if (val > 0) {
            innerLink.setAttribute('data-cart-count', val);
            this.cartBtn.classList.add('not-empty');
        } else {
            innerLink.removeAttribute('data-cart-count');
            this.cartBtn.classList.remove('not-empty');
        }
    }
    addItem({id = null, title = null, price = null, count = null}) {    //мутабельный
        const cart = this.getCart();
        if (isNullableValue([id, title, price, count])) {
            throw new Error('Неверное значение для добавления товара в корзину');
        };
        cart[id] = {title, price, count};
        this.setCart(cart);
        return this.getCart();
    }
    increaseCount(id) {
        const cart = this.getCart();
        +(cart[id].count) >= 0 ?
            cart[id].count += 1 :
            cart[id].count = 0;
        this.setCart(cart);
    }
    decreaseCount(id) {
        const cart = this.getCart();
        +(cart[id].count) > 0 ?
            cart[id].count -= 1 :
            cart[id].count = 0;
        this.setCart(cart);
    }
    removeItem(id) {    //мутабельный
        const cart = this.getCart();
        if (cart[id]) delete cart[id];
        this.setCart(cart);
        return this.getCart();
    }
    getItem(id) {
        const cart = this.getCart();
        if (cart[id]) return cart[id];
    }
    setCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateBtn();
        return this.getCart();
    }
    removeAll() {   //мутабельный
        this.setCart({});
        return this.getCart();
    }
    getCart() {
        return JSON.parse(localStorage.getItem('cart'));
    }
    getCartCount() {
        const cart = this.getCart();
        let count = 0;
        for (let key in cart) {
            count++;
        }
        return count;
    }
    setup() {
        if (localStorage.getItem('cart') == null) {
            let cart = {};
            cart = JSON.stringify(cart);
            localStorage.setItem('cart', cart);
        }
    }
}
const cart = new Cart({
    cartBtnSelector: '#cartBtn'
});

class ProductCard {
    constructor(element) {
        if (typeof element === 'string') {
            this.el = document.querySelector(element);
        } else if (element instanceof HTMLElement) {
            this.el = element;
        } else {
            throw new Error('Ошибка');
        }
        this.btnMinus = this.el.querySelector('[name="cart-action"][value="minus"]');
        this.btnPlus = this.el.querySelector('[name="cart-action"][value="plus"]');
        this.input = this.el.querySelector('.product-item__cart-input');
        this.btnAdd = this.el.querySelector('.product-item__cart-add');
        this.id = this.el.getAttribute('data-id');
        this.title = this.el.querySelector('.product-item__title').getAttribute('title');
        this.price = this.el.querySelector('.product-item__price').getAttribute('data-price');
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
        isNaN(parseInt(curVal)) ?
            this.input.value = 1 :
            this.input.value = parseInt(curVal) + 1;
    }
    decrease() {
        const curVal = this.input.value;
        isNaN(parseInt(curVal)) ?
            this.input.value = 0 :
            parseInt(curVal) > 0 ? this.input.value = parseInt(curVal) - 1 : void(0);
    }
    setup() {
        this._validateDecimal(this.input);
        this.btnPlus.addEventListener('click', e => {
            this.increase();
        });
        this.btnMinus.addEventListener('click', e => {
            this.decrease();
        });
        this.btnAdd.addEventListener('click', e => {
            e.preventDefault();
            const count = parseInt(this.input.value);
            if (count > 0) {
                const data = {
                    id: this.id,
                    count: parseInt(this.input.value),
                    title: this.title,
                    price: parseInt(this.price)
                };
                cart.addItem(data);
                toastProductAdded.showToast();
            } else {
                alert('Уточните количество товара');
            }
        });
    }
}



class Modal {
    constructor(selector, {onCall}) {
        this.selector = selector;
        this.el = document.querySelector(this.selector);
        this.isInit = false;
        if (this.el) {
            this.isInit = true;
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
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                this.hideModal();
            });
        }
        this.overlay.addEventListener('mousedown', (e) => {
            if (e.target === this.overlay) {
                this.hideModal();
            }
        });
        if (this.callBtn) {
            this.callBtn.addEventListener('click', e => {
                this.showModal();
            });
        }
    }
}
const callMe = new Modal('#callMe', {});
const cartConfirmDelete = new Modal('#cartConfirmDelete', {});
if (cartConfirmDelete.isInit) {
    cartConfirmDelete.btnConfirm = cartConfirmDelete.el.querySelector('[name="delete"][value="confirm"]');
    cartConfirmDelete.btnCancel = cartConfirmDelete.el.querySelector('[name="delete"][value="cancel"]');
    cartConfirmDelete.btnConfirm.addEventListener('click', e => {
        cart.removeItem(cartConfirmDelete.deletingId);
        cartTable.updateTable();
        cartConfirmDelete.deletingId = null;
        cartConfirmDelete.hideModal();
    });
    cartConfirmDelete.btnCancel.addEventListener('click', e => {
        cartConfirmDelete.hideModal();
    });
}

class CartTable {
    constructor(wrapperSelector, {emptyText}) {
        this.wrapper = document.querySelector(wrapperSelector);
        this.table = document.querySelector('.cart__table');
        this.preloader = document.querySelector('.sk-fading-circle');
        this.emptyPlaceholderElem = document.querySelector('.cart-empty-placeholder');
        this.totalOutput = document.querySelector('.cart__total .output');
        this.emptyText = emptyText || '';
        if (this.wrapper) {
            this.setup();
        }
    }
    getTableRow(data) {
        const tr = createElem({
            tag: 'tr',
            classNames: ['cart__row'],
            attrs: {
                'data-id': data.id
            }
        });
        const fields = ['title', 'price', 'count'];
        const tdList = [];


        for (let i = 0; i < fields.length; i++) {
            const td = createElem({
                tag: 'td',
                html: data[fields[i]]
            });
            tdList.push(td);
        }
        tdList[1].innerText = getCurrencyNum(tdList[1].innerText) + ' руб'; 

        const actionsCol = createElem({classNames: ['cart__actions-col']});
        const btnActionMore = createElem({
            tag: 'button',
            classNames: ['cart__btn-more'],
        });
        const btnActionLess = createElem({
            tag: 'button',
            classNames: ['cart__btn-less'],
        });
        btnActionMore.addEventListener('click', e => {
            cart.increaseCount(data.id);
            this.updateTable();
        });
        btnActionLess.addEventListener('click', e => {
            cart.decreaseCount(data.id)
            this.updateTable();
        });
        actionsCol.append(btnActionMore, btnActionLess);

        tdList[2].append(actionsCol);

        const totalSum = parseInt(data.price) * parseInt(data.count);

        tdList.push(createElem({
            tag: 'td',
            html: getCurrencyNum(totalSum) + ' руб'
        }));


        const btnDelete = createElem({
            tag: 'button',
            classNames: ['cart__delete'],
            attrs: {title: 'Удалить'},
            html: '<img src="assets/img/icon/remove.svg" alt="Удалить">'
        });

        btnDelete.addEventListener('click', e => {
            cartConfirmDelete.showModal();
            document.querySelector('.cart-removing-title').innerText = data.title;
            cartConfirmDelete.deletingId = data.id;
        });

        tdList.push(createElem({
            tag: 'td',
        }));
        tdList[4].append(btnDelete);

        tr.append(...tdList);

        return tr;
    }
    showLoader() {
        this.wrapper.classList.add('hidden');
        this.emptyPlaceholderElem.classList.add('hidden');
        this.preloader.classList.remove('hidden');
    }
    showPlaceholder() {
        this.wrapper.classList.add('hidden');
        this.preloader.classList.add('hidden');
        this.emptyPlaceholderElem.classList.remove('hidden');
        this.emptyPlaceholderElem.innerText = this.emptyText;
    }
    showTable() {
        this.emptyPlaceholderElem.classList.add('hidden');
        this.preloader.classList.add('hidden');
        this.wrapper.classList.remove('hidden');
    }
    checkContent() {
        if (cart.getCartCount() > 0) {
            this.showTable();
            return true;
        } else {
            this.showPlaceholder();
            return false;
        }
    }
    updateTable() {
        if (this.checkContent()) {
            const items = cart.getCart();
            const tableBody = this.table.querySelector('tbody');
            tableBody.innerHTML = '';
            for (let id in items) {
                const data = {
                    id: id,
                    price: items[id].price,
                    title: items[id].title,
                    count: items[id].count,
                };
                tableBody.append(this.getTableRow(data));
            }
            this.updateTotalSum();
        }
    }
    updateTotalSum() {
        const items = cart.getCart();
        let sum = 0;
        for (let id in items) {
            const curSum = items[id].count * items[id].price;
            sum += curSum;
        }
        sum = getCurrencyNum(sum);
        this.totalOutput.innerText = sum + ' руб';
    }
    setup() {
        this.updateTable();
    }
}

const cartTable = new CartTable('.cart-content-wrapper', {
    emptyText: 'Ваша корзина на данный момент пуста'
});

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

if (document.querySelector('.product-item')) {
    const productCards = document.querySelectorAll('.product-item');
    productCards.forEach(card => {
        const cardInstance = new ProductCard(card);
    });
}
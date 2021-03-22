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

if (document.querySelectorAll('.product-item__cart')) {
    const productCarts = document.querySelectorAll('.product-item__cart');
    productCarts.forEach(cart => {
        const productItemCart = new ProductItemCart(cart);
    });
}
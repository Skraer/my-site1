function nodeExist(selector) {
    return document.querySelector(selector) !== null;
}
function getNewNode({tag = 'div', classList = '', attrs = {}, html, text}) {
    const elem = document.createElement(tag);
    elem.classList = classList;
    for (let key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
    if (html) {elem.innerHTML = html}
    if (text) {elem.innerText = text}
    return elem;
}

class Tabs {
    constructor({tabsSelector, tabSelector, onInit, withContent, initialTab}) {
        this.selector = tabsSelector || '.tabs';
        this.tabSelector = tabSelector || '.tabs__item';
        // this.tabsWrapperSelector = tabsWrapperSelector;
        this.tabs = document.querySelectorAll(this.selector + ' ' + this.tabSelector);
        this.inputs = document.querySelectorAll(this.selector + ' input');
        this.initialTab = initialTab || 0;
        this.contents = null;
        this.withContent = withContent || false;
        this.data = {
            activeIdx: null,
            activeValue: null
        };
        this.isInit = false;
        this.onInit = onInit ? onInit.bind(this) : function(){return false};
        this.setup();
    }
    resetTabs() {
        this.tabs.forEach(function(el) {
            el.classList.remove('active');
        });
    }
    _onInit() {
        if (this.onInit()) {
            this.onInit();
        }
    }
    setupContent() {
        if (this.withContent) {
            this.contents = document.querySelectorAll('[data-content-for-tab]');
        }
    }
    resetContents() {
        this.inputs.forEach(function(el) {
            const name = el.getAttribute('value');
            const content = document.querySelector('[data-content-for-tab="'+ name +'"]');
            content.classList.remove('active');
        });
    }
    setContent(name) {
        this.resetContents();
        const content = document.querySelector('[data-content-for-tab="'+ name +'"]');
        content.classList.add('active');
    }
    setup() {
        if (document.querySelector(this.selector) !== null) {
            this.inputs.forEach((el, idx) => {
                el.addEventListener('change', (e) => {
                    this.data = {activeIdx:idx, activeValue:el.value};
                    this.resetTabs();
                    this.tabs[idx].classList.add('active');
                    if (this.withContent) {
                        this.setContent(el.getAttribute('value'));
                    }
                });
            });
            this.tabs[this.initialTab].classList.add('active');
            this.inputs[this.initialTab].checked = true;
            if (this.withContent) {this.setContent(this.inputs[this.initialTab].getAttribute('value'))}
            this.isInit = true;
            this._onInit();
        }
    }
}

class MenuCatalog {
    constructor({menuSelector}) {
        this.menuSelector = menuSelector;
        this.menuRoot = document.querySelector(menuSelector);
        this.menuBtn = this.menuRoot.querySelector('a');
        this.setup();
    }
    setup() {
        if (this.menuRoot !== null) {
            const root = this.menuRoot;
            const btn = this.menuBtn;
            const selector = this.menuSelector;

            root.addEventListener('click', function(e) {
                e.preventDefault();
                if (e.target.closest('a') === btn) {
                    root.classList.contains('active') ?
                        root.classList.remove('active') :
                        root.classList.add('active');
                }

            });
            document.addEventListener('click', function(e) {
                if (e.target.closest(selector) !== root) {
                    root.classList.remove('active');
                }
            });
        }
    }
}

class ProductCards {
    constructor({cardSelector}) {
        this.cardSelector = cardSelector;
        this.cardElems = document.querySelectorAll(this.cardSelector);
        if (this.cardElems.length > 0) {
            this.setup();
        }
    }
    addToCartHandler() {

    }
    _setupSaleLabels() {
        this.cardElems.forEach(el => {
            if (el.classList.contains('sale')) {
                const label = getNewNode({
                    classList: 'product-card__sale-label',
                    attrs: {
                        'data-tooltip': 'Товар со скидкой',
                        'data-side': 'right',
                    }
                });
                el.appendChild(label);
            }
        });
    }
    _setupAddBtnAction() {
        this.cardElems.forEach((el, idx) => {
            const addBtn = el.querySelector(this.cardSelector + '__add');
            addBtn.onclick = () => {el.classList.toggle('in-cart')};
        });
    }
    setup() {
        this._setupAddBtnAction();
        this._setupSaleLabels();
    }
}

class SearchField {
    constructor({formSelector}) {
        this.formSelector = formSelector;
        this.form = document.querySelector(formSelector);
        this.input = document.querySelector(formSelector + ' input');
        this.btn = document.querySelector(formSelector + ' button');
        this.isInit = false;
        this.state = null;
        this.inputPlaceholder = null;
        this.text = '';
        this.setup();
    }
    openForm() {
        this.form.classList.remove('close');
        this.form.classList.add('open');
    }
    closeForm() {
        this.form.classList.remove('open');
        this.form.classList.add('close');
    }
    btnHandler(e) {
        if (!this.text) {
            e.preventDefault();
            if (this.state === 'open') {
                this.state = 'close';
                this.closeForm();
            } else if (this.state === 'close') {
                this.state = 'open';
                this.openForm();
            }
        } else {
            alert('Имитация поиска товара по запросу: ' + this.text);
            this.form.submit();
        }
    }
    inputHandler(e) {
        this.text = e.target.value;
        // if (!this.text && e.key === 'Enter') {
        //     e.preventDefault();
        // } else if (this.text && e.key === 'Enter') {
        //     alert('Имитация поиска товара по запросу: ' + this.text);
        // }
    }
    setup() {
        if (this.form && this.input && this.btn) {
            this.state = 'close';
            this.inputPlaceholder = this.input.getAttribute('placeholder');
            const btnHandler = this.btnHandler.bind(this);
            const inputHandler = this.inputHandler.bind(this);
            // const formHandler = this.formHandler.bind(this);
            this.btn.addEventListener('click', function(e) {btnHandler(e)});
            this.input.addEventListener('input', function(e) {inputHandler(e)});
            this.form.addEventListener('submit', (e) => {
                if (!this.text) {
                    e.preventDefault();
                } else {
                    alert('Имитация поиска товара по запросу: ' + this.text);
                }
            });

            this.isInit = true;
        } else {
            console.error('SearchField not inited. Some of elements not found');
        }
    }
}

class Filter {
    constructor({el, titles, cats}) {
        this.el = el;
        this.titles = titles;
        this.cats = cats;
        if (this.el) {
            this.textFields = this.el.querySelectorAll('input[type=text]');
            this.priceInputs = this.el.querySelectorAll('input[name^=price]');
            this.btnsReset = this.el.querySelectorAll('button[name=reset]');
        }
        if (this.el && nodeExist('.btn-up a[href="#' + this.el.getAttribute('id') + '"]')) {
            this.btnUp = document.querySelector('.btn-up');
        }
        this.btnUpIsShown = false;
        this.price = [0, 0];
        this.price.reset = function() {
            this[0] = 0;
            this[1] = 0;
        };
        this.brands = new Set();
        this.brands.reset = function() {this.clear()}

        

        if (el) {
            this.setup();
        }
    }
    touch() {
        const filter = this;
        this.el.dispatchEvent(new CustomEvent('filterchange', {
            detail: {}
        }));
    }
    toggleBtnReset(cat, show) {
        const btn = cat.querySelector('button[name=reset]');
        show ? btn.classList.add('shown') : btn.classList.remove('shown');
    }
    _validateDecimal(nodes) {
        /* валидация нажатой кнопки на соответствие цифре или кнопке управления (напр. tab или стрелка) */
        const validCodes = [
            8,9,
            37,38,39,40,
            48,49,50,51,52,53,54,55,56,57,
            96,97,98,99,100,101,102,103,104,105
        ];
        nodes.forEach(el => {
            el.addEventListener('keydown', e => {
                if (!validCodes.includes(e.keyCode)) {
                    e.preventDefault();
                }
            });
        });
    }
    _setupPriceInputs() {
        this.priceInputs.forEach(el => {
            el.addEventListener('input', e => {
                const t = e.target;
                if (parseInt(t.value) === 0) {t.value = '0'}
                const name = t.getAttribute('name');
                switch (name) {
                    case 'price-from':
                        this.price[0] = +t.value;
                        break;
                    case 'price-to':
                        this.price[1] = +t.value;
                        break;
                    default:
                        break;
                }
                const willShowBtn = (this.price[0] || this.price[1]);
                this.toggleBtnReset(el.closest('.filter__cat'), willShowBtn);
            });
        });
    }
    _setupTitles() {
        this.titles.forEach((el, idx) => {
            el.addEventListener('click', e => {
                if (e.target === el) {
                    this.cats[idx].classList.toggle('hidden');
                }
            });
        });
    }
    _setupBtnsReset() {
        this.btnsReset.forEach(el => {
            el.addEventListener('click', e => {
                const catName = e.target.getAttribute('value');
                const inputs = this.el.querySelectorAll('.filter__cat[data-filter-cat=' + catName + '] input');
                e.preventDefault();
                inputs.forEach(input => {
                    const type = input.getAttribute('type');
                    switch (type) {
                        case 'text':
                        case 'number':
                        case 'search':
                            input.value = '';
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (input.checked) {input.checked = false}
                            if (input.closest('li').style.display !== '') {input.closest('li').style.display = ''}
                        default:
                            break;
                    }
                });
                this[catName].reset();
                this.toggleBtnReset(el.closest('.filter__cat'), false);
            });
        });
    }
    _setupBrand() {
        const catElem = this.el.querySelector('[data-filter-cat=brands]');
        const searchInput = catElem.querySelector('input[name=brand-search]');
        const checkboxes = catElem.querySelectorAll('input[type=checkbox]');
        // Поле поиска
        searchInput.addEventListener('input', e => {
            const t = e.target;
            const text = t.value;
            checkboxes.forEach(cb => {
                cb.getAttribute('value').toLowerCase().includes(text.toLowerCase()) ?
                    cb.closest('li').style.display = '' :
                    cb.closest('li').style.display = 'none';
            });
        });

        // Обработка чекбоксов
        checkboxes.forEach(el => {
            el.addEventListener('change', e => {
                const val = el.getAttribute('value');
                el.checked ?
                    this.addBrand(val) :
                    this.deleteBrand(val);
                const willShowBtn = this.brands.size > 0;
                this.toggleBtnReset(catElem, willShowBtn);
            });
        });
    }  // TODO доработать (при клике на "сбросить" так же удалять теги; при удалении всех тегов убирать кнопку "сбросить")
    addBrand(val) {
        const tagsContainer = document.querySelector('.catalog__brand-tags');
        const tag = this._getBrandTag(val);
        tagsContainer.append(tag);
        this.brands.add(val);
    }
    deleteBrand(val) {
        const input = document.querySelector('[data-filter-cat=brands] input[value="' + val + '"]');
        const tag = document.querySelector('.catalog__brand-tag[data-brand="' + val + '"]');
        input.checked = false;
        tag.remove();
        this.brands.delete(val);
    }
    _getBrandTag(val) {
        const tag = getNewNode({
            classList: 'catalog__brand-tag',
            attrs: {'data-brand': val}
        });
        const btn = getNewNode({
            tag: 'button',
            classList: 'catalog__brand-delete',
            attrs: {'type': 'button'},
            html: '&#10006'
        });
        const span = getNewNode({
            tag: 'span',
            text: val,
        });
        tag.append(btn, span);
        btn.addEventListener('click', e => {
            this.deleteBrand(val);
        });
        return tag;
    }
    /*
    _setupSticky() {
        const rect = this.el.getBoundingClientRect();
        const grid = document.querySelector('.catalog__products');
        const catalog = document.querySelector('.catalog');
        const catRect = catalog.getBoundingClientRect();
        const padLeft = Math.round(grid.getBoundingClientRect().left + pageXOffset - catRect.left);
        console.log(padLeft);
        const root = document.documentElement;
        const coords = {
            x: rect.x,
            defaultYTop: rect.top + pageYOffset,
            defaultYBottom: rect.bottom + pageYOffset
        };
        this.el.style.left = coords.x + 'px';
        window.addEventListener('scroll', e => {
            if ((pageYOffset + root.clientHeight) > coords.defaultYBottom) {
                this.el.style.position = 'fixed';
                this.el.style.bottom = '20px';
                grid.style.paddingLeft = padLeft + 'px';
                console.log(true);
            }
            // console.log(coords.x);
            // console.log(pageYOffset);
        });
    } */
    _showBtnUp() {
        this.btnUp.style.display = 'block';
        this.btnUp.classList.remove('hiding');
        this.btnUp.classList.add('showing');
        this.btnUpIsShown = true;
        clearTimeout(this.btnShowTimeout);
        this.btnShowTimeout = setTimeout(() => {
            this.btnUp.classList.remove('showing');
        }, 250);
    }
    _hideBtnUp() {
        this.btnUp.classList.remove('showing');
        this.btnUp.classList.add('hiding');
        this.btnUpIsShown = false;
        clearTimeout(this.btnShowTimeout);
        this.btnShowTimeout = setTimeout(() => {
            this.btnUp.style.display = '';
            this.btnUp.classList.remove('hiding');
        }, 250);
    }
    _setupBtnUp() {
        if (this.btnUp) {
            /* клик по кнопке "к фильтру" */
            const anchor = this.btnUp.querySelector('a[href="#filter"]');
            const path = anchor.getAttribute('href');
            anchor.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(path).scrollIntoView({block: "start", behavior: "smooth"});
            });
            /* плавное появление и скрытие кнопки "к фильтру" при скролле */
            const filterRect = this.el.getBoundingClientRect();
            const activePos = filterRect.bottom + pageYOffset;
            window.addEventListener('scroll', e => {
                if (pageYOffset >= activePos && !this.btnUpIsShown) {
                    this._showBtnUp();
                } else if (pageYOffset < activePos && this.btnUpIsShown) {
                    this._hideBtnUp();
                }
            });
        }
   }
    setup() {
        this._setupTitles();
        this._setupPriceInputs();
        this._setupBrand();

        this._validateDecimal(this.priceInputs);
        this._setupBtnsReset();
        // this._setupSticky();
        this._setupBtnUp();

        // this.checkBoxes.forEach(el => {
        //     el.addEventListener('change', e => {
        //         this.touch();
        //     });
        // });
        
        this.el.addEventListener('filterchange', function(e) {  //TODO нужно ли?
            console.log(true);
        });

    }
}

class Tooltips {
    constructor({offsetX, offsetY}) {
        this.elems = document.querySelectorAll('[data-tooltip]');
        this.offsetX = offsetX || 5;
        this.offsetY = offsetY || 15;
        if (this.elems.length > 0) {
            this.setup();
        }
    }
    getTooltip(parent) {
        const text = parent.getAttribute('data-tooltip');
        const side = parent.getAttribute('data-side');
        const tooltip = getNewNode({
            text: text,
            classList: 'tooltip',
        });
        if (side) {tooltip.classList.add('tooltip--' + side)}
        return tooltip;
    }
    getTooltipPosition(parent) {
        const rect = parent.getBoundingClientRect();
        const x = Math.round(rect.left);
        const y = Math.round(rect.top + window.scrollY + rect.height + this.offsetY);
        return {x, y};
    }
    setup() {
        this.elems.forEach(el => {
            let tooltip = this.getTooltip(el);
            el.addEventListener('mouseenter', e => {
                const {x, y} = {...this.getTooltipPosition(el)};
                tooltip.style.left = x + 'px';
                tooltip.style.top = y + 'px';
                document.body.appendChild(tooltip);
            });
            el.addEventListener('mouseleave', e => {
                document.body.removeChild(tooltip);
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {

    const catalogFilter = new Filter({
        el: document.querySelector('#filter'),
        titles: document.querySelectorAll('#filter .filter__cat-title'),
        cats: document.querySelectorAll('#filter .filter__cat'),
    });


    const navMenuLinks = document.querySelectorAll('.nav-list .nav-list__item a');
    navMenuLinks.forEach(function(el) {
        if (window.location.pathname.indexOf(el.getAttribute('href')) > -1) {
            el.closest('.nav-list__item').classList.add('current');
            // document.body.classList.add('index-page');  // FIXME !!!!!!!!!!!!REMOVE ON PROD!!!!!!!!!!!!!!! 
        } 
        if ((window.location.pathname === '' || window.location.pathname === '/' || window.location.pathname === '/index.html') && el.getAttribute('href').indexOf('index') > -1) {
            el.closest('.nav-list__item').classList.add('current');
            document.body.classList.add('index-page');  // FIXME !!!!!!!!!!!!REMOVE ON PROD!!!!!!!!!!!!!!! 
        } 
        if (window.location.pathname === '/catalog.html') {
            document.body.classList.add('catalog-page');  // FIXME !!!!!!!!!!!!REMOVE ON PROD!!!!!!!!!!!!!!! 
        }
    });

    const headerSearchField = new SearchField({
        formSelector: '.header .actions__search'
    });

    const productsTabs = new Tabs({
        tabsSelector: '.products__category-tabs',
        tabSelector: '.products__category-tab',
    });
    const productsGridTabs = new Tabs({
        tabsSelector: '.products__type-tabs',
        tabSelector: '.products__type-tab',
    });

    const productCardInfoTabs = new Tabs({
        tabsSelector: '.product__info-tabs',
        withContent: true,
        // contentBoxSelector: '.product__info-content-box'
    });
    const deliveryTabs = new Tabs({
        tabsSelector: '.delivery__info-tabs',
        withContent: true,
        // contentBoxSelector: '.product__info-content-box'
    });
    
    const headerCatalog = new MenuCatalog({
        menuSelector: '.header__menu'
    });

    const productCards = new ProductCards({
        cardSelector: '.product-card'
    });

    const tooltips = new Tooltips({});



    
    if (nodeExist('.brands__slider.splide')) {
        const brandsSlider = new Splide('.brands__slider.splide', {
            type: 'loop',
            perPage: 4,
            perMove: 1,
            pagination: false
        }).mount();
    }

    if (nodeExist('.banner-slider.splide')) {
        const bannerSlider = new Splide('.banner-slider.splide', {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            pagination: false,
            arrows: false,
            gap: 40,
            autoplay: true,
            interval: 3000,
            drag: false,
            pauseOnHover: false,
            pauseOnFocus: false,
        }).mount();
    }



    if (nodeExist('.product__view-slider.splide')) {
        const productCardThumbs = new Splide( '.product__view-slider.splide', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            height: 380,
            gap         : 8,
            cover       : false,
            isNavigation: true,
            pagination: false,
            focus       : 'center',
            direction: 'ttb',
        }).mount();
        const productCardPrimary = new Splide( '.product__view-img-wrapper', {
            type       : 'fade',
            pagination : false,
            arrows     : false,
            cover      : false,
            drag: false,
        });
        productCardPrimary.sync( productCardThumbs ).mount();
    }
});

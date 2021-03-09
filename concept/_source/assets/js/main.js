'use strict';
class Quiz {
    constructor({slider, ableOnSelect, onSubmit, onChangeSlide}) {
        this.selector = '.quiz';
        this.el = document.querySelector(this.selector);
        this.slider = slider;
        this.pages = this.el.querySelectorAll('.quiz__page');
        this.form = this.el.querySelector('.quiz__form');
        // this.labels = this.el.querySelectorAll('label.quiz-item');
        this.inputs = this.el.querySelectorAll('label.quiz-item input[type="radio"], label.quiz-item input[type="checkbox"]');
        this.pageAllowed = 0;
        this.data = {};
        this.pageCount = this.pages.length;
        this.ableOnSelect = ableOnSelect || false;
        this.onSubmit = onSubmit;
        this.onChangeSlide = onChangeSlide;
        this.actions = {
            prev: document.querySelector('.quiz-actions__prev'),
            next: document.querySelector('.quiz-actions__next'),
        };
        this.progress = {
            current: 0,
            pageIdx: 0,
            step: 100 / (this.pageCount - 1),
            elem: document.querySelector('.progress-bar'),
            line: document.querySelector('.progress-bar .progress-bar__line'),
            lineCurrent: document.querySelector('.progress-bar .progress-bar__ready'),
        };
        this.setup();
    }
    progressUp() {
        this.progress.pageIdx++;
        this.progress.current += this.progress.step;
        const num = Math.round(this.progress.current);
        const output = num + '%';
        const el = this.progress.lineCurrent;
        el.style.width = output;
        el.setAttribute('data-tooltip', output);
        if (el.classList.contains('start')) {el.classList.remove('start');}
        if (num === 100) {el.classList.add('end');}
    }
    setupItems() {
        this.inputs.forEach((el, idx) => {
            el.addEventListener('change', () => {
                const page = el.closest('.quiz__page');
                const multiply = page.hasAttribute('data-multiply');
                const labels = page.querySelectorAll('label');
                const key = el.getAttribute('name');
                const value = el.getAttribute('value');
                if (!multiply) {
                    labels.forEach(label => {label.classList.remove('active')});
                    el.closest('label.quiz-item').classList.add('active');
                    this.setData(key, value);
                } else {
                    el.closest('label.quiz-item').classList.toggle('active');
                    el.checked ?
                        this.setData(key, value, multiply) :
                        this.setData(key, value, multiply, 'delete');
                }

                this.pages.forEach((p, i) => {
                    if (p === page && this.pageAllowed <= i) {
                        this.pageAllowed++;
                        this.enableNext();

                    }
                });
            });
        }); 
    }
    getHiddenInputs() {
        const elems = [];
        for (let key in this.data) {
            const elem = document.createElement('input');
            elem.setAttribute('type', 'hidden');
            elem.setAttribute('name', key);
            const value = typeof this.data[key] === 'string' ?
                this.data[key] :
                Array.from(this.data[key]).join(', ');
            elem.setAttribute('value', value);
            elems.push(elem);
        }
        return elems;
    }
    finish() {
        const inputs = this.getHiddenInputs();
        this.form.append(...inputs);
    }
    setData(key, val, multiply = false, action = 'add') {
        if (!multiply) {
            this.data[key] = val;
        } else {
            if (!this.data[key]) {
                this.data[key] = new Set();
            }
            this.data[key][action](val);
        }
    }
    disableNext() {
        this.actions.next.setAttribute('disabled', 'disabled');
    }
    enableNext() {
        this.actions.next.removeAttribute('disabled');
    }
    setup() {
        const quiz = this;
        quiz.actions.next.addEventListener('click', function(e) {
            quiz.slider.go( '+' );
            quiz.pageAllowed === quiz.slider.index ?
                quiz.disableNext() :
                quiz.enableNext();
            quiz.onChangeSlide();
        });
        quiz.actions.prev.addEventListener('click', function(e) {
            quiz.slider.go( '-' );
            quiz.enableNext();
            quiz.onChangeSlide();
        });
        quiz.slider.on('move', function(next, prev) {
            if (next === quiz.slider.length - 1) {
                document.querySelector('.quiz-actions').style.display = 'none';
                quiz.finish();
            }
            if (next > quiz.progress.pageIdx) {
                quiz.progressUp();
            }
        });

        if (this.ableOnSelect) {
            this.disableNext();
        }
        this.setupItems();

        // this.form.addEventListener('submit', (e) => {
        //     if (this.onSubmit) {
        //         e.preventDefault();
        //         this.onSubmit();
        //     }
        // });
    }
}

class Modal {
    constructor({selector, onFirstOpen}) {
        this.selector = selector;
        this.el = document.querySelector(selector);
        this.triggers = document.querySelectorAll('.call-modal[data-target="' + this.el.getAttribute('id') + '"]');
        this.closeBtn = this.el.querySelector('.modal__close');
        this.overlay = this.el.querySelector('.modal__overlay');
        this.tooltips = this.el.querySelectorAll('.modal__tooltip-item');
        this.opened = false;
        this.onFirstOpen = onFirstOpen;
        this.setup();
    }
    showModal(disableAnimation = false) {
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
        document.querySelector('.wrapper').classList.add('blured');
    }
    hideModal(disableAnimation = false) {
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
        document.querySelector('.wrapper').classList.remove('blured');
    }
    showingHandler() {
        this.el.classList.contains('active') ?
            this.hideModal() :
            this.showModal();
    }
    setTooltip(idx) {
        this.tooltips.forEach(el => {
            el.classList.remove('active');
        });
        this.tooltips[idx].classList.add('active');
    }
    setup() {
        this.closeBtn.addEventListener('click', (e) => {
            this.hideModal();
        });
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hideModal();
            }
        })
        this.triggers.forEach((el) => {
            el.addEventListener('click', (e) => {
                this.showingHandler();
                if (!this.opened) {
                    this.onFirstOpen();
                    this.opened = true;
                }
            });
        });
    }
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

function sendForm(form, onSuccess) {
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
                modal.hideModal(true);
                success.showModal(true);
                onSuccess();
            }
        };
        xhr.send(body);
    } else {
        alert('Заполните поля корректно');
    }
}
function validateForm(form) {
	var regTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
	var inputTel = form.querySelector('input[name="tel"]');
    var inputName = form.querySelector('input[name="name"]');
    return (!!inputTel.value.match(regTel) && inputName.value.length >= 2);
}

var modal, success;
document.addEventListener('DOMContentLoaded', function() {
    success = new Modal({
        selector: '.modal--success'
    });

    const quiz = new Quiz({
        ableOnSelect: true,
        onChangeSlide() {
            modal.setTooltip(quiz.slider.index);
        },
        slider: new Splide('.splide.quiz', {
            arrows: false,
            perPage: 1,
            perMove: 1,
            pagination: false,
            drag: false,
            gap: 120,
            padding: 1,
        })
    });
    modal = new Modal({
        selector: '.modal--quiz',
        onFirstOpen() {
            quiz.slider.mount();
        }
    });

    const maskedElem = quiz.form.querySelector('input[type="tel"]');
    const maskOptions = {
        mask: '+{7}(000)000-00-00',
        lazy: false
    };
    const mask = IMask(maskedElem, maskOptions);
    // unmaskedValue

});
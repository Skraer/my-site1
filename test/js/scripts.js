"use strict";

var _this = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//fix hover element on mobile
var allEl = document.querySelectorAll('*');

for (var i = 0; i < allEl.length; i++) {
  allEl.ontouchstart = function () {
    return _this.mouseover();
  };

  allEl.ontouchcancel = function () {
    return _this.mouseover();
  };
} //Проверка поддержки WEBP




function check_webp_feature(feature, callback) {
  var kTestImages = {
    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
    alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
    animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
  };
  var img = new Image();

  img.onload = function () {
    var result = img.width > 0 && img.height > 0;
    callback(feature, result);
  };

  img.onerror = function () {
    return callback(feature, false);
  };

  img.src = "data:image/webp;base64," + kTestImages[feature];
} //Если браузер поддерживает WEBP, то добавляем класс тегу body


check_webp_feature('lossy', function (feature, isSupported) {
  isSupported ? document.body.classList.add('webp-support-js') : document.body.classList.add('webp-nosupport-js');
}); //popup

  console.log(1)
  document.addEventListener("DOMContentLoaded", allScripts);
function allScripts() {
  // debugger
  console.log(2)
  var popup = document.querySelectorAll('.popup');
  var popupBtn = document.querySelectorAll('[data-popup]');
  var closePopup = document.querySelectorAll('.popup__close');

  function closeP() {
    for (var i = 0; i < popup.length; i++) {
      popup[i].classList.remove('active');
      document.body.classList.remove('hidden');
    }
  }

  ;

  for (var y = 0; y < closePopup.length; y++) {
    closePopup[y].addEventListener('click', function () {
      closeP();
    });
  }

  ;

  for (var r = 0; r < popupBtn.length; r++) {
    popupBtn[r].addEventListener('click', function () {
      document.getElementById(this.dataset.popup).classList.add('active');
      document.body.classList.add('hidden');
    });
  }

  ;

  if (window.innerWidth < 780) {
    setTimeout(function () {
      document.getElementById('no-exit').classList.add('active');
      document.querySelector('.noexit').style.display = 'none';
      document.body.classList.add('hidden');
    }, 20000);
  } else {
    document.querySelector('.noexit').addEventListener('mouseover', function () {
      document.getElementById('no-exit').classList.add('active');
      document.body.classList.add('hidden');
      this.style.display = 'none';
    });
  }

  ;
/*setMask(document.querySelectorAll('input[type=tel]'));
setMask(document.querySelectorAll('.input-tel'));

function setMask(inpTel) {
  var mask;
  
  for (var i = 0; i < inpTel.length; i++) {
    inpTel[i].addEventListener('mouseover', function () {
      mask = IMask(this, {
        mask: '+{7} (000) 000 00 00',
        overwrite: true,
        lazy: false,
        autofix: true
      });
    });
    inpTel[i].addEventListener('mouseout', function () {
      // console.log(this.value)
      this.value = '';
      if (this.value.match('_')) {
        mask.masked.reset();
      }
    });
  };
}
  ;*/
  
  var allForms = document.querySelectorAll('form');
  
  for (var a = 0; a < allForms.length; a++) {
    allForms[a].addEventListener('submit', function (e) {
      e.preventDefault();

      /*if (this.querySelectorAll('.form__input')[0].value == "+7 (___) ___ __ __") {
          console.log('test');
        this.querySelectorAll('.form__input')[0].value = '';
        return;
      }*/
      
    var selector = this.querySelectorAll('.form__input')[0];
    var im = new Inputmask("+7 (999) 999 99 99");
    im.mask(selector);      
      
      
      var request = new XMLHttpRequest();
      var thisForm = this;
      var data = new FormData(thisForm);
      request.open('POST', 'mail.php', true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            // Success!
            var resp = this.responseText;
            thisForm.reset();
            closeP();
              document.body.classList.remove('hidden');
              window.location.href = '/oto';
          } else {
            // Error :(
            alert('False');
          }
        }
      };

      function getQueryString(formData) {
        var pairs = [];

        var _iterator = _createForOfIteratorHelper(formData.entries()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return pairs.join('&');
      }

      request.send(getQueryString(data));
    });
  }
  Inputmask().mask(document.querySelectorAll("input"));
};
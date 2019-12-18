// function tabs(n) {
//     let arr1 = ['.tab-desc', '.tab-chars', '.tab-revs'];
//     let arr2 = ['.product-page-info__description', '.product-page-info__characteristics', '.product-page-info__reviews'];
//     let tabsArr = [];
//     let infoBlocksArr = [];

//     for (i = 0; i < n; i++) {
//         let elem = document.querySelector(arr1[i]);
//         if (elem !== undefined) {
//             tabsArr.push(elem);
//         } else {
//             continue;
//         }
//     }
//     for (i = 0; i < n; i++) {
//         let elem = document.querySelector(arr2[i]);
//         if (elem !== undefined) {
//             infoBlocksArr.push(elem);
//         } else {
//             continue;
//         }
//     }
//     tabsArr.forEach(function(elem, i) {
//         elem.addEventListener('click', function() {
//             tabsArr.forEach(function(tab) {
//                 tab.classList.remove('product-page-info__tab--active');
//                 event.target.classList.add('product-page-info__tab--active');
//             });
//             infoBlocksArr.forEach(element => {element.classList.remove('product-page-info__active')});
//             infoBlocksArr[i].classList.add('product-page-info__active');
//         });
//     });
// }
// tabs(3);

// let tabsArr = [
//     document.querySelector('.tab-desc'),
//     document.querySelector('.tab-chars'),
//     document.querySelector('.tab-revs')
// ];
// let infoBlocksArr = [
//     document.querySelector('.product-page-info__description'),
//     document.querySelector('.product-page-info__characteristics'),
//     document.querySelector('.product-page-info__reviews')
// ];
// tabsArr.forEach(function(elem, i) {
//     elem.addEventListener('click', function() {
//         tabsArr.forEach(function(tab) {
//             tab.classList.remove('product-page-info__tab--active');
//             event.target.classList.add('product-page-info__tab--active');
//         });
//         infoBlocksArr.forEach(element => {element.classList.remove('product-page-info__active')});
//         infoBlocksArr[i].classList.add('product-page-info__active');
//     });
// });
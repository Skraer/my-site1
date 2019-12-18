let socialIconsBlock = document.querySelectorAll('.share-social__socials');
socialIconsBlock.forEach(function(elem) {
    let arr = elem.children;
    for (i = 0; i < arr.length; i++) {
        let child = arr[i];
        let img = document.createElement('img');
        child.classList.forEach(function(cls) {
            if (cls.indexOf('share-social__icon') >= 0) {
                let iconArr = cls.split('-');
                let iconName = iconArr[iconArr.length - 1];
                img.setAttribute('src', 'img/icon/social/' + iconName + '.png');
                img.setAttribute('alt', iconName);
            } else {
                return;
            }
        });
        child.appendChild(img);
    }
});
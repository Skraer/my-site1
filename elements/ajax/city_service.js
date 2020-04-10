/////ВСПОМОГАТЕЛЬНЫЕ
function capitalize(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
}
/////===============


const service = {
    container: document.querySelector('.service'),
    _city: null,
    lat: null,
    lng: null,
    get city() {
        return this._city;
    },
    set city(val) {
        this._city = val.toLowerCase();
    },
    form: {
        container: document.querySelector('.service__form'),
        input: document.querySelector('.service__form input[name="inputCity"]'),
        btn: document.querySelector('.service__form button[name="submit"]'),
    },
    news: {
        container: document.querySelector('.service .service__news'),
        pagination: null,
        paginRendered: false,
        page: 1,
        
    },
    weather: {
        container: document.querySelector('.service .service__weather'),
        output: document.querySelector('.service-weather__output'),
    },
    map: {
        container: document.querySelector('.service .service__map'),
    }
}

//////////НОВОСТИ
const citiesList = fetch('russia.json')
    .then(response => response.json())
    .then(json => json.map(elem => elem.city.toLowerCase()));

function getURL(word, page = null) {
    const params = {
        'q': encodeURI(word.toLowerCase()),
        'sortBy': 'publishedAt',
        'pageSize': 5,
        'page': page || service.news.page
    }
    function writeParams(obj) {
        let str = '';
        for (let key in obj) {
            str = str.concat(key, '=', obj[key], '&');
        }
        str.slice(-1);
        return str;
    }
    let url = `//newsapi.org/v2/everything?${writeParams(params)}`;
    let apiKey = '3609efc2342e46ca83c85fdc516d6fd8';        
    return {
        url: url,
        apiKey: apiKey
    };
}

async function fetchNews(word, page = null) {
    let urlObj = getURL(word, page);
    try {
        let response = await fetch(urlObj.url, {
            headers: {
                'X-Api-Key': urlObj.apiKey
            }
        });
        if (response.status >= 400) {
            throw new Error('Ошибка при запросе новостей. \nКод ошибки: ' + response.status + '.\nСообщение: ' + response.statusText);
        }
        let json = await response.json();
        return json;
    } catch (err) {
        console.error(err);
    }
}

function activatePagination() {
    let pagination = service.news.pagination;
    let i = 0;
    for (let page in pagination) {
        if (i === 0) {
            i++;
            continue;
        } else {
            let elem = pagination[page];
            elem.addEventListener('click', async function(e) {
                e.preventDefault();
                service.news.page = elem.getAttribute('data-page');
                let news = await fetchNews(service.city, elem.getAttribute('data-page'));
                if (news && news.status == 'ok') {
                    renderNews(news);
                    activatePagination();
                } else {
                    console.error(new Error('Что-то пошло не так...'));
                }
            });
        }
        pagination['item' + service.news.page].classList.add('service-news__pagination-item--active');
        i++;
    }
}

async function renderNews(response) {
    let articles = response.articles;
    const createItem = () => {
        let obj = {
            item: document.createElement('div'),
            content: document.createElement('div'),
            title: document.createElement('div'),
            link: document.createElement('a'),
            desc: document.createElement('div'),
            imgWrap: document.createElement('div'),
            img: document.createElement('img'),
        }
        obj.item.classList.add('service-news__item');
        obj.content.classList.add('service-news__item-content');
        obj.title.classList.add('service-news__title');
        obj.desc.classList.add('service-news__desc');
        obj.imgWrap.classList.add('service-news__img');

        obj.content.appendChild(obj.title);
        obj.content.appendChild(obj.desc);
        obj.title.appendChild(obj.link);
        obj.item.appendChild(obj.content);
        obj.item.appendChild(obj.imgWrap);
        obj.imgWrap.appendChild(obj.img);
        return obj;
    };
    const createPagination = (amount) => {
        let obj = {
            container: document.createElement('div'),
        }
        obj.container.classList.add('service-news__pagination');
        for (let i = 1; i <= amount; i++) {
            let item = document.createElement('a');
            item.setAttribute('href', '#');
            item.setAttribute('data-page', (i));
            item.classList.add('service-news__pagination-item');
            item.textContent = i;
            obj['item' + i] = item;
            obj.container.appendChild(obj['item' + i]);
        }
        // if (amount > 5) {
        //     for (let i = 5; i < amount - 1; i++) {
        //         obj['item' + i].style.display = 'none';
        //     }
        // }
        return obj;
    }
    const render = () => {
        articles.forEach(article => {
            let newItemObj = createItem();
            newItemObj.link.setAttribute('href', article.url);
            newItemObj.link.textContent = article.title;
            newItemObj.desc.textContent = article.description;
            newItemObj.img.setAttribute('src', article.urlToImage || 'img/bung.jpg');
            service.news.container.appendChild(newItemObj.item);
        });
    };

    const renderPagination = () => {
        if (!service.news.paginRendered) {
            service.news.pagination = createPagination(Math.ceil(response.totalResults / 5));
            service.news.container.appendChild(service.news.pagination.container);
        }
    }
    // console.log(response.totalResults);

    let check = false;
    if (service.news.container.children.length > 0) {
        for (let elem of service.news.container.children) {
            if (elem.matches('.service-news__item')) {
                check = true;
                break;
            }
        }
    }
    if (check) {
        service.news.container.innerHTML = '';
        renderPagination();
        render();
    } else {
        renderPagination();
        render();
    }
}

async function checkCities(val) {
    let list = await citiesList;
    if (list.includes(val)) return true;
    else {
        alert('Введите корректное значение!');
        return false;
    }
}
///////===================



////////// ПОГОДА
async function weatherDecorator(fn, refreshTime, varName) {
    async function loadAndCachingData() {
        let some = await fn();
        some = JSON.stringify(some);
        localStorage.setItem(varName, some);
        let date = new Date();
        localStorage.setItem([varName + 'Date'], date);
        return some;
    }
    if (!localStorage.getItem(varName) || JSON.parse(localStorage.getItem(varName)).name.toLowerCase() != service.city) {
        console.log('Устанавливаем значение...');
        let data = await loadAndCachingData();
        return JSON.parse(data);
    } else {
        console.log('Значение взято из хранилища');
        let cachedDate = new Date(localStorage.getItem([varName + 'Date']));
        let diff = new Date() - cachedDate;
        let minutes = Math.floor(diff / 60000);
        console.log('Данные находятся в хранилище уже ' + minutes + ' минут');
        if (minutes >= refreshTime) {
            console.log('Данные устарели. Загружаем новые...');
            let data = await loadAndCachingData();
            return JSON.parse(data);
        } else {
            return JSON.parse(localStorage.getItem(varName));
        }
    }
}
async function getWeather() {
    function writeSettings(obj) {
        let str = '';
        for (let key in obj) {
            str = str.concat(key, '=', obj[key], '&');
        }
        str.slice(-1);
        return str;
    }
    const params = {
        'appid': '013487ce4036065cfef2bb1b73e5ddc5',
        'q': service.city,
        'lang': 'ru',
        'units': 'metric'
    }
    let json = await (await fetch(`//api.openweathermap.org/data/2.5/weather?${writeSettings(params)}`)).json();
    return json;
}
function extractData(obj) {
    let extractedData = {
        skyState: (obj.weather[0].description).toString(),
        temp: (obj.main.temp).toString(),
        feelsLike: (obj.main.feels_like).toString(),
        tempMin: (obj.main.temp_min).toString(),
        tempMax: (obj.main.temp_max).toString(),
        windSpeed: (obj.wind.speed).toString(),
        windDeg: (obj.wind.deg).toString(),
        windDirection: (getWindDirect(obj.wind.deg)).toString(),
        pressure: (Math.round((obj.main.pressure / 1.333))).toString(),
        humidity: (obj.main.humidity).toString(),
        cloudiness: (obj.clouds.all).toString(),
        // rain1h: (obj.rain['1h'] || '-').toString(),
        // rain3h: (obj.rain['3h'] || '-').toString(),
        // snow1h: (obj.snow['1h'] || '-').toString(),
        // snow3h: (obj.snow['3h'] || '-').toString(),
        visibility: (obj.visibility / 1000).toString(),
        sunrise: (getTime(obj.sys.sunrise)).toString(),
        sunset: (getTime(obj.sys.sunset)).toString(),
        get skyStateString() {return capitalize(this.skyState)},
        get tempString() {return this.temp + ' °C'},
        get feelsLikeString() {return this.feelsLike + ' °C'},
        get tempMinString() {return this.tempMin + ' °C'},
        get tempMaxString() {return this.tempMax + ' °C'},
        get windSpeedString() {return this.windSpeed + ' м/с'},
        get windDegString() {return this.windDeg},
        get windDirectionString() {return this.windDirection},
        get pressureString() {return this.pressure + ' мм. рт. столба'},
        get humidityString() {return this.humidity + '%'},
        get cloudinessString() {return this.cloudiness + '%'},
        // get rain1hString() {return (this.rain1h === '-') ? '-' : this.rain1h + ' мм'},
        // get rain3hString() {return (this.rain3h === '-') ? '-' : this.rain3h + ' мм'},
        // get snow1hString() {return (this.snow1h === '-') ? '-' : this.snow1h + ' мм'},
        // get snow3hString() {return (this.snow3h === '-') ? '-' : this.snow3h + ' мм'},
        get visibilityString() {return this.visibility + ' км'},
        get sunriseString() {return this.sunrise},
        get sunsetString() {return this.sunset},
    }
    console.log(extractedData);
    

    service.lat = obj.coord.lat;
    service.lng = obj.coord.lon;
    function getTime(timestamp) {
        let date = new Date(timestamp * 1000);
        let time = date.getHours() + ':' + date.getMinutes();
        return time;
    }
    function getWindDirect(deg) {
        deg = Math.round(deg);
        const obj = {
            'Северо-восток': [23, 67],
            'Восток': [68, 112],
            'Юго-восток': [113, 157],
            'Юг': [158, 202],
            'Юго-запад': [203, 247],
            'Запад': [248, 292],
            'Северо-запад': [293, 337],
            'Север': [338, 22],
        }
        for (let key in obj) {
            if (deg >= obj[key][0] && deg <= obj[key][1]) {
                return key;
            }
            if (deg >= 338 || deg <= 22) {
                return 'Север';
            }
        }
    }
    for (let key in extractedData) {
        if (extractedData[key] === 'NaN') {
            extractedData[key] = '-';
        }
    }
    return extractedData;
}

function weatherRendering(data) {
    const output = {
        skyState: service.weather.output.querySelector('.sky-state'),
        temp: service.weather.output.querySelector('.temp'),
        tempFeelsLike: service.weather.output.querySelector('.temp-feels-like'),
        tempMin: service.weather.output.querySelector('.temp-min'),
        tempMax: service.weather.output.querySelector('.temp-max'),
        wind: service.weather.output.querySelector('.wind'),
        windDirection: service.weather.output.querySelector('.wind-direction'),
        pressure: service.weather.output.querySelector('.pressure'),
        humidity: service.weather.output.querySelector('.humidity'),
        clouds: service.weather.output.querySelector('.clouds'),
        // rain1h: service.weather.output.querySelector('.rain-1h'),
        // rain3h: service.weather.output.querySelector('.rain-3h'),
        // snow1h: service.weather.output.querySelector('.snow-1h'),
        // snow3h: service.weather.output.querySelector('.snow-3h'),
        visibility: service.weather.output.querySelector('.visibility'),
        sunrise: service.weather.output.querySelector('.sunrise'),
        sunset: service.weather.output.querySelector('.sunset'),
    }
    output.skyState.textContent = data.skyStateString;
    output.temp.textContent = data.tempString;
    output.tempFeelsLike.textContent = data.feelsLikeString;
    output.tempMin.textContent = data.tempMinString;
    output.tempMax.textContent = data.tempMaxString;
    output.wind.textContent = data.windSpeedString;
    output.windDirection.textContent = data.windDirectionString;
    output.pressure.textContent = data.pressureString;
    output.humidity.textContent = data.humidityString;
    output.clouds.textContent = data.cloudinessString;
    // output.rain1h.textContent = data.rain1hString;
    // output.rain3h.textContent = data.rain3hString;
    // output.snow1h.textContent = data.snow1hString;
    // output.snow3h.textContent = data.snow3hString;
    output.visibility.textContent = data.visibilityString;
    output.sunrise.textContent = data.sunriseString;
    output.sunset.textContent = data.sunsetString;
}
//////////////====================

///////// КАРТА
function mapActivating(lat, lng) {
    googleMap.setCenter({lat: lat, lng: lng});
}
//////////====================

async function serviceActivating() {
    service.city = service.form.input.value;
    service.news.page = 1;
    let cityIncludes = await checkCities(service.city);
    if (cityIncludes) {
        let news = await fetchNews(service.city);
        if (news && news.status == 'ok') {
            renderNews(news);
            activatePagination();
        }
        else console.error(new Error('Что-то пошло не так...'));
        let weather = await weatherDecorator(getWeather, 30, 'weatherData');
        if (weather) {
            console.log(weather);
            let extractedData = extractData(weather);
            weatherRendering(extractedData);
        }
        else console.error(new Error('Что-то пошло не так...'));
        mapActivating(service.lat, service.lng);
        
    }
}


service.form.btn.addEventListener('click', async function(e) {
    e.preventDefault();
    if (service.form.input.value.toLowerCase() == service.city) return;
    else serviceActivating();
});
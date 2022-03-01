const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const enterName = document.querySelector('.name');
const city = document.querySelector('.city');
const language = document.getElementById('languages-select');
const settingLanguage = document.querySelector('.setting-languages');
const settingsButton = document.querySelector('.settings-button');
const playrSelect = document.getElementById('playr-select');
const weatherSelect = document.getElementById('weather-select');
const timeSelect = document.getElementById('time-select');
const dateSelect = document.getElementById('date-select');
const greetingSelect = document.getElementById('greeting-select');
const quoteSelect = document.getElementById('quote-select');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
  }
function showDate() {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', weekday: 'long'};
    const currentDate = date.toLocaleDateString(language.value == 'en'? 'en-US' : 'ru-RU', options);
    day.textContent = currentDate;
}

showTime();

function getHours() {
    const date = new Date();
    const hours = date.getHours();
    return hours;
}

function getTimeOfDay() {
    const time = getHours();
    if (time >= 6 && time < 12) {
        return 'Morning'
    }
    if (time >= 12 && time < 18) {
        return 'Afternoon'
    }
    if (time >= 18 && time <= 23) {
        return 'Evening'
    }
    if (time >= 0 && time < 6) {
        return 'Night'
    }
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    let greetingText = `Good ${timeOfDay},`;
    if (language.value == 'ru') {
        if (timeOfDay == 'Morning') {
            greetingText = `Доброе утро,`;
        }
        if (timeOfDay == 'Afternoon') {
            greetingText = `Добрый день,`;
        }
        if (timeOfDay == 'Evening') {
            greetingText = `Добрый вечер,`;
        }
        if (timeOfDay == 'Night') {
            greetingText = `Доброй ночи,`;
        }
    }
    
    greeting.textContent =greetingText;
}

// Save Name

function setLocalStorage() {
    localStorage.setItem('name', enterName.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('language', language.value);
    localStorage.setItem('fon', selectFon.value);
    localStorage.setItem('playr', playrSelect.value);
    localStorage.setItem('weather', weatherSelect.value);
    localStorage.setItem('time', timeSelect.value);
    localStorage.setItem('date', dateSelect.value);
    localStorage.setItem('greeting', greetingSelect.value);
    localStorage.setItem('quote', quoteSelect.value);
    // localStorage.setItem('playItem', infoPlayName.textContent);
    // localStorage.setItem('playnum', playNum);
    if (volumeButton.classList.contains('volume-off')){
        localStorage.setItem('volumeOff', 'true');
    } else {
        localStorage.setItem('volumeOff', 'false');
    }
  }

function getLocalStorage() {
    if (localStorage.getItem('language')) {
        language.value = localStorage.getItem('language');
    }
    if (localStorage.getItem('name')) {
        enterName.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city'); 
    } else {
        city.value = `${language.value == 'en'? 'Minsk' : 'Минск'}`;
    }
    if (localStorage.getItem('fon')) {
        selectFon.value = localStorage.getItem('fon');
    }
    if (localStorage.getItem('playr')) {
        playrSelect.value = localStorage.getItem('playr');
    }
    if (localStorage.getItem('weather')) {
        weatherSelect.value = localStorage.getItem('weather');
    }
    if (localStorage.getItem('time')) {
        timeSelect.value = localStorage.getItem('time');
    }
    if (localStorage.getItem('date')) {
        dateSelect.value = localStorage.getItem('date');
    }
    if (localStorage.getItem('greeting')) {
        greetingSelect.value = localStorage.getItem('greeting');
    }
    if (localStorage.getItem('quote')) {
        quoteSelect.value = localStorage.getItem('quote');
    }
    // if (localStorage.getItem('playItem')) {
    //     infoPlayName.textContent = localStorage.getItem('playItem');
    // }
    // if (localStorage.getItem('playnum')) {
    //     playNum = Number(localStorage.getItem('playnum'));
    // }
    if (localStorage.getItem('volumeOff')){
        if (localStorage.getItem('volumeOff') == 'true'){
            volOff();
        }
    }
    playTime();
    getWeather();
    language.value == 'en'? getQuotes() : rusQuotes();
    getLanguage();
    getPhoto();
    showElementQuote();
    showElementTime();
    showElementWeather();
    showElementDate();
    showElementPlayer();
    showElementGreeting();
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

// Slider

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const search = document.querySelector('.search');
const selectFon = document.getElementById('fon-select');

function getRandomNum() {
    return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
}

let randomNum = getRandomNum();

async function getLinkToImage() {
    const timeOfDay = search.value? search.value : getTimeOfDay().toLowerCase();
    const url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=5iSRIZAWTsrp9uk05t80fx_Jy1LinYBj_8DE5hLhqhs`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => { 
        body.style.backgroundImage = `url(${img.src})`;
    }
}

async function getLinkToImg() {
    const timeOfDay = search.value? search.value : getTimeOfDay().toLowerCase();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0c65561fd2211e945f421e3aca8d47c5&tags=${timeOfDay}&extras=url_h&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.photos.photo[Math.floor(Math.random() * data.photos.photo.length)].url_h;
    img.onload = () => { 
        body.style.backgroundImage = `url(${img.src})`;
    }
}

function setBg() {
    const img = new Image();
    const timeOfDay = getTimeOfDay().toLowerCase();
    const bgNum = randomNum.toString();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum.padStart(2, '0')}.jpg`;
    img.onload = () => { 
        body.style.backgroundImage = `url(${img.src})`;
    }
}

function getPhoto() {
    if (selectFon.value == 'GitHub'){
        setBg();
        search.classList.add('unshow');
    }
    if (selectFon.value == 'Unsplash'){
        getLinkToImage();
        search.classList.remove('unshow');
    }
    if (selectFon.value == 'Flickr'){
        getLinkToImg();
        search.classList.remove('unshow');
    }
}

function getSlideNext() {
    if (randomNum === 20) {
        randomNum = 1;
    } else {
        randomNum++;
    }
    getPhoto();
}

function getSlidePrev() {
    if (randomNum === 1) {
        randomNum = 20;
    } else {
        randomNum--;
    }
    getPhoto();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
selectFon.addEventListener('change', getPhoto);
search.addEventListener('change', getPhoto);

// Weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const er = document.querySelector('.weather-error');

async function getWeather() { 
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language.value == 'en'? 'en' : 'ru'}&appid=f4a06441d36015d91ff70d642b062e8b&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 
        weatherIcon.className = 'weather-icon owf';
        city.value = data.name;
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${language.value == 'en'? 'Wind speed:' : 'Скорость ветра:'} ${Math.trunc(data.wind.speed)} ${language.value == 'en'? 'm/s' : 'м/с'}`;
        humidity.textContent = `${language.value == 'en'? 'Humidity:' : 'Влажность:'} ${Math.trunc(data.main.humidity)}%`;
        er.textContent = '';
    } catch(err) {
        er.textContent = language.value == 'en'? 'Error invalid city' : 'Ошибка неверный город';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }
    
}

city.addEventListener('change', getWeather);

// Quote

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

function getRandomQuote(data) {
    return Math.floor(Math.random() * data.length);
}

async function getQuotes() {
    const url = `https://type.fit/api/quotes`;
    const res = await fetch(url);
    const date = await res.json();
    if (language.value == 'en'){
        quote.textContent = date[getRandomQuote(date)].text;
        author.textContent = date[getRandomQuote(date)].author;
    } else {
        quote.textContent = ruQuote[getRandomQuotes()].text;
        author.textContent = ruQuote[getRandomQuotes()].author;
    }
    
}

async function getQuotesRu() {
    const url = `https://icanhazdadjoke.com/`;
    const res = await fetch(url);
    const date = await res.json();
}
function getRandomQuotes() {
    return Math.floor(Math.random() * 23);
}

changeQuote.addEventListener('click', getQuotes);



// Languages 

const language1 = document.querySelector('.language1');
const language2 = document.querySelector('.language2');
const fon = document.querySelector('.setting-fon');
const settingPlayrLabel = document.querySelector('.setting-playr');
const settingWeatherLabel = document.querySelector('.setting-weather');
const settingTimeLabel = document.querySelector('.setting-time');
const settingDateLabel = document.querySelector('.setting-date');
const settingGreetingLabel = document.querySelector('.setting-greeting');
const settingQuoteLabel = document.querySelector('.setting-quote');
const playr1 = document.querySelector('.playr1');
const playr2 = document.querySelector('.playr2');
const weather1 = document.querySelector('.weather1');
const weather2 = document.querySelector('.weather2');
const time1 = document.querySelector('.time1');
const time2 = document.querySelector('.time2');
const date1 = document.querySelector('.date1');
const date2 = document.querySelector('.date2');
const greeting1 = document.querySelector('.greeting1');
const greeting2 = document.querySelector('.greeting2');
const quote1 = document.querySelector('.quote1');
const quote2 = document.querySelector('.quote2');

function getLanguage() {
    if (language.value == 'en') {
        city.placeholder = '[ Enter city ]';
        enterName.placeholder = '[ Enter name ]';
        settingLanguage.textContent = 'Select Language';
        settingsButton.textContent = !settingsList.classList.contains('unshow')? '' : 'Settings';
        language1.textContent = 'English';
        language2.textContent = 'Russian';
        fon.textContent = 'Photo source';
        search.placeholder = 'Search photo';
        settingPlayrLabel.textContent = 'Hide player';
        settingWeatherLabel.textContent = 'Hide weather';
        settingTimeLabel.textContent = 'Hide time';
        settingDateLabel.textContent = 'Hide date';
        settingGreetingLabel.textContent = 'Hide greeting';
        settingQuoteLabel.textContent = 'Hide quote';
        playr2.textContent = 'Yes';
        playr1.textContent = 'No';
        weather2.textContent = 'Yes';
        weather1.textContent = 'No';
        time2.textContent = 'Yes';
        time1.textContent = 'No';
        date2.textContent = 'Yes';
        date1.textContent = 'No';
        greeting2.textContent = 'Yes';
        greeting1.textContent = 'No';
        quote2.textContent = 'Yes';
        quote1.textContent = 'No';
    } else {
        city.placeholder = '[ Введите город ]';
        enterName.placeholder = '[ Введите имя ]';
        settingLanguage.textContent = 'Выбор языка';
        settingsButton.textContent = !settingsList.classList.contains('unshow')? '' : 'Настройки';
        language1.textContent = 'Английский';
        language2.textContent = 'Русский';
        fon.textContent = 'Источник фото';
        search.placeholder = 'Поиск фото';
        settingPlayrLabel.textContent = 'Скрыть плеер';
        settingWeatherLabel.textContent = 'Скрыть погоду';
        settingTimeLabel.textContent = 'Скрыть время';
        settingDateLabel.textContent = 'Скрыть дату';
        settingGreetingLabel.textContent = 'Скрыть приветствие';
        settingQuoteLabel.textContent = 'Скрыть цитату';
        playr2.textContent = 'Да';
        playr1.textContent = 'Нет';
        weather2.textContent = 'Да';
        weather1.textContent = 'Нет';
        time2.textContent = 'Да';
        time1.textContent = 'Нет';
        date2.textContent = 'Да';
        date1.textContent = 'Нет';
        greeting2.textContent = 'Да';
        greeting1.textContent = 'Нет';
        quote2.textContent = 'Да';
        quote1.textContent = 'Нет';
    }
    showDate()
    showGreeting()
    getWeather()
    language.value == 'en'? getQuotes() : rusQuotes()
}

language.addEventListener('change', getLanguage);

// Show elenents

const player = document.querySelector('.player');
const weather = document.querySelector('.weather');
const greetingContainer = document.querySelector('.greeting-container');
const footer = document.querySelector('.footer');
const settingsList = document.querySelector('.settings-list');
const closeButton = document.querySelector('.close-button');


function showElementPlayer() {
    if (playrSelect.value == 'unshow'){
        player.classList.add('unshow');
    } else {
        player.classList.remove('unshow');
    }
}

function showElementWeather() {
    if (weatherSelect.value == 'unshow'){
        weather.classList.add('unshow');
    } else {
        weather.classList.remove('unshow');
    }
}

function showElementTime() {
    if (timeSelect.value == 'unshow'){
        time.classList.add('unshow');
    } else {
        time.classList.remove('unshow');
    }
}

function showElementDate() {
    if (dateSelect.value == 'unshow'){
        day.classList.add('unshow');
    } else {
        day.classList.remove('unshow');
    }
}

function showElementGreeting() {
    if (greetingSelect.value == 'unshow'){
        greetingContainer.classList.add('unshow');
    } else {
        greetingContainer.classList.remove('unshow');
    }
}

function showElementQuote() {
    if (quoteSelect.value == 'unshow'){
        footer.classList.add('unshow');
    } else {
        footer.classList.remove('unshow');
    }
}

function showSettings(){
    if (!settingsList.classList.contains('unshow')){
        settingsList.classList.add('unshow');
        settingsButton.textContent =  `${language.value == 'en'? 'Settings' : 'Настройки'}`;
    } else {
        settingsList.classList.remove('unshow');
        settingsButton.textContent = '';
    }
}

function closeSettings() {
    settingsList.classList.add('unshow');
    settingsButton.textContent =  `${language.value == 'en'? 'Settings' : 'Настройки'}`;
}

playrSelect.addEventListener('change', showElementPlayer);
weatherSelect.addEventListener('change', showElementWeather);
timeSelect.addEventListener('change', showElementTime);
dateSelect.addEventListener('change', showElementDate);
greetingSelect.addEventListener('change', showElementGreeting);
quoteSelect.addEventListener('change', showElementQuote);
settingsButton.addEventListener('click', showSettings);
settingsList.addEventListener('mouseleave', closeSettings);
closeButton.addEventListener('click', closeSettings);



const ruQuote = [
    {
        "text": "Не совершай классическую ошибку всех умников: не думай, что нет людей умнее тебя.",
        "author": null
    },
    {
        "text": "Ничто так не выдает человека, как то, над чем он смеётся.",
        "author": "Иоганн Вольфганг фон Гёте"
    },
    {
        "text": "Все мы гении. Но если вы будете судить рыбу по её способности взбираться на дерево, она проживёт всю жизнь, считая себя дурой.",
        "author": "Альберт Эйнштейн"
    },
    {
        "text": "Иногда хватает мгновения, чтобы забыть жизнь, а иногда не хватает жизни, чтобы забыть мгновение.",
        "author": "Джим Моррисон"
    },
    {
        "text": "Каждый живет, как хочет, и расплачивается за это сам.",
        "author": "Оскар Уайльд"
    },
    {
        "text": "Теория — это когда все известно, но ничего не работает. Практика — это когда все работает, но никто не знает почему. Мы же объединяем теорию и практику: ничего не работает... и никто не знает почему!",
        "author": "Альберт Эйнштейн"
    },
    {
        "text": "Если вы хотите иметь то, что никогда не имели, вам придётся делать то, что никогда не делали.",
        "author": "Коко Шанель"
    },
    {
        "text": "Самой большой ошибкой, которую вы можете совершить в своей жизни, является постоянная боязнь ошибаться.",
        "author": "Элберт Грин Хаббард"
    },
    {
        "text": "Проще расстаться с человеком, чем с иллюзиями на его счёт.",
        "author": "Марта Кетро"
    },
    {
        "text": "Если человек умер, его нельзя перестать любить, черт возьми. Особенно если он был лучше всех живых, понимаешь?",
        "author": "Джером Дэвид Сэлинджер"
    },
    {
        "text": "Новогоднее настроение – это когда рад видеть даже тех, кто ошибся дверью.",
        "author": "Михаил Михайлович Мамчич"
    },
    {
        "text": "У самого злого человека расцветает лицо, когда ему говорят, что его любят. Стало быть, в этом счастье...",
        "author": "Лев Николаевич Толстой"
    },
    {
        "text": "Самое худшее, когда нужно ждать и не можешь ничего сделать. От этого можно сойти с ума.",
        "author": "Эрих Мария Ремарк"
    },
    {
        "text": "Обязательно дружите с теми, кто лучше вас. Будете мучиться, но расти.",
        "author": "Вера Полозкова"
    },
    {
        "text": "Кому-то не хватает одной женщины, и он переключается на пятую, десятую. А другому не хватает жизни, чтобы любить одну-единственную.",
        "author": "Константин Хабенский"
    },
    {
        "text": "Одиночество — это когда в доме есть телефон, а звонит будильник.",
        "author": "Фаина Раневская"
    },
    {
        "text": "Безвыходным мы называем положение, выход из которого нам не нравится.",
        "author": "Станислав Ежи Лец"
    },
    {
        "text": "Если ты чувствуешь, что сдаешься, вспомни, ради чего ты держался до этого.",
        "author": "Джаред Лето"
    },
    {
        "text": "Ты повзрослела. И поумнела. И погрустнела. Обычная лестница из трех ступенек.",
        "author": "Дмитрий Емец"
    },
    {
        "text": "Сильные люди не любят свидетелей своей слабости.",
        "author": "Маргарет Митчелл"
    },
    {
        "text": "Столько есть всего, о чём надо подумать. Зачем забивать себе голову тем, чего уже не вернёшь, — надо думать о том, что ещё можно изменить.",
        "author": "Маргарет Митчелл"
    },
    {
        "text": "В идеальных отношениях чистая любовь и грязный секс дополняют, а не исключают друг друга.",
        "author": "Брайанна Рид"
    },
    {
        "text": "Есть такие люди, к которым просто хочется подойти и поинтересоваться, сложно ли без мозгов жить.",
        "author": "Фаина Раневская"
    }
]

function rusQuotes() {
    quote.textContent = ruQuote[getRandomQuotes()].text;
    author.textContent = ruQuote[getRandomQuotes()].author;
}

// Plaer 
 
const playListContainer = document.querySelector('.play-list');
const play = document.querySelector('.play');
const playNextButton = document.querySelector('.play-next');
const playPrevButton = document.querySelector('.play-prev');
const infoPlayName = document.querySelector('.info-play-name');
const infoPlayTime = document.querySelector('.info-play-time');

const playList = [
    {      
      title: 'Aqua Caelestis',
      src: './assets/sounds/Aqua_Caelestis.mp3',
      duration: '00:39'
    },  
    {      
      title: 'River Flows In You',
      src: './assets/sounds/River_Flows_In_You.mp3',
      duration: '01:37'
    },
    {      
        title: 'Summer Wind',
        src: './assets/sounds/Summer_Wind.mp3',
        duration: '01:50'
    },
    {      
        title: 'Ennio Morricone',
        src: './assets/sounds/Ennio_Morricone.mp3',
        duration: '01:37'
    }
]

let num = 0;

playList.forEach(el => {
    const li = document.createElement('li');
    const pl = document.createElement('button');
    pl.classList.add('play-items', 'player-icon');
    pl.value = num;
    li.classList.add('play-item');
    li.textContent = el.title;
    li.append(pl);
    playListContainer.append(li);
    num++;
});

const audio = new Audio();
let isPlay = false;
let playNum = 0;
if (infoPlayName.textContent == '') {
    infoPlayName.textContent = `${playNum + 1}. ${playList[playNum].title}`
}

function toggleBtn() {
    if(!isPlay) {
        play.classList.remove('pause');
    } else {
        play.classList.add('pause');
    }
}

function getAudio(n) {
    audio.src = playList[n].src;
    audio.currentTime = 0;
    audio.play();
}

let n;
function playTime() {
    infoPlayTime.textContent = `${Math.trunc(audio.currentTime / 60)}:${(audio.currentTime % 60).toFixed(0)<10? '0'+(audio.currentTime % 60).toFixed(0) : (audio.currentTime % 60).toFixed(0)} / ${playList[playNum].duration}`;
    setTimeout(playTime, 1000);
}
function playAudio() {
    if(!isPlay) {
        if (audio.currentTime == audio.duration || n !== playNum){
            getAudio(playNum);
            n = playNum;
        } else {
            audio.play();
        }
        isPlay = true;
        toggleBtn();
        activeItem(playNum);
        infoPlayName.textContent = `${Number(playNum) + 1}. ${playList[playNum].title}`;
        playTime();
        handleVolumeUpdate();
    } else {
        audio.pause();
        isPlay = false;
        toggleBtn();
        activeItem(playNum);
    }
  
}


function playAudioList(e) {
    if (playNum == e.currentTarget.value) {
        playAudio();
    } else {
        playNum = e.currentTarget.value;
        audio.pause();
        isPlay = false;
        playAudio();
    }
}

function playNext() {
    audio.pause();
    isPlay = false;
    if (playNum == playList.length - 1){
        playNum = 0;
        playAudio();
    } else {
        playNum++;
        playAudio(); 
    }
}

function playPrev() {
    audio.pause();
    isPlay = false;
    if (playNum == 0){
        playNum = playList.length - 1;
        playAudio();
    } else {
        playNum--;
        playAudio();
    }
}

const listItems = document.querySelectorAll('.play-items');
const listItem = document.querySelectorAll('.play-item');

function activeItem(n) {
    listItems.forEach(e => {
        e.classList.remove('pause');
    })
    if(isPlay) {
        listItems[n].classList.add('pause');
    }
    listItem.forEach(e => {
        e.classList.remove('item-active');
    })
    listItem[n].classList.add('item-active');
}

function stopPlay() {
    console.log((audio.currentTime % 60).toFixed(0))
    if (audio.currentTime == audio.duration) {
        playNext();
    } else {
        isPlay = false;
        toggleBtn();
        activeItem(playNum);
    }
}

play.addEventListener('click', playAudio);
playNextButton.addEventListener('click', playNext);
playPrevButton.addEventListener('click', playPrev);
audio.addEventListener('pause', stopPlay);
listItems.forEach(e => {
    e.addEventListener('click', playAudioList)
})

// Progress bar

const progress = document.querySelector('.progress');
const volume = document.querySelector('.volume');
const audioRanges = document.querySelectorAll('.range');

audioRanges.forEach((range) => {
  range.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #fd7f09 0%, #fd7f09 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  });
});

function handleVolumeUpdate() {
    audio.volume = volume.value/100;
    updateVolume(audio.volume);
}

function handleProgress() {
    const value = (audio.currentTime / audio.duration) * 100;
    progress.style.background = `linear-gradient(to right, #fd7f09 0%, #fd7f09 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
    progress.value = value;
    
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;
}

let mousedow = false;

volume.addEventListener('change', handleVolumeUpdate);
volume.addEventListener('mousemove', handleVolumeUpdate);
audio.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedow && scrub(e));
progress.addEventListener('mousedown', () => mousedow = true);
progress.addEventListener('mouseup', () => mousedow = false);

// Volume 

const volumeButton = document.querySelector('.volume-up');

const updateVolume = (n) => {
    if (n !== 0) {
        volumeButton.classList.remove('volume-off');
    } else {
        volumeButton.classList.add('volume-off');
    }
}

let vol = 0;
const volOff = () => {
    handleVolumeUpdate();
  if (audio.volume !== 0) {
    vol = audio.volume;
    audio.volume = 0;
    volume.value = 0;
    volume.style.background = `linear-gradient(to right, #fd7f09 0%, #fd7f09 ${0}%, #c4c4c4 ${0}%, #c4c4c4 100%)`;
  } else {
    audio.volume = vol;
    volume.value = vol * 100;
    volume.style.background = `linear-gradient(to right, #fd7f09 0%, #fd7f09 ${vol * 100}%, #c4c4c4 ${vol * 100}%, #c4c4c4 100%)`;
  }
  updateVolume(audio.volume);
}

volumeButton.addEventListener('click', volOff);
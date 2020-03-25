document.documentElement.scrollTop = 0;
fetch('./Assets/data.json').then(response => response.json()).then(data => siteDetails(data))

const cardLogo = document.querySelectorAll('.card-logo');
const cardBackground = document.querySelectorAll('.card-back');
const cardFront = document.querySelectorAll('.card-character');

let timer;

function siteDetails(data) {
    document.title = data.title;
    document.querySelector("link[rel='shortcut icon']").href = data.favicon_url;
    document.querySelector('.page-title').innerHTML = data.page_title;
    document.getElementById('time-remaining').innerHTML = data.timer_limit + " sec";
    timer=data.timer_limit;
    document.getElementById('flips').innerHTML=0;
    document.querySelector('.dev-info-content').innerHTML = data.dev_info;
    document.body.style.background = `url(${data.background_image_url})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    cardLogo.forEach(card => {
        card.src = data.card_logo;
    });
    cardBackground.forEach(card => {
        card.style.background = `url(${data.card_background_image_url})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundRepeat = 'no-repeat';
    });
    setCardFront(data);
}

function setCardFront(data){
    cardFront[0].src=data.superman;
    cardFront[1].src=data.superman;
    cardFront[2].src=data.batman;
    cardFront[3].src=data.batman;
    cardFront[4].src=data.wonderwoman;
    cardFront[5].src=data.wonderwoman;
    cardFront[6].src=data.flash;
    cardFront[7].src=data.flash;
    cardFront[8].src=data.aquaman;
    cardFront[9].src=data.aquaman;
    cardFront[10].src=data.joker;
    cardFront[11].src=data.joker;
}

let hasFlippedCard=false, lockBoard=false;
let firstCard, secondCard, flipCounter=0;

const cards = document.querySelectorAll('.card');

function flipCard(){
    if(lockBoard) return;
    if(this===firstCard) return;
    this.classList.add('flip');

    ++flipCounter;
    document.getElementById('flips').innerHTML=flipCounter;

    if(!hasFlippedCard){
        hasFlippedCard=true;
        firstCard=this;
    }
    else{
        secondCard=this;
        checkForMatch();
    }
}

function checkForMatch(){
    isMatch=firstCard.dataset.check===secondCard.dataset.check;
    isMatch ? disableCard() : unFlipCard();
}

function disableCard(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unFlipCard(){
    lockBoard=true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 900)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos=Math.floor(Math.random()*12);
        card.style.order=randomPos;
    });
})();

(function timeOut(){
    // let timeRemaining = setInterval(--timer, 1000);
   
    // document.getElementById('time-remaining').innerHTML = timeRemaining + "sec";
})();
console.log(timer);
cards.forEach(card => card.addEventListener('click', flipCard));
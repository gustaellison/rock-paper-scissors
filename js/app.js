
/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
const RPS_LOOKUP = {
    r: {img: 'images/rock.png', beats: 's' },
    p: {img: 'images/paper.png', beats: 'r' },
    s: {img: 'images/scissors.png', beats: 'p' }

};
/*----- app's state (variables) -----*/
let scores; // opbject key of  'p' -> player scoare and t and c
let results; // object keys for the r, p, s, for the p and c choices
let winner; // basic string to identify winner at p, c, or t
/*----- cached element references -----*/
const pResultEl = document.getElementById('p-result');
const cResultEl = document.getElementById('c-result');
const countdownEl = document.getElementById('countdown');


/*----- event listeners -----*/
document.querySelector('main')
.addEventListener('click', handleChoice); 

/*----- functions -----*/
init(); //job of init function  is initialize all state then call render

function handleChoice(evt) {
    //in response yo user interaction (player makes a move)
    // update all impacted state , the call render
    //Guards
    if (evt.target.tagName !== 'BUTTON') return;
    //console.log(evt.target.tagName)
    //player has made a choice
    results.p = evt.target.innerText.toLowerCase();
    results.c = getRandomRPS();
    //results.c = function getRandomRPS()
    //now compute a random choice for the computer
    winner = getWinner()
    scores[winner] += 1
    render();
    }

function getRandomRPS(){
    const rps = Object.keys(RPS_LOOKUP);
    const randIdx = Math.floor(Math.random() * rps.length)
    //console.log(rps)
    return rps[randIdx]
}

function getWinner(){
    if (results.p === results.c) return 't';
    return RPS_LOOKUP[results.p].beats === results.c ? 'p' : 'c'
}

function init() {
    scores = {
        p: 0,
        t: 0,
        c: 0
    }
    results = {
        p: 'r',
        c: 'p'
    };
    winner = 't';
    render()
};

function renderScores() {
    for(let key in scores){
        const scoreEl = document.getElementById(`${key}-score`);
        scoreEl.innerText = scores[key];

    }
}

function renderResults() {
    pResultEl.src = RPS_LOOKUP[results.p].img;
    cResultEl.src = RPS_LOOKUP[results.c].img;
    pResultEl.style.borderColor = winner === 'p' ? 'grey' : 'white';
    cResultEl.style.borderColor = winner === 'c' ? 'grey' : 'white';

}

function render() {
    renderCountdown(function(){
        renderScores();
        renderResults();
 
        });
    }

function renderCountdown(cb){
    let count = 3
    AUDIO.play();
    AUDIO.currentTime = 0;
    countdownEl.style.visibility = 'visible'
    countdownEl.innerHTML = count;
    let timerId = setInterval(function() {
        count--;
        if(count) {
            countdownEl.innerText = count;
        } else {
            clearInterval(timerId);
            countdownEl.style.visibility = 'hidden';
            cb();
        }
    }, 1000)
}
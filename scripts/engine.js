const state = {
    view:{
        squares:document.querySelectorAll(".square"),
        enemy:document.querySelector(".enemy"),
        timeLeft:document.querySelector("#time-left"),
        score:document.querySelector("#score"),
        life:document.querySelector("#life")
    },
    values:{
        
        gameVelocity:1000,
        hitPosition:0,
        result:0,
        curretTime:60,
        life:3,
    },
    actions:{
        timerId:null,
        countDownTimerId:setInterval(countDown,1000),
    }
};


function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime<=0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Gamer Over! O seu resultado foi:"+ state.values.result);
        location.reload();
    }
}
function playSound(audioName){
    let audio = new Audio(`./audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare,state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",()=>{
            if(square.id=== state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                state.values.life--;
                state.view.life.textContent = 'x' + state.values.life;
                if(state.values.life<=0){
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    clearInterval(state.values.life);
                    alert("Gamer Over! O seu resultado foi:"+ state.values.result);
                    location.reload();

                }
            }
        });
    });
}

function init(){
    
    moveEnemy();
    addListenerHitBox();
}

init();
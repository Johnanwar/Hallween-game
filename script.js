// control all sounds
class AudiCcontoller{

  constructor () {
    this.bgSOund = new Audio("Assets/Audio/creepy.mp3");
    this.flibSound = new Audio('Assets/Audio/flip.wav');
    this.gameoverSound = new Audio('Assets/Audio/gameOver.wav');
    this.matchSound = new Audio('assets/Audio/match.wav')
    this.victorySound = new Audio('Assets/Audio/victory.wav');
    this.bgSOund.loop = true;
    this.bgSOund.volume =.5;

  };
  startMusic(){
    this.bgSOund.play()
  };

  stopMusic(){
    this.bgSOund.pause();
    // this.bgSOund.currentTime() = 0;
  };

  flib() {
    this.flibSound.play();
  };

  matchMusic() {
    this.matchSound.play();
  };

  victory() {
    this.stopMusic();
    this.victorySound.play();
  };

  gameOver() {
    this.stopMusic();
    this.gameoverSound.play();
  };
  

};
// controll the game

class GameCotroller {
  constructor(totalTime, cards) {
    this.cardsArray = cards ;
    this.totalTime = totalTime;
    this.timeRemaning = totalTime ;
    this.flibs = document.querySelector('.flips');
    this.time = document.querySelector('.time');
    this.audiCcontoller = new AudiCcontoller;
    this.suffleCards(this.cardsArray);

  };

  startGame (){
   this.allFlibs = 0;
    this.cardToCheck = null;
    this.matchCards = [];
    this.timeRemaning = this.totalTime
    this.pusy= true;    // if i can click it 
    this.cardCheck = null;

    // to restrt the game 
    setTimeout(() => {
      this.audiCcontoller.startMusic();
      this.pusy = false;
      this.countDown = this.StartCountDown();

    },500)

    this.hideCards() 
      this.time.textContent = this.timeRemaning;
      this.flibs.textContent = this.allFlibs;
  };
  
  hideCards(){
    this.cardsArray.forEach( (card)=>{
      card.classList.remove('visible');
      card.classList.remove('dance');
    });

  };

  // click on cards
  flibCard(card){
    if (this.canFlibGame(card)) { 
      this.audiCcontoller.flib(); 
      this.allFlibs ++;
      this.flibs.textContent = this.allFlibs;
      card.classList.add("visible");

      if (this.cardToCheck){
        this.checkForCarMatch(card)
      }else{
        this.cardToCheck = card ;
      };
    };
  };


  /// match cards
  checkForCarMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck) )
      //match
      this.cardMatch(card , this.cardToCheck);
    else
      //didnt match
      this.cardMisMatch(card , this.cardToCheck)
      this.cardToCheck = null;
    

  };

  canFlibGame(card) {
    return !this.busy && !this.matchCards.includes(card) && card !== this.cardToCheck;

  };
      //match
  cardMatch(card1,card2){
    this.matchCards.push(card1);
    this.matchCards.push(card2);
    this.audiCcontoller.matchMusic();
    card1.classList.add('dance');
    card2.classList.add('dance');
    if (this.matchCards.length === this.cardsArray.length)
      this.victory();

      };

    //didnt match
  cardMisMatch(card1, card2){
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove('visible');
      card2.classList.remove('visible');
      this.busy = false;
    }, 1000)

  };


  // timer
  StartCountDown (){
     return setInterval( ()=> {
       this.timeRemaning-- ;
       this.time.textContent = this.timeRemaning;
       if(this.timeRemaning === 0){
         this.gameover()
       }

    },1000)
  };
    // game Over
  gameover(){
    this.audiCcontoller.gameOver();
    this.hideCards();
    clearInterval(this.countDown);
    document.querySelector('.overlay3').style.display ="block"
    };

 //  victory
  victory() {
    this.audiCcontoller.victory();
    this.hideCards();
    clearInterval(this.countDown);
    document.querySelector('.overlay2').style.display = "block"
  };
    // flib game
 

  //Random shufle cards
  suffleCards(cardsArray) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * (i + 1))
      cardsArray[random].style.order = i;
      cardsArray[i].style.order = random;
    };
};


  // getCardType
  getCardType(card) {
    //return card.getElemntsByClassName(".middle-ghost")[0].src;
    return card.querySelectorAll('.middle-ghost')[0].src;
  }

};





var ready = function(){
  var cards , game , overlay;

    cards = document.querySelectorAll(".all-card");
    overlay = document.querySelectorAll(".overlay");
    game = new GameCotroller(80 , cards) ;

    // overlay function
      overlay.forEach ((over) => over.addEventListener('click', function(){
        over.style.display = "none";
        game.startGame();
      }));

    // cards function
      cards.forEach( (el) => el.addEventListener("click" , function(){
      game.flibCard(el);

  
}) );

};

ready();

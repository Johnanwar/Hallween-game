// control all sounds
class AudiCcontoller{

  constructor () {
    this.bgSOund = new Audio("Assets/Audio/creepy.mp3");
    this.flibSound = new Audio('Assets/Audio/flip.wav');
    this.gameoverSound = new Audio('Assets/Audio/gameOver.wav');
    this.victorySound = new Audio('Assets/Audio/victory.wav');
    this.bgSOund.loop = true;
    this.bgSOund.volume =.5;

  };
  startMusic(){
    this.bgSOund.play()
  };

  stopMusic(){
    this.bgSOund.pause();
    this.bgSOund.currentTime() = 0;
  };

  flib() {
    this.flibSound.play();
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
    this.allFlibs = 0;
    this.audiCcontoller = new AudiCcontoller;
  };

  startGame (){
    this.cardCheck = null;
    this.matchCards = [];
    this.timeRemaning = this.totalTime
    this.pusy= true;    // if i can click it 
    this.cardCheck = null;
    this.audiCcontoller.startMusic();
    this.suffleCards(this.cardsArray);
  };

  suffleCards(cardsArray) {
    for (let i = cardsArray.length -1; i > 0; i--) {
      let random = Math.floor(Math.random() * (i + 1))
      cardsArray[random].style.order = i;
      cardsArray[i].style.order = random;
    }

  };
  flibCard(card){
    if (this.canFlibGamme(card) === false) { 
      this.audiCcontoller.flib(); 
      this.allFlibs ++;
      this.flibs.textContent = this.allFlibs;
      card.classList.add("visible")
      console.log(this.allFlibs)
    };
  };
 

  canFlibGamme (card){
   // this.!pusy ..... !this.matchCards include (card) ...... card !===this.cardCheck
   return true;;
  };

}





var ready = function(){
  var cards , game , overlay;

    cards = document.querySelectorAll(".all-card");
    overlay = document.querySelectorAll(".overlay");
    game = new GameCotroller(100 , cards) ;

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

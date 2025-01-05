import './style.css'

const pairsClicked = document.querySelector('#pairsClicked') as HTMLSpanElement;
const pairsGuessed = document.querySelector('#pairsGuessed') as HTMLElement;

const gameBoard = document.querySelector('#game-board') as HTMLDivElement;

//für winner pop up
const overlay = document.querySelector('#overlay') as HTMLDivElement; 
const playAgainBtn = document.querySelector('#play-again-btn') as HTMLButtonElement;

// console.log(pairsClicked,pairsGuessed,gameBoard,newGameBtn);

let attempts = 0; // Anzahl der Klickversuche
let matches = 0; // Anzahl der gefundenen Paare
let firstCard: HTMLDivElement | null = null;
let secondCard: HTMLDivElement | null = null;
let isCheck = false;

const emojiArray = [
  "🌭", "🍔","🍟","🍕","🧁","🍭","🍫","🍿","🍩","🍱","🍣","🥤",
  "🌭", "🍔","🍟","🍕","🧁","🍭","🍫","🍿","🍩","🍱","🍣","🥤"];

  let shuffleEmojiArray = emojiArray.sort(() => (Math.random() > .5 ) ? 1 : -1);
  for(let i = 0; i < emojiArray.length; i++) {
      const gameCard = document.createElement('div') as HTMLDivElement;
      gameCard.className = 'game-card'; // Erstellen der Kartenelemente.

      const frontFace = document.createElement('div');
      frontFace.className = 'card__face card__face--front'; // Vorderseite der Karte.

      const backFace = document.createElement('div');
      backFace.className = 'card__face card__face--back'; // Rückseite der Karte.

      backFace.textContent = emojiArray[i];

      gameCard.appendChild(frontFace);
      gameCard.appendChild(backFace);
      gameBoard.appendChild(gameCard); // Karten werden dem Spielfeld hinzugefügt.
  };
  console.log(shuffleEmojiArray);
  
function pairsDisplay(){
  pairsClicked.textContent = `${attempts}`;
  pairsGuessed.textContent = `${matches}`;
  updatePairsGuessedColor();
  //test für winner pop up --------------------
  checkGameEnd();
}

//Funktion für Farbwechsel sobald ein Paar gefunden wurde
function updatePairsGuessedColor(){
    if(matches > 0){
        pairsGuessed.style.color = 'rgb(11, 172, 172)';
    } else {
        pairsGuessed.style.color = '';
    }
}

//Funktion prüft das Spielende zu einblenden von winner pop up 
function checkGameEnd () {
    if(matches === 12) {
        overlay.classList.remove('hidden');
    }
}


function checkForMatch(){
  if(firstCard && secondCard){
    isCheck = true; // Verhindert, dass während der Überprüfung neue Klicks erfolgen.
    if(firstCard.textContent === secondCard.textContent){
      matches++; // Zählt ein Paar als gefunden.
      firstCard.classList.add('matched');
      secondCard.classList.add('matched'); // Karten als "übereinstimmend" markieren.
      console.log("first = second");
      
      firstCard = null;
      secondCard = null;
      isCheck = false
    } else {
      setTimeout(resetCard, 2000); // Zurücksetzen der Karten nach 2 Sekunden, wenn kein Match.
    }
    attempts++; // Erhöht die Anzahl der Versuche.
    pairsDisplay()
  }
}

function resetCard(){
  if(firstCard && secondCard){
    firstCard.classList.remove('visible');
    secondCard.classList.remove('visible'); // Dreht die Karten zurück.
  }
  firstCard = null;
  secondCard = null;
  isCheck = false; // Aktiviert die Klicks wieder.
}

async function handleCardClick(card: HTMLDivElement){
  if(isCheck){
    return; // Verhindert Klicks während der Überprüfung.
  }
  if (card === firstCard) {
    return console.log("Diese Karte wurde bereits ausgewählt."); // Karten, die schon gedreht oder übereinstimmend sind, können nicht erneut ausgewählt werden.
  }

  if(card.classList.contains('matched') || card.classList.contains('visible')){
    return console.log("Das ist matched oder visible")
  } 
    card.classList.add('visible'); // Karte wird gedreht.
    if(!firstCard){
      firstCard = card; // Setzt die erste Karte.
      console.log(`first card is ${card.textContent}`);
      
    } else {
      secondCard = card; // Setzt die zweite Karte und startet den Vergleich.
      console.log(`second card is ${card.textContent}`);

      checkForMatch()
    
  }
}

const allGameCards = document.querySelectorAll('.game-card');
allGameCards.forEach(card => {
  card.addEventListener('click', () => handleCardClick(card as HTMLDivElement))
}); // Fügt allen Karten einen Klick-Event-Listener hinzu.


//winner pop up - new game button 

playAgainBtn?.addEventListener('click', () => {
    window.location.reload();
})
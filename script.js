let emojiArray = ["😂", "😂", "😍", "😍", "🎈", "🎈", "🍕", "🍕", "💛", "💛", "🍪", "🍪", "🐺", "🐺", "👻", "👻", "🌍", "🌍", "🗽", "🗽"];
let totalMove = 15;
let cradMatchedScore = 0;
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
emojiArray = shuffleArray(emojiArray);

function makeGrid(emoji) {
    let mainDiv = document.getElementById("cards");
    let div = document.createElement('div')
    div.classList.add('card')
    
    let frontDiv = document.createElement('div');
    frontDiv.classList.add("front", "frontText");
    frontDiv.textContent = "?";

    let backDiv = document.createElement('div');
    backDiv.classList.add("back", "backText");
    backDiv.textContent = emoji

    div.append(frontDiv);
    div.append(backDiv);

    mainDiv.append(div);
}

emojiArray.forEach(emoji => {
    makeGrid(emoji)
})
// =============================================================
document.getElementById("score").innerText = cradMatchedScore;
document.getElementById("left-move").innerText = totalMove;

let cards = document.querySelectorAll(".card");
let matchedCrads = [];
let isFlipedArray = new Array(cards.length).fill(false);
let twoCardArray = [];

cards.forEach((card) => {
  card.addEventListener("click", () => {
      if (totalMove > 0) {
        flipCard(card)
      } else {
        alert("Opps !! You Are Out of Moves!!")
      }
  });
});

function flipCard(card) {
  if (twoCardArray.includes(card) || matchedCrads.includes(card)) {
    alert("Plizzzz Choose Another card");
  } else {
    toggleCardCss(card);
    twoCardArray.push(card);
  }

  if (twoCardArray.length == 2) {
    setTimeout(() => {
      checkCardContent();
    }, 1500);
  } else {
    if (twoCardArray.length <= 2 && !checkCardIsFliped(card)) {
      if (card.classList.contains("is-flipped")) {
      } else {
        card.children[0].classList.remove("front");
        card.children[0].classList.add("Not-front");
        card.children[1].classList.remove("back");
        card.children[1].classList.add("Not-back");
      }
    }
  }
}

function checkCardIsFliped(card) {
  return twoCardArray.includes(card);
}

function checkCardContent() {
  if (twoCardArray[0].innerText == twoCardArray[1].innerText) {
    matchedCrads.push(twoCardArray[0]);
    matchedCrads.push(twoCardArray[1]);
    cradMatchedScore++;
    document.getElementById("score").innerText = cradMatchedScore;
  } else {
    twoCardArray.forEach((card) => {
      toggleCardCss(card);
    });
    totalMove--;
  }
  document.getElementById("left-move").innerText = totalMove;
  twoCardArray = [];
}

function toggleCardCss(card) {
  card.classList.toggle("is-flipped");
  card.children[0].classList.toggle("front");
  card.children[0].classList.toggle("Not-front");
  card.children[1].classList.toggle("back");
  card.children[1].classList.toggle("Not-back");
}
let yesCount = 0;

yesButton.addEventListener("click", handleYesClick);
noButton.addEventListener("mouseover", handleNoHover);

handleYesClick();

// yes button

function generateMessage(yesCount) {
  const messages = [
    "Will you be my Valentine?",
    "Are you sure?",
    "Really sure?",
    "...even if I was a worm?"
  ];

  if (yesCount == 5) {
    return("end")
  }
  else {
    return messages[yesCount - 1];
  }
}

function updateQuestionText() {
  document.getElementById("questionText").innerHTML=generateMessage(yesCount);
}

function handleYesClick() {
  yesCount++;
  updateQuestionText();
}

// no button

function handleNoHover() {

  const noButton = document.getElementById("noButton");
  
  noButton.style.position = `fixed`;

  randomX = Math.floor(Math.random() * window.innerWidth - 22)
  randomY = Math.floor(Math.random() * window.innerHeight)

  noButton.style.marginTop = `0`;
  noButton.style.marginLeft = `0`;

  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;

  console.log("no hovered")
}


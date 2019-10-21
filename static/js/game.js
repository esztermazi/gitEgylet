function removeColors(element) {
    let colours = ["red", "blue", "yellow", "orange", "green", "violet", "empty", "black", "white"];
    for (colour of colours){
        element.classList.remove(colour);
        element.dataset.colourValue="empty";
    }
    element.classList.add("empty");
}


function generateGoal(){
    let goalCells = document.getElementsByClassName('goal-cell');
    let colours = ["red", "blue", "yellow", "orange", "green", "violet"];
    for (goalCell of goalCells){
        let randomColour = colours[Math.floor(Math.random() * 6)];
        goalCell.classList.add(randomColour);
        goalCell.dataset.goalValue=randomColour;
    }
}


function checkWin(guessOpinions) {
    counter = 0;
    for (guessOpinion of guessOpinions){
        if(guessOpinion.classList.contains("black")){
            counter++;
        }
    }
    if (counter===4){
        alert("You Won!");
        document.getElementById("goals").classList.remove("hidden");
        return true;
    }
    return false;
}


function removeUsedStates(){
    let guessGoals = document.getElementsByClassName('goal-cell');
    for(let guessGoal of guessGoals) {
        guessGoal.classList.remove("used");
        removeColors(guessGoal);
    }
}


function removeCurrentRowMarker() {
    let guessRows = document.getElementsByClassName('guess-row');
    for (let rowIndex = 0;rowIndex < guessRows.length;rowIndex++){
        guessRows[rowIndex].classList.remove("current-row");
        if (rowIndex === 0){
            guessRows[rowIndex].classList.add("current-row");
        }
    }
}


function removeGuessCellColours(){
    let guessCells = document.getElementsByClassName('guess-cell');
    for (let guessCell of guessCells){
        removeColors(guessCell);
    }
}


function removeKeyPegs() {
    let guessOpinions = document.getElementsByClassName('opinion');
    for (let guessOpinion of guessOpinions) {
        removeColors(guessOpinion);
    }
}


function hideGoalsTable() {
    let goalsTable = document.getElementById("goals");
    if (!goalsTable.classList.contains("hidden")){
        goalsTable.classList.add("hidden");
    }
}


function newGame(event){
    removeKeyPegs();
    removeUsedStates();
    removeCurrentRowMarker();
    removeGuessCellColours();
    generateGoal();
    hideGoalsTable();
}

function isWhiteKeyPagNecessary(guessGoal, currentColour){
    if(!guessGoal.classList.contains("used")){
        return  isMatchingColour(currentColour, guessGoal);
    }
    return false;
}


function isNotBlack(currentOpinion) {
   return !currentOpinion.classList.contains("black");
}


function addAllWhiteKeyPags(currentOpinion, guessGoals, currentColour){
    if(isNotBlack(currentOpinion)) {
        for (let goal_index=0; goal_index < guessGoals.length;goal_index++){
            if (isWhiteKeyPagNecessary(guessGoals[goal_index], currentColour)){
                    addWhiteKeyPag(currentOpinion, guessGoals[goal_index]);
                }
            }
        }
    }


function isMatchingColour(currentColour,  guessGoal){
    return currentColour === guessGoal.dataset.goalValue;
}


function addWhiteKeyPag(currentOpinion, guessGoal) {
    currentOpinion.classList.remove("empty");
    currentOpinion.classList.add("white");
    guessGoal.classList.add("used");
}


function guessRow(event) {
    let guessGoals = document.getElementsByClassName('goal-cell');
    let guessRows = document.getElementsByClassName('guess-row');
    for (guessRow of guessRows){
        let guessOpinions = guessRow.getElementsByClassName('opinion');
        let guessCells = guessRow.getElementsByClassName('guess-cell');
        for (let index=0; index < guessCells.length;index++) {
            let currentColour = guessCells[index].dataset.colourValue;
            let goalColour = guessGoals[index].dataset.goalValue;
            let currentOpinion = guessOpinions[index];
            if(currentColour === goalColour){
                currentOpinion.classList.remove("empty");
                currentOpinion.classList.add("black");
                guessGoals[parseInt(index)].classList.add("used");
            }
        }
        for (let index=0; index < guessCells.length;index++){
            let currentColour = guessCells[index].dataset.colourValue;
            let currentOpinion = guessOpinions[index];
            addAllWhiteKeyPags(currentOpinion, guessGoals, currentColour);
        }
        for (guessGoal of guessGoals){
            guessGoal.classList.remove("used");
        }
        let isWon = checkWin(guessOpinions);
        if (isWon){
            for (guessRow of guessRows){
                guessRow.classList.remove("current-row");
            }
            return;
        }
    }

    for (let checkRowIndex = 0; checkRowIndex < guessRows.length; checkRowIndex++) {
        if (checkRowIndex === guessRows.length -1) {
            alert("you lose! :(");
            document.getElementById("goals").classList.remove("hidden");
            guessRows[checkRowIndex].classList.remove("current-row");
            break;
        }
        if (guessRows[checkRowIndex].classList.contains("current-row")) {
            guessRows[checkRowIndex].classList.remove("current-row");
            guessRows[checkRowIndex + 1].classList.add("current-row");
            break;
        }
    }
}


function isNotCurrent(event) {
    return !(event.target.parentElement.classList.contains("current-row"));
}


function isEmpty(event){
    return event.target.classList.contains("empty");
}


function isViolet(event) {
    return event.target.classList.contains("violet");
}


function chooseNextColour(event, colours, index) {
    event.target.classList.remove(colours[index]);
    event.target.classList.add(colours[index + 1]);
    event.target.dataset.colourValue = colours[index + 1];
}


function chooseColour(event) {
    if (isNotCurrent(event)){
        return
    }
    if (isEmpty(event)){
        chooseRed(event)
    } else {
        let colours = ["red", "blue", "yellow", "orange", "green", "violet"];
        let index = colours.indexOf(event.target.dataset.colourValue);
            if (isViolet(event)) {
                chooseRed(event);
            } else {
                chooseNextColour(event, colours, index);
            }
        }
    }

function chooseRed(event) {
    if (isViolet(event)) {
        event.target.classList.remove("violet");
    }
    if (isEmpty(event)) {
        event.target.classList.remove("empty");
    }
    event.target.classList.add("red");
    event.target.dataset.colourValue = "red";
}

function addEventListenerToPlayBtn(){
    let playBtn = document.querySelector('#play-btn');
    playBtn.addEventListener('click', guessRow);
}


function addEventListenerToGuestCells() {
    let guessCells = document.getElementsByClassName('guess-cell');
    for (guessCell of guessCells) {
        guessCell.addEventListener('click', chooseColour);
    }
}


function addEventListenerToRetryBtn() {
    let retryBtn = document.querySelector('#retry-btn');
    retryBtn.addEventListener('click', newGame);
}


function main() {
    let rowIndex = parseInt(document.querySelector('tbody').dataset.actualRow);
    generateGoal();
    addEventListenerToPlayBtn();
    addEventListenerToGuestCells();
    addEventListenerToRetryBtn();
    newGame();
}


main();


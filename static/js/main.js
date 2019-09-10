function generateGoal(){
    let goalCells = document.getElementsByClassName('goal-cell');
    let colours = ["red", "blue", "yellow", "orange", "green", "violet"];
    for (goalCell of goalCells){
        let randomColour = colours[Math.floor(Math.random() * 6)];
        goalCell.classList.add(randomColour);
        goalCell.dataset.goalValue=randomColour;
    }
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
                currentOpinion.classList.remove("empty-opinion");
                currentOpinion.classList.add("black-opinion");
                guessGoals[parseInt(index)].classList.add("used");
            }
        }
        for (let index=0; index < guessCells.length;index++){
            let currentColour = guessCells[index].dataset.colourValue;
            let currentOpinion = guessOpinions[index];
            if(!currentOpinion.classList.contains("black-opinion")) {
                for (let goal_index=0; goal_index < guessGoals.length;goal_index++){
                    if (!guessGoals[goal_index].classList.contains("used")) {
                        if(currentColour === guessGoals[goal_index].dataset.goalValue){
                            currentOpinion.classList.remove("empty-opinion");
                            currentOpinion.classList.add("white-opinion");
                            guessGoals[goal_index].classList.add("used");
                        }
                    }
                }
            }
        }
        for (guessGoal of guessGoals){
            guessGoal.classList.remove("used");
        }
    }
    for(let checkRowIndex=0;checkRowIndex < guessRows.length;checkRowIndex++) {
        if (guessRows[checkRowIndex].classList.contains("current-row")){
            guessRows[checkRowIndex].classList.remove("current-row");
            guessRows[checkRowIndex+1].classList.add("current-row");
            break;
        }
    }
}


function chooseColour(event) {
    let colours = ["red", "blue", "yellow", "orange", "green", "violet"];
    if(event.target.parentElement.classList.contains("current-row")) {
        if (event.target.classList.contains("empty")) {
            event.target.classList.remove("empty");
            event.target.classList.add("red");
            event.target.dataset.colourValue = "red";

        } else {
            for (let index = 0; index < colours.length; index++) {
                if (event.target.classList.contains("violet")) {
                    event.target.classList.remove("violet");
                    event.target.classList.add("red");
                    event.target.dataset.colourValue = "red";
                } else {
                    if (event.target.classList.contains(colours[index])) {
                        event.target.classList.remove(colours[index]);
                        event.target.classList.add(colours[index + 1]);
                        event.target.dataset.colourValue = colours[index + 1];
                        break;
                    }
                }
            }
        }
    }
}


function addEventListenerToPlayBtn(){
    let playBtn = document.querySelector('button');
    playBtn.addEventListener('click', guessRow);
}


function addEventListenerToGuestCells() {
    let guessCells = document.getElementsByClassName('guess-cell');
    for (guessCell of guessCells) {
        guessCell.addEventListener('click', chooseColour);
    }
}


function main() {
    let rowIndex = parseInt(document.querySelector('tbody').dataset.actualRow);
    generateGoal();
    addEventListenerToPlayBtn();
    addEventListenerToGuestCells();
}
main();
function generateGoal(){
    let goalCells = document.getElementsByClassName('goal-cell')
    let colours = ["red", "blue", "yellow", "orange", "green", "violet"]
    for (goalCell of goalCells) {
        goalCell.classList.add(colours[Math.floor(Math.random() * 6)]);
    }
}


function guessRow(event) {
    console.log("play pressed");
}


function chooseColour(event) {
    let colours = ["red", "blue", "yellow", "orange", "green", "violet"];
    if (event.target.classList.contains("empty")){
        event.target.classList.remove("empty");
        event.target.classList.add("red");
    } else {
        for(let index = 0; index<colours.length;index++){
            if(event.target.classList.contains("violet")){
                event.target.classList.remove("violet");
                event.target.classList.add("red");
            } else {
                if(event.target.classList.contains(colours[index])){
                    event.target.classList.remove(colours[index]);
                    event.target.classList.add(colours[index+1]);
                    break;
                }
            }
        }
    }
}


function addEventLinstenerToPlayBtn(){
    let playBtns = document.getElementsByClassName('play-button');
    for (playBtn of playBtns) {
        playBtn.addEventListener('click', guessRow);
    }
}


function addEventListenerToGuestCells() {
    let guessCells = document.getElementsByClassName('guess-cell');
    for (guessCell of guessCells) {
        guessCell.addEventListener('click', chooseColour);
    }
}


function main() {
    generateGoal();
    addEventLinstenerToPlayBtn();
    addEventListenerToGuestCells();
}
main();
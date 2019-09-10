let playBtns = document.getElementsByClassName('play-button');

function guessRow(event) {
    console.log("play pressed");
}


for (playBtn of playBtns) {
    playBtn.addEventListener('click', guessRow);
}

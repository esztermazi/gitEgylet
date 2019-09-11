function windowClose(event) {
    window.open('','_parent','');
    window.close();
}


function addEventListenerToQuitBtn() {
    let quitBtn = document.querySelector('#quit-btn');
    quitBtn.addEventListener('click', windowClose);
}


function main() {
    addEventListenerToQuitBtn();
}


main();


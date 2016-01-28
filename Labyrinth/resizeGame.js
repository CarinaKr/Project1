window.addEventListener('resize', resizeGame, false);

function resizeGame() {
    var gameArea = document.getElementById('game_object');
    var widthToHeight = 800/600;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height =(0.9* newHeight) + 'px';
        gameArea.style.width = (0.9*newWidth) + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = (0.9* newHeight) + 'px';
        gameArea.style.height = (0.9*newWidth) + 'px';
    }
    
    //gameArea.style.marginTop = (-newHeight / 2) + 'px';
    //gameArea.style.marginLeft = (-newWidth / 2) + 'px';
    
    //var gameCanvas = document.getElementById('gameCanvas');
    //gameCanvas.width = newWidth;
    //gameCanvas.height = newHeight;
}

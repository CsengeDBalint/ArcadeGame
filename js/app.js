// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    
    this.x = x;
    
    this.y = y;
    
    this.speed = Math.floor(Math.random() * 300);
    
    this.sprite = 'images/enemy-bug.png';// The image/sprite for our enemies
    
    this.width = 110;
    
    this.height = 72;

Enemy.prototype.update = function(dt) {

    //Enemies move only horizantally;any movement multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt; 
    
    if (this.x >= 505){ //Enemies return from the other side of the gameboard
        
        this.x = -100;

    }
   
    checkCollisions(allEnemies); // Check whether a bug collides with player

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

};

function checkCollisions(allEnemies) {
   
    allEnemies.forEach(function(element){

        if (Math.abs(element.x - player.x) < 80  && Math.abs(element.y - player.y)< 80){
                
            player.resetPlayer();
                
        }
         
    });

}

// Player class with an update(), render() and
// a handleInput() method.
var Player = function(x, y) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    
    this.y = y;
    
    this.sprite = 'images/char-horn-girl.png';
   
    this.width = 101;
    
    this.height = 171;
    
Player.prototype.update = function() {
      
}

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

// Adapt change direction through  keyboard to the canvas
Player.prototype.handleInput = function(keyDirection) {

    if (keyDirection === 'left' && this.x > 50) { 
        
        this.x -= 100; 

    } else if (keyDirection === 'left' && this.x < 100){ //Avoid the player leaving the gamefield on the left
        
        this.x = 0;
        
    } 
    
    if (keyDirection === 'right' && this.x < 300) { 
        
        this.x += 100; 

    } else if (keyDirection === 'right' && this.x >= 300){ //Avoid the player leaving the gamefield on the right
        
        this.x = 400;
        
    }

    if (keyDirection === 'up' && this.y - 100 < 0) { //If the player hit the top of the gamefield reset player
        
        this.resetPlayer();

        openModal();

    } else if (keyDirection === 'up' && this.y < 506){
        
        this.y -= 85;
        
    }   
    
    if (keyDirection === 'down' && this.y + 100 > 404) {
        
        this.y = 405;

    } else if (keyDirection === 'down' && this.y < 506){
        
        this.y += 85;
        
    }

}

Player.prototype.resetPlayer = function () {
    
    this.x = 200;
    
    this.y = 400;

}

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(-80, 150);

const enemy2 = new Enemy(-60, 70);

const enemy3 = new Enemy(-100, 230);

const enemy4 = new Enemy(0, 150);

let allEnemies = [enemy1, enemy2, enemy3, enemy4];

let player = new Player(200,400);

// This listens for key presses and sends the keys to Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    
    var allowedKeys = {
        
        37: 'left',
        
        38: 'up',
        
        39: 'right',
        
        40: 'down'
    
    }

    player.handleInput(allowedKeys[e.keyCode]);

});

// Get the modal
const modal = document.getElementById('myModal');
 
// Get the main container, body and header
const body = document.getElementsByTagName('body');

const container = document.getElementById('myContainer');

const header = document.getElementsByTagName('header');

// Get the close button
const btnClose = document.getElementById("closeModal");
 
// Open the modal
function openModal() {
    
    modal.className = "Modal is-visuallyHidden";
    
    setTimeout(function() {
      
      container.className = "overlay";
      
      modal.className = "Modal";
      
      header[0].className = "is-blurred";
    
    }, 100);
    
    container.parentElement.className = "ModalOpen";

}
 
// Close the modal
btnClose.onclick = function() {
    
    modal.className = "Modal is-hidden is-visuallyHidden";
    
    body.className = "";
    
    container.parentElement.className = "";
    
    container.className = "";
    
    header[0].className = "";

}
 
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    
    if (event.target == modal) {
        
        modal.className = "Modal is-hidden";
        
        body.className = "";
        
        container.parentElement.className = "";
        
        container.className = "";
        
        header[0].className = "";
    
    }

}

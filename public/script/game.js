const play = document.getElementById('playButton');
const canvas = document.getElementById('game');
const ctx = game.getContext('2d');


// Criando o jogador

class Player {
    constructor(x, y) {
        this.playerSprite = new Image()
        this.playerSprite.src = '../images/cavaleiro.png'
        this.config = {
            x: x,
            y: y,
            w: this.playerSprite.width,
            h: this.playerSprite.height
        }
    }
    draw() {
        ctx.drawImage(this.playerSprite, this.config.x, this.config.y);
    }
    check_collision(){
        if (this.config.x < 0 || this.config.x + this.config.w > game.width){
            return 'x';
        } 
        else if  (this.config.y < 0 || this.config.y + this.config.h > game.height){
            return 'y';
        }
    }    
    move(){ 
        
    }
}


class MainGame{
    // Setup
    constructor(){
        game.width = 1280
        game.height = 720        
    }

    // Rodar o jogo
    animate(){
        
    }
    run(){
    let player = new Player(20, 20)
    function animate(){
        window.requestAnimationFrame(animate)
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, game.width, game.height)
        player.move()
        player.draw()
    }
    
    animate()

    document.addEventListener('keydown', (e) => {
        switch (e.key){
            case 'w':
                player.config.y -= 5
                break;
            case 'a':
                player.config.x -= 5
                break;
            case 's':
                player.config.y += 5
                break;
            case 'd':
                player.config.x += 5
                break;
        }
    })
}
}


play.onclick = () => {
    play.style.display = 'none'
    canvas.style.display = 'block'
    const start = new MainGame()
    start.run()
}



//pega o botão
const play = document.getElementById('playButton');
const descricao = document.getElementById('descricao');
//pega o canvas
const canvas = document.getElementById('game');
//cria o coiso 2d da API canvas
const ctx = game.getContext('2d');


// Classe do jogador

class Player {
    constructor(x, y) {
        this.playerSprite = new Image();
        this.playerSprite.onload = () => {
            //para alterar o tamanho do personagem é só mexer aqui, para deixar padrão é só deixar '*1'
            this.config.w = this.playerSprite.width * 1.5;
            this.config.h = this.playerSprite.height * 1.5;
        };
        this.playerSprite.src = '../images/cavaleiro.png';
        this.config = {
            x: x,
            y: y,
            w: 0,
            h: 0,
        };
    }
    
    //método que desenha o personagem, ele recebe 5 valores: imagem, origem x, origem y, tamanho w, largura h
    draw() {
        ctx.drawImage(this.playerSprite, this.config.x, this.config.y, this.config.w, this.config.h);
    }
    //implementar colisão
    check_collision() {
        if (this.config.x < 0 || this.config.x + this.config.w > game.width){
            return 'x';
        } 
        else if (this.config.y < 0 || this.config.y + this.config.h > game.height){
            return 'y';
        }
    }    
    //?
    move() {
        
    }
}

//Classe que roda o jogo
class MainGame{
    // Setup
    constructor(){
        game.width = 1280
        game.height = 720
    }

    
    //??
    animate(){
        
    }

    // Rodar o jogo
    run(){
        //classe player recebe metade do tamanho x e metade do y para posicionar o personagem no exato centro
    let player = new Player(game.width/2, game.height/2)
    function animate(){        
        //cor background do canvas
        ctx.fillStyle = '#8b6f41'
        //contexto da API do canvas; CTX
        ctx.fillRect(0, 0, game.width, game.height)
        player.move()
        player.draw()
        window.requestAnimationFrame(animate)
    }
    //roda o método animate (gera o jogo)
    animate()

    //leitor de inputs para movimento
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

//ação do botão html
play.onclick = () => {
    //remove o botão 
    play.style.display = 'none'
    descricao.style.display = 'none'
    //faz o canvas ser visível
    canvas.style.display = 'block'

    //inicia o jogo
    const start = new MainGame()
    start.run()
}



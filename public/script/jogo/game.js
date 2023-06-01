import { Enemy } from './Enemy.js';
import { InputHandler } from './InputHandler.js';
import { Map } from './Map.js';
import { Player } from './Player.js'

// roda após as imagens serem carregadas
addEventListener('load', function(){

    // elemento botão
    const play = document.getElementById('playButton');
    // elemento descricao
    const descricao = document.getElementById('descricao');
    // elemento canvas
    const canvas = document.getElementById('game');
    
    // transforma o canvas em um objeto para manipulador imagens em JS
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    // classe principal que interliga as outras classes
    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);            
            this.input = new InputHandler(this);
            this.map = new Map(this);
            this.enemies = [];
            this.createEnemies();
        }
        createEnemies() {
            // adiciona ao array de inimigos (posições + skin)
            const enemy1 = new Enemy(500, 300, 50, 50, 2);
            const enemy2 = new Enemy(800, 400, 50, 50, 2);
            const enemy3 = new Enemy(200, 400, 50, 50, 2);
            this.enemies.push(enemy1, enemy2, enemy3);
        }
        update(){
            this.player.key = this.input.key[this.input.key.length - 1]
            this.player.update();
            //update em cada inimigo
            for (const enemy of this.enemies) {
                enemy.update();
              }              
        }
        draw(context){
            this.map.draw(context)
            this.player.draw(context)  
            //draw em cada inimigo
            for (const enemy of this.enemies) {
                enemy.draw(context);
              }                   
        }
    }
    
    // ação do botão html
    play.onclick = () => {
        // remove o botão 
        play.style.display = 'none'
        descricao.style.display = 'none'
        // faz o canvas ser visível
        canvas.style.display = 'block'
        // loop principal
        const game = new Game(canvas.width, canvas.height)
        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            game.update();
            game.draw(ctx);
            requestAnimationFrame(animate)
        }
        animate();
    }
})




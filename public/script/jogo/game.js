import { Enemy } from './Enemy.js';
import { Entity } from './Entity.js';
import { InputHandler } from './InputHandler.js';
import { Map } from './Map.js';
import { Player } from './Player.js';

// roda após as imagens serem carregadas
addEventListener('load', function(){
    var playing = true
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
            this.entity = new Entity();

            // tests
            this.entity.createEnemy('slime', 100, 100, 50, 50);
            this.entity.createEnemy('slime', 500, 500, 100, 100);
            this.entity.createEnemy('goblin', 500, 500, 80, 100);
        }
        update(canvas){
            if (this.input.key == 'Escape'){
                playing = false
            }
            this.player.update();
            for (let e of this.entity.enemies){
                e.update()
                e.checkCollision(canvas)
            }
            this.player.checkCollisions(canvas, this.entity.enemies)
        }
        draw(context){
            this.map.draw(context)
            this.player.draw(context)
            //draw em cada inimigo
            for (let e of this.entity.enemies){
                e.draw(context)
            }
        }
    }
    
    // ação do botão html
    play.onclick = () => {
        playing = true;
        // remove o botão
        play.style.display = 'none'
        descricao.style.display = 'none'
        // faz o canvas ser visível
        canvas.style.display = 'block'
        // loop principal
        const game = new Game(canvas.width, canvas.height)                    
        function animate(){      
            if (playing){          
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            game.update(canvas);
            game.draw(ctx);
            requestAnimationFrame(animate)
            } else {
                play.style.display = 'inline-block'
                descricao.style.display = 'block'
                // faz o canvas ser visível
                canvas.style.display = 'none'
            }                
        }
        animate();        
    }
})




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
            this.player2 = new Player(this, 2)
            this.input = new InputHandler(this);
            this.map = new Map(this);
            this.entity = new Entity();

            // tests
            this.entity.createEnemy('slime', 100, 100, 50, 50);
            this.entity.createEnemy('slime', 500, 500, 100, 100);
            this.entity.createEnemy('goblin', 500, 500, 80, 100);
            this.entity.createEnemy('dummy', 50, 200, 80, 80);
            this.entity.createEnemy('cavaleiro_boss', 1000, 200, 200, 250);
        }

        update(can){
            //trocar tela
            if(this.player.x +this.player.w >= canvas.width){
                this.map.map.src = this.map.maps["map" + '1']
                this.player.x = 15
            }
            if(this.player.x + this.player.w <= 100){
                console.log("a")
                this.map.map.src = this.map.maps["map" + '2']
                this.player.x = 1100
            }

            if (this.input.key == 'Escape'){
                playing = false
            }
            if (this.input.key == 'f'){
                canvas.requestFullscreen()
            }
            
            for (let e of this.entity.enemies){
                e.update()
                e.checkCollision(can, this.player)
            }

            this.player.update(this.entity.enemies);
            this.player.checkCollisions(can, this.entity.enemies)                        
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
        canvas.style.display = 'inline-block'
        // loop principal
        const game = new Game(canvas.width, canvas.height)                    
        function animate(){      
            if (playing){          
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            game.update(canvas);
            game.draw(ctx);
            requestAnimationFrame(animate)
            } else {
                play.style.display = 'block'
                descricao.style.display = 'flex'
                // faz o canvas ser visível
                canvas.style.display = 'none'
            }                
        }
        animate();        
    }
})




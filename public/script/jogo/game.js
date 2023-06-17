import { Enemy } from './Enemy.js';
import { Entity } from './Entity.js';
import { InputHandler } from './InputHandler.js';
import { Map } from './Map.js';
import { Player } from './Player.js';


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
        constructor(canvas){
            this.canvas = canvas;
            this.width = canvas.width;
            this.height = canvas.height;
            this.enemies = [];

            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.map = new Map(this);
            this.entity = new Entity(this);
            
            this.map.createMap([1, 1]);            
        }

        checkInput(){
            if (this.input.key == 'Escape'){
                playing = false
            }
            if (this.input.key == 'f'){
                canvas.requestFullscreen()
            }
        }

        update(can){
            this.checkInput()
            
            for (let e of this.enemies){
                e.update()
                e.checkCollision(can, this.player)
            }

            this.player.update(this.map.enemies);
            
            const enemyCollided =  this.player.checkCollisions(this.enemies, "enemies")
            if (enemyCollided[0]){
                const dead = this.player.attack(enemyCollided[1])
                if (dead[0]){
                    this.map.removeEnemy(dead[1])
                }
                this.player.cancelMove()
            }

            const objectCollided = this.player.checkCollisions(this.map.objects, "objects")
            if (objectCollided[0]){
                if (this.map.doors.includes(objectCollided[1])){
                    this.player = this.map.changeMap(objectCollided[1], this.player)
                }
                else {
                    this.player.cancelMove()
                }
            }
            
            if (this.player.checkScreenCollisions()){
                this.player.cancelMove()
            }
        }

        draw(context){
            this.map.draw(context)
            this.player.draw(context)
            //draw em cada inimigo
            for (let e of this.enemies){
                e.draw(context)
            }
        }
    }
    
    // ação do botão html
    play.onclick = () => {

        // remove o botão
        play.style.display = 'none'
        descricao.style.display = 'none'
        // faz o canvas ser visível
        canvas.style.display = 'inline-block'

        // loop principal
        var playing = true;
        const game = new Game(canvas)

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




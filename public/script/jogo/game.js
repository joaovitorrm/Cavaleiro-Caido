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
            this.player2 = new Player(this)
            this.input = new InputHandler(this);
            this.map = new Map(this, this.level);
            this.entity = new Entity();
            /*// tests
            this.entity.createEnemy('slime', 100, 100, 50, 50);
            this.entity.createEnemy('slime', 500, 500, 100, 100);
            this.entity.createEnemy('goblin', 500, 500, 80, 100);
            this.entity.createEnemy('dummy', 50, 200, 80, 80);
            this.entity.createEnemy('cavaleiro_boss', 1000, 200, 200, 250);
            */
        }

        update(can){
            /*
            if (this.player.x > canvas.width){                
                if (this.map.changeMap('right')){
                    this.player.x = canvas.width/8;
                };
            }
            else if (this.player.x < 20){                
                if (this.map.changeMap('left')){
                    this.player.x = canvas.width-canvas.width/6;
                }
            }
            else if (this.player.y > canvas.height - 100){            
                if (this.map.changeMap('down')){
                    this.player.y = canvas.height/8;
                }
            }
            else if (this.player.y < 20){                
                if (this.map.changeMap('up')){
                    this.player.y = canvas.height - canvas.height/4;
                }
            }
            */
            if (this.input.key == 'Escape'){
                playing = false
            }
            if (this.input.key == 'f'){
                canvas.requestFullscreen()
            }
            
            for (let e of this.map.enemies){
                e.update()
                e.checkCollision(can, this.player)
            }

            this.player.update(this.map.enemies);
            this.player.checkScreenCollisions(can)
            for (let x of this.map.enemies){
                this.player.checkCollisions(x)
            }
            for (let x in this.map.objects){
                console.log(this.map.objects[x])
                if(this.player.checkCollisions(this.map.objects[x].pos)){
                    if(x =="doorUp"){
                        this.map.changeMap('up')
                        return
                    }
                    else if(x=="doorRight"){
                        this.map.changeMap('right')
                        return
                    }
                    else if(x=="doorLeft"){
                        this.map.changeMap('left')
                        return
                    }
                    else if(x=="doorDown"){
                        this.map.changeMap('down')  
                        return 
                    }
                    else{
                        return
                    }
                }

            }
            


        }
        draw(context){
            this.map.draw(context)
            this.player.draw(context)
            //draw em cada inimigo
            for (let e of this.map.enemies){
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




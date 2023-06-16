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
        constructor(width, height){
            this.width = width;
            this.height = height;

            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.map = new Map(this);
            this.entity = new Entity(this);
            
            this.map.createMap([1, 1]);
            this.enemies = [];
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
            
            for (let e of this.map.enemies){
                e.update()
                e.checkCollision(can, this.player)
            }

            this.player.update(this.map.enemies);
            for (let x of this.map.enemies){
                this.player.checkCollisions(x)
            }
            for (let x in this.map.objects){
                if(this.player.checkCollisions(this.map.objects[x].pos)){
                    if(x =="doorUp"){
                        if (this.map.changeMap('up')){
                            this.player.y = canvas.height - canvas.height/3
                            return
                        }
                    }
                    else if(x=="doorRight"){
                        if (this.map.changeMap('right')){
                            this.player.x = canvas.width/8;
                            return
                        }
                    }
                    else if(x=="doorLeft"){
                        if (this.map.changeMap('left')){
                            this.player.x = canvas.width-canvas.width/6;
                            return
                        }
                    }
                    else if(x=="doorDown"){
                        if (this.map.changeMap('down')){
                            this.player.y = canvas.height/7;
                            return
                        }
                    }
                    else{
                        return
                    }
                }
            }

            
            this.player.checkScreenCollisions(can)
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

        // remove o botão
        play.style.display = 'none'
        descricao.style.display = 'none'
        // faz o canvas ser visível
        canvas.style.display = 'inline-block'

        // loop principal
        var playing = true;
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




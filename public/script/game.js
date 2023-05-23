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

    // classe que recebe os inputs do jogador
    class InputHandler{
        constructor(game){            
            this.game = game
            this.key = []
            window.addEventListener('keydown', e => {
                if (!this.key.includes(e.key)){
                    this.key.push(e.key)
                }
                
            })
            window.addEventListener('keyup', e =>{
                if (this.key.includes(e.key)){
                    let released = this.key.indexOf(e.key)
                    this.key.splice(released, 1)
                }
            })
        }
    }
    
    // classe que contem as propriedades do jogador
    class Player{
        // definições iniciais
        constructor(game){
            this.game = game
            this.sprite = new Image()
            this.sprites = {
                skin1:"../images/sprites/cavaleiro.png",
                skin2:"../images/sprites/cavaleiro_ouro.png"
            }            
            this.sprite.src = this.sprites["skin" + '1']
            this.size = 100

            this.x = 200
            this.y = 20            

            let w = this.size / 2;
            let h = this.size / 2;
            let area = 25;
            
            this.hitbox = {
                right: w + area,
                left: w - area,
                top: h - area,
                bottom: h + area,
            }
            this.goblin = {
                x: 900,
                y: 185,
                w: 170,
                h: 310,
            }
        }
        
        // movimento
        move(key){                       
        
            switch (key){                    
                case 'w':
                    this.y -= 5
                    break
                case 'a':
                    this.x -= 5
                    break
                case 's':
                    this.y += 5
                    break
                case 'd':
                    this.x += 5
                    break
            }
            if (this.checkCollision(this.goblin)){
                switch (key){                    
                    case 'w':
                        this.y += 5
                        break
                    case 'a':
                        this.x += 5
                        break
                    case 's':
                        this.y -= 5
                        break
                    case 'd':
                        this.x -= 5
                        break
                }
            }

                
        }

        checkCollision(entity){
            if (this.hitbox.right + this.x> entity.x && this.hitbox.left + this.x < entity.x + entity.w 
                && this.hitbox.bottom + this.y> entity.y && this.hitbox.top + this.y < entity.y + entity.h){
                    return true
            }


        }
        update(){            
        }
        // desenhar o player na tela
        draw(context){
            context.drawImage(this.sprite, this.x, this.y, this.size, this.size)
        }
    }

    class Map{
        constructor(game){
            this.map = new Image()
            this.map.src = "../images/mapas/mapa1.png"
            this.x = 0
            this.y = 0
            this.w = 1280
            this.h = 720
        }
        draw(context){
            context.drawImage(this.map, this.x, this.y, this.w, this.h)
        }
    }

    // classe principal que interliga as outras classes
    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this) 
            this.input = new InputHandler(this)
            this.map = new Map(this)
        }
        update(){
            this.player.move(this.input.key[this.input.key.length - 1])
            this.player.update();
        }
        draw(context){
            this.map.draw(context)
            this.player.draw(context) 
            context.fillRect(900, 185, 170, 310)                 
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




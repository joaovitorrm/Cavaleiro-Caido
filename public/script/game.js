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
        constructor(game, playercount=1){
            this.game = game
            this.sprite = new Image()
            this.sprites = {
                skin1:"../images/sprites/cavaleiro.png",
                skin2:"../images/sprites/cavaleiro_ouro.png"
            }            
            this.sprite.src = this.sprites["skin" + playercount.toString()]
            this.size = 100

            this.x = 200
            this.y = 20            

            this.playercount = playercount
            this.hitbox = {
                x: this.x,
                y: this.y,
                w: this.size / 2,
                h: this.size / 2,
                area: 25,
            }
        }
        
        // movimento
        move(key){
            
            if(this.playercount==1){
                switch (key){
                    case 'w':
                        this.y -= 5
                        console.log("a")
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
            }
            if(this.playercount==2){
                switch (key){
                    case 'ArrowUp':
                        this.y -= 5
                        console.log("a")
                        break
                    case 'ArrowLeft':
                        this.x -= 5
                        break
                    case 'ArrowDown':
                        this.y += 5
                        break
                    case 'ArrowRight':
                        this.x += 5
                        break
                }
            }
        }
        collisioncheck(list, tipo="entidade"){
            if(tipo =="mapa"){
                //direita - rodando
                if (this.x + this.hitbox.w + this.hitbox.area > list[2]){
                    this.x = list[2] - this.hitbox.w - this.hitbox.area;
                } 
                //esquerda - rodando
                else if (this.hitbox.x + this.hitbox.w - this.hitbox.area <list[0]){
                    this.x = list[0] - this.hitbox.w + this.hitbox.area;
                }
                //baixo
                if (this.y + this.hitbox.h + this.hitbox.area > list[3]){
                    this.y = list[3] - this.hitbox.h - this.hitbox.area;
                } 
                //topo
                else if (this.y + this.hitbox.h - this.hitbox.area < list[1]){
                    this.y = list[1] - this.hitbox.h + this.hitbox.area;
                }
            }
        }
        update(){
            let goblinx = 680 
            let gobliny = 95
            let goblinh = 370
            let goblinw = 485

            this.hitbox.x = this.x
            this.hitbox.y = this.y
            this.collisioncheck([0, 0, canvas.width, canvas.height])
            this.collisioncheck([goblinx,gobliny,goblinw,goblinh])
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
            this.player2 = new Player(this, 2)  
            this.input = new InputHandler(this)
            this.map = new Map(this)
        }
        update(){
            this.player.move(this.input.key[this.input.key.length - 1])
            this.player.update();
            this.player2.move(this.input.key[this.input.key.length - 1])
            this.player2.update();
        }
        draw(context){
            this.map.draw(context)
            this.player.draw(context)
            this.player2.draw(context)            
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




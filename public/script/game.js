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
            this.key = [] //array que contém as teclas pressionadas
            
            //adiciona as teclas ao array
            window.addEventListener('keydown', e => {
                if (!this.key.includes(e.key)){
                    this.key.push(e.key)
                }
                
            })
            //retira as teclas ao array
            window.addEventListener('keyup', e =>{
                if (this.key.includes(e.key)){
                    let released = this.key.indexOf(e.key)
                    this.key.splice(released, 1)
                }
            })
        }
    }

    class Entity{
        //método que checa a colisão com <entity> em relação ao player
        checkCollision(entity){
            /*
            Caso 'true' O comando de movimento na direção solicitada gera uma movimentação igual de sentido oposto, fazendo com que o movimento seja 0
            ex.:
            'w' altera a posição x em 5 pixels, ao colidir, ele também altera a posição em -5px
            */
            if (this.hitbox.right + this.x> entity.x && this.hitbox.left + this.x < entity.x + entity.w && this.hitbox.bottom + this.y> entity.y && this.hitbox.top + this.y < entity.y + entity.h){
                return true
            }
        }
    }

    class Enemy extends Entity{
        constructor(x, y, w, h){
            super(Entity)
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        draw(context){
            context.drawImage(this.map, this.x, this.y, this.w, this.h)
        }

    }
    
    // classe que contem as propriedades do jogador
    class Player{
        // definições iniciais

        constructor(game){
            this.game = game

            this.key = undefined;

            //posição do spawn
            this.x = 200
            this.y = 20 

            

            //skins
            this.sprites = {
                skin1:"../images/sprites/cavaleiro.png",
                skin2:"../images/sprites/cavaleiro_ouro.png"
            } 

            this.sprite_atual = new Image()
            this.sprite_atual.src = this.sprites["skin" + '1'] //seletor de skins
            
            this.size = 100 //tamanho sprite_atual (100px x 100px)

                       

            //define o centro do sprite_atual do player e a área de hitbox
            let w = this.size / 2;
            let h = this.size / 2;
            let area = 25; //pixels
            
            //hitbox do player
            this.hitbox = {
                right: w + area, //centro do player no plano x + 25px á direita
                left: w - area, //centro do player no plano x + 25px á esquerda
                top: h - area, //centro do player no plano y + 25px para cima
                bottom: h + area //centro do player no plano y + 25px para baixo
            }
        }

        moveUp(){
            this.y -= 5;
        }
        moveDown(){
            this.y += 5
        }
        move_left(){
            this.x -= 5;
        }
        move_right(){
            this.x += 5;
        }
        
        update() {
            if (this.key in this.controls) {
              this.controls[this.key].call(this);
            }
          }
          
        //desenha o player na tela
        draw(context){ 
            context.drawImage(this.sprite_atual, this.x, this.y, this.size, this.size)
        }
    }

    class Map{
        constructor(game){
            this.map = new Image()
            this.maps = {
                map1:"../images/mapas/mapa1.png",
                map2:"../images/mapas/mapa2.png"
            }
            this.map.src = this.maps["map" + '1']//seletor de mapas
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
            this.entity = new Entity(this);
            this.enemy = new Enemy(this);
            this.player = new Player(this); 
            this.player.controls = {
                'w': this.player.moveUp,   
                'a': this.player.move_left,
                's': this.player.moveDown,
                'd': this.player.move_right,
            }
            this.input = new InputHandler(this);
            this.map = new Map(this);
        }
        update(){
            this.player.key = this.input.key[this.input.key.length - 1]
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




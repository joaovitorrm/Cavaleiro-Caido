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
<<<<<<< HEAD
        checkCollision(xa, ya, wa, ha, xb, yb, wb, hb){
            /*
            Caso 'true' O comando de movimento na direção solicitada gera uma movimentação igual de sentido oposto, fazendo com que o movimento seja 0
            ex.:
            'w' altera a posição x em 5 pixels, ao colidir, ele também altera a posição em -5px
            */
            if ((xa + wa > xb && xa < xb + wb && ya + ha > yb && ya < yb + hb)||((xa + wa > 0 && xa < canvas.width && ya + ha > 0 && ya < canvas.height))){
                return true
=======
        checkCollision(xa, ya, wa, ha, xb, yb, wb, hb) {
            if ((xa + wa > xb && xa < xb + wb && ya + ha > yb && ya < yb + hb)||((xa - wa < 0 || xa + wa > canvas.width || ya < 0 || ya + ha > canvas.height))) {
              return true;
>>>>>>> a765453ad0b6b5f1bf3f271d60d10a84e38492b8
            }
        

            return false;
          }
    }

    class Enemy extends Entity{
        constructor(x, y, w, h, skin=1){
            
            super(Entity)
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.sprites = {
                skin1:"../images/sprites/cavaleiro_ouro.png",
                skin2:"../images/sprites/cavaleiro_real.png"
            } 
            
            // Criando e selecionando o Sprite
            this.sprite_atual = new Image()
            this.sprite_atual.src = this.sprites["skin" + skin.toString()] //seletor de skins
        }
        update() {
        }
        
        draw(context) {
            context.drawImage(this.sprite_atual, this.x, this.y, this.w, this.h);
        }
        

    }
    
    // classe que contem as propriedades do jogador
    class Player extends Entity{
        // definições iniciais

        constructor(game){
            super(Entity)
            this.game = game            

            // Skins
            this.sprites = {
                skin1:"../images/sprites/cavaleiro.png",
                skin2:"../images/sprites/cavaleiro_ouro.png"
            } 
            
            // Criando e selecionando o Sprite
            this.sprite_atual = new Image()
            this.sprite_atual.src = this.sprites["skin" + '1'] //seletor de skins

            // Controles
            this.key = undefined;
            this.controls = {
                'w': this.move_up,   
                'a': this.move_left,
                's': this.move_down,
                'd': this.move_right,
                'e': this.set_skin
            }

            // Config Player
            this.x = 200;
            this.y = 20;
            this.w = 100;
            this.h = 100;
            this.speed = 5;

            // Hitbox do player
            this.hitbox_w = 20;
            this.hitbox_h = 50;

            // Centro do Sprite do player
            this.player_center_x = this.w / 2
            this.player_center_y = this.h / 2

            // Centro da Hitbox
            this.hitbox_center_x = this.hitbox_w / 2
            this.hitbox_center_y = this.hitbox_h / 2

            // Hitbox e Sprite centralizados
            this.hitbox_x = this.player_center_x - this.hitbox_center_x
            this.hitbox_y = this.player_center_y - this.hitbox_center_y
        }

        move_up(speed){
            this.y -= speed;
        }
        move_down(speed){
            this.y += speed;
        }
        move_left(speed){
            this.x -= speed;
        }
        move_right(speed){
            this.x += speed;
        }
        set_skin(){
            this.sprite_atual.src = this.sprites["skin" + '2']
        }

        update(){
            if (this.key in this.controls) {
                this.controls[this.key].call(this, this.speed)
            }
            if (this.checkCollision(this.x + this.hitbox_x, this.y + this.hitbox_y, this.hitbox_w, this.hitbox_h, 900, 185, 170, 310)){
                this.controls[this.key].call(this, -this.speed)
            }
            
        }
          
        //desenha o player na tela
        draw(context){ 
            context.drawImage(this.sprite_atual, this.x, this.y, this.w, this.h)
            //context.fillRect(this.x + this.hitbox_x, this.y + this.hitbox_y, this.hitbox_w, this.hitbox_h)
        }
    }

    class Map{
        constructor(game){
            this.map = new Image()
            this.maps = {
                map1:"../images/mapas/mapa1.png",
                map2:"../images/mapas/mapa2.png"
            }
            this.map.src = this.maps["map" + '2']//seletor de mapas
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




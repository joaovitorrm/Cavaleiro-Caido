import { Entity } from './Entity.js'
import { InputHandler } from './InputHandler.js'

// classe que contem as propriedades do jogador
export class Player extends Entity{

    // definições iniciais
    constructor(game){
        super(Entity)
        this.game = game

        // Pegar os inputs do jogador
        this.input = new InputHandler()

        // Skins
        this.sprites = {
            skin1:"../../images/sprites/player/cavaleiro.png",
            skin2:"../../images/sprites/player/cavaleiro_ouro.png"
        } 
        
        // Criando e selecionando o Sprite
        this.sprite_atual = new Image()
        this.sprite_atual.src = this.sprites["skin" + '1'] //seletor de skins

        // Controles        
        this.controls = {
            'w': this.move_up,   
            'a': this.move_left,
            's': this.move_down,
            'd': this.move_right,
            'e': this.set_skin,
        }

        // Config Player         
        this.config = {
            armor: 0,
            magicResistance: 0,
            maxHealth: 150,
            currentHealth: 150,
            speed: 10,
            physicalDamage: 2,
            magicDamage: 0
        },

        this.x = 200;
        this.y = 120;
        this.w = 100;
        this.h = 100;


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
    // Movimentação

    // Trocar de Skin
    set_skin(){
        this.sprite_atual.src = this.sprites["skin" + '2']
    }
    
    update(){

        if(this.config.currentHealth <= 0){
            this.config.speed = 0
            this.config.physicalDamage = 0
        }
        // Pega a última tecla pressionada
        this.key = this.input.key[this.input.key.length - 1];     

        // Checa se a tecla tem utilidade        
        if (this.key in this.controls) {
            this.controls[this.key].call(this, this.config.speed)            
        }

        // [Colidiu(true/false), No que colidiu, Inimigo ou Objeto]
        const collided = this.checkCollisions()            
        if (collided[0]){
            if (collided[2] == "enemy"){

                // Checa se morreu apos ser atacado
                const checkDead = this.attack(collided[1])

                // Se morreu, remove do mapa para sempre
                if (checkDead[0]){
                    this.game.map.removeEnemy(checkDead[1])
                }
            }
            if (collided[2] == "object"){

                // Checa se é uma porta
                if (this.game.map.doors.includes(collided[1])){
                    const newPos = this.game.map.changeMap(collided[1], [this.x, this.y])
                    this.x = newPos[0]
                    this.y = newPos[1]
                }
            }
            // Para de mover o player caso tenha colidido
            this.cancelMove()
        }

        if (this.checkScreenCollisions()){
            this.cancelMove()
        }
    }

    attack(e){
        this.dealDamage(e, this)
        if(e.config.currentHealth <= 0){
            const index = this.game.enemies.indexOf(e)
            this.game.map.removeEnemy(index)
            this.game.enemies.splice(index, 1)
        }
        return false
    }

    cancelMove(){
        if (this.controls[this.key] != undefined){
            this.controls[this.key].call(this, -this.config.speed)
        }
    }

    checkScreenCollisions(){
        // Checa colisão com a tela
        if (this.checkScreenCollision(this.game.canvas, this.x + this.hitbox_x, this.y + this.hitbox_y, this.hitbox_w, this.hitbox_h)){
            return true
        }
        return false
    }

    checkCollisions(){
        // Checa colisão com os inimigos
        if (this.game.enemies.length > 0){
            for (const enemy of this.game.enemies){
                if (this.check2Collision(this.x + this.hitbox_x, this.y + this.hitbox_y, this.hitbox_w, this.hitbox_h, enemy.x, enemy.y, enemy.w, enemy.h)){
                    return [true, enemy, "enemy"]
                }
            }
        }
        
        // Checa colisão com os objetos
        if (Object.keys(this.game.map.objects).length > 0){
            for (const [name, value] of Object.entries(this.game.map.objects)){
                if (this.check2Collision(this.x + this.hitbox_x, this.y + this.hitbox_y, this.hitbox_w, this.hitbox_h, value.pos.x, value.pos.y, value.pos.w, value.pos.h)){                    
                    return [true, name, "object"]
                }
            }
        }
        return false
    }

    // Desenha o player na tela    
    draw(context) {
        this.drawLife(context)
        context.drawImage(this.sprite_atual, this.x, this.y, this.w, this.h);
    }
}
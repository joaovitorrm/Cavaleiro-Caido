import { Entity } from './Entity.js'
import { InputHandler } from './InputHandler.js'
import { AchievementHandler} from './AchievementHandler.js'

// classe que contem as propriedades do jogador
export class Player extends Entity{

    // definições iniciais
    constructor(game){
        super(Entity)
        this.game = game

        this.pontuacao = 0
        this.x = 200;
        this.y = 120;
        this.w = 100;
        this.h = 100;

        this.hitbox_w = this.w/5;
        this.hitbox_h = this.h/2;
        this.hitbox_x = this.w / 2 - this.hitbox_w / 2
        this.hitbox_y = this.h / 2 - this.hitbox_h / 2

        this.config = {
            armor: 0,
            magicResistance: 0,
            maxHealth: 150,
            currentHealth: 1,
            speed: 5,
            physicalDamage: 2,
            magicDamage: 0
        },

        // Inputs e controles
        this.input = new InputHandler()    
        this.controls = {
            'w': this.move_up,   
            'a': this.move_left,
            's': this.move_down,
            'd': this.move_right,
        }

        this.animation_speed = 1
        this.animation_time = 1
        this.animation_step = 0

        this.animations = {            
            "andar_cima": ["andando_costas_1", "parado_costas", "andando_costas_2", "parado_costas"],
            "andar_direita": ["andando_1", "parado", "andando_2", "parado"],
            "andar_baixo": ["andando_1", "parado", "andando_2", "parado"],
            "andar_esquerda": ["andando_1", "parado", "andando_2", "parado"]
        }

        // Skins
        this.sprites = {
            cavaleiro_padrao: "../../images/sprites/player/cavaleiro_padrao/"
        }

        this.sprite_atual = new Image()
        this.sprite_atual.src = this.sprites.cavaleiro_padrao  + "/parado.png" //seletor de skins

        this.stats = {
            enemiesKilled: 0,
            pixelsWalked: 0,
            damageDealt: 0,
            damageTaken: 0,

        }
          
    }

    move_up(speed){
        this.y -= speed;
        this.animate(this.animations.andar_cima);
        this.stats.pixelsWalked += speed
    }
    move_down(speed){
        this.y += speed;
        this.animate(this.animations.andar_baixo);
        this.stats.pixelsWalked += speed
    }
    move_left(speed){
        this.x -= speed;
        this.animate(this.animations.andar_direita);
        this.stats.pixelsWalked += speed
    }
    move_right(speed){
        this.x += speed;
        this.animate(this.animations.andar_esquerda);
        this.stats.pixelsWalked += speed
    }

    animate(direction){
        if (Array.isArray(direction)){            
            if (this.animation_time == this.animation_speed){
                this.sprite_atual.src = this.sprites.cavaleiro_padrao + "/" + direction[this.animation_step] + ".png"
                this.animation_step += 1
                if (this.animation_step == direction.length - 1){
                    this.animation_step = 0
                }
                this.animation_time = 0
            } else {
                this.animation_time += 1
            }
        } else {
            this.sprite_atual.src = this.sprites.cavaleiro_padrao + "/" + direction + ".png"
        }
    }
    
    update(){

        if(this.config.currentHealth <= 0){
            this.config.speed = 0
            this.config.physicalDamage = 0
            this.sprite_atual.src = "../../images/sprites/enemies/fantasma.png";
            this.game.playing = false
        }
        // Pega a última tecla pressionada
        // e checa se a tecla tem utilidade  
        this.key = this.input.key[this.input.key.length - 1];
             
        if (this.key in this.controls && this.config.currentHealth >= 1) {
            this.controls[this.key].call(this, this.config.speed)            
        }

        // collided = [Colidiu(true/false), objeto colidido, tipo do objeto colidido] ex: [true, slime:{...}, "enemy"]
        const collided = this.checkPlayerCollisions()            
        if (collided[0]){
            if (collided[2] == "enemy"){

                // ataca e retorna se morreu ou não
                const checkDead = this.attack(collided[1])

                // Se morreu, remove do mapa para sempre
                if (checkDead){
                    const index = this.game.enemies.indexOf(collided[1])
                    this.game.map.removeEnemy(index)
                    this.game.enemies.splice(index, 1)
                    this.stats.enemiesKilled += 1
                    this.pontuacao += 1
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
            return true
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

    checkPlayerCollisions(){
        // Checa colisão com os inimigos
        if (this.game.enemies.length > 0){
            for (const enemy of this.game.enemies){
                if (this.checkCollision(this.x + this.hitbox_x, this.y + this.hitbox_y, this.hitbox_w, this.hitbox_h, enemy.x, enemy.y, enemy.w, enemy.h)){
                    return [true, enemy, "enemy"]
                }
            }
        }
        
        // Checa colisão com os objetos
        if (Object.keys(this.game.map.objects).length > 0){
            for (const [name, value] of Object.entries(this.game.map.objects)){
                if (this.checkCollision(this.x + this.hitbox_x, this.y + this.hitbox_y, this.hitbox_w, this.hitbox_h, value.pos.x, value.pos.y, value.pos.w, value.pos.h)){                    
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
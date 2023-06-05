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
            'e': this.set_skin
        }

        // Config Player 
        this.config = { 
            physical_damage: this.entities['player'].physical_damage,
            speed: this.entities['player'].speed,
            maxHealth: this.entities['player'].maxHealth,
            currentHealth: this.entities['player'].currentHealth,
            armor: this.entities['player'].armor,
            magic_resistance: this.entities['player'].magic_resistance,
            magic_damage: this.entities['player'].magic_damage,
        };

        this.x = 200;
        this.y = 20;
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
    
    update(enemies){
        // Pega a última tecla pressionada
        this.checkDead()
        this.key = this.input.key[this.input.key.length - 1];     

        // Checa se a tecla tem utilidade        
        if (this.key in this.controls) {
            this.controls[this.key].call(this, this.config.speed)            
        }
        //colisão "geral"
        for (let e of enemies){
            if (this.check2Collision(this.x + this.hitbox_x, this.y + this.hitbox_y, this.hitbox_w, this.hitbox_h,e.x, e.y, e.w, e.h)){
                    e.checkDead()
                    this.takeDamage(e)
                    this.dealDamage(e)
                return;

            }
        }
    }
    

    checkCollisions(canvas, enemies){

        if (this.controls[this.key] != undefined){
            // Checa colisão com a tela
            if (this.checkScreenCollision(canvas, this.x + this.hitbox_x, this.y + this.hitbox_y, this.hitbox_w, this.hitbox_h)){
                this.controls[this.key].call(this, -this.config.speed)
            }

            // Checa colisão com os inimigos
            for (let e of enemies){
                if (this.check2Collision(this.x + this.hitbox_x, this.y + this.hitbox_y, this.hitbox_w, this.hitbox_h, e.x, e.y, e.w, e.h)){
                    this.controls[this.key].call(this, -this.config.speed)

                }
            }
        }
    }
    // Desenha o player na tela
    
    draw(context) {
        this.drawLife(context)
        context.drawImage(this.sprite_atual, this.x, this.y, this.w, this.h);
    }
}
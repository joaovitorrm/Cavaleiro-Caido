import { Entity } from './Entity.js'

export class Enemy extends Entity{
    constructor(x, y, w, h, skin=1){
        super(Entity)
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sprites = {
            skin1:"../../images/sprites/cavaleiro_ouro.png",
            skin2:"../../images/sprites/cavaleiro_real.png"
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
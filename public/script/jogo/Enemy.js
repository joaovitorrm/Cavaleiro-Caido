import { Entity } from './Entity.js'

export class Enemy extends Entity{
    constructor(enemy, x, y, w, h, sprite){
        super(Entity)
        this.enemy = enemy
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sprite = sprite;

        this.configs = {
            'slime': {
                speed: 2,
                damage: 2,
            },
            'goblin': {
                speed: 4,
                damage: 5,
            }
        }
    }

    update() {
        this.x += this.configs[this.enemy].speed;
    }

    checkCollision(canvas){
        if (this.checkScreenCollision(canvas, this.x, this.y, this.w, this.h)){
            this.configs[this.enemy].speed *= -1;
        }
    }
    
    draw(context) {
        context.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
}
import { Entity } from './Entity.js'

export class Enemy extends Entity{
    constructor(enemy, x, y, w, h){
        super(Entity)
        this.enemy = enemy;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.entities = {
            'slime': {
                sprite: '../../images/sprites/enemies/slime.png',
                speed: 2,
                damage: 2,
            },
            'goblin': {
                sprite: '../../images/sprites/enemies/goblin.png',
                speed: 4,
                damage: 5,
            },
            'dummy': {
                sprite: '../../images/icones/tutorial.png',
                speed: 0,
                damage: 0,
            }
        }
        this.sprite = new Image();
        this.sprite.src = this.entities[this.enemy].sprite;
    }

    update() {
        this.x += this.entities[this.enemy].speed;
    }

    checkCollision(canvas){
        if (this.checkScreenCollision(canvas, this.x, this.y, this.w, this.h)){
            this.entities[this.enemy].speed *= -1;
        }
    }
    
    draw(context) {
        context.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
}
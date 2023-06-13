import { Entity } from './Entity.js'
import { Enemy } from './Enemy.js';
import maps from './maps.json' assert {type: 'json'}

export class Map{
    constructor(game){
        this.entities = new Entity;
        this.maps = maps.maps
        this.mapa_atual = 1
        this.map = new Image()
        this.map.src = this.maps[this.mapa_atual].sprite//seletor de mapas
        this.x = 0
        this.y = 0
        this.w = 1280
        this.h = 720
        this.enemies = []
        //console.log(this.enemies)
        //console.log(this.maps[0]["enemies"][0][0])
        //console.log(this.entities.entities[this.maps[0]["enemies"][0][0]])
        this.createEnemies()
        

    }

    draw(context){
        context.drawImage(this.map, this.x, this.y, this.w, this.h)
    };
    createEnemies(){
        for (let x of this.maps[0]["enemies"]){
            console.log(x[1])
            this.enemies.push(new Enemy(this.entities.entities[x[0]], x[1][0], x[1][1], 20, 20))
        }
        //console.log(this.enemies)
        console.log(this.enemies)
    };

    drawEnemies(context){
        for (let x of this.enemies){
            //console.log(x.config.sprite)
            context.drawImage(x.config.sprite, 20, 20, 20, 20)
        }
        
    }
}
import { Entity } from './Entity.js'
import { Enemy } from './Enemy.js';
import maps from './maps.json' assert {type: 'json'}

export class Map{
    constructor(game, level=0){
        this.entities = new Entity;
        this.maps = maps.maps
        this.mapa_atual = level
        this.map = new Image()
        this.map.src = this.maps[this.mapa_atual].sprite//seletor de mapas
        this.x = 0
        this.y = 0
        this.w = 1280
        this.h = 720
        this.enemies = this.createEnemies()
        

    }
    draw(context){
        context.drawImage(this.map, this.x, this.y, this.w, this.h)
    };

    createEnemies(){
        let createdEnemies =[]
        for (let x of this.maps[this.mapa_atual]["enemies"]){
            createdEnemies.push(new Enemy(this.entities.entities[x[0]], x[1][0], x[1][1], x[1][2], x[1][3]))
        }
        return(createdEnemies)
    };
}
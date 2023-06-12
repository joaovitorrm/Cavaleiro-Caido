import { Entity } from './Entity.js'
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
    }
    createEnemies(){
        for (let x of this.maps.enemies){
        this.enemies.push([this.entities[this.maps.enemies[0]], 20, 20])
        }
    }

    draw(context){
        context.drawImage(this.map, this.x, this.y, this.w, this.h)
    };
    drawEnemies(context){
        for (let x of this.enemies){
            context.drawImage(this.enemies[this.maps.enemies[0]], 20, 20)
        }
        
    }
}
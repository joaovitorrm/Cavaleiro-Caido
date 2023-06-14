import { Entity } from './Entity.js'
import { Enemy } from './Enemy.js';
import maps from './json/maps.json' assert {type: 'json'}

export class Map{
    constructor(game, level=[0, 0]){
        this.entities = new Entity;
        this.maps = []
        this.mapa_atual = []
        console.log(level)
        this.levelAtual = level
        this.createMap(this.levelAtual)        
        this.map = new Image()
        this.map.src = this.mapa_atual.sprite //seletor de mapas
        this.x = 0
        this.y = 0
        this.w = 1280
        this.h = 720
        //console.log(this.enemies)
        //console.log(this.maps[0]["enemies"][0][0])
        //console.log(this.entities.entities[this.maps[0]["enemies"][0][0]])
        this.enemies = this.createEnemies()
        

    }
    draw(context){
        context.drawImage(this.map, this.x, this.y, this.w, this.h)
    };

    createMap(level){
        this.maps = [

            [maps.mapa1, maps.mapa2, maps.mapa3],
            [maps.mapa3, maps.mapa4],
            [maps.mapa5, maps.mapa1]

        ]

        this.mapa_atual = this.maps[level[0]][level[1]]

    }

    changeMap(direction){

        if (direction == 'right'){
            console.log(this.levelAtual)
            if (this.maps[this.levelAtual[0]][this.levelAtual[1] + 1]){
                this.levelAtual = [this.levelAtual[0], this.levelAtual[1] + 1]
                this.mapa_atual = this.maps[this.levelAtual[0]][this.levelAtual[1]]
                this.map.src = this.mapa_atual.sprite
                this.enemies = this.createEnemies()
                return true
            }            
        }
        else if (direction == 'left'){
            if (this.maps[this.levelAtual[0]][this.levelAtual[1] - 1]){
                this.levelAtual = [this.levelAtual[0], this.levelAtual[1] - 1]
                this.mapa_atual = this.maps[this.levelAtual[0]][this.levelAtual[1]]
                this.map.src = this.mapa_atual.sprite
                this.enemies = this.createEnemies()
                return true
            }            
        }
        if (this.levelAtual[0] < this.maps.length -1)
            if (direction == 'down'){
                console.log(this.levelAtual)
                if (this.maps[this.levelAtual[0] + 1][this.levelAtual[1]]){
                    this.levelAtual = [this.levelAtual[0] + 1, this.levelAtual[1]]
                    this.mapa_atual = this.maps[this.levelAtual[0]][this.levelAtual[1]]
                    this.map.src = this.mapa_atual.sprite
                    this.enemies = this.createEnemies()
                    return true
                }            
            }
        if (this.levelAtual[0] > 0){
            if (direction == 'up'){
                if (this.maps[this.levelAtual[0] - 1][this.levelAtual[1]]){
                    this.levelAtual = [this.levelAtual[0] - 1, this.levelAtual[1]]
                    this.mapa_atual = this.maps[this.levelAtual[0]][this.levelAtual[1]]
                    this.map.src = this.mapa_atual.sprite
                    this.enemies = this.createEnemies()
                    return true
                }
                
            }
        }
        return false

    }

    createEnemies(){
        let createdEnemies =[]
        for (let x of this.maps[this.levelAtual[0]][this.levelAtual[1]]["enemies"]){
            createdEnemies.push(new Enemy(this.entities.entities[x[0]], x[1][0], x[1][1], x[1][2], x[1][3]))
        }
        return(createdEnemies)
    };
}
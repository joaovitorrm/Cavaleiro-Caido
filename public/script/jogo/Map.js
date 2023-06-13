import { Entity } from './Entity.js'
import { Enemy } from './Enemy.js';
import maps from './maps.json' assert {type: 'json'}

export class Map{
    constructor(game, level=[2, 0]){
        this.entities = new Entity;
        this.maps = []
        this.mapa_atual = []
        this.levelAtual = level
        this.createMap(this.levelAtual)        
        this.map = new Image()
        this.map.src = this.mapa_atual.sprite //seletor de mapas
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
        for (let x of this.mapa_atual["enemies"]){
            this.enemies.push(new Enemy(this.entities.entities[x[0]], x[1][0], x[1][1], x[1][2], x[1][3]))
        }
        //console.log(this.enemies)
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
                this.createEnemies()
                console.log(this.mapa_atual)
                this.map.src = this.mapa_atual.sprite
            }            
        }
        else if (direction == 'left'){
            console.log(this.levelAtual)
            if (this.maps[this.levelAtual[0]][this.levelAtual[1] - 1]){
                this.levelAtual = [this.levelAtual[0], this.levelAtual[1] - 1]
                this.mapa_atual = this.maps[this.levelAtual[0]][this.levelAtual[1]]
                this.createEnemies()
                this.map.src = this.mapa_atual.sprite
            }            
        }
        console.log(this.levelAtual[0], this.maps.length)
        if (this.levelAtual[0] < this.maps.length -1)
            if (direction == 'down'){
                console.log(this.levelAtual)
                if (this.maps[this.levelAtual[0] + 1][this.levelAtual[1]]){
                    this.levelAtual = [this.levelAtual[0] + 1, this.levelAtual[1]]
                    this.mapa_atual = this.maps[this.levelAtual[0]][this.levelAtual[1]]
                    this.createEnemies()
                    this.map.src = this.mapa_atual.sprite
                }            
            }
        if (this.levelAtual[0] > 0){
            if (direction == 'up'){
                if (this.maps[this.levelAtual[0] - 1][this.levelAtual[1]]){
                    this.levelAtual = [this.levelAtual[0] - 1, this.levelAtual[1]]
                    this.mapa_atual = this.maps[this.levelAtual[0]][this.levelAtual[1]]
                    this.createEnemies()
                    this.map.src = this.mapa_atual.sprite
                }
                
            }
        }

    }

    drawEnemies(context){
        for (let x of this.enemies){
            //console.log(x.config.sprite)
            context.drawImage(x.config.sprite, 20, 20, 20, 20)
        }
        
    }
}
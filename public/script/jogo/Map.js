import { Entity } from './Entity.js'
import { Enemy } from './Enemy.js';
import objectsJSON from './json/objects.json' assert {type: 'json'}
import mapsJSON from './json/maps.json' assert {type: 'json'}

export class Map{    
    constructor(game, level=[1, 1]){        
        this.entities = new Entity;
        this.mapsJSON = mapsJSON;
        this.objectsJSON = objectsJSON;

        // Posição e tamanho do mapa
        this.x = 0;
        this.y = 0;
        this.w = 1280;
        this.h = 720;

        // Configurações do mapa
        this.mapsLayout = []; // Grid de mapas
        this.mapaAtual = {"map": "", "sprite": new Image(), "level": level}; // Definições do mapa        
        this.objects = {}; // Objetos na tela
        this.enemies = []; // Lista de inimigos no mapa
    }

    draw(context){
        context.drawImage(this.mapaAtual.sprite, this.x, this.y, this.w, this.h);
        for (const [y, x] of Object.entries(this.objects)) {
            console.log(x)
            context.drawImage(x.img, x.pos.x, x.pos.y, x.pos.w, x.pos.h)
        }
        
    };

    createMap(level){

        // {...} => Cria uma cópia do json
        this.mapsLayout = [
            [{"map": this.mapsJSON.mapa1, "objects": {}}, {"map": this.mapsJSON.mapa2, "objects": {}}, {"map": this.mapsJSON.mapa7, "objects": {}}],
            [{"map": this.mapsJSON.mapa3, "objects": {}}, {"map": this.mapsJSON.mapa4, "objects": {}}, {"map": this.mapsJSON.mapa1, "objects": {}}],
            [{"map": this.mapsJSON.mapa5, "objects": {}}, {"map": this.mapsJSON.mapa6, "objects": {}}, {"map": this.mapsJSON.mapa1, "objects": {}}]
        ]

        // Criação das portas
        this.mapsLayout.forEach((y, indexY) => {
            y.forEach((x, indexX) => {
                // Adiciona os objetos do maps.json
                for (const [objName, objConfig] of Object.entries(x.map.objects)){
                    this.mapsLayout[indexY][indexX].objects[objName] = objConfig
                    let img = new Image();
                    img.src = objConfig.sprite;
                    this.mapsLayout[indexY][indexX].objects[objName]["img"] = img;
                }

                // Adicionar as portas dinamicas
                if (this.mapsLayout[indexY - 1]){
                    if (this.mapsLayout[indexY - 1][indexX]){
                        x.objects["doorUp"] = this.objectsJSON.doors.doorUp;
                        let img = new Image();
                        img.src = this.objectsJSON.doors.doorUp.sprite;
                        x.objects["doorUp"]["img"] = img;
                    }
                }
                if (this.mapsLayout[indexY + 1]){
                    if (this.mapsLayout[indexY + 1][indexX]){
                        x.objects["doorDown"] = this.objectsJSON.doors.doorDown;
                        let img = new Image();
                        img.src = this.objectsJSON.doors.doorDown.sprite;
                        x.objects["doorDown"]["img"] =  img;
                    }
                }
                if (y[indexX - 1]){
                    x.objects["doorLeft"] = this.objectsJSON.doors.doorLeft;
                    let img = new Image();
                    img.src = this.objectsJSON.doors.doorLeft.sprite;
                    x.objects["doorLeft"]["img"] =  img;
                }
                if (y[indexX + 1]){
                    x.objects["doorRight"] = this.objectsJSON.doors.doorRight;
                    let img = new Image();
                    img.src = this.objectsJSON.doors.doorRight.sprite;
                    x.objects["doorRight"]["img"] =  img;
                }
            })
        })        
                
        this.enemies = this.createEnemies()
        this.mapaAtual.map = this.mapsLayout[level[0]][level[1]].map
        this.mapaAtual.sprite.src = this.mapaAtual.map.sprite
        this.objects = this.mapsLayout[level[0]][level[1]].objects
    }

    changeMap(direction){
        let changed = false

        if (direction == 'right'){
            if (this.mapsLayout[this.mapaAtual.level[0]][this.mapaAtual.level[1] + 1]){
                this.mapaAtual.level = [this.mapaAtual.level[0], this.mapaAtual.level[1] + 1]
                changed = true
            }            
        }
        else if (direction == 'left'){
            if (this.mapsLayout[this.mapaAtual.level[0]][this.mapaAtual.level[1] - 1]){
                this.mapaAtual.level = [this.mapaAtual.level[0], this.mapaAtual.level[1] - 1]
                changed = true
            }            
        }
        if (this.mapaAtual.level[0] < this.mapsLayout.length -1)
            if (direction == 'down'){
                if (this.mapsLayout[this.mapaAtual.level[0] + 1][this.mapaAtual.level[1]]){
                    this.mapaAtual.level = [this.mapaAtual.level[0] + 1, this.mapaAtual.level[1]]
                    changed = true
                }            
            }
        if (this.mapaAtual.level[0] > 0){
            if (direction == 'up'){
                if (this.mapsLayout[this.mapaAtual.level[0] - 1][this.mapaAtual.level[1]]){
                    this.mapaAtual.level = [this.mapaAtual.level[0] - 1, this.mapaAtual.level[1]]
                    changed = true
                }
                
            }
        }
        if (changed){
            this.mapaAtual.map = this.mapsLayout[this.mapaAtual.level[0]][this.mapaAtual.level[1]].map
            this.mapaAtual.sprite.src = this.mapaAtual.map.sprite
            this.enemies = this.createEnemies()            
            this.objects = this.mapsLayout[this.mapaAtual.level[0]][this.mapaAtual.level[1]].objects
            return true
        }
        return false

    }

    createEnemies(){
        let createdEnemies = [];
        for (let x of this.mapsLayout[this.mapaAtual.level[0]][this.mapaAtual.level[1]]["map"]["enemies"]){
            createdEnemies.push(new Enemy(this.entities.entities[x[0]], x[1][0], x[1][1], x[1][2], x[1][3]))
        }
        return(createdEnemies)
    };

    update(playerPos, canvas){
        
    }
};
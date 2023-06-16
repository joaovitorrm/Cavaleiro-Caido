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
            context.drawImage(x.img, x.pos.x, x.pos.y, x.pos.w, x.pos.h)
        }        
    };

    createMap(level){

        // {...} => Cria uma cópia do json
        this.mapsLayout = [
            [{"map": this.mapsJSON.mapa1, "objects": {}, "enemies": []}, {"map": this.mapsJSON.mapa2, "objects": {}, "enemies": []}, {"map": this.mapsJSON.mapa7, "objects": {}, "enemies": []}],
            [{"map": this.mapsJSON.mapa3, "objects": {}, "enemies": []}, {"map": this.mapsJSON.mapa4, "objects": {}, "enemies": []}, {"map": this.mapsJSON.mapa1, "objects": {}, "enemies": []}],
            [{"map": this.mapsJSON.mapa5, "objects": {}, "enemies": []}, {"map": this.mapsJSON.mapa6, "objects": {}, "enemies": []}, {"map": this.mapsJSON.mapa1, "objects": {}, "enemies": []}]
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

                // Adiciona os inimigos do maps.json
                for (const e of x.map.enemies){
                    x.enemies.push(e)
                }

                // Adiciona as portas dinamicas
                let doors = []
                if (this.mapsLayout[indexY - 1]){
                    if (this.mapsLayout[indexY - 1][indexX]){
                        doors.push("doorUp")}}

                if (this.mapsLayout[indexY + 1]){
                    if (this.mapsLayout[indexY + 1][indexX]){
                        doors.push("doorDown")}}

                if (y[indexX - 1]){
                    doors.push("doorLeft")}
                    
                if (y[indexX + 1]){
                    doors.push("doorRight")}
                
                for (let d of doors){
                    x.objects[d] = this.objectsJSON.doors[d];
                    let img = new Image();
                    img.src = this.objectsJSON.doors[d].sprite;
                    x.objects[d]["img"] =  img;
                }
            })
        })
        
        this.mapaAtual.map = this.mapsLayout[level[0]][level[1]].map
        this.mapaAtual.sprite.src = this.mapaAtual.map.sprite
        this.objects = this.mapsLayout[level[0]][level[1]].objects
        this.enemies = this.createEnemies()
    }

    changeMap(direction){
        let changed = true

        if (direction == 'right'){
            this.mapaAtual.level = [this.mapaAtual.level[0], this.mapaAtual.level[1] + 1]
        }
        else if (direction == 'left'){
            this.mapaAtual.level = [this.mapaAtual.level[0], this.mapaAtual.level[1] - 1]
        }
        else if (direction == 'down'){
            this.mapaAtual.level = [this.mapaAtual.level[0] + 1, this.mapaAtual.level[1]]
        }
        else if (direction == 'up'){
            this.mapaAtual.level = [this.mapaAtual.level[0] - 1, this.mapaAtual.level[1]]
        }
        else {
            changed = false
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
        for (const x of this.mapsLayout[this.mapaAtual.level[0]][this.mapaAtual.level[1]]["enemies"]){
            createdEnemies.push(new Enemy(this.entities.entities[x.sprite], x.pos.x, x.pos.y, x.pos.w, x.pos.h))
        }
        return(createdEnemies)
    }
}
import { Entity } from './Entity.js'
import { Enemy } from './Enemy.js';
import objectsJSON from './json/objects.json' assert {type: 'json'}
import mapsJSON from './json/maps.json' assert {type: 'json'}

export class Map {
    constructor(game, level = [0, 0]) {
        this.game = game
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
        this.mapaAtual = { "map": "", "sprite": new Image(), "level": level }; // Definições do mapa        
        this.objects = {}; // Objetos na tela    
        this.doors = ["doorUp", "doorRight", "doorDown", "doorLeft"] // Definição das portas
    }

    draw(context) {
        // Desenha o mapa na tela
        context.drawImage(this.mapaAtual.sprite, this.x, this.y, this.w, this.h);
        // Desenha os objetos do mapa
        for (const [y, x] of Object.entries(this.objects)) {
            context.drawImage(x.img, x.pos.x, x.pos.y, x.pos.w, x.pos.h)
        }
    };

    removeEnemy(enemyIndex) {
        this.mapsLayout[this.mapaAtual.level[0]][this.mapaAtual.level[1]]["enemies"].splice(enemyIndex, 1)
    }

    newMap(map) {
        if (map){
            return { "map": this.mapsJSON[map], "objects": {}, "enemies": [] }
        }
        else return "0"        
    }

    createMap(level) {
        this.mapsLayout = [
            [this.newMap("mapa1"), this.newMap("mapa2"), this.newMap("mapa3")],
            [this.newMap("mapa4"), this.newMap(       ), this.newMap("mapa1")],
            [this.newMap("mapa5"), this.newMap("mapa6"), this.newMap("mapa1")],
            [this.newMap(       ), this.newMap(       ), this.newMap("mapa2")],
            [this.newMap("mapa5"), this.newMap("mapa3"), this.newMap("mapa4")],
            [this.newMap(       ), this.newMap("mapa5"), this.newMap(       )]
        ]

        // Criação das portas
        this.mapsLayout.forEach((y, indexY) => {
            y.forEach((x, indexX) => {
                if (x != "0") {
                    // Adiciona os objetos do maps.json
                    for (const [objName, objConfig] of Object.entries(x.map.objects)) {
                        this.mapsLayout[indexY][indexX].objects[objName] = objConfig
                        let img = new Image();
                        img.src = objConfig.sprite;
                        this.mapsLayout[indexY][indexX].objects[objName]["img"] = img;
                    }

                    // Adiciona os inimigos do maps.json
                    for (const e of x.map.enemies) {
                        x.enemies.push(e)
                    }

                    // Adiciona as portas dinamicas
                    let doors = []
                    if (this.mapsLayout[indexY - 1] && this.mapsLayout[indexY - 1][indexX] != "0") {
                        if (this.mapsLayout[indexY - 1][indexX]) {
                            doors.push("doorUp")
                        }
                    }

                    if (this.mapsLayout[indexY + 1] && this.mapsLayout[indexY + 1][indexX] != "0") {
                        if (this.mapsLayout[indexY + 1][indexX]) {
                            doors.push("doorDown")
                        }
                    }

                    if (y[indexX - 1] && y[indexX - 1] != "0") {
                        doors.push("doorLeft")
                    }

                    if (y[indexX + 1] && y[indexX + 1] != "0") {
                        doors.push("doorRight")
                    }

                    for (let d of doors) {
                        x.objects[d] = this.objectsJSON.doors[d];
                        let img = new Image();
                        img.src = this.objectsJSON.doors[d].sprite;
                        x.objects[d]["img"] = img;
                    }
                }


            })
        })

        this.mapaAtual.map = this.mapsLayout[level[0]][level[1]].map
        this.mapaAtual.sprite.src = this.mapaAtual.map.sprite
        this.objects = this.mapsLayout[level[0]][level[1]].objects
        this.game.enemies = this.createEnemies()
    }

    changeMap(direction, playerPos) {
        const newPlayerPos = playerPos

        if (direction == 'doorRight') {
            this.mapaAtual.level = [this.mapaAtual.level[0], this.mapaAtual.level[1] + 1]
            newPlayerPos[0] = this.game.canvas.width / 8;
        }
        else if (direction == 'doorLeft') {
            this.mapaAtual.level = [this.mapaAtual.level[0], this.mapaAtual.level[1] - 1]
            newPlayerPos[0] = this.game.canvas.width - this.game.canvas.width / 5;
        }
        else if (direction == 'doorDown') {
            this.mapaAtual.level = [this.mapaAtual.level[0] + 1, this.mapaAtual.level[1]]
            newPlayerPos[1] = this.game.canvas.height / 6;
        }
        else if (direction == 'doorUp') {
            this.mapaAtual.level = [this.mapaAtual.level[0] - 1, this.mapaAtual.level[1]]
            newPlayerPos[1] = this.game.canvas.height - this.game.canvas.height / 3
        }

        this.mapaAtual.map = this.mapsLayout[this.mapaAtual.level[0]][this.mapaAtual.level[1]].map
        this.mapaAtual.sprite.src = this.mapaAtual.map.sprite
        this.game.enemies = this.createEnemies()
        this.objects = this.mapsLayout[this.mapaAtual.level[0]][this.mapaAtual.level[1]].objects
        return newPlayerPos
    }

    createEnemies() {
        let createdEnemies = [];
        for (const x of this.mapsLayout[this.mapaAtual.level[0]][this.mapaAtual.level[1]]["enemies"]) {
            createdEnemies.push(new Enemy(this.game, this.entities.entities[x.sprite], x.pos.x, x.pos.y, x.pos.w, x.pos.h))
        }
        return (createdEnemies)
    }
}
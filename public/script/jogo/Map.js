export class Map{
    constructor(game){
        this.map = new Image()
        this.maps = {
            map1:"../../images/mapas/mapa1.png",
            map2:"../../images/mapas/mapa2.png"
        }
        this.map.src = this.maps["map" + '2']//seletor de mapas
        this.x = 0
        this.y = 0
        this.w = 1280
        this.h = 720
    }
    draw(context){
        context.drawImage(this.map, this.x, this.y, this.w, this.h)
    }
}
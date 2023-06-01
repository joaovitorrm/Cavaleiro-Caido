
export class Entity{
    //método que checa a colisão com <entity> em relação ao player
    checkCollision(xa, ya, wa, ha, xb, yb, wb, hb) {
        if ((xa + wa > xb && xa < xb + wb && ya + ha > yb && ya < yb + hb)) {
          return true;
        }

        return false;
    }
    //método que checa a colisão com a parede
    checkScreenCollision(canvas, xa, ya, wa, ha){
      if(xa - wa < 0 || xa + wa > canvas.width || ya < 0 || ya + ha > canvas.height){
        return true;
      }
      return false;
    }
}
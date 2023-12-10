export class DrawText{
    constructor() {        
        this.text = "";
        this.x = 0;
        this.y = 0;
        this.textAlign = 'left';
        this.fontSize = 15;
        this.fontStyle = "";
        this.fontFamily = 'verdana';
        this.color = "white";
        this.strokeColor = "black";
        this.strokeWidth = 1;
    };

    alignCenterX(ctx) {
        ctx.translate(ctx.canvas.width / 2, 0);
    };

    alignCenterY(ctx) {
        ctx.translate(0, ctx.canvas.height / 2);
    };

    alignRight(ctx) {
        ctx.translate(ctx.canvas.width, 0);
    };

    alignBottom(ctx) {
        ctx.translate(0, ctx.canvas.height);
    };
    
    drawText(ctx) {
        ctx.textAlign = this.textAlign;
        ctx.font = this.fontStyle + " " + this.fontSize + 'px ' + this.fontFamily;
        ctx.fillStyle = this.color;
        
        ctx.fillText(this.text, this.x, this.y);
        ctx.setTransform();
    };

    drawStrokedText(ctx) {
        ctx.textAlign = this.textAlign;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeWidth;
        ctx.font = this.fontStyle + " " + this.fontSize + 'px ' + this.fontFamily;
        
        ctx.fillText(this.text, this.x, this.y);
        ctx.strokeText(this.text, this.x, this.y);
        ctx.setTransform();
    };
};
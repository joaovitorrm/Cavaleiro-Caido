import { DrawText } from "./DrawText.js";

export class HUD {
    constructor(game) {
        this.game = game;
    }

    drawPlayerLife(context){        
        context.fillStyle = "red";
        context.fillRect(20, 20, 200, 40);
        context.fillStyle = "green";
        context.fillRect(20, 20, 1 / (this.game.player.config.maxHealth / this.game.player.config.currentHealth) * 200, 40);

        let life = new DrawText();
        Object.assign(life, {
            text: `${this.game.player.config.currentHealth}/${this.game.player.config.maxHealth}`,
            x : 120,
            y : 50,
            textAlign: "center",
            fontStyle: "bold",
            color : "white",
            fontSize : 30,
        });
        life.drawText(context);
    };

    drawPontuacao(ctx) {
        let pontuacao = new DrawText();
        Object.assign(pontuacao, {
            text: `Pontuação: ${this.game.player.pontuacao}`,
            textAlign: "center",            
            y: 50,
            color: "white",
            fontSize: 50,
        });
        pontuacao.alignCenterX(ctx);
        pontuacao.drawStrokedText(ctx);        
    };

    drawTemporizador(ctx) {
        let temporizador = new DrawText();
        Object.assign(temporizador, {
            text: `${this.game.timer}`,
            color: "white",
            textAlign: "right",
            y: 50,
            x: -10,
            fontStyle: "bold",
            fontSize: 50,
        })
        temporizador.alignRight(ctx);
        temporizador.drawStrokedText(ctx);
    };

    draw(ctx) {
        this.drawPontuacao(ctx);
        this.drawTemporizador(ctx);
        this.drawPlayerLife(ctx);
    }
}
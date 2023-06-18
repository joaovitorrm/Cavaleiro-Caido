// classe que recebe os inputs do jogador
export class InputHandler{
    constructor(game){            
        this.game = game
        this.key = [] // array que contém as teclas pressionadas
        
        // adiciona as teclas ao array
        window.addEventListener('keydown', e => {
            if (!this.key.includes(e.key.toLowerCase())){
                this.key.push(e.key.toLowerCase())
            }
            
        })
        // retira as teclas ao array
        window.addEventListener('keyup', e =>{
            if (this.key.includes(e.key.toLowerCase())){
                this.key.splice(this.key.indexOf(e.key.toLowerCase()), 1)
            }
        })
    }
}
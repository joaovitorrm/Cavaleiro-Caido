// roda após as imagens serem carregadas
addEventListener('load', function(){

    // elemento botão
    const play = document.getElementById('playButton');
    // elemento descricao
    const descricao = document.getElementById('descricao');
    // elemento canvas
    const canvas = document.getElementById('game');

    // transforma o canvas em um objeto para manipulador imagens em JS
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    // classe que recebe os inputs do jogador
    class InputHandler{
        constructor(game){            
            this.game = game
            this.key = []
            window.addEventListener('keydown', e => {
                if (!this.key.includes(e.key)){
                    this.key.push(e.key)
                }
                
            })
            window.addEventListener('keyup', e =>{
                if (this.key.includes(e.key)){
                    let released = this.key.indexOf(e.key)
                    this.key.splice(released, 1)
                }
            })
        }
    }

    // classe que contem as propriedades do jogador
    class Player{
        // definições iniciais
        constructor(game){
            this.game = game
            this.sprite = new Image()
            this.sprite.src = "../sprites/cavaleiro.png"
            this.size = 100
            this.x = 20
            this.y = 20
        }
        // movimento
        move(key){
            switch (key){
                case 'w':
                    this.y -= 5
                    break
                case 'a':
                    this.x -= 5
                    break
                case 's':
                    this.y += 5
                    break
                case 'd':
                    this.x += 5
                    break
            }
        }
        // sei la
        update(){

        }
        // desenhar o player na tela
        draw(context){
            context.drawImage(this.sprite, this.x, this.y, this.size, this.size)
        }
    }

    // classe principal que interliga as outras classes
    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this)
            this.input = new InputHandler(this)
        }
        update(){
            this.player.move(this.input.key[this.input.key.length - 1])
            this.player.update();
        }
        draw(context){
            this.player.draw(context)
        }
    }

    
    // ação do botão html
    play.onclick = () => {
        // remove o botão 
        play.style.display = 'none'
        descricao.style.display = 'none'
        // faz o canvas ser visível
        canvas.style.display = 'block'
        // loop principal
        const game = new Game(canvas.width, canvas.height)
        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            game.update();
            game.draw(ctx);
            requestAnimationFrame(animate)
        }
        animate();
    }
})




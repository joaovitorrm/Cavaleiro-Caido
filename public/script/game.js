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

    class InputHandler{
        constructor(game){
            this.game = game
            window.addEventListener('keydown', e => {
                this.game.key = e.key
            })
            window.addEventListener('keyup', e =>{
                if (this.game.key == e.key){
                    this.game.key = ''
                }
            })
        }
    }

    class Player{
        constructor(game){
            this.game = game
            this.sprite = new Image()
            this.sprite.src = "../sprites/cavaleiro.png"
            this.size = 100
            this.x = 20
            this.y = 20
        }
        update(key){
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
        draw(context){
            context.drawImage(this.sprite, this.x, this.y, this.size, this.size)
        }
    }

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this)
            this.input = new InputHandler(this)
            this.key = ''
        }
        update(){
            this.player.update(this.key);
        }
        draw(context){
            this.player.draw(context)
        }
    }

    
    //ação do botão html
    play.onclick = () => {
        //remove o botão 
        play.style.display = 'none'
        descricao.style.display = 'none'
        //faz o canvas ser visível
        canvas.style.display = 'block'
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




const canvas = document.getElementById('game')

game.width = 1280
game.height = 720

const ctx = game.getContext('2d')

class Player {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 5
        this.move = this.speed
        this.direction = 'x'
    }

    draw() {
        ctx.fillStyle = 'white'
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    check_collision(){
        if (this.x < 0 || this.x + this.w > game.width){
            return 'x';
        } 
        else if  (this.y < 0 || this.y + this.h > game.height){
            return 'y';
        }
    }

    update(){
        switch (this.direction){
            case 'x':
                this.x += this.move;
                break
            case 'y':
                this.y += this.move;
                break
        }
        
        let colided = this.check_collision()        

        switch (colided){
            case 'x':
                this.x -= this.move;
                break
            case 'y':
                this.y -= this.move;
                break   
        }
    }
}

let player = new Player(20, 20, 40, 40)

function animate(){
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update()
    player.draw()
}    
animate()

document.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'w':
            player.direction = 'y'
            player.move = -player.speed
            break
        case 'a':
            player.direction = 'x'
            player.move = -player.speed
            break
        case 's':
            player.direction = 'y'
            player.move = +player.speed
            break
        case 'd':
            player.direction = 'x'
            player.move = +player.speed
            break
    }
})


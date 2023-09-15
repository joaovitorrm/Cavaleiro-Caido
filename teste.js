


var achievementsAConcluir = [{
    id: 0,
    condicao: ()=>{if(enemiesKilled == 1){return(true)}},
    img: "./a",
    status: 0

},
{
    id: 1,
    condicao: ()=>{if(enemiesKilled == 5){return(true)}},
    img: "./a",
    status: 0

},
{
    id: 2,
    condicao: ()=>{if(enemiesKilled == 10){return(true)}},
    img: "./a",
    status: 0

}]

var events = {
    events: {},
    subscribe: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    unsubscribe: function (eventName, fn) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            };
        }
    },
    publish: function (eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    }
}

function test(){

/*
    events.subscribe("achievement", function(data){
    //usar fetch para fazer a interface achievementHandler - server - sql
    //para executar o alter table

    });
    */

    events.subscribe("achievement", function(data){

        //console.log(`notificação, ${data['id']} concluído`);
        //drawImage(img do achievement no 0,0 do canvas)
        
        if(data['condicao']()){

            achievementsAConcluir = achievementsAConcluir.filter(monke => monke.id != data.id)
            console.log(`achievement ${data.id} completo!, achievements a concluir: ${achievementsAConcluir.length}`)
        }
    });



}

test();
function intervalo(){
    
    enemiesKilled +=1
    console.log(`inimigo morto! (${enemiesKilled})`)
    //console.log(achievementsAConcluir.length)
    achievementsAConcluir.forEach((a) =>{ events.publish("achievement", a);})
    if(enemiesKilled === 11){
        clearInterval(this)
    }
    
}
var enemiesKilled = 0
var pedras = setInterval(intervalo, "500");


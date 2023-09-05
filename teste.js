
const achievementsAConcluir = [{
    id: 1,
    condicao: `function killOne(){if(enemiesKilled >=1{})}`,
    img: "./a",
    status: 0

},
{
    id: 1,
    condicao: `function killTen(){if(enemiesKilled >=10{})}`,
    img: "./a",
    status: 0

}
]
let enemiesKilled = 10

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


    events.subscribe("achievement", function(data){
    //usar fetch para fazer a interface achievementHandler - server - sql
    //para executar o alter table


    });

    events.subscribe("achievement", function(data){
        console.log(`notificação, ${data} concluído`);
        //drawImage(img do achievement no 0,0 do canvas)
    });


    achievementsAConcluir.forEach((a) =>{events.publish("achievement", a);})

    
}

test();
import portugues from '../../idiomas/portugues.json' assert {type: "json"}
import english from '../../idiomas/english.json' assert {type: "json"}
import francais from '../../idiomas/francais.json' assert {type: "json"}
import deutsch from '../../idiomas/deutsch.json' assert {type: "json"}
import hebrew from '../../idiomas/hebrew.json' assert {type: "json"}
import simp_chinese from '../../idiomas/simp_chinese.json' assert {type: "json"}
import greek from '../../idiomas/greek.json' assert {type: "json"}
import irish from '../../idiomas/irish.json' assert {type:"json"}
import espanol from '../../idiomas/espanol.json' assert {type:"json"}

let spans = document.querySelectorAll("span");
let idioma = document.getElementById("idiomas");

if (localStorage.getItem('idioma')){
    idioma.value = localStorage.getItem('idioma')
    translate(eval(localStorage.getItem('idioma')))
}

function translate(language){
    for (const divId in language){
        let divs = document.getElementById(divId);
        for (let span of spans) {
            let c = 0
            for (let div of divs.children) {
                if (div.querySelector("#" + span.id)) {
                    span.innerText = language[divId][c]
                }
                c++
            }
        }
    }
}

idioma.addEventListener("change", () => {
    localStorage.setItem("idioma", idioma.value)
    translate(eval(idioma.value))}    
)
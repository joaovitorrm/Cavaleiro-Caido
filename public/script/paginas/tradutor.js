import portugues from '../../idiomas/portugues.json' assert {type: "json"}
import english from '../../idiomas/english.json' assert {type: "json"}
import francais from '../../idiomas/francais.json' assert {type: "json"}
import deutsch from '../../idiomas/deutsch.json' assert {type: "json"}
import hebrew from '../../idiomas/hebrew.json' assert {type: "json"}
import simp_chinese from '../../idiomas/simp_chinese.json' assert {type: "json"}
import greek from '../../idiomas/greek.json' assert {type: "json"}
import irish from '../../idiomas/irish.json' assert {type:"json"}
import espanol from '../../idiomas/espanol.json' assert {type:"json"}
import idiomas from '../../idiomas/idiomas.json' assert {type:"json"}

let traduzir = document.querySelectorAll(".traduzir");
let idioma = document.getElementById("idiomas");

//TRADUTOR 
function translate(idioma) {
    for (const div of traduzir) {        
        div.innerText = idiomas[div.classList[1]][idioma];
    };
};

//BOTAO SETAR O COOKIE
idioma.addEventListener("change", () => {
    localStorage.setItem("idioma", idioma.value);
    translate(idioma.value)
});

// COOKIE
if (localStorage.getItem('idioma')){
    idioma.value = localStorage.getItem('idioma');
    translate(localStorage.getItem('idioma'));
};
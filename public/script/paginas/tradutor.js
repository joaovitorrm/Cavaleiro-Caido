import english from '../../idiomas/english.json' assert {type: "json"}

let spans = document.querySelectorAll("span");

for (const divId in english) {
    let divs = document.getElementById(divId);
    for (let span of spans) {
        let c = 0
        for (let div of divs.children) {
            if (div.querySelector("#" + span.id)) {
                span.innerText = english[divId][c]
            }
            c++
        }
    }
}





function Translate() {

    // Inicialização da função responsável por conter os atributos das tags HTML e a linguagem da página
    this.init = function (attribute, lng) {
        this.attribute = attribute;
        this.lng = lng;
    }

    // Função que irá traduzir as páginas
    this.process = function () {
        _self = this;
        let xrhFile = new XMLHttpRequest();

        // Requisita o arquivo JSON que substituirá o conteúdo das tags das páginas HTML para traduzí-las
        xrhFile.open("GET", "lng/" + this.lng + ".json", false);

        // Função que efetuará a substituição do conteúdo das tags apenas quando a requisição do arquivo anterior tiver sido concluída
        xrhFile.onreadystatechange = function () {
            if (xrhFile.readyState === 4) {
                if (xrhFile.status === 200 || xrhFile.status == 0) {
                    let LngObject = JSON.parse(xrhFile.responseText);
                    let allDom = document.getElementsByTagName("*");

                    for (let i = 0; i < allDom.length; i++) {
                        let elem = allDom[i];
                        let key = elem.getAttribute(_self.attribute);
                        if (key != null) {
                            elem.innerHTML = LngObject[key];
                        }
                    }

                }
            }
        }
        xrhFile.send();
    }
}
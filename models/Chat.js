module.exports = class Chat {
    constructor() {
        this.mensagem = '';
        this.tempo = '';
        this.global = 0;
        this.remetId = 1;
        this.destId = 2;        
    };

    enviarMensagem(conexao) {
        conexao.query('INSERT INTO chat (mensagem, tempo, global, remetente, destinatario) VALUES (?, ?, ?, ?, ?)', [
            this.mensagem, this.tempo, this.global, this.remetId, this.destId
        ], (err, result) => {
            if (err) throw err;            
        })
    };

    listarMensagens(conexao, callback) {
        conexao.query('SELECT * FROM chat WHERE remetente = ? AND destinatario = ? AND global = ?', [this.remetId, this.destId, this.global], (err, result) => {
            if (err) throw err;
            return callback(result)
        })
    };
}
module.exports = class Chat {
    constructor() {
        this.mensagem = '';
        this.tempo = '';
        this.global = Boolean;
        this.remetId = '';
        this.destId = '';        
    }

    enviarMensagem(conexao) {
        conexao.query('INSERT INTO chat (mensagem, tempo, global, remetente, destinatario) VALUES (?, ?, ?, ?, ?)', [
            this.mensagem, this.tempo, this.global, this.remetId, this.destId
        ], (err, result) => {
            if (err) throw err;            
        })
    }

    listarMensagens(conexao, id, callback) {
        conexao.query('SELECT * FROM chat WHERE remetente = ?', [id], (err, result) => {
            if (err) throw err;
            return callback(result)
        })
    }
}
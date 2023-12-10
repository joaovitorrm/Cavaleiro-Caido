-- Insert a placeholder into the `user` table
INSERT INTO `cavaleiro`.`user` (`nome`, `email`, `senha`, `cargo`, `imagemURL`)
VALUES 
('root', 'root@email.com', 'root', 'root', 'placeholderURL')
-- Insert a placeholder into the `achievement` table
INSERT INTO `cavaleiro`.`achievement` (`condicao`, `img`, `descricao`)
VALUES 
('()=>{if(this.stats.enemiesKilled == 1){return(true)}}', './a', ''),
('()=>{if(this.stats.enemiesKilled == 5){return(true)}}', './a', ''),
('()=>{if(this.stats.enemiesKilled == 10){return(true)}}', './a', '');

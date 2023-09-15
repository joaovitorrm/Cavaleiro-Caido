-- Insert a placeholder into the `user` table
INSERT INTO `cavaleiro`.`user` (`nome`, `email`, `senha`, `cargo`, `imagemURL`)
VALUES 
('PlaceholderName', 'placeholder@email.com', 'placeholderpassword', 'user', 'placeholderURL'),
('PlaceholderName1', 'placeholder1@email.com', 'placeholder1password', 'user', 'placeholderURL');

-- Insert a placeholder into the `achievement` table
INSERT INTO `cavaleiro`.`achievement` (`condicao`, `img`, `descricao`)
VALUES 
('()=>{if(this.stats.enemiesKilled == 1){return(true)}}', './a', ''),
('()=>{if(this.stats.enemiesKilled == 5){return(true)}}', './a', ''),
('()=>{if(this.stats.enemiesKilled == 10){return(true)}}', './a', '');

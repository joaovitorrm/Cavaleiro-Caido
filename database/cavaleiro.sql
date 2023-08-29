create database cavaleiro;
use cavaleiro;

create table usuario (
    id int not null AUTO_INCREMENT,
    nome varchar(100) not null,
    email varchar(80) not null,
    senha varchar(30) not null,
    data_nascimento date not null,
    primary key(id)
);
# Controle de Almoxarifado

## Descrição

O Controle de Almoxarifado é um sistema web desenvolvido para gerenciar materiais armazenados em estoque. A aplicação permite cadastrar novos materiais, consultar itens cadastrados, realizar baixas de estoque e excluir registros, mantendo os dados sincronizados com uma API REST simulada através da MockAPI.

O projeto foi desenvolvido com foco na prática de conceitos de desenvolvimento web, manipulação do DOM, consumo de APIs REST e operações CRUD.

## Funcionalidades

* Cadastro de materiais.
* Registro da quantidade disponível em estoque.
* Listagem automática dos materiais cadastrados.
* Baixa de estoque com atualização em tempo real.
* Exclusão de materiais.
* Validação para impedir quantidades negativas.
* Validação para impedir retiradas maiores que o estoque disponível.
* Integração com MockAPI.
* Interface responsiva utilizando Bootstrap.

## Tecnologias Utilizadas

* HTML5
* CSS3
* Bootstrap 5
* JavaScript (ES6+)
* MockAPI

## Estrutura do Projeto

controle-almoxarifado/

├── index.html

├── style.css

├── script.js

└── README.md

## Arquivos

* index.html: Estrutura da interface do sistema.
* style.css: Estilização da aplicação.
* script.js: Manipulação da interface e integração com a API.
* README.md: Documentação do projeto.

## Operações Implementadas

### GET

Obtém todos os materiais cadastrados e exibe na tabela.

### POST

Cadastra um novo material.

Exemplo:

{
"nome": "Máscara",
"quantidade": 100
}

### PUT

Realiza a baixa de estoque atualizando a quantidade disponível.

### DELETE

Remove permanentemente um material do sistema.

## Validação de Retirada

O sistema possui a função:

validarRetirada(estoqueAtual, quantidadeRetirada)

Regras:

* A quantidade retirada deve ser maior que zero.
* A quantidade retirada não pode ser superior ao estoque disponível.

## API Utilizada

Endpoint:

https://6a29fdc6f59cb8f65f1debed.mockapi.io/materiais

## Como Executar o Projeto

### Pré-requisitos

* Navegador web atualizado.
* Conexão com a internet.

### Passos

1. Clonar o repositório.

git clone <url-do-repositorio>

2. Acessar a pasta do projeto.

cd controle-almoxarifado

3. Abrir o arquivo index.html no navegador.

4. Utilizar o formulário para cadastrar materiais e gerenciar o estoque.

## Objetivos de Aprendizagem

* Desenvolvimento Front-End.
* Manipulação do DOM.
* Programação assíncrona com JavaScript.
* Consumo de APIs REST.
* Operações CRUD.
* Validação de dados.
* Versionamento de código com Git e GitHub.

## Autores

Projeto desenvolvido para fins acadêmicos na disciplina de Desenvolvimento Web.

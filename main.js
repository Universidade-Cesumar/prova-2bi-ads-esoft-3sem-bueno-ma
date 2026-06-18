const URL_API = "https://6a29fdc6f59cb8f65f1debed.mockapi.io/materiais";

function validarRetirada(estoqueAtual, quantidadeRetirada) {

    if (quantidadeRetirada <= 0) {
        return false;
    }

    if (quantidadeRetirada > estoqueAtual) {
        return false;
    }

    return true;
}

function atualizarTabela(materiais) {

    const tabela = document.getElementById("lista-materiais");

    if (!tabela) {
        console.error("Tabela não encontrada!");
        return;
    }

    tabela.innerHTML = "";

    if (!Array.isArray(materiais) || materiais.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">
                    Nenhum material cadastrado
                </td>
            </tr>
        `;

        return;
    }

    materiais.forEach(material => {

        const nome = material.nome || "Sem nome";
        const quantidade = Number(material.quantidade) || 0;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${nome}</td>

            <td>${quantidade}</td>

            <td>

                <input
                    type="number"
                    id="input-retirada"
                    min="1"
                    placeholder="Qtd"
                    style="width:20px">

                <button
                    class="btn btn-warning btn-baixar"
                    data-id="${material.id}"
                    data-estoque="${quantidade}">
                    Baixar
                </button>

                <button
                    class="btn btn-danger btn-excluir"
                    data-id="${material.id}">
                    Excluir
                </button>

            </td>
        `;

        tabela.appendChild(linha);
    });
    
    configurarEventos();
}

async function carregarMateriais() {

    try {

        const resposta = await fetch(URL_API);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const materiais = await resposta.json();

        atualizarTabela(materiais);

    } catch (erro) {

        console.error("Erro ao carregar materiais:", erro);

        const tabela = document.getElementById("lista-materiais");

        if (tabela) {

            tabela.innerHTML = `
                <tr>
                    <td colspan="3" class="text-danger text-center">
                        Erro ao carregar dados
                    </td>
                </tr>
            `;
        }
    }
}

async function adicionarMaterial(nome, quantidade) {

    try {

        const resposta = await fetch(URL_API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome,
                quantidade: Number(quantidade)
            })
        });

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        await carregarMateriais();

    } catch (erro) {

        console.error("Erro ao adicionar material:", erro);

        alert("Erro ao adicionar material.");
    }
}

async function excluirMaterial(id) {

    try {

        await fetch(`${URL_API}/${id}`, {
            method: "DELETE"
        });

        await carregarMateriais();

    } catch (erro) {

        console.error("Erro ao excluir:", erro);
    }
}async function baixarMaterial(id, estoqueAtual, quantidadeRetirada) {

    try {

        const novoEstoque =
            estoqueAtual - quantidadeRetirada;

        await fetch(`${URL_API}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                quantidade: novoEstoque
            })
        });

        await carregarMateriais();

    } catch (erro) {

        console.error("Erro ao baixar estoque:", erro);
    }
}

function configurarEventos() {

    document.querySelectorAll(".btn-excluir")
        .forEach(botao => {

            botao.onclick = () => {

                const id = botao.dataset.id;

                if (
                    confirm(
                        "Deseja excluir este material?"
                    )
                ) {
                    excluirMaterial(id);
                }
            };
        });

    document.querySelectorAll(".btn-baixar")
        .forEach(botao => {

            botao.onclick = () => {

                const id =
                    botao.dataset.id;

                const estoqueAtual =
                    Number(
                        botao.dataset.estoque
                    );

                const quantidadeRetirada =
                    Number(
                        botao.parentElement
                            .querySelector(
                                "#input-retirada"
                            ).value
                    );

                if (
                    !validarRetirada(
                        estoqueAtual,
                        quantidadeRetirada
                    )
                ) {

                    alert(
                        "Quantidade inválida para retirada."
                    );

                    return;
                }

                baixarMaterial(
                    id,
                    estoqueAtual,
                    quantidadeRetirada
                );
            };
        });
}
document.addEventListener(
    "DOMContentLoaded",
    () => {

        const btnCadastrar =
            document.getElementById(
                "btn-cadastrar"
            );

        btnCadastrar.addEventListener(
            "click",
            async () => {

                const nome =
                    document
                        .getElementById(
                            "input-nome"
                        )
                        .value
                        .trim();

                const quantidade =
                    document
                        .getElementById(
                            "input-quantidade"
                        )
                        .value;

                if (!nome) {

                    alert(
                        "Digite o nome do material!"
                    );

                    return;
                }

                if (
                    !quantidade ||
                    quantidade <= 0
                ) {

                    alert(
                        "Digite uma quantidade válida!"
                    );

                    return;
                }

                await adicionarMaterial(
                    nome,
                    quantidade
                );

                document.getElementById(
                    "input-nome"
                ).value = "";

                document.getElementById(
                    "input-quantidade"
                ).value = "";
            }
        );

        carregarMateriais();
    }
);
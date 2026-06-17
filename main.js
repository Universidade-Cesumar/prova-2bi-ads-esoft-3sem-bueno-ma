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
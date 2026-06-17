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
}
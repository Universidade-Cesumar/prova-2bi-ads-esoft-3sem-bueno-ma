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

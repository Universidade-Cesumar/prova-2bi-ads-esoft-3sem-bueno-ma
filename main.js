const URL_API = "https://6a29fdc6f59cb8f65f1debed.mockapi.io/materiais";

function atualizarTabela(materiais) {
    const tabela = document.getElementById("lista-materiais");
    
    if (!tabela) {
        console.error("Tabela não encontrada!");
        return;
    }

    tabela.innerHTML = "";

    // Verifica se materiais é um array
    if (!Array.isArray(materiais)) {
        console.warn("Resposta não é um array:", materiais);
        tabela.innerHTML = '<tr><td colspan="2" class="text-center">Nenhum material cadastrado</td></tr>';
        return;
    }

    if (materiais.length === 0) {
        tabela.innerHTML = '<tr><td colspan="2" class="text-center">Nenhum material cadastrado</td></tr>';
        return;
    }

    materiais.forEach(material => {
        const linha = document.createElement("tr");
        
        // Tenta pegar os dados mesmo se os campos tiverem nomes diferentes
        const nome = material.nome || material.name || "Sem nome";
        const quantidade = material.quantidade || material.quantity || 0;
        
        linha.innerHTML = `
            <td>${nome}</td>
            <td>${quantidade}</td>
        `;
        
        tabela.appendChild(linha);
    });
}

async function carregarMateriais() {
    try {
        console.log("Carregando materiais da API...");
        const resposta = await fetch(URL_API);
        
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        
        const materiais = await resposta.json();
        console.log("Dados recebidos:", materiais);
        
        atualizarTabela(materiais);
        
    } catch (erro) {
        console.error("Erro ao carregar materiais:", erro);
        const tabela = document.getElementById("lista-materiais");
        if (tabela) {
            tabela.innerHTML = '<tr><td colspan="2" class="text-center text-danger">Erro ao carregar dados. Verifique o console.</td></tr>';
        }
    }
}

async function adicionarMaterial(nome, quantidade) {
    try {
        console.log("Enviando material:", { nome, quantidade });
        
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
        
        const resultado = await resposta.json();
        console.log("Material adicionado com sucesso:", resultado);
        
        // Recarregar a lista
        await carregarMateriais();
        
    } catch (erro) {
        console.error("Erro ao adicionar material:", erro);
        alert(`Erro ao adicionar: ${erro.message}`);
    }
}

// Aguardar o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    const btnCadastrar = document.getElementById("btn-cadastrar");
    
    if (!btnCadastrar) {
        console.error("Botão 'btn-cadastrar' não encontrado!");
        return;
    }
    
    btnCadastrar.addEventListener("click", async () => {
        const inputNome = document.getElementById("input-nome");
        const inputQuantidade = document.getElementById("input-quantidade");
        
        if (!inputNome || !inputQuantidade) {
            console.error("Campos do formulário não encontrados!");
            alert("Erro: Campos do formulário não encontrados!");
            return;
        }
        
        const nome = inputNome.value.trim();
        const quantidade = inputQuantidade.value;
        
        if (!nome) {
            alert("Digite o nome do material!");
            inputNome.focus();
            return;
        }
        
        if (!quantidade || quantidade <= 0) {
            alert("Digite uma quantidade válida!");
            inputQuantidade.focus();
            return;
        }
        
        // Desabilitar botão durante o cadastro
        btnCadastrar.disabled = true;
        btnCadastrar.textContent = "Cadastrando...";
        
        await adicionarMaterial(nome, quantidade);
        
        // Limpar formulário
        inputNome.value = "";
        inputQuantidade.value = "";
        inputNome.focus();
        
        // Reabilitar botão
        btnCadastrar.disabled = false;
        btnCadastrar.textContent = "Cadastrar Material";
    });
    
    // Carregar materiais ao iniciar
    carregarMateriais();
});

// Função para testar a API manualmente (útil para debug)
window.testarAPI = async function() {
    console.log("=== TESTANDO API ===");
    try {
        const resposta = await fetch(URL_API);
        console.log("Status:", resposta.status);
        const dados = await resposta.json();
        console.log("Dados:", dados);
        console.log("É array?", Array.isArray(dados));
        if (Array.isArray(dados) && dados.length > 0) {
            console.log("Primeiro item:", dados[0]);
            console.log("Campos disponíveis:", Object.keys(dados[0]));
        }
    } catch (erro) {
        console.error("Erro no teste:", erro);
    }
};

console.log("Script carregado! Use testarAPI() no console para debug.");
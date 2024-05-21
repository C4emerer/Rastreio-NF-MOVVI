// Função para buscar os parâmetros da URL
function getSearchParams() {
    var searchParams = new URLSearchParams(window.location.search);
    const cnpj = searchParams.get("CNPJ");
    const numero = searchParams.get("NF");
    return { cnpj, numero };
}

// Função para fazer a solicitação à API
async function fetchAPI(cnpj, numero) {
    try {
        const response = await fetch(
            `https://apimovvi.meridionalcargas.com.br/api/rastrear-carga/${cnpj}/${numero}`,
        );
        const data = await response.json();
        if (response.ok) {
            const resultContainer = document.getElementById("result");

            // Limpa o conteúdo anterior, se houver
            resultContainer.innerHTML = "";

            // Verifica se há movimentações
            if (data.ocorrencias && data.ocorrencias.length > 0) {
                // Cria um elemento para cada movimentação e adiciona ao resultContainer
                data.ocorrencias.forEach((movimentacao) => {
                    const movimentacaoDiv = document.createElement("div");
                    movimentacaoDiv.classList.add("movimentacao");

                    const movimentacaoInfoContainer =
                        document.createElement("div");
                    movimentacaoInfoContainer.classList.add(
                        "movimentacao-info",
                    );

                    const dataSpan = document.createElement("span");
                    dataSpan.classList.add("data");
                    dataSpan.textContent = "Data: ";

                    const dataValorSpan = document.createElement("span");
                    dataValorSpan.classList.add("valor");
                    dataValorSpan.textContent = movimentacao.data;

                    const unidadeSpan = document.createElement("span");
                    unidadeSpan.classList.add("unidade");
                    unidadeSpan.textContent = "Unidade: ";

                    const unidadeValorSpan = document.createElement("span");
                    unidadeValorSpan.classList.add("valor");
                    unidadeValorSpan.textContent = movimentacao.unidade;

                    const descricaoSpan = document.createElement("span");
                    descricaoSpan.classList.add("descricao");
                    descricaoSpan.textContent = "Descrição: ";

                    const descricaoValorSpan = document.createElement("span");
                    descricaoValorSpan.classList.add("valor");
                    descricaoValorSpan.textContent = movimentacao.descricao;

                    // Adiciona os spans ao contêiner de informação da movimentação
                    movimentacaoInfoContainer.appendChild(dataSpan);
                    movimentacaoInfoContainer.appendChild(dataValorSpan);
                    movimentacaoInfoContainer.appendChild(
                        document.createElement("br"),
                    );
                    movimentacaoInfoContainer.appendChild(unidadeSpan);
                    movimentacaoInfoContainer.appendChild(unidadeValorSpan);
                    movimentacaoInfoContainer.appendChild(
                        document.createElement("br"),
                    );
                    movimentacaoInfoContainer.appendChild(descricaoSpan);
                    movimentacaoInfoContainer.appendChild(descricaoValorSpan);

                    // Adiciona o contêiner de informação da movimentação ao div da movimentação
                    movimentacaoDiv.appendChild(movimentacaoInfoContainer);

                    resultContainer.appendChild(movimentacaoDiv);
                });
            } else {
                resultContainer.textContent =
                    "Não há movimentações para esta carga.";
            }
        } else {
            document.getElementById("result").textContent =
                "Erro ao obter as movimentações: " + data.message;
        }
    } catch (error) {
        document.getElementById("result").textContent =
            "Erro ao fazer a solicitação: " + error;
    }
}

// Quando a página é carregada, busca os parâmetros da URL e faz a solicitação à API
document.addEventListener("DOMContentLoaded", function () {
    const { cnpj, numero } = getSearchParams();
    if (cnpj && numero) {
        fetchAPI(cnpj, numero);
    }
});

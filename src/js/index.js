const chaveDaApi = "07d0c99777b8435aa8145349242109";
const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;

    if (!cidade) return;

    const dados = await buscarDadosDaCidade(cidade);

    if (dados) {
        preencherDadosNaTela(dados, cidade);
    } else {
        alert("Erro ao buscar os dados. Verifique a cidade inserida.");
    }
});

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

    try {
        const resposta = await fetch(apiUrl);

        if (resposta.status !== 200) {
            throw new Error('Erro na requisição');
        }

        const dados = await resposta.json();
        return dados;
    } catch (error) {
        console.error("Erro ao buscar dados da cidade:", error);
        return null;
    }
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current?.temp_c || "N/A"; // Verificando se existe a propriedade temp_c
    const condicao = dados.current?.condition?.text || "N/A"; // Corrigindo o nome da propriedade para 'condition'
    const umidade = dados.current?.humidity || "N/A";
    const velocidadeDoVento = dados.current?.wind_kph || "N/A";
    const iconeCondicao = dados.current?.condition?.icon || "";

    document.getElementById("cidade").textContent = cidade;
    document.getElementById("temperatura").textContent = `${temperatura}ºC`;
    document.getElementById("condicao").textContent = condicao;
    document.getElementById("umidade").textContent = `${umidade}%`;
    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento} km/h`;
    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}
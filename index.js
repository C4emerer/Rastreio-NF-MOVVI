const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Define o diretório onde estão os arquivos estáticos (HTML, CSS, JavaScript)
app.use(express.static(__dirname));

// Rota de exemplo
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Outras rotas e lógica do servidor podem ser adicionadas aqui...

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

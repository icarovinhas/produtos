const express = require('express');
const app = express();

app.use(express.json());

let produtos = [];

app.get("/produtos/:id", (req, res) => {
    const { id } = req.params;
    res.json(produtos[id]);
});

app.get("/produtos", (req, res) => {
    res.json(produtos);
});

app.post("/produtos", (req,res) => {
    const { nome, preco, marca } = req.body;
    produtos.push({nome, preco, marca});

    res.json(produtos);
});

app.put("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const { nome, preco, marca } = req.body;

    produtos[id] = { nome, preco, marca };
    res.json(produtos);
});

app.delete("/produtos/:id", (req, res) => {
    const { id } = req.params;
    produtos.splice(id, 1);
    res.json({message: "Produto deletado com sucesso!"});
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
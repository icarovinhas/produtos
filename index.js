const express = require('express');
const app = express();

app.use(express.json());

let produtos = [];
let contadorId = 1;

app.get("/produtos", (req, res) => {
    res.json(produtos);
});

app.get("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const produto = produtos.find(p => p.id == id);

    if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json(produto);
});

app.post("/produtos", (req, res) => {
    const { nome, preco, marca } = req.body;

    const novoProduto = {
        id: contadorId++,
        nome,
        preco,
        marca
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

app.put("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const { nome, preco, marca } = req.body;

    const produto = produtos.find(p => p.id == id);

    if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
    }

    produto.nome = nome || produto.nome;
    produto.preco = preco || produto.preco;
    produto.marca = marca || produto.marca;

    res.json(produto);
});

app.delete("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const index = produtos.findIndex(p => p.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "Produto não encontrado" });
    }

    produtos.splice(index, 1);

    res.json({ message: "Produto deletado com sucesso!" });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});


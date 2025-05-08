const express = require('express');
const app = express();
const cors = require('cors');
const database = require('../back/db'); // Conexão com o banco de dados
const Pessoa = require('./model/cdpessoa'); // Modelo Sequelize
const { where } = require('sequelize');

app.use(cors());
app.use(express.json());

// Rota GET
app.get('/', (req, res) => {
    res.send('Cadastros');
});

// Rota POST que salva no banco com Sequelize
app.post('/cadastro', async (req, res) => {
    try {
        const novaPessoa = await Pessoa.create({
            nome: req.body.txtNome,
            idade: parseInt(req.body.txtIdade),
            uf: req.body.cmbUF
        });
        res.json({ message: "Cadastro salvo no banco!", dados: novaPessoa });
    } catch (error) {
        console.error("Erro ao salvar no banco:", error);
        res.status(500).json({ message: "Erro ao salvar no banco de dados." });
    }
});

// Rota PUT para atualizar uma pessoa
app.put('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    const { txtNome, txtIdade, cmbUF } = req.body;
    console.log(id);
    console.log(txtNome);
    
    try {
        const pessoa = await Pessoa.findByPk(id); // Encontrar pessoa pelo ID

        if (!pessoa) {
            return res.status(404).json({ message: "Pessoa não encontrada!" });
        }

        // Atualizar a pessoa
        pessoa.nome = txtNome;
        pessoa.idade = txtIdade;
        pessoa.uf = cmbUF;

        await pessoa.save(); // Salvar as alterações no banco de dados

        return res.json({ message: "Pessoa atualizada com sucesso!", pessoa });
    } catch (error) {
        console.error("Erro ao atualizar a pessoa:", error);
        return res.status(500).json({ message: "Erro ao atualizar a pessoa." });
    }
});

// Rota para listar todas as pessoas
app.get('/listar', async (req, resp) => {
    const pessoas = await Pessoa.findAll();
    resp.json(pessoas);
});

// Rota DELETE para remover uma pessoa
app.delete('/pessoa/:id', async (req, resp) => {
    const { id } = req.params;
    await Pessoa.destroy({ where: { id: id } });
    resp.json({ message: "Pessoa removida com sucesso!" });
});

// Iniciando o servidor
app.listen(3001, () => console.log("Servidor escutando na porta 3001..."));

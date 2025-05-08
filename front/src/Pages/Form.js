import { useEffect, useState } from 'react';
import Header from '../Header';
import axios from 'axios';

function Form() {
    const [pessoas, setPessoas] = useState([]);
    const [estados, setEstados] = useState([]);
    const [editandoId, setEditandoId] = useState(null); // Controle de edição
    const [campos, setCampos] = useState({
        txtNome: '',
        txtIdade: 0,
        cmbUF: '0'
    });

    // Função para atualizar os campos do formulário
    function handleInputChange(event) {
        const { name, value } = event.target;
        setCampos(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Carregar estados (UFs)
    useEffect(() => {
        axios.get('http://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                setEstados(response.data);
            });
    }, []);

    // Função de submissão do formulário
    function handleFormSubmit(event) {
        event.preventDefault();

        if (editandoId) {
            // Atualizar registro existente
            update(campos)
            setEditandoId(null); // Resetar o ID de edição
            setCampos({ txtNome: '', txtIdade: 0, cmbUF: '0' }); // Limpar campos
            alert('Cadastro atualizado com sucesso!');
            window.location.reload()
        } else {
            // Criar novo cadastro
            axios.post('http://localhost:3001/cadastro', campos)
                .then(response => {
                    carregarPessoa();
                    setCampos({ txtNome: '', txtIdade: 0, cmbUF: '0' }); // Limpar campos
                    alert('Cadastro realizado com sucesso!');
                   
                })
                .catch(error => alert('Erro ao salvar cadastro.'));
        }
    }

    // Função para carregar todas as pessoas cadastradas
    const carregarPessoa = async () => {
        await axios.get('http://localhost:3001/listar')
            .then(response => {
                setPessoas(response.data);
            });
    };

    // Função para remover uma pessoa
    const removerPessoa = async (e, id) => {
        e.preventDefault();
        await axios.delete(`http://localhost:3001/pessoa/${id}`)
            .then(response => {
                carregarPessoa();
                alert('Cadastro excluído com sucesso!');
            })
            .catch(error => alert('Erro ao excluir cadastro.'));
    };

    // Função para editar uma pessoa (preencher os campos do formulário)
    const alterarPessoa = async (e, pessoa) => {
        e.preventDefault();     

        // Preenche os campos com os dados da pessoa
        setCampos({
            txtNome: pessoa.nome,
            txtIdade: pessoa.idade,
            cmbUF: pessoa.uf,
            id: pessoa.id
        });

        setEditandoId(pessoa.id); // Marca o ID para edição
    
    };

    const update = async (pessoa) => {
        axios.put(`http://localhost:3001/pessoa/${pessoa.id}`, campos)
        .then(response => {
            
        })
        .catch(error => alert('Erro ao atualizar cadastro.'));
    }

    // Carregar pessoas ao iniciar
    useEffect(() => {
        carregarPessoa();
    }, []);

    return (
        <div>
            <Header title="React Form" />
            <form onSubmit={handleFormSubmit}>
                <fieldset>
                    <legend>
                        <h2>Dados de Cadastro</h2>
                    </legend>

                    <div>
                        <label>Nome:
                            <input type="text" name="txtNome" value={campos.txtNome} onChange={handleInputChange} />
                        </label>
                    </div>

                    <div>
                        <label>Idade:
                            <input type="number" name="txtIdade" value={campos.txtIdade} onChange={handleInputChange} />
                        </label>
                    </div>

                    <div>
                        <label>UF:
                            <select name="cmbUF" value={campos.cmbUF} onChange={handleInputChange}>
                                <option value="0">Selecione uma opção</option>
                                {estados.map(estado => (
                                    <option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <input type="submit" value={editandoId ? "Atualizar" : "Salvar"} />
                </fieldset>
            </form>

            <table>
                <thead>
                    <tr>
                        <td>id</td>
                        <td>nome</td>
                        <td>idade</td>
                        <td>uf</td>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.idade}</td>
                                <td>{item.uf}</td>
                                <td><button onClick={(e) => removerPessoa(e, item.id)}>Deletar</button></td>
                                <td><button onClick={(e) => alterarPessoa(e, item)}>Editar</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Form;

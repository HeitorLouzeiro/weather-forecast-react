import React, { useState } from 'react';

// Componente que exibe o resultado da busca
function Resultado({ dados }) {
  const estiloResultado = {
    marginTop: '20px',
    textAlign: 'center',
  };

  if (!dados) return null;

  // Verifica se a resposta da API contém dados válidos
  if (dados.erro) {
    return (
      <div style={estiloResultado}>
        <h2>Resultado:</h2>
        <p>CEP não encontrado.</p>
      </div>
    );
  }

  return (
    <div style={estiloResultado}>
      <h2>Resultado:</h2>
      <p>Cidade: {dados.localidade}</p>
      <p>Estado: {dados.uf}</p>
    </div>
  );
}

// Componente principal do aplicativo
function App() {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);

  // Função que busca os dados da API ViaCEP
  const buscarPrevisao = async () => {
    if (!cep) return; // Verifica se o CEP foi inserido

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setDados(data);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setDados({ erro: true });
    }
  };

  const estiloContainer = {
    textAlign: 'center',
    marginTop: '50px',
  };
  const estiloInput = {
    padding: '10px',
    fontSize: '16px',
  };
  const estiloBotao = {
    padding: '10px 20px',
    fontSize: '16px',
    marginLeft: '10px',
  };

  return (
    <div style={estiloContainer}>
      <h1>Busca por CEP</h1>
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)} // Atualiza o valor do CEP
        style={estiloInput}
      />
      <button onClick={buscarPrevisao} style={estiloBotao}>
        Buscar
      </button>
      <Resultado dados={dados} />
    </div>
  );
}

export default App;

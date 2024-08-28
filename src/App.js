import React, { useState } from 'react';


// Componente que exibe o resultado da busca de CEP
function ResultadoCEP({ dados }) {
  const estiloResultado = {
    marginTop: '20px',
    textAlign: 'center',
  };

  if (!dados) return null;

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

// Componente que exibe o resultado da busca de clima
function ResultadoClima({ clima }) {
  const estiloResultado = {
    marginTop: '20px',
    textAlign: 'center',
  };

  console.log('Clima data:', clima); // log da resposta da api

  if (!clima || !clima.main) {
    return (
      <div style={estiloResultado}>
        <h2>Clima:</h2>
        <p>Não foi possível obter dados do clima.</p>
      </div>
    );
  }
  const icon = wInfo.weather[0].icon; // For instance "09d"
  return (
    <div style={estiloResultado}>
      <h2>Clima:</h2>
      <p>Temperatura: {Math.round(clima.main.temp)}°C</p>
      <p>Descrição: {clima.weather[0].description}</p>
      <p>Humidade: {clima.main.humidity}%</p>
      <p>Temperatura Minima: {clima.main.temp_min}</p>
      <p>Temperatura Maxima: {clima.main.temp_max}</p>  
      </div>
  );
}

// Componente principal do aplicativo
function App() {
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [dadosCEP, setDadosCEP] = useState(null);
  const [dadosClima, setDadosClima] = useState(null);

  const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;  // Replace with your API key

  // Função que busca os dados da API ViaCEP
  const buscarPrevisaoCEP = async () => {
    if (!cep) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setDadosCEP(data);

      // Atualiza a cidade para buscar o clima
      if (data.localidade) {
        setCidade(data.localidade);
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setDadosCEP({ erro: true });
    }
  };

  // Função que busca os dados de clima da API OpenWeatherMap
  const buscarClima = async () => {
    if (!cidade) return;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&lang=pt_br&units=metric`); // Use API_KEY
      const data = await response.json();
      setDadosClima(data);
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
      setDadosClima(null);
    }
  };

  // Executa a busca de clima sempre que a cidade mudar
  React.useEffect(() => {
    buscarClima(); 
  }); 

  const estilo_pag ={
    with: '100vw',
    height: '100vh',
    display: 'flex', 
    justifyContent: 'center',
    backgroundColor: '#93f0ff'
  };

  const estiloContainer = {
    textAlign: 'center',
    marginTop: '50px',
    border: '1px solid gray',
    borderRadius: '5px',
    width: '60vw',
    height: '80vh',
    backgroundColor: 'white'
    
  };
  const estiloInput = {
    padding: '8px',
    fontSize: '16px',
  };
  const estiloBotao = {
    padding: '10px 20px',
    fontSize: '16px',
    marginLeft: '10px',
    borderRadius: '3px',
    backgroundColor: '#55bfda',
    color: 'white',
    border: 'none'
  };

  return (
    <div style={estilo_pag}>
      <div style={estiloContainer}>
        <h1>Busca por CEP e Clima</h1>
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)} 
          style={estiloInput}
        />
        <button onClick={buscarPrevisaoCEP} style={estiloBotao}>
          Buscar
        </button>
        <ResultadoCEP dados={dadosCEP} />
        <ResultadoClima clima={dadosClima} />
    
        </div>
    </div>
  );
}

export default App;
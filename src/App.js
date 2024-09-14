import React, { useState } from 'react';
import './App.css';
import successAudio from './assets/sucess.mp3';

function App() {
  const [salario, setSalario] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [ganho, setGanho] = useState(null);

  const calcularGanho = () => {
    if (salario && horaEntrada && horaSaida) {
      const [horaE, minE] = horaEntrada.split(':').map(Number);
      const [horaS, minS] = horaSaida.split(':').map(Number);

      const entradaEmMinutos = horaE * 60 + minE;
      const saidaEmMinutos = horaS * 60 + minS;

      let minutosNoBanheiro = saidaEmMinutos - entradaEmMinutos;

      if (minutosNoBanheiro < 0) {
        minutosNoBanheiro += 24 * 60; // Ajuste para casos em que a saída é após meia-noite
      }

      const ganhoPorMinuto = salario / (22 * 8 * 60); // Considerando 22 dias úteis e 8 horas por dia
      const ganhoCalculado = (ganhoPorMinuto * minutosNoBanheiro).toFixed(2);

      setGanho(ganhoCalculado);

      // Tocar o áudio de sucesso
      const audio = new Audio(successAudio);
      audio.play();
    }
  };

  return (
    <div className="App">
      <div className="card">
        <h1>💩 Contador de Ganhos no Banheiro 💩</h1>

        <label>Qual seu Salário?</label>
        <input
          type="number"
          placeholder="Salário Mensal (R$)"
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
        />

        <label>Que horas você entrou no banheiro?</label>
        <input
          type="time"
          value={horaEntrada}
          onChange={(e) => setHoraEntrada(e.target.value)}
        />

        <label>Que horas você saiu?</label>
        <input
          type="time"
          value={horaSaida}
          onChange={(e) => setHoraSaida(e.target.value)}
        />

        <button onClick={calcularGanho}>Calcular 💰</button>

        {ganho && (
          <div className="resultado">
            <h2>Parabéns! Você ganhou R$ {ganho} por ficar no banheiro!</h2>
            {ganho > 5 && <p>Uau! Isso que é produtividade no trono! 🚽💸</p>}
            {ganho <= 5 && <p>Nada mal para uma pausa estratégica! 😉</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

function ResultadoQuiz({ pontuacao, totalPerguntas, onRestart }) {
  const percentual = Math.round((pontuacao / totalPerguntas) * 100);

  let mensagemFinal = "Muito bom!";
  if (percentual >= 80) {
    mensagemFinal = "Excelente! Você conhece anime demais!";
  } else if (percentual >= 50) {
    mensagemFinal = "Bom trabalho! Você está no caminho certo.";
  } else if (percentual >= 30) {
    mensagemFinal = "Legal! Você acertou algumas e pode melhorar.";
  } else {
    mensagemFinal = "A prática leva à perfeição! Tente novamente.";
  }

  return (
    <section className="card welcome-card">
      <div className="big-emoji">🎉 🏆</div>
      <h2>Quiz concluído!</h2>
      <p>{mensagemFinal}</p>

      <div className="resultado-box">
        <strong>{pontuacao}</strong>
        <span>de {totalPerguntas} acertos</span>
      </div>

      <p className="percentual">Seu desempenho: {percentual}%</p>

      <button className="button" onClick={onRestart}>
        Jogar novamente
      </button>
    </section>
  );
}

export default ResultadoQuiz;

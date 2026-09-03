function PerguntaQuiz({ quiz, numeroPergunta, totalPerguntas, pontuacao, mensagem, respostaSelecionada, setRespostaSelecionada, onSubmit }) {
  return (
    <section className="card quiz-card">
      <div className="quiz-info">
        <span>Pergunta {numeroPergunta}/{totalPerguntas}</span>
        <span>Pontos: {pontuacao}</span>
      </div>

      {mensagem && <p className="api-message">{mensagem}</p>}

      <div className="emoji-question">{quiz.emoji || "🎬 ✨ 🍜"}</div>
      <h2>{quiz.question}</h2>

      <form onSubmit={onSubmit}>
        <div className="options">
          {quiz.options.map((option, index) => (
            <label className="option" key={`${option}-${index}`}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={respostaSelecionada === option}
                onChange={(event) => setRespostaSelecionada(event.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <button className="button" type="submit" disabled={!respostaSelecionada}>
          Confirmar resposta
        </button>
      </form>
    </section>
  );
}

export default PerguntaQuiz;

function TelaInicial({ dificuldade, setDificuldade, onStart }) {
  return (
    <section className="card welcome-card">
      <div className="big-emoji">🍥 ⚡ 👒</div>
      <h2>Comece o desafio</h2>
      <p>Escolha a dificuldade e tente descobrir as respostas.</p>

      <label className="field">
        Nível de dificuldade
        <select value={dificuldade} onChange={(event) => setDificuldade(event.target.value)}>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
      </label>

      <button className="button" onClick={onStart}>
        Jogar agora
      </button>
    </section>
  );
}

export default TelaInicial;

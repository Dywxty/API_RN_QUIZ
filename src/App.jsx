import { useState } from "react";
import "./App.css";
import Rodape from "./components/Rodape";
import Cabecalho from "./components/Cabecalho";
import Carregando from "./components/Carregando";
import PerguntaQuiz from "./components/PerguntaQuiz";
import ResultadoQuiz from "./components/ResultadoQuiz";
import TelaInicial from "./components/TelaInicial";
import { getQuiz } from "./services/api";
import questoesExemplo from "./services/questoesExemplo";

const TOTAL_PERGUNTAS = 10;

function Aplicacao() {
  const [dificuldade, setDificuldade] = useState("easy");
  const [quiz, setQuiz] = useState(null);
  const [pontuacao, setPontuacao] = useState(0);
  const [numeroPergunta, setNumeroPergunta] = useState(1);
  const [respostaSelecionada, setRespostaSelecionada] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  async function carregarPergunta(indicePergunta = numeroPergunta - 1) {
    setCarregando(true);
    setMensagem("");

    try {
      const dados = await getQuiz(dificuldade);
      setQuiz(dados);
    } catch (error) {
      const todasPerguntas = Object.values(questoesExemplo).flat();
      const aleatorio = todasPerguntas[Math.floor(Math.random() * todasPerguntas.length)];
      const exemplo = todasPerguntas[(indicePergunta + Math.floor(Math.random() * todasPerguntas.length)) % todasPerguntas.length];
      setQuiz(exemplo || aleatorio);
      setMensagem("A API não respondeu. Usando uma pergunta de exemplo.");
    } finally {
      setCarregando(false);
    }
  }

  function voltarAoInicio() {
    setPontuacao(0);
    setNumeroPergunta(1);
    setRespostaSelecionada("");
    setMensagem("");
    setQuiz(null);
    setJogoFinalizado(false);
  }

  async function iniciarJogo() {
    setPontuacao(0);
    setNumeroPergunta(1);
    setRespostaSelecionada("");
    setMensagem("");
    setJogoFinalizado(false);
    await carregarPergunta(0);
  }

  async function verificarResposta(event) {
    event.preventDefault();

    if (!respostaSelecionada) {
      return;
    }

    if (respostaSelecionada === quiz.answer) {
      setPontuacao((pontuacaoAnterior) => pontuacaoAnterior + 1);
    }

    const proximaPergunta = numeroPergunta + 1;
    setRespostaSelecionada("");

    if (proximaPergunta > TOTAL_PERGUNTAS) {
      setQuiz(null);
      setJogoFinalizado(true);
      return;
    }

    setNumeroPergunta(proximaPergunta);
    await carregarPergunta(proximaPergunta - 1);
  }

  return (
    <div className="app">
      <Cabecalho />

      <main className="main-content">
        {!quiz && !carregando && !jogoFinalizado && (
          <TelaInicial
            dificuldade={dificuldade}
            setDificuldade={setDificuldade}
            onStart={iniciarJogo}
          />
        )}

        {carregando && <Carregando />}

        {quiz && !carregando && !jogoFinalizado && (
          <PerguntaQuiz
            quiz={quiz}
            numeroPergunta={numeroPergunta}
            totalPerguntas={TOTAL_PERGUNTAS}
            pontuacao={pontuacao}
            mensagem={mensagem}
            respostaSelecionada={respostaSelecionada}
            setRespostaSelecionada={setRespostaSelecionada}
            onSubmit={verificarResposta}
          />
        )}

        {jogoFinalizado && (
          <ResultadoQuiz
            pontuacao={pontuacao}
            totalPerguntas={TOTAL_PERGUNTAS}
            onRestart={voltarAoInicio}
          />
        )}
      </main>

      <Rodape />
    </div>
  );
}

export default Aplicacao;

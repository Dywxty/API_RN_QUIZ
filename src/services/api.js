const API_URL = "https://aniquizapi.vercel.app/api/quiz";

export async function getQuiz(difficulty) {
  const response = await fetch(`${API_URL}?difficulty=${difficulty}`);

  if (!response.ok) {
    throw new Error("Não foi possível acessar a API");
  }

  const data = await response.json();

  if (data.error || !data.question || !data.options || !data.answer) {
    throw new Error("A API retornou uma resposta inválida");
  }

  return data;
}

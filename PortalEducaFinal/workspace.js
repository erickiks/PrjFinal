// Função para enviar os dados do formulário ao backend
function saveText() {
  const link = document.getElementById("link_input").value;
  const description = document.getElementById("userText").value;
  const imageFile = document.getElementById("picture_input").files[0];
  const file = document.getElementById("file_input").files[0];

  // Criação do FormData para enviar todos os dados
  const formData = new FormData();
  formData.append("link", link);
  formData.append("description", description);
  formData.append("image", imageFile);
  formData.append("file", file);

  // Enviar os dados via POST para o backend Spring Boot
  fetch('http://localhost:8080/links/save', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      alert('Link salvo com sucesso!');
      // Caso precise fazer algo com a resposta, adicione aqui.
  })
  .catch(error => {
      console.error('Erro ao salvar o link:', error);
      alert('Erro ao salvar o link.');
  });
}

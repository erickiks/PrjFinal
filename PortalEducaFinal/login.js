


document.getElementById('LoginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    const loginError = document.getElementById('loginError');

    try {
        // Envia os dados de login para o backend
        const response = await fetch('http://localhost:8080/aluno/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
            // Login bem-sucedido, redireciona para a página workspace
            window.location.href = 'ano_turma.html';  // Substitua pela página de destino
        } else {
            // Se as credenciais forem incorretas, exibe uma mensagem de erro
            const errorMessage = await response.text();
            loginError.innerText = errorMessage;
            loginError.style.display = 'block';
        }
    } catch (error) {
        console.error('Erro:', error);
        loginError.innerText = 'Erro de conexão. Tente novamente.';
        loginError.style.display = 'block';
    }
});

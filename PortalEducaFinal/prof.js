document.getElementById('LoginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    const loginError = document.getElementById('loginError');

    // Validação do login e senha fixos
    if (email !== 'adm@adm' || senha !== 'adm') {
        loginError.innerText = 'Login ou senha incorretos. Tente novamente.';
        loginError.style.display = 'block';
        return; // Impede o envio ao backend se a senha ou o login estiverem errados
    }

    // Se o login e senha estiverem corretos, redireciona para a próxima página
    window.location.href = 'cadastroProf.html'; // Redireciona após login bem-sucedido
});
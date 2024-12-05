document.getElementById('createForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:8080/professor/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });

        if (response.ok) {
            document.getElementById('message').innerText = 'Professor cadastrado com sucesso!';
            document.getElementById('createForm').reset();
        } else {
            const errorText = await response.text();
            document.getElementById('errorMessage').innerText = `Erro: ${errorText}`;
        }
    } catch (error) {
        document.getElementById('errorMessage').innerText = 'Erro de conexão. Tente novamente.';
    }
});

document.getElementById('updateProfessorForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const id = document.getElementById('updateId').value;
    const nome = document.getElementById('updateNome').value;
    const email = document.getElementById('updateEmail').value;
    const senha = document.getElementById('updateSenha').value;

    try {
        const response = await fetch(`http://localhost:8080/professor/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });

        if (response.ok) {
            document.getElementById('message').innerText = 'Professor atualizado com sucesso!';
            document.getElementById('updateProfessorForm').reset();
        } else {
            const errorText = await response.text();
            document.getElementById('errorMessage').innerText = `Erro: ${errorText}`;
        }
    } catch (error) {
        document.getElementById('errorMessage').innerText = 'Erro de conexão. Tente novamente.';
    }
});

document.getElementById('deleteProfessorForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const id = document.getElementById('deleteId').value;

    try {
        const response = await fetch(`http://localhost:8080/professor/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.getElementById('message').innerText = 'Professor excluído com sucesso!';
            document.getElementById('deleteProfessorForm').reset();
        } else {
            const errorText = await response.text();
            document.getElementById('errorMessage').innerText = `Erro: ${errorText}`;
        }
    } catch (error) {
        document.getElementById('errorMessage').innerText = 'Erro de conexão. Tente novamente.';
    }
});

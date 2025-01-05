console.log('Scripts carregados!');


document.getElementById('archiveForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const user = document.getElementById('user').value;
    const token = document.getElementById('token').value;
    const button = document.getElementById('submitBtn');

    button.textContent = 'Processando';

    axios.patch('/archiveAll', { user, token })
        .then(response => {
            alert('Repositórios arquivados com sucesso!');
            console.log(response.data);
            button.textContent = 'Tudo OK!';
        })
        .catch(error => {
            alert('Erro em arquivar repositórios, tente novamente!');
            console.log(error);
            button.textContent = 'Ops!';
        });
});
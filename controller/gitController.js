const axios = require('axios');

class GitHubRepository {
    // Método estático para arquivar todos os repositórios
    static async archiveAll(user, token) {
        try {
            // Paginação para garantir que todos os repositórios sejam obtidos
            let repos = [];
            let page = 1;
            let perPage = 100;

            // Obtendo todos os repositórios
            while (true) {
                const reposResponse = await axios.get(`https://api.github.com/users/${user}/repos`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/vnd.github.v3+json',
                    },
                    params: {
                        page: page,
                        per_page: perPage,
                    },
                });

                if (reposResponse.data.length === 0) break; // Não há mais repositórios
                repos = repos.concat(reposResponse.data);
                page++;
            }

            // Arquivando todos os repositórios
            await Promise.all(repos.map(async (repo) => {
                await axios.patch(`https://api.github.com/repos/${user}/${repo.name}`, {
                    archived: true  // Arquivando o repositório
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/vnd.github.v3+json',
                    },
                });
                console.log(`Repositório ${repo.name} arquivado com sucesso!`);
            }));

            return { success: true, message: `Todos os repositórios arquivados com sucesso!` };
        } catch (error) {
            return { success: false, message: error.response ? error.response.data.message : error.message };
        }
    }

    static index(req, res, next) {
        res.render('index');
    }
}

module.exports = GitHubRepository;
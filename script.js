fetch('projetos.json')
    .then(response => response.json())
    .then(projetos => {
        const projetosTable = document.getElementById('projetos-table');
        const projetosTbody = document.getElementById('projetos-tbody');

        projetos.forEach(projeto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${projeto.nome}</td>
                <td>${projeto.horasEstimadas}</td>
                <td>${projeto.responsavel}</td>
                <td>${projeto.dataFinal}</td>
                <td>
                    <button class="start-timer-btn">Iniciar Timer</button>
                </td>
            `;
            projetosTbody.appendChild(row);
        });
    });
const projetosTable = document.getElementById('projetos-table');
const projetosTbody = document.getElementById('projetos-tbody');
const addProjetoBtn = document.getElementById('add-projeto-btn');

let projetos = [];

addProjetoBtn.addEventListener('click', () => {
    const projeto = {
        nome: prompt('Informe o nome do projeto'),
        horasEstimadas: parseInt(prompt('Informe as horas estimadas')),
        responsavel: prompt('Informe o responsável'),
        dataFinal: prompt('Informe a data final'),
        horasTrabalhadas: 0
    };
    projetos.push(projeto);
    renderProjetos();
});

function renderProjetos() {
    projetosTbody.innerHTML = '';
    projetos.forEach((projeto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${projeto.nome}</td>
            <td>${projeto.horasEstimadas}</td>
            <td>${projeto.responsavel}</td>
            <td>${projeto.dataFinal}</td>
            <td>${projeto.horasTrabalhadas}/${projeto.horasEstimadas}</td>
            <td>
                <button class="start-timer-btn" data-index="${index}">Iniciar Timer</button>
            </td>
        `;
        projetosTbody.appendChild(row);
    });
}

projetosTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('start-timer-btn')) {
        const index = e.target.dataset.index;
        const projeto = projetos[index];
        const timerInterval = setInterval(() => {
            projeto.horasTrabalhadas++;
            renderProjetos();
        }, 1000); // Atualiza a cada 1 segundo
    }
});
// --- CONFIGURACIÓN DEL JUEGO ---

const questions = [
    // Misión 1: El Código de la Vida (Biología y Química)
    { missionId: 1, question: "¿Cuál de estos NO es un bioelemento primario?", options: ["Carbono", "Hidrógeno", "Hierro", "Oxígeno"], answer: 2, points: 10 },
    { missionId: 1, question: "Las proteínas son biomoléculas formadas por la unión de...", options: ["Glúcidos", "Aminoácidos", "Lípidos", "Ácidos nucleicos"], answer: 1, points: 15 },
    { missionId: 1, question: "El símbolo químico del Fósforo, esencial para el ADN, es...", options: ["F", "K", "P", "Ph"], answer: 2, points: 10 },
    { missionId: 1, question: "El agua (H₂O) es una...", options: ["Biomolécula orgánica", "Biomolécula inorgánica", "Bioelemento", "Célula"], answer: 1, points: 10 },
    { missionId: 1, question: "¿Qué elemento forma el 'esqueleto' de las moléculas orgánicas?", options: ["Oxígeno", "Nitrógeno", "Carbono", "Azufre"], answer: 2, points: 15 },

    // Misión 2: Exploradores Atómicos (Física y Química)
    { missionId: 2, question: "¿Qué partícula subatómica tiene carga positiva?", options: ["Neutrón", "Electrón", "Protón", "Fotón"], answer: 2, points: 10 },
    { missionId: 2, question: "El núcleo de un átomo contiene...", options: ["Solo electrones", "Protones y electrones", "Solo protones", "Protones y neutrones"], answer: 3, points: 15 },
    { missionId: 2, question: "Si un átomo tiene 6 protones, su número atómico es...", options: ["12", "3", "6", "Variable"], answer: 2, points: 10 },
    { missionId: 2, question: "Los electrones orbitan alrededor del...", options: ["Núcleo", "Otro electrón", "Protón", "Neutrón"], answer: 0, points: 10 },
    { missionId: 2, question: "La materia está compuesta por pequeñas unidades llamadas...", options: ["Moléculas", "Células", "Átomos", "Energía"], answer: 2, points: 15 },

    // Misión 3: El Reto Numérico (Matemáticas)
    { missionId: 3, question: "¿Cuánto es 2 elevado a la potencia 3 (2³)?", options: ["6", "8", "9", "16"], answer: 1, points: 15 },
    { missionId: 3, question: "¿Cuál de estos números es un divisor de 20?", options: ["3", "6", "10", "7"], answer: 2, points: 10 },
    { missionId: 3, question: "El resultado de 10² es...", options: ["20", "100", "1000", "12"], answer: 1, points: 10 },
    { missionId: 3, question: "Cualquier número elevado a la potencia 0 es igual a...", options: ["0", "El mismo número", "1", "No se puede calcular"], answer: 2, points: 15 },
    { missionId: 3, question: "Un múltiplo de 7 es...", options: ["15", "21", "25", "32"], answer: 1, points: 10 },

    // Misión 4: El Corazón de la Máquina (Tecnología)
    { missionId: 4, question: "¿Qué componente es considerado el 'cerebro' del ordenador?", options: ["Disco Duro", "Memoria RAM", "CPU", "Tarjeta Gráfica"], answer: 2, points: 15 },
    { missionId: 4, question: "La memoria RAM es una memoria...", options: ["Permanente", "Volátil", "Externa", "Óptica"], answer: 1, points: 10 },
    { missionId: 4, question: "Un ejemplo de software es...", options: ["El ratón", "El sistema operativo", "El monitor", "El teclado"], answer: 1, points: 10 },
    { missionId: 4, question: "Donde se almacenan los archivos a largo plazo es en el...", options: ["Procesador", "Disco duro o SSD", "Disipador", "Puerto USB"], answer: 1, points: 10 },
    { missionId: 4, question: "El hardware se refiere a los componentes... de un ordenador.", options: ["Lógicos", "Virtuales", "Físicos", "Temporales"], answer: 2, points: 15 },
];

const missions = [
    { id: 1, title: "El Código de la Vida", description: "Domina la química de los seres vivos.", color: "bg-secundario", badgeId: 1 },
    { id: 2, title: "Exploradores Atómicos", description: "Entiende la estructura de la materia.", color: "bg-digital", badgeId: 2 },
    { id: 3, title: "El Reto Numérico", description: "Experto en naturales y potencias.", color: "bg-acento", badgeId: 3 },
    { id: 4, title: "El Corazón de la Máquina", description: "Conoce el hardware a fondo.", color: "bg-primario", badgeId: 4 },
];

const badges = [
    { id: 1, name: "Maestro de Bioelementos", icon: "🧬" },
    { id: 2, name: "Explorador Atómico", icon: "⚛️" },
    { id: 3, name: "Rey de los Números", icon: "🔢" },
    { id: 4, name: "Ingeniero Digital", icon: "🛠️" },
];

const levels = [
    { name: "Cadete Científico", minPoints: 0 },
    { name: "Investigador Junior", minPoints: 101 },
    { name: "Especialista Digital", minPoints: 251 },
    { name: "Experto en Laboratorio", minPoints: 401 },
    { name: "Científico Master", minPoints: 601 },
];

// --- ESTADO DEL JUEGO ---
let gameState = {
    teamName: "",
    points: 0,
    level: levels[0].name,
    unlockedBadges: [],
    currentMissionId: null,
    currentQuestionIndex: 0,
    missionQuestions: [],
    missionScore: 0,
};

// --- ELEMENTOS DEL DOM ---
const startScreen = document.getElementById('start-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const quizScreen = document.getElementById('quiz-screen');
const missionEndScreen = document.getElementById('mission-end-screen');

const teamNameInput = document.getElementById('team-name-input');
const startGameBtn = document.getElementById('start-game-btn');
const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');

// --- LÓGICA DEL JUEGO ---

function init() {
    startGameBtn.addEventListener('click', startGame);
    backToDashboardBtn.addEventListener('click', showDashboard);
    renderBadges();
    renderMissions();
}

function startGame() {
    const name = teamNameInput.value.trim();
    if (name) {
        gameState.teamName = name;
        document.getElementById('dashboard-team-name').textContent = gameState.teamName;
        showScreen('dashboard-screen');
        updateDashboard();
    } else {
        teamNameInput.classList.add('border-red-500');
        setTimeout(() => teamNameInput.classList.remove('border-red-500'), 2000);
    }
}

function showScreen(screenId) {
    [startScreen, dashboardScreen, quizScreen, missionEndScreen].forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

function updateDashboard() {
    // Actualizar nivel
    const currentLevel = levels.slice().reverse().find(l => gameState.points >= l.minPoints);
    gameState.level = currentLevel.name;

    document.getElementById('dashboard-level').textContent = `Nivel: ${gameState.level}`;
    document.getElementById('dashboard-points').textContent = `${gameState.points} Puntos`;
    
    // Actualizar insignias
    badges.forEach(badge => {
        const badgeEl = document.getElementById(`badge-${badge.id}`);
        if (gameState.unlockedBadges.includes(badge.id)) {
            badgeEl.classList.add('unlocked');
        }
    });
}

function renderMissions() {
    const missionsGrid = document.getElementById('missions-grid');
    missionsGrid.innerHTML = '';
    missions.forEach(mission => {
        const missionCard = document.createElement('div');
        missionCard.className = `p-4 rounded-lg shadow-lg cursor-pointer btn ${mission.color}`;
        missionCard.innerHTML = `
            <h4 class="text-xl font-bold">${mission.title}</h4>
            <p class="text-sm">${mission.description}</p>
        `;
        missionCard.addEventListener('click', () => startMission(mission.id));
        missionsGrid.appendChild(missionCard);
    });
}

function renderBadges() {
    const badgesGrid = document.getElementById('badges-grid');
    badgesGrid.innerHTML = '';
    badges.forEach(badge => {
        const badgeEl = document.createElement('div');
        badgeEl.id = `badge-${badge.id}`;
        badgeEl.className = 'text-center p-2';
        badgeEl.innerHTML = `
            <div class="text-5xl badge-icon">${badge.icon}</div>
            <p class="text-xs mt-1">${badge.name}</p>
        `;
        badgesGrid.appendChild(badgeEl);
    });
}

function startMission(missionId) {
    gameState.currentMissionId = missionId;
    gameState.missionQuestions = questions.filter(q => q.missionId === missionId);
    gameState.currentQuestionIndex = 0;
    gameState.missionScore = 0;
    
    const mission = missions.find(m => m.id === missionId);
    document.getElementById('quiz-title').textContent = mission.title;

    showScreen('quiz-screen');
    displayQuestion();
}

function displayQuestion() {
    if (gameState.currentQuestionIndex >= gameState.missionQuestions.length) {
        endMission();
        return;
    }

    const question = gameState.missionQuestions[gameState.currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('quiz-progress').textContent = `Pregunta ${gameState.currentQuestionIndex + 1} / ${gameState.missionQuestions.length}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'w-full bg-gray-700 p-4 rounded-lg text-lg text-left btn hover:bg-primario';
        optionBtn.textContent = option;
        optionBtn.onclick = () => checkAnswer(index, optionBtn);
        optionsContainer.appendChild(optionBtn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    const question = gameState.missionQuestions[gameState.currentQuestionIndex];
    const feedbackMessage = document.getElementById('feedback-message');
    
    // Deshabilitar botones para evitar múltiples clics
    document.querySelectorAll('#options-container button').forEach(btn => btn.disabled = true);

    if (selectedIndex === question.answer) {
        gameState.points += question.points;
        gameState.missionScore += question.points;
        feedbackMessage.textContent = `¡Correcto! +${question.points} puntos`;
        feedbackMessage.className = 'mt-4 text-center text-lg font-bold h-6 text-secundario';
        btnElement.classList.add('correct-animation');
    } else {
        feedbackMessage.textContent = 'Incorrecto. ¡Sigue intentando!';
        feedbackMessage.className = 'mt-4 text-center text-lg font-bold h-6 text-red-500';
        btnElement.classList.add('incorrect-animation');
        // Mostrar la correcta
        document.querySelectorAll('#options-container button')[question.answer].classList.add('bg-secundario');
    }

    setTimeout(() => {
        gameState.currentQuestionIndex++;
        feedbackMessage.textContent = '';
        displayQuestion();
    }, 1500);
}

function endMission() {
    const mission = missions.find(m => m.id === gameState.currentMissionId);
    const totalQuestions = gameState.missionQuestions.length;
    
    // Cálculo más preciso de respuestas correctas
    let correctAnswersCount = 0;
    const answeredQuestions = gameState.missionQuestions.slice(0, gameState.currentQuestionIndex);
    let tempScore = gameState.missionScore;
    answeredQuestions.reverse().forEach(q => {
        if(tempScore >= q.points) {
            correctAnswersCount++;
            tempScore -= q.points;
        }
    });

    document.getElementById('mission-end-title').textContent = `¡Misión "${mission.title}" Completada!`;
    document.getElementById('mission-end-summary').textContent = `Has respondido correctamente a ${correctAnswersCount} de ${totalQuestions} preguntas.`;
    document.getElementById('mission-end-points').textContent = `Has ganado ${gameState.missionScore} puntos en esta misión.`;

    const badgeDiv = document.getElementById('mission-end-badge');
    badgeDiv.innerHTML = '';
    
    // Otorgar insignia si se superó la misión (ej: >50% aciertos)
    if (correctAnswersCount / totalQuestions >= 0.5 && !gameState.unlockedBadges.includes(mission.badgeId)) {
        gameState.unlockedBadges.push(mission.badgeId);
        const badge = badges.find(b => b.id === mission.badgeId);
        badgeDiv.innerHTML = `
            <p class="text-xl mb-2">¡Has ganado una nueva insignia!</p>
            <div class="text-6xl">${badge.icon}</div>
            <p class="font-bold">${badge.name}</p>
        `;
    }
    
    showScreen('mission-end-screen');
}

function showDashboard() {
    showScreen('dashboard-screen');
    updateDashboard();
}

// --- INICIAR JUEGO ---
// Espera a que el contenido del DOM esté cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', init);

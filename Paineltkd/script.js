var timerInterval;
var timerRunning = false;

// Função para adicionar pontos ao placar
function addPoint(side, points = 1) {
  var scoreElement = document.getElementById(side + '-score');
  var score = parseInt(scoreElement.innerText);
  score += points;
  scoreElement.innerText = score;
}

// Função para subtrair pontos do placar
function subtractPoint(side, points = 1) {
  var scoreElement = document.getElementById(side + '-score');
  var score = parseInt(scoreElement.innerText);
  score -= points;

  // Garante que a pontuação não seja menor que zero
  if (score < 0) {
    score = 0;
  }

  scoreElement.innerText = score;
}

// Função para formatar o tempo do cronômetro
function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  return (
    (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  );
}

// Função para iniciar o cronômetro
function startTimer() {
  var timerElement = document.getElementById('timer');
  var startButton = document.getElementById('start-button');
  var pauseButton = document.getElementById('pause-button');

  if (!timerRunning) {
    var duration = timerElement.innerText.split(':');
    var minutes = parseInt(duration[0]);
    var seconds = parseInt(duration[1]);
    var totalSeconds = minutes * 60 + seconds;

    timerInterval = setInterval(function () {
      totalSeconds--;

      if (totalSeconds < 0) {
        clearInterval(timerInterval);
        timerElement.innerText = 'Tempo Esgotado';
        timerRunning = false;
        startButton.innerText = 'Iniciar';
        pauseButton.disabled = true;
        return;
      }

      var newMinutes = Math.floor(totalSeconds / 60);
      var newSeconds = totalSeconds % 60;

      timerElement.innerText = formatTime(newMinutes * 60 + newSeconds);
    }, 1000);

    timerRunning = true;
    startButton.innerText = 'Iniciar';
    pauseButton.innerText = 'Pausar';
    pauseButton.disabled = false;
  } else {
    clearInterval(timerInterval);
    timerRunning = false;
    startButton.innerText = 'Continuar';
    pauseButton.innerText = 'Pausado';
    pauseButton.disabled = true;
  }
}

// Função para pausar o cronômetro
function pauseTimer() {
  var timerElement = document.getElementById('timer');
  var startButton = document.getElementById('start-button');
  var pauseButton = document.getElementById('pause-button');

  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    startButton.innerText = 'Continuar';
    pauseButton.innerText = 'Pausado';
    pauseButton.disabled = true;
  }
}

// Inicia o cronômetro com a duração de 5 minutos (300 segundos)
function initTimer() {
  var timerElement = document.getElementById('timer');
  var duration = timerElement.innerText.split(':');
  var minutes = parseInt(duration[0]);
  var seconds = parseInt(duration[1]);
  var totalSeconds = minutes * 60 + seconds;

  timerElement.innerText = formatTime(totalSeconds);
}

initTimer();
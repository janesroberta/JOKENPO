const SELECTED_OPTION_CSS_CLASS = 'selected';

const $playerOptions = document.querySelectorAll('[data-play]');
const $botOptions = document.querySelectorAll('[data-bot-play]');

const $message = document.querySelector('[data-js="message"]');
const $playerWins = document.querySelector('[data-js="player-wins"]');
const $botWins = document.querySelector('[data-js="bot-wins"]');

const state = {
  playing: false,
  botWins: 0,
  playerWins: 0,
};

const botOptions = ['rock', 'paper', 'scissor'];

const wins = {
  'rock&scissor': true,
  'paper&rock': true,
  'scissor&paper': true,
};

function setMessage(message) {
  $message.textContent = message;
}

function getBotOption() {
  const randomIndex = Math.floor(Math.random() * 3);
  return botOptions[randomIndex];
}

function removeSelectdStyle($arr) {
  $arr.forEach(($option) => {
    $option.classList.remove(SELECTED_OPTION_CSS_CLASS);
  });
}

function setSelectedPlayerOption(button) {
  removeSelectdStyle($playerOptions);
  button.classList.add(SELECTED_OPTION_CSS_CLASS);
}

function setSelectedBotOption(option) {
  $botOptions.forEach(($option) => {
    $option.classList.remove(SELECTED_OPTION_CSS_CLASS);

    const value = $option.getAttribute('data-bot-play');

    if (value === option) {
      $option.classList.add(SELECTED_OPTION_CSS_CLASS);
    }
  });
}

function getMessage(isPlayerWinner, isDraw) {
  if (isDraw) {
    return 'Empatou!';
  }

  return isPlayerWinner
    ? 'Jogador venceu!'
    : 'Bot venceu!';
}

function updateWins() {
  $botWins.textContent = `Vitórias: ${state.botWins}`;
  $playerWins.textContent = `Vitórias: ${state.playerWins}`;
}

function incrementWin(isPlayerWinner, isDraw) {
  if (isDraw) {
    return;
  } else if (isPlayerWinner) {
    state.playerWins += 1;
  } else {
    state.botWins += 1;
  }

  updateWins();
}

function unselectOptions() {
  removeSelectdStyle($playerOptions);
  removeSelectdStyle($botOptions);
}

$playerOptions.forEach(($option) => {
  $option.addEventListener('click', (event) => {
    if (!state.playing) {
      state.playing = true;

      setMessage('Calculando vencedor...');

      const button = event.target.parentElement;

      const playerValue = button.getAttribute('data-play');
      const botValue = getBotOption();

      setSelectedPlayerOption(button);
      setSelectedBotOption(botValue);

      const playValue = `${playerValue}&${botValue}`;
      const isDraw = playerValue === botValue;
      const isPlayerWinner = wins[playValue];

      const message = getMessage(isPlayerWinner, isDraw);

      setTimeout(() => {
        setMessage(message);
        incrementWin(isPlayerWinner, isDraw);
        unselectOptions();

        state.playing = false;
      }, 1000)

    }
  });
});
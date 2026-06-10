const state = {
  p1Name: 'Player 1',
  p2Name: 'Player 2',
  target: 5,
  p1Score: 0,
  p2Score: 0,
  round: 0,
  rolling: false,
};

document.querySelectorAll('.target-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.target-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.target = parseInt(btn.dataset.value);
  });
});

function startGame() {
  state.p1Name = document.getElementById('p1-name').value.trim() || 'Player 1';
  state.p2Name = document.getElementById('p2-name').value.trim() || 'Player 2';
  state.p1Score = 0;
  state.p2Score = 0;
  state.round = 0;
  state.rolling = false;

  document.getElementById('p1-display').textContent = state.p1Name;
  document.getElementById('p2-display').textContent = state.p2Name;
  document.getElementById('p1-score').textContent = 0;
  document.getElementById('p2-score').textContent = 0;
  document.getElementById('round-info').textContent = `First to ${state.target} wins`;
  document.getElementById('roll-btn').disabled = false;

  const banner = document.getElementById('result-banner');
  banner.className = 'result-banner';
  document.getElementById('result-text').textContent = 'Roll to begin!';

  document.getElementById('p1-panel').classList.remove('winner');
  document.getElementById('p2-panel').classList.remove('winner');
  document.getElementById('dice1').src = 'images/dice6.png';
  document.getElementById('dice2').src = 'images/dice6.png';

  showScreen('game-screen');
}

function rollDice() {
  if (state.rolling) return;
  state.rolling = true;

  const rollBtn = document.getElementById('roll-btn');
  rollBtn.disabled = true;

  const d1 = document.getElementById('dice1');
  const d2 = document.getElementById('dice2');
  const p1Panel = document.getElementById('p1-panel');
  const p2Panel = document.getElementById('p2-panel');
  const banner = document.getElementById('result-banner');

  p1Panel.classList.remove('winner');
  p2Panel.classList.remove('winner');
  banner.classList.remove('pop');

  d1.classList.add('rolling');
  d2.classList.add('rolling');

  const num1 = Math.floor(Math.random() * 6) + 1;
  const num2 = Math.floor(Math.random() * 6) + 1;

  setTimeout(() => {
    d1.src = `images/dice${num1}.png`;
    d2.src = `images/dice${num2}.png`;
    d1.classList.remove('rolling');
    d2.classList.remove('rolling');

    state.round++;
    const resultText = document.getElementById('result-text');

    if (num1 > num2) {
      state.p1Score++;
      resultText.textContent = `${state.p1Name} wins the round!`;
      banner.className = 'result-banner p1-win pop';
      p1Panel.classList.add('winner');
    } else if (num2 > num1) {
      state.p2Score++;
      resultText.textContent = `${state.p2Name} wins the round!`;
      banner.className = 'result-banner p2-win pop';
      p2Panel.classList.add('winner');
    } else {
      resultText.textContent = 'Draw — no point!';
      banner.className = 'result-banner draw pop';
    }

    document.getElementById('p1-score').textContent = state.p1Score;
    document.getElementById('p2-score').textContent = state.p2Score;
    document.getElementById('round-info').textContent = `Round ${state.round}  ·  First to ${state.target}`;

    state.rolling = false;

    if (state.p1Score >= state.target || state.p2Score >= state.target) {
      setTimeout(endGame, 900);
    } else {
      rollBtn.disabled = false;
    }
  }, 480);
}

function endGame() {
  const p1Won = state.p1Score >= state.target;
  const winner = p1Won ? state.p1Name : state.p2Name;

  document.getElementById('winner-title').textContent = `${winner} Wins!`;
  document.getElementById('final-scores').innerHTML = `
    <div>
      <span class="fs-name" style="color:var(--p1)">${state.p1Name}</span>
      <span class="fs-num"  style="color:var(--p1)">${state.p1Score}</span>
    </div>
    <span class="fs-sep">—</span>
    <div>
      <span class="fs-name" style="color:var(--p2)">${state.p2Name}</span>
      <span class="fs-num"  style="color:var(--p2)">${state.p2Score}</span>
    </div>
  `;

  spawnConfetti();
  showScreen('gameover-screen');
}

function showSetup() {
  document.getElementById('confetti').innerHTML = '';
  showScreen('setup-screen');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function spawnConfetti() {
  const container = document.getElementById('confetti');
  container.innerHTML = '';
  const colors = ['#f5c842', '#00d4ff', '#ff4d6d', '#ffffff', '#c084fc', '#34d399'];

  for (let i = 0; i < 90; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const size = Math.random() * 9 + 5;
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.4 ? '50%' : '2px'};
      animation-duration: ${Math.random() * 2 + 2.2}s;
      animation-delay: ${Math.random() * 1.8}s;
    `;
    container.appendChild(el);
  }
}

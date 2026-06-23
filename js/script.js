function initTopicCards() {
  const topicCards = document.querySelectorAll('.topic-card');
  topicCards.forEach(function (card) {
    const header = card.querySelector('.topic-header');
    header.addEventListener('click', function () {
      topicCards.forEach(function (other) {
        if (other !== card) {
          other.classList.remove('open');
        }
      });
      card.classList.toggle('open');
    });
  });
}

function initQuiz() {
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizResult = document.querySelector('.quiz-result');
  let answered = false;

  quizOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      if (answered) return;
      answered = true;

      const isCorrect = option.getAttribute('data-correct') === 'true';

      if (isCorrect) {
        option.classList.add('correct');
        quizResult.textContent = '✅ Correto! Parabéns, você acertou!';
        quizResult.style.background = 'rgba(16, 185, 129, 0.1)';
        quizResult.style.border = '1px solid rgba(16, 185, 129, 0.2)';
        quizResult.style.color = '#34d399';
      } else {
        option.classList.add('wrong');
        quizResult.textContent = '❌ Resposta incorreta. A alternativa correta é a letra B!';
        quizResult.style.background = 'rgba(248, 113, 113, 0.1)';
        quizResult.style.border = '1px solid rgba(248, 113, 113, 0.2)';
        quizResult.style.color = '#f87171';
        quizOptions.forEach(function (opt) {
          if (opt.getAttribute('data-correct') === 'true') {
            opt.classList.add('correct');
          }
        });
      }

      quizResult.classList.add('show');
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    const nome = document.getElementById('inputNome');
    const nomeError = document.getElementById('nomeError');
    if (nome.value.trim().length < 3) {
      nomeError.classList.add('show');
      nome.style.borderColor = '#f87171';
      isValid = false;
    } else {
      nomeError.classList.remove('show');
      nome.style.borderColor = 'rgba(148, 163, 184, 0.15)';
    }

    const email = document.getElementById('inputEmail');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      emailError.classList.add('show');
      email.style.borderColor = '#f87171';
      isValid = false;
    } else {
      emailError.classList.remove('show');
      email.style.borderColor = 'rgba(148, 163, 184, 0.15)';
    }

    const mensagem = document.getElementById('inputMensagem');
    const mensagemError = document.getElementById('mensagemError');
    if (mensagem.value.trim().length < 10) {
      mensagemError.classList.add('show');
      mensagem.style.borderColor = '#f87171';
      isValid = false;
    } else {
      mensagemError.classList.remove('show');
      mensagem.style.borderColor = 'rgba(148, 163, 184, 0.15)';
    }

    if (isValid) {
      form.style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
    }
  });
}

function resetQuiz() {
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizResult = document.querySelector('.quiz-result');
  quizOptions.forEach(function (opt) {
    opt.classList.remove('correct', 'wrong');
  });
  quizResult.classList.remove('show');
  initQuiz();
}

document.addEventListener('DOMContentLoaded', function () {
  initTopicCards();
  initQuiz();
  initContactForm();

  const resetBtn = document.getElementById('resetQuiz');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      resetQuiz();
    });
  }
});

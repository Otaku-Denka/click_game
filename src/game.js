var currentScore = $('.score').text(),
  currentTimer = $('.timer').text(),
  started = false,
  timer = null;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function incrementScore() {
  currentScore++;
  $('.score').html(currentScore);
}

function moveSquare(selection) {
  var left = randomIntFromInterval(2, 75),
    top = randomIntFromInterval(2, 75),
    size = randomIntFromInterval(100, 200);
  $(selection)
    .css('left', left + '%')
    .css('top', top + '%')
    .css('height', size + 'px')
    .css('width', size + 'px')
    .css('display', 'block');
}

function endGame() {
  $('.square').addClass('end');
  $('.score').html('Game Over!<br/>Your final score is: ' + currentScore);
  $('.start-button').css('display', 'block');
  $('.square').css('display', 'none');
  $('.action-bar').css('display', 'none');

  started = false;
}

function timerStart() {
  currentTimer = 60;
  currentScore = 0;
  $('.score').html(currentScore);
  for (var i = 0; i <= 5; i++) {
    moveSquare($('#square' + i));
    $('.square').css('display', 'block');
  }
  timer = setInterval(function() {
    currentTimer--;
    $('.timer').html(currentTimer);
    if (currentTimer < 1) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

$('.closeBtn').click(function() {
   if (currentScore === 10) {
    // incrementScore();
    $('.square').css('display', 'none');
    $('#square1')
      .css('display', 'block')
      .css('left', 25 + '%')
      .css('top', 10 + '%')
      .css('height', 50 + 'vw')
      .css('width', 50 + 'vw');
    $('.action-bar').css('opacity', '1');
    $('.action-bar').css('display', 'block');
    onBodyClick();
    document.addEventListener('barFull', onBarFullHandler);
    createjs.Ticker.addEventListener('tick', handleTick);
  } else {
    incrementScore();
    moveSquare($(this).closest('.square'));
   
  }
});

$('.start-button').click(function() {
  $(this).css('display', 'none');
  if (!started) {
    started = true;
    timerStart();
  }
});

var meterPercFilled = 0;
var currentLevel = 0.5;

function onBarFullHandler() {
  $('.action-bar').css('opacity', '0');
  $('.action-bar').css('display', 'none');
  incrementScore();
  for (var i = 0; i <= 5; i++) {
    moveSquare($('#square' + i));
  }
  createjs.Ticker.paused = true;
}

function handleTick(ev) {
  if (!ev.paused) {
    setCurrentMeter(getCurrentMeter() - (1 + currentLevel * 0.4));
  }
}

function getCurrentMeter() {
  return meterPercFilled;
}

function setCurrentMeter(value) {
  newHeight = value > 100 ? 100 : value < 0 ? 0 : value;

  if (newHeight <= 5) {
    document.querySelector('#square1').classList.remove('shaking');
  } else {
    document.querySelector('#square1').classList.add('shaking');
  }
  if (newHeight >= 100) {
    document.querySelector('#square1').classList.remove('shaking');
    document.dispatchEvent(new Event('barFull'));
  }
  document.querySelector('.meter__filler').style.height = newHeight + '%';
  return (meterPercFilled = newHeight);
}

function onBodyClick() {
  var newHeight = setCurrentMeter(getCurrentMeter() + 10);
}

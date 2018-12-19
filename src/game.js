var meterPercFilled = 0;
var currentLevel = 0.1;
var num = 40;
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
  var random = Math.random()
  var display = started ? 'block' : 'none'
  var size = +randomIntFromInterval(100, 200),
    containWidth = $('#game').width(),
    containHeight = $('#game').height(),
    right = Math.floor((containWidth / 100) * (Math.random() * 100) - size),
    bottom = Math.floor((containHeight / 100) * (Math.random() * 100) - size -10) ;
  right = right <= size ? size + 20 : right;
  bottom = bottom <= size ? 20 : bottom;
 
  var position = containHeight - ($(selection).position().top + $(selection).outerHeight(true))
  $(selection).removeClass('scaleIn');
    if(currentScore > 10){
      if(position > 1){
        $(selection).finish()
        $(selection)
      .css('right', right + 'px')
      .css('height', size + 'px')
      .css('width', size + 'px')
      .css('bottom', '-210' + 'px')
      }
    
      $(selection)
      .css('right', right + 'px')
      .css('height', size + 'px')
      .css('width', size + 'px')
      .css('bottom', '-210' + 'px')
      .css('display', display);
      $(selection).removeClass('scaleIn')
      $(selection).addClass('bottom')
      $(selection).animate(
        {
          bottom: containHeight + size + 20,
        },
        Math.floor(random * 15000) + 1000,
      );
      if(started === true){
        setTimeout(function(){moveSquare(selection)}, Math.floor(random * 15000) + 1000 )
          
      }
 
    } else {
      setTimeout(function() {
        $(selection)
          .css('right', right + 'px')
          .css('bottom', bottom + 'px')
          .css('height', size + 'px')
          .css('width', size + 'px')
          .css('display', display);
        $(selection).addClass('scaleIn');
      }, 300);
    }
}

function endGame() {
  $('.square').addClass('end');
  $('.score').html('Game Over!<br/>Your final score is: ' + currentScore);
  $('.start-button').css('display', 'block');
  $('.square').css('display', 'none');
  $('.action-bar').css('display', 'none');
  for(var i=0; i<= num; i++){
    $('#square'+i).css('display', 'none')
  }

  started = false;
}

function timerStart() {
  currentTimer = 60;
  currentScore = 0;
  meterPercFilled = 0;
  createjs.Ticker.paused = false;
  $('.score').html(currentScore);
  for (var i = 0; i <= num; i++) {
    (function(i) {
      setTimeout(function() {
        
        moveSquare($('#square' + i));
      }, Math.floor(Math.random() * currentTimer - 15000) );
    })(i);
    $('#game').append(
      '<div class="square bottom" id="square' +
        i +
        '"><div class="closeBtn">X</div></div>',
    )
    // $('.square').css('display', 'block');
  }
  // $('.closeBtn').click(function() {
    $('.square').click(function() {
    if (currentScore === 10) {
      // incrementScore();
      $('.square').css('display', 'none');
      $('#square1')
        .css('display', 'block')
        .css('left', 25 + '%')
        .css('bottom', 10 + 'px')
        .css('height', 40 + 'vw')
        .css('width', 40 + 'vw');
      $('.action-bar').css('opacity', '1');
      $('.action-bar').css('display', 'block');
      onBodyClick();
      document.addEventListener('barFull', onBarFullHandler);
      createjs.Ticker.addEventListener('tick', handleTick);
    } else if (currentScore > 10) {
      incrementScore();
      moveSquare($(this))
      // moveSquare($(this).closest('.square'));
      // $(this).closest('.square').css('display','none')
    } else {
      incrementScore();
      moveSquare($(this))
      // moveSquare($(this).closest('.square'));
    }
  });
  timer = setInterval(function() {
    currentTimer--;
    $('.timer').html(currentTimer);
    if (currentTimer < 1) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}



$('.start-button').click(function() {
  $(this).css('display', 'none');
  if (!started) {
    started = true;
    timerStart();
  }
});

function onBarFullHandler() {
  $('.action-bar').css('opacity', '0');
  $('.action-bar').css('display', 'none');
  incrementScore();
  $('.square').css('display', 'block');
  for(var l=0; l<=num; l++){
    $('#square' + l).css('bottom', '-210px')
  }
  setTimeout(function(){
    for(var i=0; i<=num ; i++){
    
      (function(i) {
        setTimeout(function() {
          moveSquare('#square' + i)
        }, Math.floor(Math.random() * currentTimer - 15000) );
      })(i);
      
    }
  }, 300);

  // for (var i = 0; i <= 5; i++) {
  //   moveSquare($('#square' + i));
  // }
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
    document.querySelector('#square1').classList.remove('scaleIn');
  } else {
    document.querySelector('#square1').classList.remove('scaleIn');
    document.querySelector('#square1').classList.add('shaking');
  }
  if (newHeight >= 100) {
    document.querySelector('#square1').classList.remove('shaking');
    document.querySelector('#square1').classList.remove('scaleIn');
    document.dispatchEvent(new Event('barFull'));
    $('#square1').css('bottom', '-210px')
  }
  document.querySelector('.meter__filler').style.height = newHeight + '%';
  return (meterPercFilled = newHeight);
}

function onBodyClick() {
  var newHeight = setCurrentMeter(getCurrentMeter() + 10);
}

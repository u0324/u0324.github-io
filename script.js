// スクロール関数
function scrollToTimer() {
  document.getElementById("timer").scrollIntoView();
}

// ストップウォッチ
let startTime;
let elapsedTime = 0;
let timerInterval;

function timeToString(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);
  return (
    String(hrs).padStart(2, "0") + ":" +
    String(mins).padStart(2, "0") + ":" +
    String(secs).padStart(2, "0")
  );
}

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function () {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 1000);
}

function stop() {
  clearInterval(timerInterval);
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("reset").addEventListener("click", reset);

// タイマー用変数
let countdown;
const alarmSound = new Audio("alarm.mp3"); // 音ファイルはプロジェクトに入れてね！

// タイマー開始
function startTimer() {
  let minutes = parseInt(document.getElementById("minutes").value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("分を正しく入力してね！");
    return;
  }

  let time = minutes * 60;
  updateTimerDisplay(time);

  countdown = setInterval(() => {
    time--;
    updateTimerDisplay(time);
    if (time <= 0) {
      clearInterval(countdown);
      alarmSound.play(); // 終了時に音を鳴らす！
    }
  }, 1000);
}

// ユーザーがどこかをクリックしたら音を鳴らす
document.body.addEventListener("click", () => {
  if (timerEnded) {
    alarmSound.play();
  let timerEnded = false; // 一度だけ鳴らすように
  }
});

// タイマー停止
function stopTimer() {
  clearInterval(countdown);
}

// タイマーリセット
function resetTimer() {
  clearInterval(countdown);
  document.getElementById("timerDisplay").innerHTML = "00:00";
  document.getElementById("minutes").value = "";
}

// 表示更新
function updateTimerDisplay(time) {
  let mins = Math.floor(time / 60);
  let secs = time % 60;
  document.getElementById("timerDisplay").innerHTML =
    String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
}

// ボタンイベント
document.getElementById("timerStart").addEventListener("click", startTimer);
document.getElementById("timerStop").addEventListener("click", stopTimer);
document.getElementById("timerReset").addEventListener("click", resetTimer);


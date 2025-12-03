function updateTime() {
    const now = new Date();
    // 日本の形式で日時を取得 (例: 2025/12/1 12:00:00)
    const timeStr = now.toLocaleString('ja-JP');
    
    // HTML内の id="current-time" を持つ要素を探して、中身を書き換える
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `現在時刻: ${timeStr}`;
    }
}

// ページが読み込まれたらすぐに一度実行
updateTime();


setInterval(updateTime, 1000);

// 環境変数からAPIのURLを読み込む
// .env ファイルに書いた VITE_API_URL がここで使われる
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/count';


let count = 0;

// ボタンと表示エリアの要素を取得
const btn = document.getElementById('click-button');
const display = document.getElementById('click-count');

function updateDisplay(newCount) {
    const currentDigits = display.querySelectorAll('.digit');
    
    currentDigits.forEach(digit => {
        digit.classList.remove('slide-in');
        digit.classList.add('slide-out');
        
        setTimeout(() => {digit.remove();},
        300);
    });
    
    const newDigit = document.createElement('span');
    newDigit.textContent = newCount;
    newDigit.className = 'digit slide-in';
    
    display.appendChild(newDigit);
}

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        console.log("Initial count from server:", data.count);
        count = data.count; // サーバーの値をローカル変数に反映
        updateDisplay(data.count);
    })
    .catch(error => {
        console.error("Error fetching initial count:", error);
    });

if (btn) {
    // ボタンがクリックされたときの処理
    btn.addEventListener('click', function() {
        // サーバーにカウントアップを通知
        fetch(API_URL, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log("Count updated:", data.count);
            // 念のためサーバーの値と同期
            if (data.count > count) {
                count = data.count;
                updateDisplay(count);
            }
        })
        .catch(error => {
            console.error("Error updating count:", error);
        });

        count++; // 回数を増やす（見た目の即時反映）
        updateDisplay(count); // 画面更新

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.07, y: 0.6 }
        });
    });
})
}
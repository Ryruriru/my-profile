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

// 回数を数える変数
let count = 0;

// ボタンと表示エリアの要素を取得
const btn = document.getElementById('click-button');
const display = document.getElementById('click-count');

// ボタンがクリックされたときの処理
btn.addEventListener('click', function() {
    count++; // 回数を増やす
    
    // アニメーション処理
    
    // 今表示されている数字（古い数字）を取得
    const currentDigit = display.querySelector('.digit');
    
    // 新しい数字の要素を作る
    const newDigit = document.createElement('span');
    newDigit.textContent = count;
    newDigit.className = 'digit slide-in'; // 「下から入る」クラスをつける
    
    // 古い数字に「上に消える」クラスをつける
    if (currentDigit) {
        currentDigit.classList.add('slide-out');
    }
    
    // 新しい数字を画面に追加
    display.appendChild(newDigit);
    
    // アニメーションが終わった頃（0.3秒後）に古い数字を完全に消す
    setTimeout(() => {
        if (currentDigit) {
            currentDigit.remove();
        }
    }, 300);

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.07, y: 0.6 }
    });
})
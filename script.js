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
    
    // 1. 今表示されている「すべての」数字を取得
    const currentDigits = display.querySelectorAll('.digit');
    
    // 2. 古い数字たちを強制的に「退場モード（slide-out）」にする
    //    すでに退場中のものも含めて、すべて上に飛ばす
    currentDigits.forEach(digit => {
        digit.classList.remove('slide-in'); // 入場アニメーションをキャンセル
        digit.classList.add('slide-out');   // 退場アニメーションを開始
        
        // アニメーションが終わったら（0.3秒後）確実に削除する
        // ※連打されても、個別にタイマーが動くので問題ない
        setTimeout(() => {
            digit.remove();
        }, 300);
    });
    
    // 3. 新しい数字の要素を作る
    const newDigit = document.createElement('span');
    newDigit.textContent = count;
    newDigit.className = 'digit slide-in'; // 「下から入る」クラスをつける
    
    // 4. 新しい数字を画面に追加
    display.appendChild(newDigit);

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.07, y: 0.6 }
    });
})
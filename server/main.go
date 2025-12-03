package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
)

// 回数を記録する変数（サーバーが動いている間だけ覚えている）
var (
	count int
	mu    sync.Mutex // 同時にアクセスが来ても大丈夫なようにする鍵
)

// JSONで返すデータの形
type CountResponse struct {
	Count int `json:"count"`
}

func countHandler(w http.ResponseWriter, r *http.Request) {
	// CORS設定（ブラウザからのアクセスを許可するおまじない）
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// プリフライトリクエスト（確認）の場合は何もしない
	if r.Method == "OPTIONS" {
		return
	}

	// 鍵をかける（同時に書き換えられないように）
	mu.Lock()
	defer mu.Unlock()

	// POST（書き込み）ならカウントを増やす
	if r.Method == "POST" {
		count++
		fmt.Printf("Count updated: %d\n", count)
	}

	// 現在のカウントをJSONで返す
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(CountResponse{Count: count})
}

func main() {
	// "/count" というURLにアクセスが来たら countHandler を動かす
	http.HandleFunc("/count", countHandler)

	fmt.Println("Go Server is running on http://localhost:8080")
	// 8080番ポートでサーバーを起動
	log.Fatal(http.ListenAndServe(":8080", nil))
}

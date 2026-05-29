## 【UI】
### フォーカス状態の更新ができない問題
この現象は、ブラウザがバックグラウンドで待機したままの状態でホーム画面ショートカットからWebツールを再度開いたときに発生します。この場合、ブラウザ内部では既存のタブを前面に戻しただけと判断されることがあり、フォーカス状態の再評価が行われず `document.hasFocus()` が `false` のまま残ることがあります。一方、ブラウザを完全に終了した状態からショートカットを起動した場合は新規にページが表示されるため、通常はフォーカス状態も正しく `true` になります。なお、Webページ側から `document.hasFocus()` を直接 `true` に変更することはできず、画面のタップやタブ切り替えなどのユーザー操作によってブラウザがフォーカスを再判定する必要があります。また、`location.reload()` によるリロードで改善する場合もありますが、フォーカス状態の更新はブラウザ依存であり、確実な解決策にはなりません。

## 【JavaScript】
◆Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
・どこで起きたか：bookmark.js のトップレベルで bookmark.addEventListener(...) を実行した時
・何が原因か：モジュールがインポートされた時点では #bookmark 要素がまだ DOM に存在しない ため、bookmark が null になり、addEventListener が例外を投げた
・影響：例外がスクリプト評価を中断し、同じ <script type="module"> 内の renderKatex、addBackToTopLinks などの残りのコードが実行されなくなった
・対策：要素取得とハンドラ登録を遅延させて、インポート側で DOMContentLoaded 後に呼び出す


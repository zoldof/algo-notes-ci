## 【UI】
### フォーカス状態の更新ができない問題
この現象は、ホーム画面のショートカットから同一ブラウザの Web ページを再度開いたときに起こります。ブラウザがバックグラウンドから復帰しただけで、既存のタブを前面に持ち上げたと判断すると、内部では「タブの切り替え」が行われず、document.hasFocus() が false のままになることがあります。完全にブラウザを終了した状態からショートカットを起動すれば新規タブが生成され、フォーカスは正しく true になるのが一般的です。対策としては、ページロード後にユーザー操作（タップやクリック）をトリガーにしたイベントリスナーを設定し、フォーカス取得を促す方法が有効です

## 【JavaScript】
◆Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
・どこで起きたか：bookmark.js のトップレベルで bookmark.addEventListener(...) を実行した時
・何が原因か：モジュールがインポートされた時点では #bookmark 要素がまだ DOM に存在しない ため、bookmark が null になり、addEventListener が例外を投げた
・影響：例外がスクリプト評価を中断し、同じ <script type="module"> 内の renderKatex、addBackToTopLinks などの残りのコードが実行されなくなった
・対策：要素取得とハンドラ登録を遅延させて、インポート側で DOMContentLoaded 後に呼び出す


# JIRA用ブックマークレット集
## 使い方
min.jsファイルの内容をコピーし、ブックマークのURL欄に貼り付ける。

## ブックマークレットの種類

### チケット番号をEXCELリンク形式でコピー
チケットを開いている状態でブックマークレットを実行すると、EXCELリンク形式でコピーされます。  
例: =HYPERLINK("https://example.com/browse/チケット番号", "チケット番号")

### バックログ拡張
バックログページに便利なボタンを追加するブックマークレットです。
- スプリントに紐づくチケットをテーブル形式でコピー
  - スプリントに紐づくチケットを[チケット番号リンク][チケットタイトル]のテーブル形式でクリックボードコピーします
- バックログ上のスプリントをすべて開閉する
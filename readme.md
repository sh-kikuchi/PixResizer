# PixResizer 

## 概要
- 画像リサイズ & フォーマット変換 CLI
- 本アプリは、指定フォルダ内の画像をユーザーが指定したサイズにリサイズし、任意のフォーマット（jpg, png, webp など）に変換する CLI ツールです。

## 技術スタック
- Node.js（javaScript）
  - 依存関係
    - inquirer
    - sharp

## 特徴
- 簡単操作: 対話形式の CLI で設定可能
- バッチ処理: フォルダ内の画像を一括変換

## 対応フォーマット(入出力共通)
- jpg, jpeg, png, webp, tiff, heic, heif, raw

## インストール
以下のコマンドを実行し、リポジトリをクローンして依存関係をインストールしてください。

```sh
# リポジトリをクローン
git clone https://github.com/sh-kikuchi/PixResizer.git
cd PixResizer

# 依存関係をインストール
npm install
```

## 使い方
1. `src/data/input/` フォルダに変換したい画像を配置する。
2. プロジェクトディレクトリで以下のコマンドを実行し、対話形式で設定を入力する。
   ```sh
   node index.js
   ```
3. `src/data/output/` フォルダに変換後の画像が保存される。

## 操作例
```
$ node index.js     
✔ 画像の幅を指定してください: 100
✔ 画像の高さを指定してください: 100
✔ 変換したい画像形式: png
変換完了: r_logo.png → r_logo.png
```

これで指定したサイズ・フォーマットに変換された画像が `src/data/output/` に保存されます。
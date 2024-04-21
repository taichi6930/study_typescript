勉強メモ（いろんなこと忘れてる）
# npm の設定
npm initでpackage.jsonを作成

# パッケージのインストール
npm install -g [package-name] でグローバルにインストール
本当はプロジェクトごとにインストールしたいが、ここでは省略

今回はTypeScriptを使うので、以下のパッケージをインストール
npm install -g typescript
バージョン確認は tsc -v

nodeを使うので、以下のパッケージをインストール
npm install -g ts-node

# TSの実行方法
1. tsc [file-name].ts でコンパイルし、node [file-name].js で実行
2. ts-node [file-name].ts で実行

# TypeScript コンパイラの設定
tsc --init で tsconfig.json を作成
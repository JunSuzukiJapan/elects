# 単純なアプリケーション

ElecTSフレームワークを使った最も簡単なElectronアプリを作ってみましょう。

このドキュメントはElectronアプリとして実行されていますので、出来れば新規のプロジェクトを作成したほうがよいでしょう。

新規プロジェクトを作成するには、シェル上で以下のコマンドを実行してください。

```
$ elects simple_project
$ cd simple_project
```

それでは具体的なコードを見ていきます。

## 変更するべきファイル

新規プロジェクトにはすでにいろいろなファイルが含まれていますが、今回使うのは

- src/app.ts
- src/html/index.html

の２つになります。

この２つのファイルさえあれば、ElecTSアプリは実行可能です。

具体的なコードを載せていきます。

### src/app.ts

このファイルは変更する必要がないかもしれませんが、念のためコードを載せておきます。

```typescript:src/app.ts
/// <reference path="../typings/github-electron/github-electron.d.ts" />
/// <reference path="ts/base_browser_window.ts" />
/// <reference path="ts/base_application.ts" />

class MyApplication extends BaseApplication {
}

const app: GitHubElectron.App = electron.app;
const myapp = new MyApplication(app, {width: 400, height: 600});
```

### src/html/index.html

```html:src/html/index.html
<!DOCTYPE html>
<html>
<head>
  <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

## コンパイル　＆　実行

上記の２つのファイルに修正を加えたら、コンパイルして実行してみましょう。

コンパイルの前に依存するパッケージをインストールする必要があります。
プロジェクト直下のディレクトリで、

```
$ npm install
```

を実行してください。

次に、コンパイルします。

```
$ gulp compile
```

出来上がったアプリを実行するには、

```
$ gulp run
```

です。

Electronアプリが立ち上がり、画面に'Hello, World!'が表示されれば成功です。


## 不要なファイル

この単純なアプリを実行するだけでしたら、不要なファイルがいくつかあります。
念のため、削除しても良いファイルをあげておきます。

- ```src/html/``` ディレクトリ内の```index.html```以外のファイルとフォルダ
- ```src/markdown/```フォルダ

以上が削除しても大丈夫なものになります。

気になる方は削除しても良いでしょう。

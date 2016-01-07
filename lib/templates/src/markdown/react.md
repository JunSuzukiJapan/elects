# Reactを使ったプログラミング

## はじめに

以下の記事は、```src/html/ts```フォルダ内の.ts(.tsx)ファイルでReactを扱う話です。

>Electronアプリを作る時、絶対にReactを使う必要があるわけではありません。
>この記事はあくまで参考のために書かれています。

## Reactのインポート

まずはReact.jsを読み込まなくてははじまりません。
TypeScriptでの読み込み方は以下のように書きます。

### MyComponent.tsx

```typescrit:MyComponent.tsx
import React = require('react');
```

## React.Componentを継承したクラスを作成

TypeScriptでReactのコンポーネントを作成するには、React.Componentを継承したクラスを作ります。

基本的な雛形は以下のようになります。

```typescript:MyComponent.tsx
export class MyComponent extends React.Component {
}
```

## render関数を実装

上記のMyComponentクラスだけでは、何もできないので独自の動作を追加していきましょう。

何は無くとも、render()関数を実装しましょう。
たとえば、JSX(TSX)形式で書いたHTML（を表すオブジェクト）を返す関数にしてみます。

```typescript:MyComponent.tsx
    render(){
        return (<h1>Hello</h1>);
    }
```

## state

Reactでは、コンポーネントクラスの状態の変化によって、動作を変えるというのがパターンになっています。

状態は、```this.state```に保持します。

また、状態を変化させる場合には、```this.setState({...})```を呼び出し、システム(React)に再レンダリングが必要なことを通知します。

このとき、```this.state```を直接変更してはいけません。システムが再レンダリングが必要であることを認識できないからです。

```this.state``` の初期化はクラス内に以下のような感じに書きます。

```
    state = {
        maximize: false,
        filename: ''
    }
```

>getInitialState()関数を使う手もありますが、このように書くほうが早いと思います。

## constructor & props

プロパティについて説明します。

たとえば、.jsx(.tsx)ファイルで

```html:
<MyComponent filename="foo.txt" />
```

と書いたとき、MyComponentクラスのコンストラクタに、

```
{
    filename: "foo.txt"
}
```

という値が渡されてきます。
これをコンストラクタで受け取ってみましょう。

```
    constructor(props){
        super(props);  // 親クラスのコンストラクタを呼び出す（必須）。

        this.state.filename = props.filename;  // this.stateに保持しておく。
    }
```

## プロパティの型定義

プロパティは型を宣言しておくこともできます。
型を宣言しておくと、型のあわない値を代入しようとしたときにReactがエラーメッセージを出すのでなるべく書いておくほうがよいでしょう。

型定義は、

```typescript:
static propTypes = {
    filename: React.PropTypes.string.isRequired,
    maximize: ReactPropTypes.boolean
}
```

のように書きます。

```.isRequired``` は必須パラメータにつけます。つけない場合にはオプション扱いです。

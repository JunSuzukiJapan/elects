# React Bootstrap

React-Jadeでデザインをしていて、Twitter Bootstrapのように簡単にレイアウトをしたいときがあると思います。

Twitter Bootstrapをそのまま使うとReactとは相性が悪いので、React-Bootstrapを使います。

ここでは、React-JadeでReact-Bootstrapを使う方法を簡単に書いておきます。

## 使用例

```jade:some.jade
- var ReactBootstrap = require('react-bootstrap');
- var Grid = ReactBootstrap.Grid;
- var Row = ReactBootstrap.Row
- var Col = ReactBootstrap.Col;

div(className="navbar navbar-inverse navbar-fixed-top")
    div(className="container")
        div(className="navbar-header")
            a(href="" className="navbar-brand") Header Title
```

上記のように、

```jade:
- var ReactBootstrap = require('react-bootstrap');
```

で、React-Bootstrapを読み込んでおいて、

```jade:
- var Grid = ReactBootstrap.Grid;
- var Row = ReactBootstrap.Row
- var Col = ReactBootstrap.Col;
```

のように使いたいコンポーネントを```var```に代入しておくのがよいでしょう。

>.jadeファイル内で```-```を書いた後ろにはJavaScriptの式をそのまま記述できます。

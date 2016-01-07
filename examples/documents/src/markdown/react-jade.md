# React Jade

Reactを使った場合、デザイン（HTML）をソースコード内に書くことになり、デザインが見づらくなります。

それを回避するために、React-Jadeを使うことをお勧めします。
React-JadeはReactと連携するために作られたテンプレートエンジンです。

## React-Jadeの記法

React-Jadeでは、以下のようにJadeと似たような記述ができます。

```jade:template.jade
div(className="foo")
    h1 Hello
```

## テンプレートのレンダリング

.jadeで記述されたファイルは、コンパイル後にTypeScript(JavaScript)から読み込むことで使用できます。

たとえば、以下のような感じに使用します。

```typescript:
  render(){
    // 'template'は.jadeのファイル名から拡張子を除いたもの
    const template = require('template');
    // テンプレートを元にレンダリングする。
    return template();
  }
```

## TypeScriptとの連携

React-Jadeでは、.jadeで書かれたファイルから、TypeScript(JavaScript)の関数を直接呼び出すことが可能です。

たとえば、.jadeファイルに

```jade:
div(onClick=someFunction)
```

のように書いておいて、.ts(.js)ファイルに以下のように書いておけば、

```typescript:
class MyComponent extends React.Component {
  // ...

  onClick(){
    console.log('click');
  }

  render(){
    const template = require(template_filename);
    return template({
        onClick: this.onClick.bind(this)
    });
  }
}
```

.jadeファイルで書かれたdivがクリックされると、TypeScript側のonClick()関数が呼び出されます。

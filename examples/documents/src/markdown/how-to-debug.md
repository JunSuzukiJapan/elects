# How to debug

作成したアプリのデバッグ方法について説明します

Electronアプリを起動したら、```alt+command+I```キーを押すか、
メニューから、View->Toggle Developer Toolsを選択してください。

そうすると、Developer Toolsが表示されます。

Developer Toolsで、ブレイクポイントを設定したり、cssを確認したりして、デバッグに役立ててください。

## ブレイクポイント

ブレイクポイントを設定しても、そのままでは何も反応しません。
そんな時は、```command+R```キーを押して再読み込みをするとよいでしょう。

再読み込みすると、アプリケーションを最初から実行しなおし、ブレイクポイントに来たら実行が停止します。
実行が停止したら、Developer Toolsでコンソールを表示して、現在の変数の値などを確認できます。    

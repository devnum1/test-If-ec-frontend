## mock/api 以下の説明

- API の置き換えのため、一時的に現在叩いている API の返却値を mock したい
- store/以下の actions で現状の API を叩いているのでそこを置き換えれるような値を返す関数をこのディレクトリ以下に格納する。
- 関数の命名は mock{現状 actions から呼び出している API の endpoint 名}

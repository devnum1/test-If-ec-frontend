# Open API

## swagger_bff_all_v3.yaml

insureMO さんから受領した Swagger 2.0 の API 仕様を OpenAPI 3.0 に変換したファイル

> $ npm install -g swagger2openapi

> $ swagger2openapi --outfile swagger_bff_all_v3.yaml swagger_bff_all.yaml

### 書き換えが必要な項目

- url: //localhost → 　 - url: http://localhost:8003
- "_/_":　 → 　 application/json:

### 参考情報

- [eBaoTech / Japan-LittleFamily-Doc](https://github.com/eBaoTech/Japan-LittleFamily-Doc/tree/main/for-onsite-dev/05-EC%E5%AF%BE%E5%BF%9C/II%20API)
- [Swagger 2.0 の API 仕様を OpenAPI 3.0 に変換](https://qiita.com/omineyu/items/fcde0b8800d9e9bd1b14)

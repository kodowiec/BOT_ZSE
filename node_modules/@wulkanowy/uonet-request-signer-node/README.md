# Uonet+ request signer for Node.js

[![npm](https://img.shields.io/npm/v/@wulkanowy/uonet-request-signer-node.svg?style=flat-square)](https://www.npmjs.com/package/@wulkanowy/uonet-request-signer-node)

## Instalation

```bash
$ npm i @wulkanowy/uonet-request-signer-node
```

[Browser version](https://www.npmjs.com/package/@wulkanowy/uonet-request-signer)

## Usage

```js
const signer = require("@wulkanowy/uonet-request-signer");

signer.signContent(password, certificate, content).then(signed => {
    console.log(signed);
});
```

## Tests

```bash
$ npm run test
```

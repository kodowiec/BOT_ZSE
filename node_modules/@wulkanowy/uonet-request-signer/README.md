# Uonet+ request signer for JavaScript

[![npm](https://img.shields.io/npm/v/@wulkanowy/uonet-request-signer.svg?style=flat-square)](https://www.npmjs.com/package/@wulkanowy/uonet-request-signer)

## Instalation

```bash
$ npm i @wulkanowy/uonet-request-signer
```

[Browser demo](https://wulkanowy.github.io/uonet-request-signer/)

## Usage

In browser:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/forge/0.8.2/forge.min.js"></script>
<script src="signer.js"></script>
<script>
    signer.signContent(password, certificate, content).then(signed => {
        console.log(signed);
    });
</script>
```

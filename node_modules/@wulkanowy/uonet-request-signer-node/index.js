const signer = require("@wulkanowy/uonet-request-signer/signer");

forge = require('node-forge');
crypto = new (require('node-webcrypto-ossl'));

function signContent(password, certificate, content) {
    return signer.signContent(password, certificate, content);
}

module.exports = { signContent };

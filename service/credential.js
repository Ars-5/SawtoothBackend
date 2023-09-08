const { randomBytes, createHash } = require('crypto')
const secp256k1 = require('secp256k1')
const { Secp256k1PrivateKey } = require('sawtooth-sdk-js/signing/secp256k1');
const { CryptoFactory, createContext } = require('sawtooth-sdk-js/signing')


const getSigner = (privateKeyHex) => {
    // Creando la instancia para la llave privada en clase interna
    const privateKey = new Secp256k1PrivateKey(Buffer.from(privateKeyHex, 'hex'));
    const context = createContext('secp256k1');

    // Create el signer para firmar el payload
    const signer = new CryptoFactory(context).newSigner(privateKey);

    return signer;
}
exports.createPrivateKey = () => {
    let privKey
    do {
        privKey = randomBytes(32)
    } while (!secp256k1.privateKeyVerify(privKey))
    const signer = getSigner(privKey.toString('hex'))

    return {
        privateKey: privKey.toString('hex'),
        publicKey: signer.getPublicKey().asHex()
    }
}


exports.getSigner = getSigner;


// exports.createPrivateKey = () => {
//   const msg = randomBytes(32);
//   let privKey;
//   do {
//     privKey = randomBytes(32);
//   } while (!secp256k1.privateKeyVerify(privKey));
//   const pubKey = secp256k1.publicKeyCreate(privKey);
//   const sigObj = secp256k1.ecdsaSign(msg, privKey);
//   console.log(secp256k1.ecdsaVerify(sigObj.signature, msg, pubKey));
//   c
//   return {
//     privateKey: privKey.toString('hex'),
//     publicKey: pubKey.toString('hex'),
//   }
// };
const { createHash } = require('crypto')
const axios = require('axios').default;
const protobuf = require('sawtooth-sdk-js/protobuf');
const User = require('../schemas/user');
const { family } = require('../constants_user');
const { getSigner } = require('./credential');

const sendTransactionSaw = async (payload, signerPublicKey) => {
    const user = await User.findOne({
        publicKey: signerPublicKey
    })
    if (!user) {
        throw new Error('User key does not exist')
    }
    const signer = getSigner(user.privateKey)

    // Convierte el objeto payload directamente en un búfer
    const payloadBytes = Buffer.from(JSON.stringify(payload));

    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
        familyName: family.name,
        familyVersion: family.version,
        inputs: [family.namespace],
        outputs: [family.namespace],
        signerPublicKey,
        nonce: `${Math.random()}`,
        batcherPublicKey: signerPublicKey,
        dependencies: [],
        // Usa los datos en bruto del payload para calcular el hash SHA-512
        payloadSha512: createHash('sha512').update(payloadBytes).digest('hex')
    }).finish()

    const transaction = protobuf.Transaction.create({
        header: transactionHeaderBytes,
        headerSignature: signer.sign(transactionHeaderBytes),
        payload: payloadBytes
    })

    const transactions = [transaction];

    const batchHeaderBytes = protobuf.BatchHeader.encode({
        signerPublicKey,
        transactionIds: transactions.map(t => t.headerSignature)
    }).finish();

    const batch = protobuf.Batch.create({
        header: batchHeaderBytes,
        headerSignature: signer.sign(batchHeaderBytes),
        transactions: transactions
    })
    const batches = [batch];
    const batchListBytes = protobuf.BatchList.encode({
        batches: batches
    }).finish();

    // Envía la transacción como una solicitud POST
    return axios.post('http://localhost:8008/batches', batchListBytes, {
        headers: {
            'Content-Type': 'application/octet-stream'
        },
    });
}

module.exports = {
    sendTransactionSaw,
}

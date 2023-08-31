
const { TransactionProcessor } = require('sawtooth-sdk-js/processor');
const IntegerKeyHandler = require('./handler/intkey');
// const IntegerKeyHandler = require('./handler/intkey');

const VALIDATOR_URL = 'tcp://localhost:4004'
const transactionProcessor = new TransactionProcessor(VALIDATOR_URL)
console.log('encendido');

transactionProcessor.addHandler(new IntegerKeyHandler());

transactionProcessor.start();

//handle stop process
process.on('SIGUSR2', () => {
    transactionProcessor._handleShutdown();
})

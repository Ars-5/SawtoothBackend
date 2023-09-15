const { TransactionHandler } = require("sawtooth-sdk-js/processor/handler");
const { InvalidTransaction } = require("sawtooth-sdk-js/processor/exceptions");
const { family, actions } = require("../constants_user");
const { hash } = require("../utils");

class UserBLockHandler extends TransactionHandler {
  constructor() {
    super(family.name, [family.version], [family.namespace]);
  }

  async apply(transactionProcessRequest, context) {
    let payload;
    try {
      payload = JSON.parse(transactionProcessRequest.payload);
      console.log("Payload:", payload);
    } catch (error) {
      throw new InvalidTransaction(
        "Errored while decoding payload" + error.message
      );
    }
    if (!payload.action) {
      throw new InvalidTransaction("Invalid Action Type");
    }
  
    switch (payload.action) {
      case actions.register_user:
        const { name, lastname, dni, faculty, modality, owner } = payload;
        const userAddress = family.namespace + hash(owner).slice(-64);
  
        // Verifica si ya existe un usuario con el mismo DNI en el estado
        const existingUserData = await context.getState([userAddress]);
        if (existingUserData[userAddress] && existingUserData[userAddress].length > 0) {
          throw new InvalidTransaction("User with the same DNI already exists");
        }
  
        // Si no existe, guarda el nuevo usuario en el estado
        const user = {
          name,
          lastname,
          dni,
          faculty,
          modality,
          owner,
        };
  
        await context.setState({
          [userAddress]: Buffer.from(JSON.stringify(user)),
        });
        console.log("User Data Saved:", user);
        console.log("el addres:", userAddress);
        break;
      default:
        throw new InvalidTransaction("Invalid Action Type");
    }
  }
}

module.exports = UserBLockHandler;

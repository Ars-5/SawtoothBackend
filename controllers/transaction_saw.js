const { actions } = require("../constants_user");
const { sendTransactionSaw } = require("../service/transaction_saw");

exports.registerUserBlock = (req, res) => {
    const { name, lastname, dni, faculty, modality } = req.body; // Recupera los datos del cuerpo de la solicitud

    const payload = {
        name,
        lastname,
        dni,
        faculty,
        modality,
        owner: req.user.publicKey,
        action: actions.register_user, 
    }

    return sendTransactionSaw(payload, req.user.publicKey).then((result) => {
            console.log(result.data);
            res.json(result.data)
        })
        .catch((err) => {
            res.status(400).json(err && err.response ? err.response.data : err.message);
        });
}
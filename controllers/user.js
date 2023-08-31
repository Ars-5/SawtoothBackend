const {createPrivateKey} =require('../service/credential')

const users = {
    
}

exports.registerUser = (req,res) =>{
    const privateKey = createPrivateKey();
    const {userId} = req.body;
    if(users[userId]){
        return res.status(409).json({
            message: 'Usuario ya existe'
        })
    }
    users[req.body.userId] = privateKey;
    res.json({
        userId: req.body.userId,
        privateKey,
    })
}

exports.listUsers = (req, res) => {
    const userList = Object.keys(users);
    res.json(userList);
};
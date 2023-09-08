const User = require ('../schemas/user');
const { createPrivateKey } =require('../service/credential')
const registerUserSchema = require('../validations/register-user')
const loginUserSchema = require('../validations/login-user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')


exports.loginUser = async (req, res) => {
    const valid = loginUserSchema.validate(req.body);
    if (valid.error) {
        // TODO meaningful error insight
        return res.json(valid.error.details).status(400);
    }
    const { username, password } = valid.value
    const user = await User.findOne({
        username,
        password,
    })
    if (!user) {
        return res.status(400).json({
            message: 'Usuario o contraseñas incorrectas'
        })
    }
    const { publicKey } = user;
    const token = jwt.sign({
        username,
        publicKey
    }, SECRET, {
        expiresIn: '1800s'
    })
    return res.json(
        {
            access_token: token
        }
    )
}

exports.registerUser = async (req, res) => {
    const valid = registerUserSchema.validate(req.body);
    if (valid.error) {
        // TODO meaningful error insight
        return res.json(valid.error.details).status(400);
    }
    const user = await User.findOne({
        username: req.body.username
    })
    if (user) {
        return res.status(409).json({
            message: 'Usuario ya existe'
        })
    }
    const { privateKey, publicKey } = createPrivateKey();
    const { username, name, password } = valid.value;
    await User.create({
        username,
        name,
        password,
        privateKey,
        publicKey
    })
    res.json({
        name,
        username,
        password,
        publicKey,
    })
}

exports.listUsers = (req, res) => {
    const userList = Object.keys(users);
    res.json(userList);
};

exports.getUserByUsername = async (req, res) => {
    try {
      const { username } = req.params;
      // Buscar al usuario por su nombre de usuario en la base de datos
      const user = await User.findOne({ username });
  
      if (!user) {
        // Si el usuario no se encuentra, devolver un error 404 (No encontrado)
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Devolver los componentes del usuario en la respuesta
      const { name, password, privateKey, publicKey } = user;
      return res.json({
        username,
        name,
        password,
        privateKey,
        publicKey,
      });
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
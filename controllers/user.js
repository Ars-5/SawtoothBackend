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
    const { mail, password } = valid.value
    const user = await User.findOne({
        mail,
        password,
    })
    if (!user) {
        return res.status(400).json({
            message: 'Usuario o contraseñas incorrectas'
        })
    }
    const { publicKey } = user;
    const token = jwt.sign({
        mail,
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
        return res.json(valid.error.details).status(400);
    }
    const user = await User.findOne({
        mail: req.body.mail
    })
    if (user) {
        return res.status(409).json({
            message: 'Usuario ya existe'
        })
    }
    const { privateKey, publicKey } = createPrivateKey();
    const { mail, name, lastname, dni, phone, password } = valid.value;
    await User.create({
        mail,
        name,
        lastname,
        dni,
        phone,
        password,
        privateKey,
        publicKey,
    })
    res.json({
        mail,
        name,
        lastname,
        dni,
        phone,
        publicKey,
    })
}

exports.getUserByMail = async (req, res) => {
    try {
      const { mail } = req.body; // Lee el valor del correo electrónico desde el cuerpo de la solicitud
      // Buscar al usuario por su correo de usuario en la base de datos
      const user = await User.findOne({ mail });
  
      if (!user) {
        // Si el usuario no se encuentra, devolver un error 404 (No encontrado)
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Devolver los componentes del usuario en la respuesta
      const { name, password, privateKey, publicKey } = user;
      return res.json({
        mail,
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
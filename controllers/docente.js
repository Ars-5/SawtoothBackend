const User = require("../schemas/user");
const { createPrivateKey } = require("../service/credential");
const registerUserSchema = require("../validations/register-user");
const loginUserSchema = require("../validations/login-user");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

exports.loginDocente = async (req, res) => {
  const valid = loginUserSchema.validate(req.body);
  if (valid.error) {
    // TODO meaningful error insight
    return res.json(valid.error.details).status(400);
  }
  const { mail, password } = valid.value;
  const user = await User.findOne({
    mail,
    password,
  });
  if (!user) {
    return res.status(400).json({
      message: "Usuario o contraseñas incorrectas",
    });
  }
  const { publicKey } = user;
  const token = jwt.sign(
    {
      mail,
      publicKey,
    },
    SECRET,
    {
      expiresIn: "1800s",
    }
  );
  return res.json({
    access_token: token,
  });
};

exports.registerDocente = async (req, res) => {
  const valid = registerUserSchema.validate(req.body);
  if (valid.error) {
    return res.json(valid.error.details).status(400);
  }
  const user = await User.findOne({
    mail: req.body.mail,
  });
  if (user) {
    return res.status(409).json({
      message: "Docente ya existe",
    });
  }
  const { privateKey, publicKey } = createPrivateKey();
  const { mail, name, lastname, dni, phone, password , faculty, modality} = valid.value;
  await User.create({
    mail,
    name,
    lastname,
    dni,
    phone,
    password,
    faculty,
    privateKey,
    publicKey,
  });
  res.json({
    mail,
    name,
    lastname,
    dni,
    phone,
    password,
    faculty,
    publicKey,
  });
};

exports.getUserByMail = async (req, res) => {
  try {
    const { mail } = req.body; // Lee el valor del correo electrónico desde el cuerpo de la solicitud
    // Buscar al usuario por su correo de usuario en la base de datos
    const user = await User.findOne({ mail });

    if (!user) {
      // Si el usuario no se encuentra, devolver un error 404 (No encontrado)
      return res.status(404).json({ message: "Usuario no encontrado" });
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
    console.error("Error al buscar el usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.updateUser = async (req, res) => {
    try {
      const { dni } = req.params; // Obtiene el DNI del parámetro de la URL
      const { faculty, modality } = req.body; // Obtiene los campos a actualizar desde el cuerpo de la solicitud
  
      // Verificar si el DNI está presente en la URL
      if (!dni) {
        return res.status(400).json({ message: "Falta el DNI en la URL" });
      }
  
      // Verificar si se proporciona un cuerpo en la solicitud
      if (!faculty && !modality) {
        return res.status(400).json({ message: "Falta el cuerpo de la solicitud (faculty y modality)" });
      }
  
      // Buscar al usuario por su DNI en la base de datos
      const user = await User.findOne({ dni });
  
      if (!user) {
        // Si el usuario no se encuentra, devolver un error 404 (No encontrado)
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Actualizar los campos en el usuario
      if (faculty) {
        user.faculty = faculty;
      }
      if (modality) {
        user.modality = modality;
      }
  
      // Guardar los cambios en la base de datos
      await user.save();
  
      // Devolver la respuesta con los campos actualizados
      return res.json({
        dni,
        faculty: user.faculty,
        modality: user.modality,
      });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  


exports.getUserByDNI = async (req, res) => {
    try {
        const { dni } = req.params; // Obtiene el DNI del parámetro de la URL
        // Buscar al usuario por su DNI en la base de datos
        const user = await User.findOne({ dni });
    
        if (!user) {
          // Si el usuario no se encuentra, devolver un error 404 (No encontrado)
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
    
        // Devolver la respuesta con los campos actualizados
        const { name, password, privateKey, publicKey } = user;
    return res.json({
      name,
      password,
      privateKey,
      publicKey,
    });

      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
      }
};

exports.updateUserByDNI = async (req, res) => {
    try {
      const { dni } = req.params; // Obtiene el DNI del parámetro de la URL
  
      // Verificar si el DNI está presente en la URL
      if (!dni) {
        return res.status(400).json({ message: "Falta el DNI en la URL" });
      }
  
      // Realiza la búsqueda del usuario por DNI aquí
      // Puedes agregar la lógica necesaria para buscar al usuario en la base de datos
  
      // Simplemente retornamos un mensaje para este ejemplo
      return res.json({ message: "PUT funcionando" });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
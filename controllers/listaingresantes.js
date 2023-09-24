const Lista = require("../schemas/listaingresantes");

exports.registerLista = async (req, res) => {
  // Verificamos si el informe ya existe por su identificador único
  const id = req.body._id;
  const informeExistente = await Lista.findOne({ id });

  if (informeExistente) {
    return res.status(409).json({ message: "El informe ya existe" });
  }

  // Crear un nuevo informe de notas
  const nuevoInforme = new Lista(req.body);

  try {
    const informeGuardado = await nuevoInforme.save();
    res.status(201).json({ message: "Informe de notas registrado con éxito", informe: informeGuardado });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el informe de notas", error });
  }
};

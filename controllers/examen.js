const { SECRET } = require("../config");
const registerExamSchema = require("../validations/register-exam");
const Examen = require("../schemas/examen");
const User = require("../schemas/user");

exports.registerExam = async (req, res) => {
  const valid = registerExamSchema.validate(req.body);
  if (valid.error) {
    return res.json(valid.error.details).status(400);
  }
  const exam = await Examen.findOne({
    dni: req.body.dni,
  });
  if (exam) {
    return res.status(409).json({
      message: "Usuario ya dio examen",
    });
  } else if (!exam) {
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  }
  const { dni, name, lastname, date, p1, p2, p3, p4, p5 } = valid.value;
  await Examen.create({
    dni,name,lastname,date,p1,p2,p3,p4,p5,
  });
  res.json({
    dni,name,lastname,date,p1,p2,p3,p4,p5,
  });
};

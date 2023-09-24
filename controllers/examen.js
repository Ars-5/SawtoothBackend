const registerExamSchema = require("../validations/register-exam");
const Examen = require("../schemas/examen");

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
  } 
  
  const { dni, name, lastname, date, p1, p2, p3, p4, p5 } = valid.value;
  await Examen.create({
    dni,name,lastname,date,p1,p2,p3,p4,p5,
  });
  res.json({
    dni,name,lastname,date,p1,p2,p3,p4,p5,
  });
};

const { Sequelize, Op } = require("sequelize");
const Students = require("../model/student");

const getAll = async () => {
try {
    return await Students.findAll({
    where: {
        deleted: 0,
    },
    attributes: {
        exclude: "deleted",
    },
    });
} catch (err) {
    console.error(`Error in studentsRepository: ${err}`);
    throw err;
}
};

const getById = async (id) => {
try {
    return await Students.findByPk(id, {
    where: {
        deleted: 0,
    },
    attributes: {
        exclude: "deleted",
    },
    });
} catch (err) {
    console.error(`Error in studentsRepository: ${err}`);
    throw err;
}
};
//create new student
const createNewStudent = async (student) => {
  try {
    // Verifica si ya existe un estudiante con el mismo email o dni y está activo
    const existsStudent = await Students.findOne({
      where: {
        [Op.or]: [{ email: student.email }, { dni: student.dni }],
        deleted: 0,
      },
    });

    if (existsStudent) {
      throw new Error(`Ya existe un estudiante con ese email o dni`);
    }

    // Verifica si el estudiante existe pero está marcado como eliminado
    const deletedStudent = await Students.findOne({
      where: {
        [Op.or]: [{ email: student.email }, { dni: student.dni }],
        deleted: 1,
      },
    });

    if (deletedStudent) {
      deletedStudent.deleted = 0; // Reactiva el estudiante
      await deletedStudent.save(); // Guarda los cambios
      return deletedStudent; // Devuelve el estudiante reactivado
    }

    // Busca el último estudiante (activo o eliminado)
    const lastStudent = await Students.findOne({
      where: { deleted: { [Op.or]: [0, 1] } },
      order: [["sid", "DESC"]],
    });

    // Calcula el nuevo SID
    const newSid = lastStudent ? lastStudent.sid + 1 : 1;

    // Crea un nuevo estudiante
    student = {
      ...student,
      sid: newSid,
      createdAt: new Date(),
    };

    const newStudent = await Students.create(student);
    return newStudent;

  } catch (err) {
    console.error(`Error in studentsRepository: ${err.message}`);
    throw err;
  }
};

const deleteBySid = async (sid) => {
  try {
    return await Students.update(
      { deleted: 1 },
      {
        where: { sid: sid },
      }
    );
  } catch (err) {
    console.error(`Error in studentsRepository: ${err}`);
    throw err;
  }
};

const getStudentsPagination = async (search, currentPage, pageSize) => {
  try {
    const offset = (currentPage - 1) * pageSize;
    return await Students.findAndCountAll({
      where: {
        lastName: {
          [Op.startsWith]: search,
        },
        deleted: 0,
      },
      limit: pageSize,
      offset,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};


module.exports = {
  getAll,
  getById,
  createNewStudent,
  deleteBySid,
  getStudentsPagination,
};

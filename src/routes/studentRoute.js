const {Router} = require('express');
const {getStudentsPages, createStudent, deleteStudent} = require('../services/studentService');
const {validateBody, validateBySid} = require('../middleware/studentMiddleware')
const routerStudents = Router();

//** Definimos todas las rutas */
/**obtener todos */
routerStudents.get('/', async (req, res) => {
    try{
        const searchValue = req.query.search ? req.query.search : '';
        const currentPage = req.query.currentPage ? req.query.currentPage : 1;
        const pageSize = req.query.pageSize ? req.query.pageSize : 5;
        const students = await getStudentsPages(searchValue,parseInt(currentPage),parseInt(pageSize));
        res.json(students);
    }catch(err){
        res.status(500).json({message: `Error al devolver datos ${err}`});
    }
});

//Crear
routerStudents.post('/', validateBody, async (req, res) => {
    try{
    const newStudent = await createStudent(req.body);
    res.json(newStudent);
    } catch(err){
        res.status(404).json({message: `Ya existe un estudiante con ese email o dni`,
        });
    }
});
//borrar por sid
routerStudents.delete('/:sid', validateBySid, async (req, res) => {
    try {
        const result = await deleteStudent(req.params.sid);
        if (result) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
            res.status.json({message: `Error al borrar ${err}`})
    }
});


module.exports = routerStudents;
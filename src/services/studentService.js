StudentsRepository = require('../repository/studentRepository');

//obtener todos
const getStudents = async () => {
    try{
    const students = await StudentsRepository.getAll();
    return students;
    } catch(err) {
        console.error(`Error in studentsService ${err}`);
        throw err;
    }
};
//Create student
const createStudent = async (student) => {
    try{
    const newStudent = await StudentsRepository.createNewStudent(student);
    return newStudent;
    } catch(err){
        console.error(`Error in studentsService ${err}`);
        throw err;
    }
};
//delete student
const deleteStudent = async (sid) => {
    try {
        const result = await StudentsRepository.deleteBySid(sid);
        return result;
    } catch (err) {
        console.error(`Error in studentsService ${err}`);
        throw err;
    }
};

const getStudentsPages = async (search, currentPage, pageSize) => {
    try{
        return await StudentsRepository.getStudentsPagination(search, currentPage, pageSize);
    } catch(err){
        console.error(`Error in studentsService ${err}`);
        throw err;
    }
}


module.exports = {
    getStudents,
    createStudent,
    deleteStudent,
    getStudentsPages,

}
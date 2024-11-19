const Students = require('../model/student');
const {getInstance} = require('./setupDB');

const setupModel = async () => {
const instanceDb = await getInstance();
Students.init(instanceDb);
};
setupModel();
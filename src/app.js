const express = require('express');
const morgan = require('morgan');
const routerStudents = require('./routes/studentRoute');
const app = express();
require('./config/setupModel');

//Settings
app.set('port',3000);

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/students',routerStudents);

app.use((req, res) => {
    res.send(`No se encontro tu pagina`);
});
//Connection
app.listen(app.get('port'));
console.log(`Connection in port ${app.get('port')}`);
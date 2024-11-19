const validateBody = (req, res, next) => {
    const firstname = req.body.firstname;
    const lastName = req.body.lastName;
    const dni = req.body.dni;
    const email = req.body.email;

    if(!firstname || !lastName || !dni || !email) {
        return res.status(404).json({message: `Error in body ${req.body}`});
    }
    next();
};

const validateBySid = (req, res, next) => {
const sid = req.params.sid;
if(!sid) {
    return res.status(404).json({message: `Sid is incorrect ${sid}`});
}
next();
}

module.exports = {
validateBody,
validateBySid,
}
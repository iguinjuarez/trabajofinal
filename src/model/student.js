const { Model, DataTypes } = require("sequelize");

class Students extends Model {
static init = (sequelize) => {
    super.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        },
        sid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        },
        firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        deleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        values: [0, 1],
        },
        createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        },
        updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        },
    }, //end init
    {
        sequelize,
        modelName: "students",
        timestamps: false,
    }
    );
    return this;
};
}

module.exports = Students;

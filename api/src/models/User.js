// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("User",
    {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true,
        },
        name:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_Admin:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        timestamps: false,
    });
};
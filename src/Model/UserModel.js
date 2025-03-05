import { DataTypes } from "sequelize";
import sequelize from "../DB/SeqConnection.js";


const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 },{
    tableName: "users",
    timestamps: false
});

export default UserModel;
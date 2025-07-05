import {DataTypes, Model} from "sequelize";
import { emailRegexp } from "../schemas/authSchemas.js";
import sequelize from "./sequelize.js";
import User from "./User.js";



class Contact extends Model {
}

Contact.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        match: emailRegexp
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
},
{
    sequelize,
    modelName: "contact",
    tableName: "contacts",
});

export default Contact;
import {DataTypes, Model} from "sequelize";
import sequelize from "./sequelize.js";
import { emailRegexp } from "../schemas/authSchemas.js";

class User extends Model {
}

User.init(
  {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      match: emailRegexp,
      unique: {
        args: true,
        msg: "Email in use",
      },
    },
    subscription: {
      type: DataTypes.ENUM,
      values: ["starter", "pro", "business"],
      defaultValue: "starter"
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
  }
);

export default User;

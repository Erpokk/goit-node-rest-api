import User from "./User.js";
import Contact from "./Contact.js";

User.hasMany(Contact, {foreignKey: 'owner', as: 'contacts'});
Contact.belongsTo(User, {foreignKey: 'owner', as: 'users'});
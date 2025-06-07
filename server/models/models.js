const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {
        type: DataTypes.ENUM('USER', 'ADMIN', 'SUPERADMIN'),
        allowNull: false,
        unique: true,
    },
})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, default: 'USER'},
})
const UserInfo = sequelize.define('user_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
})

const Company = sequelize.define('company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    service: {type: DataTypes.STRING, unique: false, allowNull: false},
    capital: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

User.hasMany(Company)
Company.belongsTo(User)

User.hasOne(UserInfo, {as: 'info'})
UserInfo.belongsTo(User)


module.exports = {
    User, UserInfo, Company, Role
}
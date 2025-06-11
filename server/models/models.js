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
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})
const UserInfo = sequelize.define('user_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull:true, defaultValue:""},
    img: {type: DataTypes.STRING, allowNull: true, defaultValue:'21077d74-6ba3-40fb-9e67-ff259800720f.png'},
})

const Company = sequelize.define('company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    service: {type: DataTypes.STRING, unique: false, allowNull: false},
    capital: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true},
})

User.hasMany(Company,{ onDelete: 'CASCADE' })
Company.belongsTo(User)


User.hasOne(UserInfo,{ onDelete: 'CASCADE' });
UserInfo.belongsTo(User);


module.exports = {
    User, UserInfo, Company, Role
}
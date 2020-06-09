import * as Sequelize from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import sequelize = require("sequelize");


/**
 *  Interface dos atributos do usuário
 */
export interface UserAttributes{
    id?: number
    name?: string
    email?: string
    passord?: string
    photo?: string
}
/**
 *  Interface para pegar password do usuario e tbm atributos do usuario, instanciando sequelize
 */
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes{
    isPassword(encodedPassord: string, password): boolean
}
/**
 *  Interface extend BaseModel
 */
export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance,UserAttributes>{}

/**
 *  Criação do model(tabela) no banco
 */
export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    const User: UserModel =
        sequelize.define('User', {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name:{
                type: DataTypes.STRING(128),
                allowNull: false
            },
            email:{
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true
            },
            password:{
                type: DataTypes.STRING(128),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            photo:{
                type: DataTypes.BLOB({
                    length: 'long'
                }),
                allowNull: true,
                defaultValue: null
            }
        })
    return User
}
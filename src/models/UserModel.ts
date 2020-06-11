import * as Sequelize from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { ModelsInterface } from "../interfaces/ModelsInterface";

/**
 *  Interface dos atributos do usuário
 */
export interface UserAttributes{
    id?: number
    name?: string
    email?: string
    passord?: string
    photo?: string
    createdAt?: string
    upddateAt?: string
}

/**
 *  Interface para pegar password do usuario e tbm atributos do usuario, instanciando sequelize
 * @param {Interface} UserAttributes
 */
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes{
    isPassword(encodedPassord: string, password): boolean
}

/**
 *  Interface para UserModel pegar atributos do BaseModel
 * @param {Interface} PostInstance
 * @param {Interface} PostAtributes
 * @extends BaseModelInterface
 */
export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance,UserAttributes>{}

/**
 *  Criação do model(tabela) no banco
 * @export Sequelize
 * @param Sequelize.Sequelize
 * @param Sequelize.DataTypes
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
        },{
            tableName: 'users',
            /**
             * Encriptando passowrd com o salt
            */
            hooks: {
                beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    const salt = genSaltSync()
                    user.passord = hashSync(user.passord, salt)
                }
            }
        })

        /**
         * Associando models {chave estrangeira}
         * @param {MODEL} ModelsInterface
        */
        User.associate = (models: ModelsInterface) => {}

        /**
         * Retornando password criptografado
        */
        User.prototype.isPassword = (encodedPassord: string, password: string): boolean => {
            return compareSync(password, encodedPassord)
        }

    return User
}
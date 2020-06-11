import * as Sequelize from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

/**
 *  Interface dos atributos do Post
 */
export interface PostAtributes{
    id?: number
    title?: string
    content?: string
    photo?: string
    author?: number
    createdAt?: string
    updatedAt?: string
}

/**
 *  Interface instância do post
 * @param {Interface} PostAtributes
 * @extends BaseModelInterface
 */
export interface PostInstance extends Sequelize.Instance<PostAtributes>{}

/**
 *  Interface para PostModel pegar atributos do BaseModel
 * @param {Interface} PostInstance
 * @param {Interface} PostAtributes
 * @extends BaseModelInterface
 */

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance, PostAtributes>{}

/**
 *  Criação do model(tabela) no banco
 * @export Sequelize
 * @param Sequelize.Sequelize
 * @param Sequelize.DataTypes
 */
export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PostModel => {

    const Post: PostModel = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title :{
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'long'
            }),
            allowNull: false
        }
    }, {
        tableName: 'posts'
    })

    /**
     * Criando chave estrangeira
     * @param {MODEL} models.user
     */
    Post.associate = (models: ModelsInterface): void =>{
        Post.belongsTo(models.User, {
            foreignKey:{
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        })
    }

    return Post
}
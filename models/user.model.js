import  {Model, DataTypes} from "sequelize";
import {DatabaseConfig} from "../config/database.js";

export class UserModel extends Model {}

    UserModel.init( {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "null",
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        apellido:  {
          type: DataTypes.STRING(30) ,
          allowNull: true
        },
        telefono:  {
          type: DataTypes.STRING(15) ,
          allowNull: true
        },
        correo:  {
          type: DataTypes.STRING(40) ,
          allowNull: true
        },
        password:  {
          type: DataTypes.STRING(40) ,
          allowNull: true
        },
        nacimiento:  {
          type: DataTypes.DATE,
          allowNull: true
        },
        genero:  {
            type: DataTypes.STRING(15) ,
            allowNull: true
        },
        nacionalidad:  {
            type: DataTypes.STRING(15) ,
            allowNull: true
        },
        ocupacion:  {
            type: DataTypes.STRING(30) ,
            allowNull: true
        },
        descripcion:  {
            type: DataTypes.STRING(300) ,
            allowNull: true
        },
        pais:  {
            type: DataTypes.STRING(30) ,
            allowNull: true
        },
        estado:  {
            type: DataTypes.STRING(30) ,
            allowNull: true
        },
        ciudad:  {
            type: DataTypes.STRING(30) ,
            allowNull: true
        },

    }, {
        sequelize: DatabaseConfig,
        tableName: 'perfil',
        timestamps: false
    }
);

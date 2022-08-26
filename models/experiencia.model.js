import  {Model, DataTypes} from "sequelize";
import {DatabaseConfig} from "../config/database.js";

export class ExperienciaModel extends Model {}

ExperienciaModel.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "null",
            autoIncrement: true
        },
        id_perfil: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nombre_trabajo:  {
            type: DataTypes.STRING(40) ,
            allowNull: true
        },
        descripcion:  {
            type: DataTypes.TEXT,
            allowNull: true
        },
        lugar:  {
            type: DataTypes.STRING(20) ,
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
        fecha_inicio:  {
            type: DataTypes.DATE ,
            allowNull: true
        },
        fecha_final:  {
            type: DataTypes.DATE ,
            allowNull: true
        },
    }, {
        sequelize: DatabaseConfig,
        tableName: 'experiencia',
        timestamps: false
    }
);

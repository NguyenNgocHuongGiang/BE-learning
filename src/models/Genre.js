import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Genre extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    genreId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nameGenre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Genre',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "genreId" },
        ]
      },
    ]
  });
  }
}

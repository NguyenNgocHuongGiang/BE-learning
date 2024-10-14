import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class LikedSong extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idSongLiked: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Song',
        key: 'songId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'LikedSong',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idUser",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "idSongLiked",
        using: "BTREE",
        fields: [
          { name: "idSongLiked" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ListFriends extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    roomChat: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ListFriends',
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
        name: "friendId",
        using: "BTREE",
        fields: [
          { name: "friendId" },
        ]
      },
    ]
  });
  }
}

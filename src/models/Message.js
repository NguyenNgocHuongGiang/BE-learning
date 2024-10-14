import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Message extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    idMess: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idSender: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "useSender",
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    contentMess: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timeSend: {
      type: DataTypes.DATE,
      allowNull: true
    },
    roomChat: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Message',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMess" },
        ]
      },
      {
        name: "idUser",
        using: "BTREE",
        fields: [
          { name: "idSender" },
        ]
      },
    ]
  });
  }
}

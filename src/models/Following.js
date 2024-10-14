import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Following extends Model {
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
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'userId'
      }
    }
  }, {
    sequelize,
    tableName: 'Following',
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
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "followingUserId",
        using: "BTREE",
        fields: [
          { name: "followingId" },
        ]
      },
    ]
  });
  }
}

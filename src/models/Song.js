import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Song extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    songId: {
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
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Genre',
        key: 'genreId'
      }
    },
    songName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    viewer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    duration: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    popular: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    songImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    publicDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    filePath: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    discussQuality: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Song',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "songId" },
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
        name: "genreId",
        using: "BTREE",
        fields: [
          { name: "genreId" },
        ]
      },
    ]
  });
  }
}

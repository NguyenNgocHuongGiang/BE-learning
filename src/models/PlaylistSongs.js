import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PlaylistSongs extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Playlists',
        key: 'id'
      }
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Song',
        key: 'songId'
      }
    }
  }, {
    sequelize,
    tableName: 'PlaylistSongs',
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
        name: "playlistId",
        using: "BTREE",
        fields: [
          { name: "playlistId" },
        ]
      },
      {
        name: "songId",
        using: "BTREE",
        fields: [
          { name: "songId" },
        ]
      },
    ]
  });
  }
}

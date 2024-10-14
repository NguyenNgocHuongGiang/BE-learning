import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Discuss from  "./Discuss.js";
import _Following from  "./Following.js";
import _Genre from  "./Genre.js";
import _LikedSong from  "./LikedSong.js";
import _ListFriends from  "./ListFriends.js";
import _Message from  "./Message.js";
import _PlaylistSongs from  "./PlaylistSongs.js";
import _Playlists from  "./Playlists.js";
import _RecentSong from  "./RecentSong.js";
import _Song from  "./Song.js";
import _User from  "./User.js";

export default function initModels(sequelize) {
  const Discuss = _Discuss.init(sequelize, DataTypes);
  const Following = _Following.init(sequelize, DataTypes);
  const Genre = _Genre.init(sequelize, DataTypes);
  const LikedSong = _LikedSong.init(sequelize, DataTypes);
  const ListFriends = _ListFriends.init(sequelize, DataTypes);
  const Message = _Message.init(sequelize, DataTypes);
  const PlaylistSongs = _PlaylistSongs.init(sequelize, DataTypes);
  const Playlists = _Playlists.init(sequelize, DataTypes);
  const RecentSong = _RecentSong.init(sequelize, DataTypes);
  const Song = _Song.init(sequelize, DataTypes);
  const User = _User.init(sequelize, DataTypes);

  Song.belongsTo(Genre, { as: "genre", foreignKey: "genreId"});
  Genre.hasMany(Song, { as: "Songs", foreignKey: "genreId"});
  PlaylistSongs.belongsTo(Playlists, { as: "playlist", foreignKey: "playlistId"});
  Playlists.hasMany(PlaylistSongs, { as: "PlaylistSongs", foreignKey: "playlistId"});
  Discuss.belongsTo(Song, { as: "song", foreignKey: "songId"});
  Song.hasMany(Discuss, { as: "Discusses", foreignKey: "songId"});
  LikedSong.belongsTo(Song, { as: "idSongLiked_Song", foreignKey: "idSongLiked"});
  Song.hasMany(LikedSong, { as: "LikedSongs", foreignKey: "idSongLiked"});
  PlaylistSongs.belongsTo(Song, { as: "song", foreignKey: "songId"});
  Song.hasMany(PlaylistSongs, { as: "PlaylistSongs", foreignKey: "songId"});
  RecentSong.belongsTo(Song, { as: "song", foreignKey: "songId"});
  Song.hasMany(RecentSong, { as: "RecentSongs", foreignKey: "songId"});
  Discuss.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(Discuss, { as: "Discusses", foreignKey: "userId"});
  Following.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(Following, { as: "Followings", foreignKey: "userId"});
  Following.belongsTo(User, { as: "following", foreignKey: "followingId"});
  User.hasMany(Following, { as: "following_Followings", foreignKey: "followingId"});
  LikedSong.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(LikedSong, { as: "LikedSongs", foreignKey: "userId"});
  ListFriends.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(ListFriends, { as: "ListFriends", foreignKey: "userId"});
  ListFriends.belongsTo(User, { as: "friend", foreignKey: "friendId"});
  User.hasMany(ListFriends, { as: "friend_ListFriends", foreignKey: "friendId"});
  Message.belongsTo(User, { as: "idSender_User", foreignKey: "idSender"});
  User.hasMany(Message, { as: "Messages", foreignKey: "idSender"});
  Playlists.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(Playlists, { as: "Playlists", foreignKey: "userId"});
  RecentSong.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(RecentSong, { as: "RecentSongs", foreignKey: "userId"});
  Song.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasMany(Song, { as: "Songs", foreignKey: "userId"});

  return {
    Discuss,
    Following,
    Genre,
    LikedSong,
    ListFriends,
    Message,
    PlaylistSongs,
    Playlists,
    RecentSong,
    Song,
    User,
  };
}

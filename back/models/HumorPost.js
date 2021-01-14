module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('HumorPost', {
    site: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postId: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    /*
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }*/
  }, {
    timestamp: true,
    underscored: false,
    paranoid: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
  };
  return Post;
}
module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {});

  Entry.associate = (models) => {
    Entry.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return Entry;
};

module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  Entry.associate = (models) => {
    Entry.belongsTo(models.User);
  };
  return Entry;
};

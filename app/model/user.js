/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    user_id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true
    },
    admin: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    pwd: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'user'
  });

  Model.associate = function() {

  }

  return Model;
};

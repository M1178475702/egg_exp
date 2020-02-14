/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('test', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pwd: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'test'
  });

  Model.associate = function() {

  }

  return Model;
};

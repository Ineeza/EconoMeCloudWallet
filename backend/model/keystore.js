module.exports = (sequelize, DataTypes) => {
  return sequelize.define('keystore', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'CURRENT_USER'
    },
    updated_by: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'keystore'
  })
}

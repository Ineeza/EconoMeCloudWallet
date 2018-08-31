module.exports = (sequelize, DataTypes) => {
  return sequelize.define('account', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true
    },
    user_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_type: {
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
    tableName: 'account'
  })
}

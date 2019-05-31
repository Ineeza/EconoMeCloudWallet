module.exports = function (sequelize, DataTypes) {
  return sequelize.define('token', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    contract_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    symbol: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    decimal: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    createdAt: {
      field: 'created_date',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_date',
      type: DataTypes.DATE
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
    tableName: 'token',
    timestamps: true,
    underscore: true
  })
}

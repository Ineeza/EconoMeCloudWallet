module.exports = function (sequelize, DataTypes) {
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
    tableName: 'keystore',
    timestamps: true,
    underscore: true
  })
}

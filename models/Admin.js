const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define(
    "Admin",
    {
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false, // No createdAt or updatedAt
      hooks: {
        // Hash the password before saving to the database
        beforeCreate: async (admin) => {
          const salt = await bcrypt.genSalt(10);
          admin.password = await bcrypt.hash(admin.password, salt);
        },
      },
    }
  );

  Admin.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  return Admin;
};

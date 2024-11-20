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
    }
  );

  // Method to validate password (compare plaintext)
  Admin.prototype.validatePassword = async function (password) {
    return password === this.password; // Compare plaintext passwords directly
  };

  return Admin;
};

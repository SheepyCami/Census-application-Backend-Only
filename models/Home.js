module.exports = (sequelize, Sequelize) => {
  const Home = sequelize.define(
    "Home",
    {
      country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Home.associate = (models) => {
    Home.belongsTo(models.Participants, {
      foreignKey: "participantId",
      as: "participant", // Alias for Home -> Participant
      onDelete: "CASCADE", // Enforce cascading deletes
    });
  };

  return Home;
};

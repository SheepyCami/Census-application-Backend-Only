module.exports = (sequelize, Sequelize) => {
  const Work = sequelize.define(
    "Work",
    {
      companyname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
      },
      currency: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Work.associate = (models) => {
    Work.belongsTo(models.Participants, {
      foreignKey: "participantId",
      as: "participant", // Alias for Work -> Participant
    });
  };

  return Work;
};

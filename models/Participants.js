module.exports = (sequelize, Sequelize) => {
  const Participants = sequelize.define(
    "Participants",
    {
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensures email format is valid
        },
      },
      firstname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true, // Ensures the value is a valid date
        },
      },
    },
    {
      timestamps: false, // No automatic createdAt or updatedAt columns
    }
  );

  Participants.associate = (models) => {
    Participants.hasOne(models.Home, {
      foreignKey: "participantId",
      as: "homeDetails", // Alias for Participant -> Home
      onDelete: "CASCADE",
    });

    Participants.hasOne(models.Work, {
      foreignKey: "participantId",
      as: "workDetails", // Alias for Participant -> Work
      onDelete: "CASCADE",
    });
  };

  return Participants;
};

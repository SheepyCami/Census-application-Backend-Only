var express = require("express");
var router = express.Router();
var isThisAdmin = require("../isThisAdmin");
const { Participants, Work, Home, Admin } = require("../models");

// Apply authentication middleware to all routes
router.use(isThisAdmin);

// POST request for adding a participant
router.post("/add", async (req, res) => {
  const { email, personalInfo, work, home } = req.body;

  // Validate the request body
  const validationError = validateParticipant(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const existingParticipant = await Participants.findOne({
      where: { email },
    });
    if (existingParticipant) {
      return res.status(409).json({
        error: "Duplicate entry",
        message: "A participant with the same email already exists.",
      });
    }

    const participant = await Participants.create(
      {
        email,
        firstname: personalInfo.firstname,
        lastname: personalInfo.lastname,
        dob: personalInfo.dob,
        homeDetails: { country: home.country, city: home.city },
        workDetails: {
          companyname: work.companyname,
          salary: work.salary,
          currency: work.currency,
        },
      },
      {
        include: ["homeDetails", "workDetails"],
      }
    );

    return res.status(201).json({
      message: "Participant added successfully.",
      data: participant,
    });
  } catch (err) {
    console.error("Error adding participant:", err);
    return res.status(500).json({ error: "Failed to add participant." });
  }
});

//participants GET endpoint, returning a list of all participants in a JSON object from the database.
router.get("/", async (req, res) => {
  try {
    const participants = await Participants.findAll({
      include: ["homeDetails", "workDetails"],
    });

    res.json({
      status: "success",
      count: participants.length,
      data: participants,
    });
  } catch (err) {
    console.error("Error fetching participants:", err);
    res.status(500).json({ error: "Failed to load participants." });
  }
});

// GET endpoint, returning the personal details of all participants (including first name, last name and email).
router.get("/details", async (req, res) => {
  try {
    // Fetch participants and select only the required fields
    const participants = await Participants.findAll({
      attributes: ["firstname", "lastname", "email"], // Select only these fields
    });

    // If no participants found, return an empty array
    if (participants.length === 0) {
      return res.json({ message: "No participants found", data: [] });
    }

    res.json({
      status: "success",
      count: participants.length,
      data: participants,
    });
  } catch (err) {
    console.error("Error fetching participant details:", err);
    res.status(500).json({ error: "Failed to load participant details" });
  }
});

// GET endpoint: Return personal details of a specified participant by email
router.get("/details/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find the participant by email and include associated Home and Work details
    const participant = await Participants.findOne({
      where: { email },
      include: ["homeDetails", "workDetails"], // Include associated models
    });

    // If participant not found, return 404
    if (!participant) {
      return res.status(404).json({
        status: "error",
        message: "Participant not found",
      });
    }

    // Construct response data
    const details = {
      firstname: participant.firstname,
      lastname: participant.lastname,
      dob: participant.dob,
      email: participant.email,
      home: participant.homeDetails, // Home details
      work: participant.workDetails, // Work details
    };

    res.json({
      status: "success",
      data: details,
    });
  } catch (err) {
    console.error("Error fetching participant details:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch participant details",
    });
  }
});

// DELETE endpoint: Deletes the participant by email
router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Check if the participant exists
    const participant = await Participants.findOne({ where: { email } });

    if (!participant) {
      return res.status(404).json({
        status: "error",
        message: "Participant not found",
      });
    }

    // Delete the participant
    await participant.destroy();

    res.status(200).json({
      status: "success",
      message: "Participant deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting participant:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to delete participant",
    });
  }
});

// PUT request to update a participant by email
router.put("/:email", async (req, res) => {
  const { email } = req.params;

  // Validate the request body
  const validationError = validateParticipant(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const participant = await Participants.findOne({
      where: { email },
      include: ["homeDetails", "workDetails"],
    });

    if (!participant) {
      return res.status(404).json({
        status: "error",
        message: "Participant not found",
      });
    }

    // Update participant and associated models
    await participant.update({
      firstname: req.body.personalInfo.firstname || participant.firstname,
      lastname: req.body.personalInfo.lastname || participant.lastname,
      dob: req.body.personalInfo.dob || participant.dob,
    });

    if (req.body.home) {
      await participant.homeDetails.update({
        country: req.body.home.country || participant.homeDetails.country,
        city: req.body.home.city || participant.homeDetails.city,
      });
    }

    if (req.body.work) {
      await participant.workDetails.update({
        companyname:
          req.body.work.companyname || participant.workDetails.companyname,
        salary: req.body.work.salary || participant.workDetails.salary,
        currency: req.body.work.currency || participant.workDetails.currency,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Participant updated successfully",
    });
  } catch (err) {
    console.error("Error updating participant:", err);
    res.status(500).json({ error: "Failed to update participant." });
  }
});

// GET endpoint, returning only the specified participant's work details that are not deleted (including their company name and salary with currency).
// GET endpoint: Fetch work details of a participant by email
router.get("/work/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find the participant by email and include work details
    const participant = await Participants.findOne({
      where: { email },
      include: ["workDetails"], // Include associated Work model
    });

    // If participant or work details are not found
    if (!participant || !participant.workDetails) {
      return res.status(404).json({
        status: "error",
        message: "Work details not found for the given participant",
      });
    }

    // Send the work details as the response
    res.status(200).json({
      status: "success",
      data: participant.workDetails,
    });
  } catch (err) {
    console.error("Error fetching work details:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch work details",
    });
  }
});

// GET endpoint, returning only the specified participant's home details that are not deleted (including their country and city).
// GET endpoint: Fetch home details of a participant by email
router.get("/home/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find the participant by email and include home details
    const participant = await Participants.findOne({
      where: { email },
      include: ["homeDetails"], // Include associated Home model
    });

    // If participant or home details are not found
    if (!participant || !participant.homeDetails) {
      return res.status(404).json({
        status: "error",
        message: "Home details not found for the given participant",
      });
    }

    // Send the home details as the response
    res.status(200).json({
      status: "success",
      data: participant.homeDetails,
    });
  } catch (err) {
    console.error("Error fetching home details:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch home details",
    });
  }
});

function validateParticipant(data) {
  const errors = [];
  const { email, personalInfo, work, home } = data;

  // Validate top-level and nested properties
  if (!email) {
    errors.push("Email is required.");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push("Invalid email format.");
  }

  if (!personalInfo) {
    errors.push("Personal information is required.");
  } else {
    if (!personalInfo.firstname) {
      errors.push("First name is required in personalInfo.");
    }
    if (!personalInfo.lastname) {
      errors.push("Last name is required in personalInfo.");
    }
    if (!personalInfo.dob) {
      errors.push("Date of birth (dob) is required in personalInfo.");
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(personalInfo.dob)) {
      errors.push("DOB must be in YYYY-MM-DD format.");
    }
  }

  if (!work) {
    errors.push("Work details are required.");
  } else {
    if (!work.companyname) {
      errors.push("Company name is required in work.");
    }
    if (work.salary === undefined || typeof work.salary !== "number") {
      errors.push("Salary must be a number in work.");
    }
    if (!work.currency) {
      errors.push("Currency is required in work.");
    }
  }

  if (!home) {
    errors.push("Home details are required.");
  } else {
    if (!home.country) {
      errors.push("Country is required in home.");
    }
    if (!home.city) {
      errors.push("City is required in home.");
    }
  }

  return errors.length > 0 ? errors : null;
}

module.exports = router;

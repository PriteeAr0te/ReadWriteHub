const express = require("express");

const verifyEmails = async (email, link) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {},
    });
  } catch (error) {
    console.log(error);
  }
};

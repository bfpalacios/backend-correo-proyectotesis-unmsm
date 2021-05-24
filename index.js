const express = require("express");
const app = express();
const { port = 3000 } = process.env;
const nodemailer = require("nodemailer");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Testing email nodejs",
  });
});

app.get("/test", (req, res) => {
  res.send({
    message: "Test",
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: "idracloudperu@gmail.com",
    // pass: "Peru.2021@@",
    user: "nilovila18@gmail.com",
    pass: "Nilonilo18$",
  },
});

app.post("/email", (req, res) => {
  try {
    const { id } = req.body;

    var contentHtml;

    switch (id) {
      case 1:
        contentHTML = `
          <img src="https://devzamse.github.io/mapiframe/email.png" alt="compra" />
        `;
        break;
      case 2:
        contentHTML = `
          <img src="https://devzamse.github.io/mapiframe/email-1.png" alt="compra" />
        `;
        break;
      case 3:
        contentHTML = `
          <img src="https://devzamse.github.io/mapiframe/email-2.png" alt="compra" />
        `;
        break;
    }

    transporter.sendMail(
      {
        from: `${process.env.name} <${process.env.email}>`,
        to: ["idracloudperu@gmail.com"],
        subject: "Confirmación de compra",
        html: contentHTML,
      },
      (err, info) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            success: false,
            message: "Lo siento, inténtelo más tarde.",
          });
        } else {
          res.status(201).send({
            email_id: info.messageId,
            success: true,
            message:
              "Gracias por contactarte con nosotros,te responderemos pronto.",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Lo siento, inténtelo más tarde.",
    });
  }
});

app.listen(port, () => console.log(`Server on port ${port}`));

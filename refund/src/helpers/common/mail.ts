import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export function sendEmail(msg: any) {
  try {
    sgMail
      .send(msg)
      .then((response) => {
        console.log("statusCodes", response[0].statusCode);
        console.log("Headers", response[0].headers);
      })
      .catch((error) => {
        console.error("errors==>", error);
      });
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}

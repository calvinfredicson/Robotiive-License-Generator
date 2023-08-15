// const send = require("gmail-send")({
//   user: "calvin.fredicson@gmail.com",
//   pass: process.env["GMAIL_PASSWORD"],
//   to: "calvin@iscoollab.com",
//   subject: "RPA Test",
// });

export function sendGmail() {
  console.log(process.env["GMAIL_PASSWORD"]);
}

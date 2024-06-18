const admin = require(`firebase-admin`);
const serviceAccount = require("./firebasesdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://userDetails.firebaseio.com",
});

const db = admin.firestore();

module.exports = db;

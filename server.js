/** Server startup for Message.ly. */

const app = require("./app");

app.listen(3000, function () {
  console.log("Server running: Listening on port 3000");
});

const express = require("express");
const path = require("path");
const { setTimeout } = require("timers/promises");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

setTimeout(() => {
  if (app._router) {
    app._router.stack.forEach((layer) => {
      if (layer.route) {
        console.log(`Defined route: ${layer.route.path}`);
      }
    });
  } else {
    console.log("No routes are defined yet.");
  }
}, 0);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});

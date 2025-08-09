const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const homeRoute = require("./routes/homeRoute");
const userRoutes = require("./routes/userRoutes");
const googleBooksRoutes = require("./routes/googleBooks");
const bookRoutes = require("./routes/booksRoute");
const tradeProposalRoutes = require("./routes/tradeProposalRoutes");
const bookClubRoutes = require("./routes/bookClubRoutes");
const eventRoutes = require("./routes/eventRoutes");
// const { requireAuth } = require("./server/middleware/auth");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use("/", homeRoute);
app.use("/api/users", userRoutes);
app.use("/api/google-books", googleBooksRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/trade-proposals", tradeProposalRoutes);
app.use("/api/book-clubs", bookClubRoutes);
app.use("/api/events", eventRoutes);

// In your Express app (typically server.js or index.js)
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));

// Send the React index.html for any unknown route
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

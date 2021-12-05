import express from "express";

const PORT = 8000;
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

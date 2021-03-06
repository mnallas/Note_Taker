const express = require("express");
const router = express.Router();
const fs = require("fs");
const util = require("util");

const readFileSync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);

router.get("/api/notes", async (req, res) => {
  let countData = await readFileSync("./db/db.json");
  countData = JSON.parse(countData);
  res.send(countData);
});

router.post("/api/notes", async (req, res) => {
  let notesData = await readFileSync("./db/db.json");
  notesData = JSON.parse(notesData);
  req.body.id = notesData.length + 1;
  const { id, title, text } = req.body;
  notesData.push({ id, title, text });
  await writeFileSync("./db/db.json", JSON.stringify(notesData, null, 2));
  res.json({ msg: "Notes added!" });
});

router.delete("/api/notes/:id", async (req, res) => {
  let notesData = await readFileSync("./db/db.json", "utf8");
  notesData = JSON.parse(notesData);
  const notesId = req.params.id;
  notesData.forEach((value, index) => {
    if (value.id == notesId) {
      notesData.splice(index, 1);
    }
  });
  await writeFileSync("./db/db.json", JSON.stringify(notesData, null, 2));
  res.send("Deleted notes!");
});

module.exports = router;

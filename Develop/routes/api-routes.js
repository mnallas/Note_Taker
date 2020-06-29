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
  const { name, type, moves } = req.body;
  pokemonData.pokemon.push({ name, id, type, moves });
  await writeFileSync("data.json", JSON.stringify(pokemonData, null, 2));
  res.json({ msg: "Pokemon added!" });
});

module.exports = router;

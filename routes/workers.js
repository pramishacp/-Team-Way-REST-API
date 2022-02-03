const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const { Worker, validate } = require("../models/worker");
const auth = require("../middleware/auth");
const admin = require('../middleware/admin');

router.get("/", auth, async (req, res) => {
  const workers = await Worker.find()
    .select("-__v")
    .sort("name");
  res.send(workers);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let worker = new Worker({
    name: req.body.name,
    phone: req.body.phone
  });
  worker = await worker.save();

  res.send(worker);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const worker = await Worker.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone
    },
    { new: true }
  );

  if (!worker)
    return res
      .status(404)
      .send("The worker with the given ID was not found.");

  res.send(worker);
});

router.get("/:id", auth, async (req, res) => {
  const worker = await Worker.findById(req.params.id).select("-__v");

  if (!worker)
    return res
      .status(404)
      .send("The worker with the given ID was not found.");

  res.send(worker);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const worker = await Worker.findByIdAndRemove(req.params.id);

  if (!worker)
    return res
      .status(404)
      .send("The worker with the given ID was not found.");

  res.send(worker);
});

module.exports = router;
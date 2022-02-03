const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const moment = require('moment');
const { Shift, validate } = require("../models/shift");
const { Worker } = require("../models/worker");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const admin = require('../middleware/admin');

router.get("/", auth, async (req, res) => {
  const shifts = await Shift.find()
    .select("-__v")
    .sort("-date");
  res.send(shifts);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const worker = await Worker.findById(req.body.workerId);
  if (!worker) return res.status(400).send("Invalid worker.");

  const data = await Shift.lookup(req.body.workerId, req.body.date);
  if (data.length !== 0) return res.status(400).send("Shift already exist for the given date.");

  let shift = new Shift({
    worker: {
      _id: worker._id,
      name: worker.name,
      phone: worker.phone
    },
    ...req.body
  });

  shift = await shift.save();
  res.send(shift);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const worker = await Worker.findById(req.body.workerId);
  if (!worker) return res.status(400).send("Invalid worker.");

  const shift = await Shift.findByIdAndUpdate(
    req.params.id,
    {
      worker: {
        _id: worker._id,
        name: worker.name,
        phone: worker.phone
      },
      ...req.body
    },
    {
      new: true
    }
  );

  if (!shift)
    return res.status(404).send("The shift with the given ID was not found.");

  res.send(shift);
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const shift = await Shift.findById(req.params.id).select("-__v");

  if (!shift)
    return res.status(404).send("The shift with the given ID was not found.");

  res.send(shift);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const shift = await Shift.findByIdAndRemove(req.params.id);

  if (!shift)
    return res.status(404).send("The shift with the given ID was not found.");

  res.send(shift);
});

module.exports = router;

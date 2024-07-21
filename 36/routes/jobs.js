"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError, UnauthorizedError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Job = require("../models/job");

const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");

const router = new express.Router();

/** POST / { job } =>  { job }
 *
 * job should be { title, salary, equity, companyHandle }
 *
 * Returns { title, salary, equity, companyHandle }
 *
 * Authorization required: login, isAdmin
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    if (!res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }

    const validator = jsonschema.validate(req.body, jobNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const job = await Job.create(req.body);
    return res.status(201).json({ job });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { jobs: [ { id, title, salary, equity, companyHandle }, ...] }
 *
 * Can filter on provided search filters:
 * - title (case-insensitive, partial matches)
 * - minSalary
 * - maxSalary
 * - equity (exact match)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  try {
    const { title, minSalary, hasEquity } = req.query;
    const filters = [];

    if (title) {
      filters.push(`title LIKE '%${title}%'`);
    }

    if (minSalary !== undefined) {
      filters.push(`salary >= ${minSalary}`);
    }

    if (hasEquity === "true") {
      filters.push(`equity > 0`);
    }

    const jobs = await Job.findAll(filters);

    return res.json({ jobs });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  =>  { job }
 *
 *  Job is { id, title, salary, equity, companyHandle, company }
 *   where company is { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const job = await Job.get(req.params.id);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id] { fld1, fld2, ... } => { job }
 *
 * Patches job data.
 *
 * fields can be: { title, salary, equity, companyHandle }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: login, isAdmin
 */

router.patch("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    if (!res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }

    const validator = jsonschema.validate(req.body, jobUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const job = await Job.update(req.params.id, req.body);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization: login, isAdmin
 */

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    if (!res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }

    await Job.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

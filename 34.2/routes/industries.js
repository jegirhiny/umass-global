const express = require("express");
const router = express.Router();
const db = require("../db");

router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    const industriesResult = await db.query(
      "SELECT code, industry FROM industries"
    );

    const companiesIndustriesResult = await db.query(
      "SELECT comp_code, industry_code FROM companies_industries"
    );

    const industries = industriesResult.rows;
    const companiesIndustries = companiesIndustriesResult.rows;

    industries.forEach((industry) => {
      industry.companies = companiesIndustries
        .filter((ci) => ci.industry_code === industry.code)
        .map((ci) => ci.comp_code);
    });

    return res.json({ industries });
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { code, industry } = req.body;

    const result = await db.query(
      "INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING code, industry",
      [code, industry]
    );

    return res.status(201).json({ industry: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

router.post("/associate", async (req, res, next) => {
  try {
    const { comp_code, industry_code } = req.body;

    const result = await db.query(
      "INSERT INTO companies_industries (comp_code, industry_code) VALUES ($1, $2) RETURNING comp_code, industry_code",
      [comp_code, industry_code]
    );

    return res.status(201).json({ association: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

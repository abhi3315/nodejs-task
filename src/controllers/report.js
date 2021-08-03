const mongoose = require("mongoose");
const Report = require("../models/report");

module.exports = {
  postReport: async (req, res) => {
    try {
      const { reportDetails } = req.body;

      if (!reportDetails) {
        return res
          .status(400)
          .json({ status: "error", message: "Please provide report details." });
      }

      const {
        userID,
        marketID,
        marketName,
        cmdtyID,
        cmdtyName,
        priceUnit,
        convFctr,
        price,
      } = reportDetails;

      if (!userID || !marketID || !cmdtyID) {
        return res.status(400).json({
          status: "error",
          message: `${userID ? "" : "User ID,"} ${
            marketID ? "" : "Market ID,"
          } ${cmdtyID ? "" : "Cmdty ID,"} feilds are required`,
        });
      }

      const report = await Report.findOne({ marketID, cmdtyID });

      if (report) {
        report.cmdtyName = cmdtyName;
        report.marketName = marketName;
        if (report.users && !report.users.includes(userID))
          report.users.push(userID);
        report.timestamp = new Date().getTime();
        report.priceRecord.push({ priceUnit, convFctr, price });
        await report.save();
        return res.json({ status: "success", reportID: report._id });
      }

      const newReport = await Report.create({
        cmdtyID,
        cmdtyName,
        marketID,
        marketName,
        users: [userID],
        timestamp: new Date().getTime(),
        priceRecord: [
          {
            priceUnit,
            convFctr,
            price,
          },
        ],
      });
      return res.json({ status: "success", reportID: newReport._id });
    } catch (e) {
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  },

  getReport: async (req, res) => {
    try {
      const { reportID } = req.query;

      if (!reportID || !mongoose.isValidObjectId(reportID)) {
        return res.status(400).json({
          status: "error",
          message: "Please provide a valid report ID",
        });
      }

      const report = await Report.findById(reportID);

      if (!report) {
        return res
          .status(404)
          .json({ status: "error", message: "Report not found" });
      }

      res.json(report);
    } catch (e) {
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  },
};

const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    cmdtyID: {
      type: String,
      required: true,
    },
    cmdtyName: {
      type: String,
      trim: true,
      default: "N/A",
    },
    marketID: {
      type: String,
      required: true,
    },
    marketName: {
      type: String,
      trim: true,
      default: "N/A",
    },
    users: [{ type: String }],
    timestamp: Date,
    priceRecord: [
      {
        priceUnit: String,
        convFctr: Number,
        price: Number,
      },
    ],
  },
  { versionKey: false }
);

reportSchema.methods.toJSON = function () {
  const report = this.toObject();

  report.priceUnit = "Kg";
  const totalSumOfPrice = report.priceRecord.reduce((acc, record) => {
    acc += record.price / record.convFctr;
    return acc;
  }, 0);
  report.price = totalSumOfPrice / report.priceRecord.length;
  delete report.priceRecord;
  return report;
};

module.exports = mongoose.model("Report", reportSchema);

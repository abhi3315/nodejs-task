const request = require("supertest");
const Report = require("../models/report");
const app = require("../app");
const { closeDatabase, initializeDatabase } = require("../db");

describe("Report Testing", () => {
  beforeAll(async () => {
    await initializeDatabase();
  });

  afterAll(async () => {
    closeDatabase();
  });

  it("Create Report", async () => {
    await request(app)
      .post("/reports")
      .send({
        reportDetails: {
          userID: "user-2",
          marketID: "market-1",
          marketName: "Vashi Navi Mumbai",
          cmdtyID: "cmdty-1",
          cmdtyName: "Potato",
          priceUnit: "Pack",
          convFctr: 50,
          price: 700,
        },
      })
      .expect(200);
  });

  it("Get Report", async () => {
    const response = await request(app)
      .post("/reports")
      .send({
        reportDetails: {
          userID: "user-2",
          marketID: "market-1",
          marketName: "Vashi Navi Mumbai",
          cmdtyID: "cmdty-1",
          cmdtyName: "Potato",
          priceUnit: "Quintal",
          convFctr: 100,
          price: 1600,
        },
      });
    await request(app)
      .get(`/reports?reportID=${response.body.reportID}`)
      .expect(200);
  });
});

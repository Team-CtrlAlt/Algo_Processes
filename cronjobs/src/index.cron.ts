import schedule from "node-schedule";
import commonHelper from "./helpers/common/common.helpers";
require("dotenv/config");
class CronJobs {
  constructor() {
    console.log("Start cron");
    this.updateFiatCoinPriceCron();
  }

  public updateFiatCoinPriceCron = async () => {
    schedule.scheduleJob("*/10 * * * * *", async function () {
      await commonHelper.updateFiatCoinPrice("");
    });
  };
}

new CronJobs();

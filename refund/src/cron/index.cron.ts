import schedule from "node-schedule";
import ProposalHelpers from "../helpers/proposal/index";
class CronJobs {
  public cronVar: number = 0;

  constructor() {
    this.historicalData();
  }

  public historicalData = async () => {
    const job = schedule.scheduleJob("*/10 * * * * *", function () {
      ProposalHelpers.refundFiat();
    });
  };
}

export default CronJobs;

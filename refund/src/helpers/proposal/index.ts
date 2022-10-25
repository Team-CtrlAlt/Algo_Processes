import moment from "moment";
import { Op } from "sequelize";
import Notification from "../../models/model/model.notifications";
import Proposal from "../../models/model/model.proposal";
import Transactions from "../../models/model/model.transactions";
import Users from "../../models/model/model.users";
import { sendNotification } from "../common/globalFunctions";
import trustshareApi from "../common/trustshare";
import { mintStatus, notificationHelper, paymentStatus, refundStatus } from "../constant";

var currentUTCDate = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
class ProposalHelper {
  constructor() {
    // this.refundFiat();
  }

  public refundFiat = async () => {
    try {
      const expiredProposalList = await Proposal.findAll({
        where: {
          mintStatus: mintStatus.unMinted,
          endDate: {
            [Op.lt]: moment().toISOString(),
          },
        },
        raw: true,
      });

      if (expiredProposalList.length > 0) {
        for await (const proposal of expiredProposalList) {
          let releases = [];
          let transactionsId = [];
          const transactionList = await Transactions.findAll({
            where: {
              proposal_id: proposal.id,
              payment_status: paymentStatus.Settled,
              refund_status: refundStatus.hold,
            },
            raw: true,
          });
          for await (const transaction of transactionList) {
            const data = {
              project_id: transaction.project_id as string,
              amount: +(transaction.amount as string) * 100,
              to: {
                id: transaction.participant_id as string,
              },
            };
            releases.push(data);
            transactionsId.push(transaction.id as string);
          }

          if (releases.length > 0) {
            const result = await trustshareApi.releaseFund({ releases: releases });
            if (result && result.outbounds.length > 0) {
              await Transactions.update(
                {
                  refund_status: refundStatus.refunded,
                },
                {
                  where: {
                    id: {
                      [Op.in]: transactionsId,
                    },
                  },
                }
              );
              const leftTransactionList = await Transactions.findAll({
                where: {
                  proposal_id: proposal.id,
                  payment_status: paymentStatus.Settling,
                  refund_status: refundStatus.hold,
                },
                raw: true,
              });
              if (leftTransactionList.length === 0) {
                await Proposal.update(
                  {
                    mintStatus: mintStatus.refunded,
                  },
                  {
                    where: {
                      id: proposal.id,
                    },
                  }
                );
              }

              // Fcm Notify
              for await (const iterator of releases) {
                const amount = iterator.amount / 100;
                const participant_id = iterator.to.id;
                const project_id = iterator.project_id;
                this.notify(participant_id, project_id, amount);
              }
            }
          }
        }
      }
    } catch (err) {}
  };

  public notify = async (participant_id: string, project_id: string, amount: number) => {
    try {
      const userInfo = await Users.findOne({
        where: {
          participant_id,
        },
        raw: true,
      });
      const proposalInfo = await Proposal.findOne({
        where: {
          project_id,
        },
        raw: true,
      });

      const device_token = userInfo?.device_id;

      const user_id = userInfo?.id as string;

      let saveNotification = await Notification.create({
        subject: `Your Payment of £${amount} has been refund for ${proposalInfo?.title}`,
        message: `Your Payment of £${amount} has been refund for ${proposalInfo?.title}`,
        to_user_id: user_id,
        by_user_id: "",
        notification_type: 2,
      });
      if (saveNotification) {
        sendNotification({
          title: notificationHelper.ADMIN_NOTIFY,
          subject: `Your Payment of £${amount} has been refund for ${proposalInfo?.title}`,
          message: `Your Payment of £${amount} has been refund for ${proposalInfo?.title}`,
          to_user_id: user_id,
          notification_type: "2",
          device_token,
        });
      }
    } catch (error) {
      console.log("Notify Error", error);
    }
  };
}

const ProposalHelpers = new ProposalHelper();

export default ProposalHelpers;

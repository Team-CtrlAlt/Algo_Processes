import { NotificationInterface } from "../../interfaces/notifications.interfaces";
import { config } from "../../config/config";
import rp from "request-promise";
import Users from "../../models/model/model.users";
import db from "../../helpers/common/db";

var BigNumber = require("bignumber.js");
var FCM = require("fcm-push");

export const bigNumberSafeMath = function (c: number | string, operation: string, d: string | number, precision?: number) {
  BigNumber.config({ DECIMAL_PLACES: 18 });
  var a = new BigNumber(c);
  var b = new BigNumber(d);
  var rtn;
  // Figure out which operation to perform.
  switch (operation.toLowerCase()) {
    case "-":
      rtn = a.minus(b);
      break;
    case "+":
      rtn = a.plus(b);
      break;
    case "*":
    case "x":
      rtn = a.multipliedBy(b);
      break;
    case "÷":
    case "/":
      rtn = a.dividedBy(b);
      break;
    default:
      //operator = operation;
      break;
  }

  return exponentialToDecimal(rtn).toString();
};

export const toFixed_norounding = function (value: string, n: number): string {
  const val: number = new BigNumber(value);
  value = val.toFixed();
  var x: string[] = (val.toString() + ".0").split(".");
  return parseFloat(x[0] + "." + x[1].substr(0, n)).toString();
};

export const bigNumberSafeConversion = function (val: number): number {
  var amount = val.toString();
  var value = new BigNumber(amount);
  return value.toFixed();
};

export const exponentialToDecimal = function (exponential: number) {
  let decimal: string = exponential.toString().toLowerCase();
  if (decimal.includes("e+")) {
    const exponentialSplitted = decimal.split("e+");
    let postfix = "";
    for (let i = 0; i < +exponentialSplitted[1] - (exponentialSplitted[0].includes(".") ? exponentialSplitted[0].split(".")[1].length : 0); i++) {
      postfix += "0";
    }
    const addCommas = (text: string) => {
      let j = 3;
      let textLength = text.length;
      while (j < textLength) {
        text = `${text.slice(0, textLength - j)}${text.slice(textLength - j, textLength)}`;
        textLength++;
        j += 3 + 1;
      }
      return text;
    };
    decimal = addCommas(exponentialSplitted[0].replace(".", "") + postfix);
  }
  if (decimal.toLowerCase().includes("e-")) {
    const exponentialSplitted = decimal.split("e-");
    let prefix = "0.";
    for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
      prefix += "0";
    }
    decimal = prefix + exponentialSplitted[0].replace(".", "");
  }
  return decimal;
};

export const sendNotification = function sendNotification(devices: NotificationInterface) {
  var serverKey = config.FCM_SERVER_KEY;
  var fcm = new FCM(serverKey);
  var fromUserId = devices.to_user_id == undefined ? "" : devices.to_user_id;
  var message = {};
  if (Array.isArray(devices.token)) {
    message = {
      registration_ids: devices.token,
      collapse_key: "type_a",
      notification: {
        title: devices.title,
        body: devices.message,
        sound: "default",
      },
      data: {
        body: { subject: devices.subject, message: devices.message },
        notification_type: devices.notification_type,
        to_user_id: devices.to_user_id,
      },
    };
  } else {
    message = {
      to: devices.device_token,
      collapse_key: "type_a",
      notification: {
        title: devices.title,
        body: devices.message,
        sound: "default",
      },
      data: {
        subject: devices.subject,
        message: devices.message,
        title: devices.title,
        notification_type: devices.notification_type,
        to_user_id: fromUserId,
      },
    };
  }

  //promise style
  fcm.send(message, function (err: Error, messageId: number) {

    console.log('message====>>>>>>>>>>', message)
    if (err) {
      console.log("Something has gone wrong!", err);
    } else {
      console.log("Sent with message ID: ", messageId);
    }
  });
  // console.log('================== Notification end =====================')
};

export const toFixed = function (num: string, fixed: number) {
  if (num.includes(".")) {
    num = num.slice(0, num.indexOf(".") + (fixed + 1));
  }
  return num;
};

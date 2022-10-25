import multer from "multer";
import path from "path";
import { config } from "../../config/config";
var aws = require("aws-sdk");
var express = require("express");
var multerS3 = require("multer-s3");
import { nanoid } from 'nanoid'


var s3 = new aws.S3({
  secretAccessKey: `${config.S3_SECRETKEY}`,
  accessKeyId: `${config.S3_ACCESSID}`,
  region: "us-east-1",
});

export default function multerInstance(pathName: string) {
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: `${config.S3_BUCKET}`,
      acl: "public-read",
      metadata: function (req: Express.Request, file: Express.Multer.File, cb: any) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req: Express.Request, file: Express.Multer.File, cb: any) {
        cb(null, (file.fieldname = pathName) + nanoid() + path.extname(file.originalname));
      },
    }),
  });
  return upload.fields([
    {
      name: "icons",
      maxCount: 1,
    }
  ]);
}
//   return upload.single(feildName);
// }

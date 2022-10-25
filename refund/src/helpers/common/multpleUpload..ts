import multer from "multer";
import path from "path";
import { config } from "../../config/config";
import { nanoid } from "nanoid";

var aws = require("aws-sdk");
var express = require("express");
var multerS3 = require("multer-s3");

var s3 = new aws.S3({
  secretAccessKey: `${config.S3_SECRETKEY}`,
  accessKeyId: `${config.S3_ACCESSID}`,
  region: "us-east-1",
});

export default function multipleUpload(pathName: string, pathname1: string, pathname2: string, pathname3: string,pathname4:string) {
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: `${config.S3_BUCKET}`,
      acl: "public-read",
      metadata: function (req: Express.Request, file: Express.Multer.File, cb: any) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req: Express.Request, file: Express.Multer.File, cb: any) {
        cb(
          null,
          (file.fieldname == "document" ? pathname1 : file.fieldname == "icon" ? pathname2 : file.fieldname == "image" ? pathname3 : file.fieldname == "questionIcon" ? pathname4 : pathName) +
            nanoid() +
            path.extname(file.originalname)
        );
      },
    }),
  });
  return upload.fields([
    {
      name: "banner_image",
      maxCount: 6,
    },
    {
      name: "icon",
      maxCount: 1,
    },
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "document",
      maxCount: 6,
    },
    {
      name:"questionIcon",
      maxCount:1
    }
  ]);
}

export function deleteUploadDocuments(path: string) {
  s3.deleteObjects(
    {
      Bucket: `${config.S3_BUCKET}`,
      Delete: {
        Objects: [{ Key: path }],
        Quiet: true,
      },
    },

    function (err: any, data: any) {
      if (err) console.log("err ==>", err);
      console.log("delete successfully", data);
      // return res.status(200).json(data);
    }
  );
}

import { Response } from "express";
import { StatusCodes } from "../../constants";
import { ResponseData, ResponseHelperInterface } from "../../interfaces/response.helper.interface";

class ResponseHelper implements ResponseHelperInterface {
  
  public success(res: Response, resData: ResponseData) {
    return res.status(StatusCodes.SUCCESS).send(resData.data)
  }

  public error(res: Response, resData: ResponseData) {
    return res.status(StatusCodes.BADREQUEST).send(resData.data)
  }
}

const response = new ResponseHelper()
export default response
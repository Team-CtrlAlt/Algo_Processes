import axios from "axios";
import { Apidata, Release } from "../../interfaces/types/participantApiTypes.interface";
import { PaymentAPIType } from "../../interfaces/types/paymentApiTypes.interface";
import { VerificationType } from "../../interfaces/types/verificationApiTypes.interface";
class TrustshareApi {
  constructor() {}
  public async createProject(currency: string) {
    var url: string = "https://rest.trustshare.io/v1/projects";
    let params = {
      currency: `${currency}`,
    };
    let headers = {
      Authorization: process.env.TRUSTSHARE_API_KEY,
    };
    let result = await axios.post(url, params, { headers: headers });
    return result.data;
  }
  public async getProject(id: string) {
    var url: string = `https://rest.trustshare.io/v1/project/${id}`;
    let headers = {
      Authorization: process.env.TRUSTSHARE_API_KEY,
    };
    let result = await axios.get(url, { headers: headers });
    return result.data;
  }
  public async createParticipants(data: Apidata) {
    var url: string = `https://rest.trustshare.io/v1/participants`;
    let params = data;
    let headers = {
      Authorization: process.env.TRUSTSHARE_API_KEY,
    };
    let result = await axios.post(url, params, { headers: headers });
    return result.data;
  }
  public async getParticipants(id: string) {
    var url: string = `https://rest.trustshare.io/v1/participant/${id}`;
    let headers = {
      Authorization: process.env.TRUSTSHARE_API_KEY,
    };
    let result = await axios.get(url, { headers: headers });
    return result.data;
  }
  public async createPayment(data: PaymentAPIType) {
    var url: string = `https://rest.trustshare.io/v1/intents/payment`;
    let params = data;
    let headers = {
      Authorization: process.env.TRUSTSHARE_API_KEY,
    };
    let result = await axios.post(url, params, { headers: headers });
    return result.data;
  }
  public async getPaymentIntent(id: string) {
    var url: string = `https://rest.trustshare.io/v1/intent/${id}`;
    let headers = {
      Authorization: process.env.TRUSTSHARE_API_KEY,
    };
    let result = await axios.get(url, { headers: headers });
    return result.data;
  }
  public async createVerification(data: VerificationType) {
    var url: string = `https://rest.trustshare.io/v1/verifications`;
    let params = data;
    let headers = {
      Authorization: process.env.TRUSTSHARE_API_KEY,
    };
    let result = await axios.post(url, params, { headers: headers });
    return result.data;
  }
  public async releaseFund(data: any) {
    try {
      var url: string = `https://rest.trustshare.io/v1/outbounds/releases`;

      let headers = {
        Authorization: process.env.TRUSTSHARE_API_KEY,
      };
      let params = data;
     
      let result = await axios.post(url, params, { headers: headers });
      return result.data;
    } catch (error) {
    }
  }
}
const trustshareApi = new TrustshareApi();
export default trustshareApi;

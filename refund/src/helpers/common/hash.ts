import bcrypt from "bcrypt"
const saltRounds = 10;
export const createHash =  async (pin:string) => {
   return await bcrypt.hash(pin, saltRounds);
}
export const compairHash =  async (pin:string,pinHash:string) => {
  return await bcrypt.compare(pin, pinHash);
}


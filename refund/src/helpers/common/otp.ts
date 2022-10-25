export const generateOtp = async () => {
  //Generate otp for login verification
  const num = Math.floor(Math.random() * 900000).toString();
  return num.padEnd(6, "0");
};



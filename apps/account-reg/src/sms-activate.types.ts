export type TCountry = {
  // retail_price: 18, country: 6, price: 12, count: 5565
  retail_price: number;
  country: number;
  price: number;
  count: number;
};

export type TGetNumberResponse = {
  activationId: string;
  phoneNumber: string;
  activationCost: string;
  countryCode: string;
  canGetAnotherSms: boolean;
  activationTime: string;
  activationOperator: string;
};

/*
 {"status":"success", "activeActivations": [
{
"activationId" : "635468021",
"serviceCode" : "vk",
"phoneNumber" : "79********1",
"activationCost" : "12.50",
"activationStatus" : "4",
"smsCode" : ["CODE"],
"smsText" : "[Ваш код для регистрации CODE]",
"activationTime" : "2022-06-01 16:59:16",
"discount" : "0.00",
"repeated" : "0",
"countryCode" : "0",
"countryName" : "Russia",
"canGetAnotherSms" : "1",
}]
*/
export type Tactivation = {
  activationId: string;
  serviceCode: string;
  phoneNumber: string;
  activationCost: string;
  activationStatus: string;
  smsCode: string[];
  smsText: string;
  activationTime: string;
  discount: string;
  repeated: string;
  countryCode: string;
  countryName: string;
  canGetAnotherSms: string;
};

export type TGetActiveActivationsResponse = {
  status: string;
  activeActivations: Tactivation[];
};

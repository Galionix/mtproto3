import puppeteer, { KnownDevices, Page } from "puppeteer";
// import fetch from "node-fetch";
// import fs from "fs";

import {
  TCountry,
  TGetActiveActivationsResponse,
  TGetNumberResponse,
  Tactivation,
} from "./sms-activate.types";
import {
  getNumberErrorResponses,
  max_old_activation_time,
  puppeteerArgs,
  sms_activate_base_price,
  sms_activate_max_price,
  try_number,
} from "./constants";
import { countriesList } from "./countriesList.constant";
import { fetchAndGetRawBody, wait } from "./utils";

const sms_activate_api_key = "c7fb329608ef0cAbb6bA0AA98475c558";
let priceAdded = 0;

const preferredCountries: string[] = [""];
let boughtNumberParsed: TGetNumberResponse = null;

const smsActivateApiUrl = "https://sms-activate.org/stubs/handler_api.php";

let currentWaitTimes = 0;
const maxWaitTimes = 8;
const diableBuy = false;
const cancelActivation = async (activationId: string) => {
  console.log("cancelActivation: ", activationId);
  //https://api.sms-activate.org/stubs/handler_api.php?api_key=$api_key&action=setStatus&status=$status&id=$id&forward=$forward
  /*
1 сообщить о готовности номера (смс на номер отправлено)
3 запросить еще один код (бесплатно)
6 завершить активацию *
8 сообщить о том, что номер использован и отменить активацию
*/

  const response = await fetchAndGetRawBody(
    `${smsActivateApiUrl}?api_key=${sms_activate_api_key}&action=setStatus&status=8&id=${activationId}`
  );
  console.log("cancelActivation response: ", response);
};

let boughtNumber = null;
let countriesFilteredByPrice: TCountry[] = [];

const buyNumber = async () => {
  for (const country of countriesFilteredByPrice) {
    if (diableBuy) {
      boughtNumberParsed = JSON.parse(
        `{"activationId":"2356179603","phoneNumber":"6282246043791","activationCost":"18.00","countryCode":"6","canGetAnotherSms":true,"activationTime":"2024-04-25 03:27:35","activationOperator":"telkomsel"}`
      ) as TGetNumberResponse;
      return;
    }
    console.log("trying to activate phone number for country: ", country);
    const getNumberResponse = await fetchAndGetRawBody(
      `${smsActivateApiUrl}?api_key=${sms_activate_api_key}&action=getNumberV2&service=tg&country=${
        country.country
      }&maxPrice=${sms_activate_base_price + priceAdded}`
      // `${smsActivateApiUrl}?api_key=${sms_activate_api_key}&action=getNumberV2&service=tg&country=43`
    );

    if (getNumberResponse === "NO_BALANCE") {
      console.log("NO_BALANCE");
      // try to cancel activations
      try {
        const activeActivations = await fetchAndGetRawBody(
          `${smsActivateApiUrl}?api_key=${sms_activate_api_key}&action=getActiveActivations`
        );
        await sanitizeActivations(JSON.parse(activeActivations));
      } catch (error) {
        console.error(error);
      }
      await wait(5);
    }

    console.log("getNumberResponse: ", getNumberResponse);
    if (
      !getNumberResponse ||
      getNumberErrorResponses.some((error) => getNumberResponse.includes(error))
    ) {
      console.log("error getting number: ", getNumberResponse);
      await wait(1);
      continue;
    }
    boughtNumberParsed = JSON.parse(getNumberResponse) as TGetNumberResponse;
    return;
    // console.log("number got! ", getNumberResponse);
    // return JSON.parse(getNumberResponse) as TGetNumberResponse;
  }
};

const waitForActivation = async (page: Page) => {
  // https://api.sms-activate.org/stubs/handler_api.php?api_key=$api_key&action=getActiveActivations

  setInterval(async () => {
    currentWaitTimes++;
    console.log("currentWaitTimes: ", currentWaitTimes);
    const activeActivations = await fetchAndGetRawBody(
      `${smsActivateApiUrl}?api_key=${sms_activate_api_key}&action=getActiveActivations`
    );
    console.log("activeActivations: ", activeActivations);
    try {
      const activeActivationsParsed: TGetActiveActivationsResponse =
        JSON.parse(activeActivations);
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
      if (
        activeActivationsParsed.activeActivations[0].smsCode?.length > 0 ||
        activeActivationsParsed.activeActivations[0].smsText?.length > 0
      ) {
        console.log("got sms!: ", activeActivationsParsed);
        return activeActivationsParsed.activeActivations[0];
        // send the code to the server
      }

      console.log("activeActivationsParsed: ", activeActivationsParsed);
      await sanitizeActivations(activeActivationsParsed);
    } catch (error) {
      console.error(error);
    }
    if (currentWaitTimes >= maxWaitTimes) {
      if (priceAdded + sms_activate_base_price < sms_activate_max_price) {
        priceAdded += sms_activate_base_price;
      }

      currentWaitTimes = 0;
      await refreshCountries();
      console.log("canceling activation");
      await cancelActivation(boughtNumberParsed.activationId);
      await buyNumber();
      await beginActivation(page);
    }
  }, 20000);
};

const refreshCountries = async () => {
  console.log("refreshing countries");
  const topCountries = await fetchAndGetRawBody(
    `${smsActivateApiUrl}?api_key=${sms_activate_api_key}&action=getTopCountriesByService&service=tg`,
    true
  );
  const topCountriesArray = Object.entries(topCountries).map(
    ([_, value]: [string, TCountry]) => value
  );
  countriesFilteredByPrice = topCountriesArray
    .filter(
      (country: TCountry) =>
        country.retail_price <= sms_activate_base_price + priceAdded &&
        country.count > 0
    )
    .sort((a, b) => b.price - a.price);
  console.log("countriesFilteredByPrice: ", countriesFilteredByPrice);
};

(async () => {
  if (try_number) {
    boughtNumberParsed = {
      phoneNumber: try_number,
    } as TGetNumberResponse;
    const browser = await puppeteer.launch({
      headless: false,
      args: puppeteerArgs,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.setViewport({
      width: 320,
      height: 568,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false,
    });
    await page.setExtraHTTPHeaders({
      // "User-Agent":
      //   "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13E148 Safari/601.1",
      // "Upgrade-Insecure-Requests": "1",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9,en;q=0.8",
    });
    // page.waitForDevicePrompt();

    page.emulate(KnownDevices["iPhone 6"]);

    await page.authenticate({
      username: "user171761",
      password: "fyce7k",
    });
    await beginActivation(page);
    return;
  }
  const balance = await fetchAndGetRawBody(
    `${smsActivateApiUrl}?api_key=${sms_activate_api_key}&action=getBalance`
  );
  console.log("sms-activate ", balance);
  await refreshCountries();
  await buyNumber();
  // try to activate phone number

  console.log("boughtNumberParsed: ", boughtNumberParsed);
  // const countryName = countriesList.find(
  //   (country) => `${country.countryId}` === boughtNumberParsed?.countryCode
  // )?.countryName;
  // console.log("countryName: ", countryName);
  await getCreds();
})();

const beginActivation = async (
  page: Page
  // countryName: string
  // boughtNumberParsed: TGetNumberResponse
) => {
  await page.goto("https://web.telegram.org/a/", {
    waitUntil: "load",
    timeout: 0,
  });
  await wait(3);
  await page.waitForSelector(".Button.default.primary.text");
  await wait(3);
  await page.click(".Button.default.primary.text");
  await wait(1);
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // no need to enter country, we already have the number with country code
  // await page.waitForSelector(".DropdownMenu.CountryCodeInput");
  // await page.click(".DropdownMenu.CountryCodeInput");
  // // type name in the search input #sign-in-phone-code
  // // send some backspaces to clear the input
  // for (let i = 0; i < 10; i++) {
  //   await page.keyboard.press("Backspace", { delay: 100 });
  // }
  // await page.waitForSelector("#sign-in-phone-code");
  // await page.type("#sign-in-phone-code", countryName, {
  //   delay: 200,
  // });
  // // type arrow down to select the first country and press enter
  // await page.keyboard.press("ArrowDown", { delay: 300 });
  // await page.keyboard.press("Enter", { delay: 500 });

  await page.waitForSelector('input[aria-label="Your phone number"]');

  // const phoneNumberInputValue: string = await page
  //   .$("input[aria-label='Your phone number']")
  //   .then((element) =>
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     element?.evaluate((el) => el.value)
  //   );
  // const preEnterdCode = phoneNumberInputValue.replaceAll("+", "").trim();

  // const phoneNumber = boughtNumberParsed.phoneNumber.slice(
  //   preEnterdCode.length
  // );

  await page.type('input[aria-label="Your phone number"]', "", {
    delay: 200,
  });
  await wait(3);
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Backspace", { delay: 100 });
  }
  await wait(2);
  await page.type(
    'input[aria-label="Your phone number"]',
    "+" + boughtNumberParsed.phoneNumber,
    {
      delay: 200,
    }
  );
  await wait(1);
  await page.waitForSelector(".Button.default.primary.has-ripple");
  await page.click(".Button.default.primary.has-ripple");

  try {
    // if we have .input-group.error than cancel the activation and exit
    const error = await page.waitForSelector(".input-group.error", {
      timeout: 10000,
    });
    if (error) {
      if (try_number) return;
      console.log("Error on entering login details error: ", error);
      await cancelActivation(boughtNumberParsed.activationId);
      await wait(1);
      boughtNumber = await buyNumber();
      await beginActivation(page);
      return;
    }
  } catch (error) {
    console.log("no error found");
  }
  // search for p.note with text "app on your other device"

  const note = await page.waitForSelector("p.note", {
    timeout: 10000,
  });

  // check text
  const noteText = await note.evaluate((el) => el.textContent);
  console.log("noteText: ", noteText);
  if (noteText.includes("app on your other device")) {
    console.log("app on your other device");
    if (try_number) return;
    await cancelActivation(boughtNumberParsed.activationId);
    await wait(3);
    boughtNumber = await buyNumber();
    await beginActivation(page);
    return;
  }
};
const getCreds = async () =>
  // boughtNumberParsed: TGetNumberResponse,
  // countryName: string
  {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        // `--proxy-server=http://185.229.221.152:2383`, // Proxy server url
        `--proxy-server=http://185.229.223.23:2383`, // Proxy server url
      ],
    });
    try {
      const page = await browser.newPage();
      page.emulate(KnownDevices["iPad landscape"]);

      await page.authenticate({
        username: "user171761",
        password: "fyce7k",
      });
      await beginActivation(page);
      await waitForActivation(page);
      // return await browser.close();
    } catch (error) {
      console.error(error);
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      // return await browser.close();
    }
  };

const sanitizeActivations = async (
  activations: TGetActiveActivationsResponse
) => {
  if (!activations?.activeActivations) {
    console.log("no active activations");
    return;
  }
  // console.log("sanitizing activations: ", activations);
  // here we should detect wether we have activations older than 15 minutes and cancel them
  // format of date is "2022-06-01 16:59:16"

  // if we have more than 1 activation we should cancel the oldest one

  for (const activation of activations.activeActivations) {
    const activationTime = new Date(activation.activationTime);
    // console.log("activationTime: ", activationTime);
    const now = new Date();
    // console.log("now: ", now);
    const diff = now.getTime() - activationTime.getTime();
    const diffMinutes = Math.floor(diff / 60000);
    // console.log("diffMinutes: ", diffMinutes);
    if (diffMinutes > max_old_activation_time) {
      console.log(
        "cancelling activation for number: ",
        activation.phoneNumber,
        " made at: ",
        activation.activationTime
      );
      await cancelActivation(activation.activationId);
    }
  }
};

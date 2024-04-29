import puppeteer, { KnownDevices } from "puppeteer";
import { wait } from "./utils";
import { generateUsername } from "unique-username-generator";
import { sendToFather } from "@core/functions";
import {
  RegistrationEventTypes,
  RegistrationResponseTypes,
} from "@core/types/client";

export const updateCreds = async ({ phone }: { phone: string }) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--proxy-server=http://185.229.221.166:2383`, // Proxy server url
    ],
  });
  const telegramOrgPage = await browser.newPage();
  await telegramOrgPage.setViewport({
    width: 320,
    height: 568,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    isLandscape: false,
  });
  await telegramOrgPage.setExtraHTTPHeaders({
    // "User-Agent":
    //   "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13E148 Safari/601.1",
    // "Upgrade-Insecure-Requests": "1",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,en;q=0.8",
  });
  // page.waitForDevicePrompt();

  telegramOrgPage.emulate(KnownDevices["iPhone 6"]);

  await telegramOrgPage.authenticate({
    username: "user171761",
    password: "fyce7k",
  });
  telegramOrgPage.goto("https://my.telegram.org/auth", {
    waitUntil: "load",
    timeout: 0,
  });

  await telegramOrgPage.waitForSelector('input[id="my_login_phone"]');
  await telegramOrgPage.type('input[id="my_login_phone"]', phone, {
    delay: 200,
  });
  await telegramOrgPage.evaluate(() => {
    const btns = document.querySelectorAll(".btn.btn-primary.btn-lg");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const btn of btns) {
      if (btn.textContent === "Next") {
        btn.click();
      }
    }
  });

  // // // // // после того как попадем в клиент телеграма.
  // // // // // TODO: тут мы идем во вкладку телеграма и находим код из диалога, сохраняем его в переменную
  // // // // // .....
  // // // // // и передаем ниже в input[id="my_password"]

  const res = await sendToFather(
    process,
    {
      event_type: RegistrationEventTypes.REQUEST_CODE,
      response_types: [RegistrationResponseTypes.RESPONSE_CODE],
    },
    true,
    20000
  );
  if (res.event_type !== RegistrationResponseTypes.RESPONSE_CODE) {
    return;
  }
  await telegramOrgPage.waitForSelector('input[id="my_password"]');
  await telegramOrgPage.type('input[id="my_password"]', res.code, {
    delay: 200,
  });
  await wait(5);
  const btns = await telegramOrgPage.$$(".btn.btn-primary.btn-lg");
  console.log(btns);
  await btns[1].click();

  await wait(2);

  await telegramOrgPage.waitForSelector('a[href="/apps"');
  await telegramOrgPage.click('a[href="/apps"');

  const randomUsername = generateUsername("_");
  await telegramOrgPage.waitForSelector('input[name="app_title"]');
  await telegramOrgPage.type('input[name="app_title"]', randomUsername, {
    delay: 200,
  });
  await telegramOrgPage.type('input[name="app_shortname"]', randomUsername, {
    delay: 200,
  });
  await telegramOrgPage.click('input[value="desktop"]');
  await telegramOrgPage.type(
    'input[name="app_desc"]',
    `${randomUsername} description`,
    { delay: 200 }
  );
  await telegramOrgPage.click('button[id="app_save_btn"]');
  await wait(2);
  const appData = await telegramOrgPage.evaluate(() => {
    const data = document.querySelectorAll(
      ".form-control.input-xlarge.uneditable-input"
    );
    const keys = document.querySelectorAll("code");
    return {
      api_id: data[0].textContent,
      api_hash: data[1].textContent,
      prod_conf: data[data.length - 1].textContent,
      test_conf_key: keys[0].textContent,
      prod_conf_key: keys[1].textContent,
    };
  });

  console.log(appData);
};

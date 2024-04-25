import puppeteer, { KnownDevices } from 'puppeteer';
import fetch from 'node-fetch';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--proxy-server=http://185.229.221.152:2383`, // Proxy server url
    ],
  });
  try {
    const page = await browser.newPage();
    page.emulate(KnownDevices['iPad landscape']);

    await page.authenticate({
      username: 'user171761',
      password: 'fyce7k',
    });
    await page.goto('https://web.telegram.org/a/', { waitUntil: 'load', timeout: 0 });
    await page.waitForSelector('.Button.default.primary.text');
    await page.click('.Button.default.primary.text');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.waitForSelector('.DropdownMenu.CountryCodeInput');
    await page.click('.DropdownMenu.CountryCodeInput');

    const api_key = '59d757fcbd79167318e914Ac2071b0c5';

    const activatePhone = await fetch(
      `https://sms-activate.org/stubs/handler_api.php?api_key=${api_key}&action=getNumberV2&service=tg&ref=1842558&country=4&maxPrice=maxPrice`,
    ).then(async (response) => {
      return await response.json();
    });
    console.log(activatePhone);
    // // // // // delete first 2 symbols (code of country) from phone number
    const phoneNumber = activatePhone.phoneNumber.substring(2);
    await page.waitForSelector('.country-name');
    const countryNames = await page.$$('.country-name');
    for (let i = 0; i < countryNames.length; i++) {
      const countryNameElement = countryNames[i];
      await page.evaluate((element) => {
        if (element.textContent === 'Philippines') {
          element.click();
        }
      }, countryNameElement);
    }
    await page.waitForSelector('input[aria-label="Your phone number"]');
    await page.type('input[aria-label="Your phone number"]', phoneNumber, { delay: 200 });

    await page.waitForSelector('.Button.default.primary.has-ripple');
    await page.click('.Button.default.primary.has-ripple');

    await new Promise((resolve) => setTimeout(resolve, 2000));
    // // // // TODO: если смска долго не приходит, то отправляем запрос на отмену активации номера.
    // // // // потом ищем див div[title="Wrong number?"] и кликаем на него
    // // // // очищаем поле ввода номера и вводим новый номер

    const signInCode = await new Promise((resolve,reject) => {
      const checkForCode = async () => {
        try {
          const response = await fetch(
            `https://api.sms-activate.org/stubs/handler_api.php?api_key=${api_key}&action=getActiveActivations`,
          );
          const data = await response.json();
          if (data.activeActivations[0]?.smsCode) {
            clearInterval(interval);
            resolve(data.activeActivations[0].smsCode);
          } else {
            console.log('Waiting for activation code...');
          }
        } catch (error) {
          reject(error);
        }
      };

      const interval = setInterval(checkForCode, 15000);
      await checkForCode();
    });

    console.log('signInCode', signInCode);

    await page.waitForSelector('input[id="sign-in-code"]');
    await page.type('input[id="sign-in-code"]', signInCode, { delay: 200 });

    const cookies = await page.cookies();
    fs.writeFileAsync(`./cookies/${phoneNumber}.json`, JSON.stringify(cookies));

    // const telegramOrgPage = await browser.newPage();
    // telegramOrgPage.goto('https://my.telegram.org/auth', { waitUntil: 'load', timeout: 0 });

    // await telegramOrgPage.waitForSelector('input[id="my_login_phone"]');
    // await telegramOrgPage.type('input[id="my_login_phone"]', '0977504004', { delay: 200 });
    // await telegramOrgPage.evaluate(() => {
    //   const btns = document.querySelectorAll('.btn.btn-primary.btn-lg');
    //   for (const btn of btns) {
    //     if (btn.textContent === 'Next') {
    //       btn.click();
    //     }
    //   }
    // });

    // после того как попадем в клиент телеграма.
    // TODO: тут мы идем во вкладку телеграма и находим код из диалога, сохраняем его в переменную
    // .....
    // и передаем ниже в input[id="my_password"]

    // await telegramOrgPage.waitForSelector('input[id="my_password"]');
    // await telegramOrgPage.type('input[id="my_password"]', 'my code from app', { delay: 200 });
    // await telegramOrgPage.evaluate(() => {
    //   const btns = document.querySelectorAll('.btn.btn-primary.btn-lg');
    //   for (const btn of btns) {
    //     if (btn.textContent === 'Sign in') {
    //       btn.click();
    //     }
    //   }
    // });

    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // await telegramOrgPage.waitForSelector('a[href="/apps"');
    // await telegramOrgPage.click('a[href="/apps"');

    // await telegramOrgPage.waitForSelector('input[name="app_title"]');
    // await telegramOrgPage.type('input[name="app_title"]', 'nickname bot', { delay: 200 });
    // await telegramOrgPage.type('input[name="app_shortname"]', 'shortname my account', {
    //   delay: 200,
    // });
    // await telegramOrgPage.click('input[value="desktop"]');
    // await telegramOrgPage.type(
    //   'input[name="app_description"]',
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    //   { delay: 200 },
    // );
    // await telegramOrgPage.click('button[id="app_save_btn"]');

    // const appData = await telegramOrgPage.evaluate(() => {
    //   const data = document.querySelectorAll('.form-control.input-xlarge.uneditable-input');
    //   return {
    //     api_id: data[0].textContent,
    //     api_hash: data[1].textContent,
    //   };
    // });

    // console.log(appData);
  } catch (error) {
    browser.close();
    console.log('Error: ', error);
  }
})();

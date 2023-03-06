/* eslint-disable @typescript-eslint/no-var-requires */
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
// const input = require("input"); // npm i input

// const apiId = 21502850;
// const apiHash = "4e234e4dc6bd589d20dabd4e0ab4ce87";
// // const test_username = "serious_sam_xt360";
// const stringSession = new StringSession(
//   "1BQANOTEuMTA4LjU2LjE3NAG7law4OXa/pIRVIGx/oeDLkwwQEYDBFPeuybN9JOoz8XEgBwCj6BI4pV93wcAnx1iyc873+RAq76l0klI2KxPNd/gEY33346WazpaH3jcTHKeyuN3cPd+lJgj5gYr00I0qMhq11HoAUi/nNV/wRyYI/DrrlnFRnKtZJJGqcdLJ76xjrjMqkMHvVeug31Lb8xsz2vlQgJHRadR7elUbVIAYSuv08uJvD8Y13IU+mXjjiyN+wspjrexs/TbZxdyxzIxW80td4VWAzcmABMiw2styY0Ewdhrq7LFMBjktQBMbcnmCPOhsdjaXYLYt599ZvtRXIxUP3LLzzcuTvvlRgRGW0g=="
// ); // fill this later with the value from session.save()

const [apiId, apiHash, stringSession, databaseId] = process.argv.slice(2);

(async () => {
  const identity = {
    id: databaseId,
    api_id: apiId,
  };
  //   async function checkUsername(client, username: string) {
  //     const result: boolean = await client.invoke(
  //       new Api.account.CheckUsername({
  //         username,
  //       })
  //     );
  //     return result;
  //     // console.log(result); // prints the result
  //   }

  //   async function setUsername(client, username: string) {
  //     const result: boolean = await client.invoke(
  //       new Api.account.UpdateUsername({
  //         username,
  //       })
  //     );
  //     return result;
  //   }

  console.log("Loading interactive example...");
  const client = new TelegramClient(
    new StringSession(stringSession),
    parseInt(apiId),
    apiHash,
    {
      connectionRetries: 5,
    }
  );
  await client.start({
    // phoneNumber: async () => await input.text("Please enter your number: "),
    // password: async () => await input.text("Please enter your password: "),
    // phoneCode: async () =>
    //   await input.text("Please enter the code you received: "),
    onError: (err) => {
      process.send({ type: "ERROR", identity, error: err });
      console.log(err);
    },
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  //   await client.sendMessage("me", { message: "Hello!" });
  process.send({ type: "STARTED", identity });

  //   const usernameAvailable: boolean = await checkUsername(client, test_username);

  //   console.log("available", usernameAvailable); // prints the result

  //   if (usernameAvailable) {
  //     const usernameSetResult = await setUsername(client, test_username);
  //     console.log("usernameSetResult: ", usernameSetResult);
  //   }

  client.addEventHandler((update) => {
    console.log("Received new Update");
    console.log(update);
  });
})();

import { ChildProcess, execSync } from "child_process";
import { join } from "path";

import { testf } from "./setup";
let client: ChildProcess;

beforeAll(async () => {
  client = await testf();
});
afterAll(() => {
  client.kill();
  client.disconnect();
  client = null;
});
// const client = await testf();

describe("CLI tests", () => {
  it("should print a message", () => {
    expect(client).toBeTruthy();
    // client.listeners("message").forEach((listener) => {
    //   listener({
    //     type: "message",
    //     text: "hi",
    //     id: "1",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     coefficient: "",
    //     db_name: "base",
    //     answer: null,
    //   });
    // });
    // const cliPath = join(process.cwd(), "dist/apps/bot-client/main.js");
    // const output = execSync(`node ${cliPath}`).toString();
    // expect(output).toMatch(/Hello World/);
  });
});

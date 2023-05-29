import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";

import { AppService } from "./app.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { DatabaseRepositoryService } from "../database/database-repository/database-repository.service";
import { ReadStream } from "typeorm/platform/PlatformTools";
import { readFile, unlink, writeFile, writeFileSync } from "fs";
import { validateAnswers } from "../utils/file-upload";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseRepository: DatabaseRepositoryService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("add-answers")
  @UseInterceptors(FilesInterceptor("files"))
  async addAnswers(@UploadedFiles() files) {
    // let answersAdded = 0;
    // if (files.length === 0) {
    //   return "No files uploaded";
    // }
    // for (const file of files) {
    //   console.log("file: ", file);
    //   readFile(file.path, "utf-8", async (err, data) => {
    //     if (err) {
    //       console.log("err: ", err);
    //     }
    //     const { answers } = JSON.parse(data);
    //     if (!validateAnswers(answers)) {
    //       return "Invalid answers";
    //     }
    //     for (const answer of answers) {
    //       answersAdded++;
    //       console.log("answer: ", answer);
    //       await this.databaseRepository.create(answer);
    //     }
    //     return {
    //       message: `Added ${answersAdded} answers`,
    //     };
    //   });
    // }

    let answersAdded = 0;

    if (files.length === 0) {
      return "No files uploaded";
    }

    for (const file of files) {
      try {
        const data = await readFilePromise(file.path, "utf-8");
        const answers = JSON.parse(data);

        const { isValid, error } = validateAnswers(answers);

        if (!isValid) {
          return error;
        }

        for (const answer of answers) {
          console.log("answer: ", answer);
          const res = await this.databaseRepository.create(answer);
          if ("error" in res) {
            return res;
          }
          answersAdded++;
        }
      } catch (err) {
        return err;
      }

      // remove file
      unlink(file.path, (err) => {
        if (err) {
          console.log("err: ", err);
        }
      });
    }

    return {
      message: `Added ${answersAdded} answers`,
    };
  }

  @Get("get-answers")
  async getAnswers() {
    const answers = await this.databaseRepository.findAll();
    return answers;
  }

  @Get("download-answers")
  async downloadAnswers(@Res() res) {
    const answers = await this.databaseRepository.findAll();
    const data = JSON.stringify(answers, null, 2);

    // write data to file

    const filename = process.env.UPLOADS_PATH + "/answers.json";

    writeFileSync(filename, data, {
      encoding: "utf-8",
    });

    // send file to client
    res.download(filename, (err) => {
      return err;
    });

    // remove file
    setTimeout(() => {
      unlink(filename, (err) => {
        if (err) {
          console.log("err: ", err);
        }
      });
    }, 60000);
  }
}

function readFilePromise(path, encoding): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data as unknown as string);
      }
    });
  });
}

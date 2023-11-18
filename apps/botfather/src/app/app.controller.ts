import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";

import { FilesInterceptor } from "@nestjs/platform-express";
import { readFile, unlink, writeFileSync } from "fs";
import { AnswersRepositoryService } from "../databases/answers-repository/answers-repository.service";
// import { validateAnswers } from "../utils/file-upload";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly answersRepository: AnswersRepositoryService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("add-answers")
  @UseInterceptors(FilesInterceptor("files"))
  async addAnswers(@UploadedFiles() files) {
    let answersAdded = 0;

    if (files.length === 0) {
      return "No files uploaded";
    }

    for (const file of files) {
      try {
        const data = await readFilePromise(file.path, "utf-8");
        const answers = JSON.parse(data);

        // const { isValid, error } = validateAnswers(answers);

        // if (!isValid) {
        //   return error;
        // }

        for (const answer of answers) {
          const res = await this.answersRepository.create(answer);
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
    const answers = await this.answersRepository.findAll();
    return answers;
  }

  @Get("download-answers")
  async downloadAnswers(@Res() res) {
    const answers = await this.answersRepository.findAll();
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

  @Post("sync-files-with-cloud")
  async syncFilesWithCloud() {
    return this.appService.syncFilesWithCloud();
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

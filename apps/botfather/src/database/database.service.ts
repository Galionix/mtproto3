import {
  CreateAnswerEntityInput,
  UpdateDatabaseInput,
} from "@core/types/server";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseService {
  create(createDatabaseInput: CreateAnswerEntityInput) {
    return "This action adds a new database";
  }

  findAll() {
    return `This action returns all database`;
  }

  findOne(name: string) {
    console.log(name);
    return `This action returns a #${name} database`;
  }

  update(id: number, updateDatabaseInput: UpdateDatabaseInput) {
    return `This action updates a #${id} database`;
  }

  remove(id: number) {
    return `This action removes a #${id} database`;
  }
}

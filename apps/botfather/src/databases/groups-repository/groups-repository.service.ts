import { Injectable } from "@nestjs/common";
import { CreateGroupsRepositoryInput } from "./dto/create-groups-repository.input";
import { UpdateGroupsRepositoryInput } from "./dto/update-groups-repository.input";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupEntity } from "@core/types/server";
import { Repository } from "typeorm";

const fillDefaultValues = (group: Partial<GroupEntity>): GroupEntity => {
  return {
    status: "active",
    id: "",
    chat_id: "",
    name: "",

    total_members: 0,
    total_messages_received: 0,
    total_messages_sent: 0,
    joined_at: new Date(),
    left_at: new Date(0, 0, 0),
    last_message_sent_at: new Date(0, 0, 0),
    error: "",
    behavior_model: "",
    processing_enabled: true,
    spam_frequency: 0,
    username: "",
    updated_at: new Date(),
    info: {},
    ...group,
  };
};

@Injectable()
export class GroupsRepositoryService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupsRepository: Repository<GroupEntity> // @InjectRepository(MessageEntity) // private readonly messagesRepositoryService: MessagesRepositoryService
  ) {}
  async create(createGroupsRepositoryInput: CreateGroupsRepositoryInput) {
    const group = this.groupsRepository.create(
      fillDefaultValues(createGroupsRepositoryInput)
    );
    const saved = await this.groupsRepository.save(group);
    return saved;
  }
  // async deleteOneByName(username: string) {
  //   const group = await this.groupsRepository.findOne({ where: { username } });
  //   if (!group) {
  //     throw new Error("Group not found");
  //   }
  //   return this.groupsRepository.delete(group);
  // }

  async findOne(id: string) {
    const group = await this.groupsRepository.findOne({ where: { id } });

    return group;
  }

  async update(
    existingGroup: GroupEntity,
    updateGroupsRepositoryInput: UpdateGroupsRepositoryInput
  ) {
    if (!existingGroup) {
      throw new Error("Group not found");
    }
    // upadte
    // const existingGroup = this.groupsRepository.findOne(id);
    // if (!existingGroup) {
    //   return "Group not found";
    // }
    const updatedGroup = this.groupsRepository.merge(
      existingGroup,
      updateGroupsRepositoryInput
    );
    return this.groupsRepository.save(updatedGroup);
  }

  remove(id: number) {
    return `This action removes a #${id} groupsRepository`;
  }
  async findOrCreate(createGroupsRepositoryInput: CreateGroupsRepositoryInput) {
    const existingGroup = await this.findOne(createGroupsRepositoryInput.id);
    if (existingGroup) {
      return existingGroup;
    }
    const createdGroupEntity = await this.create(
      fillDefaultValues(createGroupsRepositoryInput)
    );
    return createdGroupEntity;
  }

  async updateMany(updateGroupsRepositoryInput: UpdateGroupsRepositoryInput[]) {
    for await (const group of updateGroupsRepositoryInput) {
      const existingGroup = await this.findOrCreate(group);
      await this.update(existingGroup, {
        ...group,
        updated_at: new Date(),
      });
    }

    console.log(
      "successfully updated many groups: " + updateGroupsRepositoryInput.length
    );
  }
}

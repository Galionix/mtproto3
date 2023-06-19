// stored spam entity - is what we store in the database
// SpamEntity - is what we send to the client

// the difference between them in field "messages": SpamEntity includes actual MessageEntity,
// but StoredSpamEntity includes only id of the message under key messagesIds

// retro: spam is entity that client sends in cold chats. It doesnt have any requests, only messages
// cold chats could be
export class StoredSpamEntity {}

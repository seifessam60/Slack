import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";
const streamClient = StreamChat.getInstance(
  ENV.STREAM_API_KEY,
  ENV.STREAM_API_SECRET
);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream User Upserted Successfully", userData.name);
    return userData;
  } catch (error) {
    console.log("Error Upserting Stream User", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream User Deleted Successfully", userId);
  } catch (error) {
    console.log("Error Deleting Stream User", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.log("Error Generating Stream Token", error);
    return null;
  }
};

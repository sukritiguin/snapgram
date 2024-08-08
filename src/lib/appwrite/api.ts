import { ID } from "appwrite";

import { INewUser } from "@/types";
import { account, avatars, databases } from "./config";
import {appwriteConfig} from "./config";


export async function createUserAccount(user: INewUser) {
  try{
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    )

    const avatarUrl = await avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageUrl: avatarUrl.toString(),
      username: user.username,
    })

    return newUser;
  }catch(err){
    console.log(err);
    return err;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: string;
  username?: string;
}){
  try {
      const savedUser = databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        user.accountId,
        user
      );
    
      return savedUser;
  } catch (error) {
    console.log(error);
  }
}

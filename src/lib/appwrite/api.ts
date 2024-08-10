import { ID } from "appwrite";

import { INewUser } from "@/types";
import { account, avatars, databases } from "./config";
import { appwriteConfig } from "./config";
import { Query } from "appwrite";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    const avatarUrl = await avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageUrl: avatarUrl.toString(),
      username: user.username,
    });

    return newUser;
  } catch (err) {
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
}) {
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

export async function signInAccount(user: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailPasswordSession(user.email, user.password);
    return session;
  }catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser(){
  try {
    const currentAccount = await account.get();

    if(!currentAccount){
      throw Error;
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser)throw Error;

    return currentUser.documents[0];

  } catch (error) {
    console.log(error);
  }
}

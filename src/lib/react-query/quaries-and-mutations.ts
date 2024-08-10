import { createUserAccount, signInAccount, signOutAccount } from "../appwrite/api";
import { INewUser } from "./../../types/index";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

/*
The role of useMutation in TanStack React Query is to manage and execute asynchronous operations that modify data on the server, such as creating, updating, or deleting resources. It provides an easy way to handle the state and side effects of these operations, such as tracking loading, success, and error states.
*/

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: {email: string, password: string;}) => signInAccount(user),
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount
  })
}

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { SignupValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/quaries-and-mutations";
import { useUserContext } from "@/context/AuthContext";

function SignupForm() {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();

  const navigate = useNavigate();

  const { mutateAsync: createrNewUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount } = useSignInAccount();

  // 1. Define the form using formschema
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createrNewUserAccount(values);

    if (!newUser) {
      return toast({ title: "Signup failed!!! Something went wrong." });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Signing failed!!! Something went wrong." });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Signup failed!!! Something went wrong." });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          To use snapgram enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Signup"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account ?{" "}
            <Link
              to="/signin"
              className="text-primary-500 ml-2 font-bold underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignupForm;

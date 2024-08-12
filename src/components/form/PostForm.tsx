import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "../ui/textarea";
import SingleFileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost } from "@/lib/react-query/quaries-and-mutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

// const formSchema = z.object({
//   caption: z.string().min(2).max(5000),
//   file: z.array();
// });

type PostFormProps = {
  post?: Models.Document;
};

const PostForm: React.FC<PostFormProps> = ({ post }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isCreatingPostPending } =
    useCreatePost();

  const { toast } = useToast();
  const { user } = useUserContext();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      files: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    const newPost = await createPost({
      caption: values.caption,
      files: values.files,
      location: values.location,
      tags: values.tags,
      userId: user.id,
    });

    if (!newPost) {
      toast({ title: "Something went wrong while creating post." });
    }
    navigate("/");
  }

  // 3. Handle file select
  const handleFileSelect = (file: File | null) => {
    if (file) {
      console.log("Selected file:", file);
      // Process the file (e.g., upload it to a server)
      form.setValue("files", [file]);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Upload file</FormLabel>
              <FormControl>
                <SingleFileUploader
                  onFileSelect={handleFileSelect}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Location</FormLabel>
              <FormControl>
                <Input className="shad-input" placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Tags (Seperated by ", ")
              </FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  placeholder="art, travel, education"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 flex-center">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary"
            disabled={isCreatingPostPending}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;

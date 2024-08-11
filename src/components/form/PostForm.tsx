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

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const PostForm: React.FC = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // 3. Handle file select
  const handleFileSelect = (file: File | null) => {
    if (file) {
      console.log("Selected file:", file);
      // Process the file (e.g., upload it to a server)
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
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <SingleFileUploader onFileSelect={handleFileSelect} />
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
          <Button type="submit" className="shad-button_primary">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;

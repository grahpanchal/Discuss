"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";
import { createPost } from "@/actions/create-post";

const PostCreateForm = ({ slug }) => {
  const [formState, action] = useActionState(createPost.bind(null, slug), {
    errors: {},
  });
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Create Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>
                Write a new post. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" className="mt-2" />
              </div>
              {formState.errors.title && (
                <p className="text-sm text-red-500">{formState.errors.title}</p>
              )}
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" className="mt-2" />
              </div>
              {formState.errors.content && (
                <p className="text-sm text-red-500">
                  {formState.errors.content}
                </p>
              )}
              {formState.errors.formError && (
                <div className="border border-red-700 p-2 bg-red-200 rounded">
                  {formState.errors.formError}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full cursor-pointer">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default PostCreateForm;

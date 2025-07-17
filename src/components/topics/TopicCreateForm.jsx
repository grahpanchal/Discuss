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
import { createTopics } from "@/actions/create-topics";
import { useActionState } from "react";

const TopicCreateForm = () => {
  const [formState, action] = useActionState(createTopics, { errors: {} });
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">New Topic</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Create Topic</DialogTitle>
              <DialogDescription>
                Write a new topic to start discussion. Click save when you are
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" className="mt-2" />
              </div>
              {formState.errors.name && (
                <p className="text-sm text-red-500">{formState.errors.name}</p>
              )}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="mt-2"
                />
              </div>
              {formState.errors.description && (
                <p className="text-sm text-red-500">
                  {formState.errors.description}
                </p>
              )}{" "}
              {formState.errors.formError && (
                <div className="border border-red-700 p-2 bg-red-200 rounded">
                  {formState.errors.formError}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full cursor-pointer">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default TopicCreateForm;

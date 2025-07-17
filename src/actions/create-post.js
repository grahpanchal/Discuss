"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});
export const createPost = async (slug, prevState = { message }, formData) => {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        formError: ["You have to login first!"],
      },
    };
  }

  const topic = await prisma.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        formError: ["Topic not found"],
      },
    };
  }

  let post;

  try {
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["Something went wrong"],
        },
      };
    }
  }
  revalidatePath(`/topics/${slug}`);
  redirect(`/topics/${topic.slug}/posts/${post.id}`);
};

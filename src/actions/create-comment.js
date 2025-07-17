"use server";
import { auth } from "@/auth";
import { z } from "zod";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

export const createComment = async (
  { postId, parentId },
  prevState = { message: "" },
  formData
) => {
  console.log("postId:", postId, "parentId:", parentId, "formData:", formData);
  if (!formData || typeof formData.get !== "function") {
    return {
      errors: {
        formError: ["Invalid form data"],
      },
    };
  }
  const result = createCommentSchema.safeParse({
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
        formError: ["You have to first to reply comment"],
      },
    };
  }
  if (!postId) {
    return {
      errors: {
        formError: ["Missing postId. Cannot create comment."],
      },
    };
  }

  let comment;

  try {
    comment = await prisma.comment.create({
      data: {
        content: result.data.content,
        postId: postId,
        userId: session.user.id,
        parentId: parentId,
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
          formError: ["Failed to create comment"],
        },
      };
    }
  }
  const topic = await prisma.topic.findFirst({
    where: {
      posts: {
        some: {
          id: postId,
        },
      },
    },
  });
  if (!topic) {
    return {
      errors: {
        formError: ["Failed to revalidate path"],
      },
    };
  }
  revalidatePath(`/topics/${topic.slug}/posts/${postId}`);
  //   redirect(`/topics/${slug}/posts/${postId}`);
  return {
    errors: {},
  };
};

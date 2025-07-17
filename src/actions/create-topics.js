"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9\s]+$/, { message: "Invalid topic name" }),
  description: z
    .string()
    .min(5)
    .regex(/^[a-zA-Z0-9\s]+$/),
});

export const createTopics = async (prevState = { message }, formData) => {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        formError: ["You have to login first!"],
      },
    };
  }

  let topic;
  try {
    topic = await prisma.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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
  revalidatePath("/");
  redirect(`/topics/${topic.slug}`);
};

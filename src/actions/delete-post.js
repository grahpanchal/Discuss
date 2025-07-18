"use server";
// adjust path if needed
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"; // assuming you use NextAuth
import { prisma } from "@/lib";

export async function deletePost(postId) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (post?.userId !== session.user.id) {
    throw new Error("You can delete only your own posts");
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  // Revalidate to refresh UI
  revalidatePath("/topics");
  revalidatePath(`/topics/${post.topicSlug}`);
}

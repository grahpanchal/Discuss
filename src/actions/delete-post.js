// "use server";
// // adjust path if needed
// import { revalidatePath } from "next/cache";
// import { auth } from "@/auth"; // assuming you use NextAuth
// import { prisma } from "@/lib";

// export async function deletePost(postId) {
//   const session = await auth();

//   if (!session?.user?.id) {
//     throw new Error("Unauthorized");
//   }

//   const post = await prisma.post.findUnique({
//     where: { id: postId },
//   });

//   if (post?.userId !== session.user.id) {
//     throw new Error("You can delete only your own posts");
//   }

//   await prisma.post.delete({
//     where: { id: postId },
//   });

//   // Revalidate to refresh UI
//   revalidatePath("/topics");
//   revalidatePath(`/topics/${post.topicSlug}`);
// }

"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib";

export async function deletePost(postId) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { topic: true },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.userId !== session.user.id) {
    throw new Error("You can delete only your own posts");
  }

  try {
    // Step 1: Delete comments with no children first
    let deletedCount = 0;
    do {
      // Find comments with no children (not referenced by other comments' parentId)
      const commentsToDelete = await prisma.comment.findMany({
        where: {
          postId: postId,
          NOT: {
            id: {
              in: await prisma.comment
                .findMany({
                  where: { postId: postId },
                  select: { parentId: true },
                })
                .then((comments) =>
                  comments
                    .filter((c) => c.parentId != null)
                    .map((c) => c.parentId)
                ),
            },
          },
        },
        select: { id: true },
      });

      if (commentsToDelete.length === 0) break;

      // Delete the comments that have no children
      const result = await prisma.comment.deleteMany({
        where: {
          id: { in: commentsToDelete.map((c) => c.id) },
        },
      });

      deletedCount = result.count;
    } while (deletedCount > 0);

    // Step 2: Delete the post (which should now succeed since all comments are gone)
    await prisma.post.delete({
      where: { id: postId },
    });

    // Revalidate paths
    revalidatePath("/topics");
    revalidatePath(`/topics/${post.topic.slug}`);
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw new Error("Failed to delete post: " + error.message);
  }
}

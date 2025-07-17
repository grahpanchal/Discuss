import { cache } from "react";
import { prisma } from "..";

export const fetchCommentByPostId = cache((postId) => {
  return prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
});

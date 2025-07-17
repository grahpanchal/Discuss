"use client";
import React, { useActionState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/actions/create-comment";
import { Loader2 } from "lucide-react";

const CommentCreateForm = ({ postId, parentId, startOpen }) => {
  const [open, setOpen] = React.useState(startOpen);
  const [formState, action, isPending] = useActionState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );
  return (
    <div>
      <Button
        variant="link"
        size={"sm"}
        className={"cursor-pointer"}
        onClick={() => setOpen(!open)}
      >
        Write a Comment
      </Button>

      {open && (
        <form action={action} className="space-y-2">
          <Textarea
            name="content"
            placeholder="Write a comment..."
            className="bg-gray-200 focus-visible:ring-0"
          />{" "}
          {formState.errors.content && (
            <p className="text-sm text-red-500">{formState.errors.content}</p>
          )}
          {formState.errors.formError && (
            <div className="text-sm border-red-600 bg-red-200 p-2">
              {formState.errors.formError}
            </div>
          )}
          <Button
            disabled={isPending}
            variant={"secondary"}
            size={"sm"}
            className="cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 />
                please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default CommentCreateForm;

// "use client";
// import React, { useActionState } from "react";
// import { Button } from "../ui/button";
// import { Textarea } from "../ui/textarea";
// import { createComment } from "@/actions/create-comment";
// import { Loader2 } from "lucide-react";

// const CommentCreateForm = ({ postId, parentId, startOpen }) => {
//   const [open, setOpen] = React.useState(startOpen);

//   // ✅ Proper wrapper for latest postId, parentId
//   const actionWrapper = async (prevState, formData) => {
//     return await createComment({ postId, parentId }, prevState, formData);
//   };

//   const [formState, action, isPending] = useActionState(actionWrapper, {
//     errors: {},
//   });

//   return (
//     <div>
//       <Button
//         variant="link"
//         size="sm"
//         className="cursor-pointer"
//         onClick={() => setOpen(!open)}
//       >
//         Write a Comment
//       </Button>

//       {open && (
//         <form action={action} className="space-y-2">
//           <Textarea
//             name="content"
//             placeholder="Write a comment..."
//             className="bg-gray-200 focus-visible:ring-0"
//           />
//           {formState.errors?.content && (
//             <p className="text-sm text-red-500">{formState.errors.content}</p>
//           )}
//           {formState.errors?.formError && (
//             <div className="text-sm border-red-600 bg-red-200 p-2">
//               {formState.errors.formError}
//             </div>
//           )}
//           <Button
//             disabled={isPending}
//             variant="secondary"
//             size="sm"
//             className="cursor-pointer"
//           >
//             {isPending ? (
//               <>
//                 <Loader2 className="animate-spin mr-2" />
//                 please wait
//               </>
//             ) : (
//               "Save"
//             )}
//           </Button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default CommentCreateForm;

// this component wraps children with a div and on hover shows a documenation slice
// documenation slice is a small preview of the documentation
// it shows it from docs.md file, which is a markdown file
// to load markdown file we use react-markdown library
import ReactMarkdown from "react-markdown";
import rehypeTOC from "rehype-toc";
import rehypeSlug from "rehype-slug";
import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import docs from "../../../src/docs/docs.md";
import { useRouter } from "next/router";

// !!!slice is the name of the slice in the markdown file
// just copy the name of the slice from the markdown file
export const DocumentationSlice = ({
  slice,
  children,
}: {
  slice: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  // we need to extract the content of the slice from the markdown file
  // we use slice to find the content of the slice
  // we need to remove everything before and after the slice
  // slices are separated by ## and the slice name
  const typedDocs: string = docs;
  const foundContent =
    typedDocs.split("#").find((c) => c.includes(slice)) ||
    `${slice} not found. check the name of the slice in the markdown file. Nevermind the # symbol here at the beginning of the slice name.`;

  const content = "#" + foundContent;

  const slicedContent =
    content.length > 400 ? content.slice(0, 400) + "..." : content;
  // console.log("slicedContent: ", slicedContent);
  const linkUrl = slice
    .replaceAll("#", "")
    .trim()
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll(".", "")
    .replaceAll("?", "")
    .replaceAll(":", "")
    .replaceAll(",", "");
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="relative text-gray-600 underline cursor-pointer"
      onClick={() => {
        setHovered(!hovered);
      }}
    >
      {children}
      {hovered && (
        <div
          onClick={() => {
            router.push(`/docs#${linkUrl}`);
          }}
          className="absolute p-4 bg-white shadow-md rounded-md max-w-lg text-sm"
        >
          {content.length > 400 && (
            <p className="text-orange-500">Click to read more...</p>
          )}
          {/* {slice} */}
          <ReactMarkdown>{slicedContent}</ReactMarkdown>
        </div>
      )}
      <IoInformationCircleOutline
        className="
      absolute top-[-5px] right-[-5px] text-blue-400 text-sm
      "
      />
    </span>
  );
};

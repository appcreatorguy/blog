export const layout = "tag.tsx";

export default function* ({ search }) {
  const tags = search.values("tags");
//   console.log(tags);
  for (const tag of search.values("tags")) {
    yield {
      url: `/tags/${tag}/`,
      title: `tagged “${tag.toLowerCase()}”`,
      type: "tag",
      tag: tag,
    };
  }
}
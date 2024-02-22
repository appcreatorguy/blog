export const layout = "tag.njk";

export default function* ({ search }) {
  const tags = search.values("tags");
//   console.log(tags);
  for (const tag of search.values("tags")) {
    yield {
      url: `/tags/${tag}/`,
      title: `Tagged “${tag}”`,
      type: "tag",
      tag,
    };
  }
}
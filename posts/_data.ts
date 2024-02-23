export const layout = "post.jsx"
export const type = "post"
export const metas = {
  title: "=title",
  description: "=excerpt",
  date: "date",
  image: "$ div.post-content img attr(src)",
}

export const url = (page) => {
  if (page.data.date) {
    const date = page.data.date.toISOString().split("T")[0];
    const [year, month, _day] = date.split("-");
    return `/blog/${year}/${month}/${page.data.basename}/index.html`
  }
}
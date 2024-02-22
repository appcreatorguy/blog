export const layout = "base.jsx";
export const url = "/blog/";
export const type = "undefined";

export default (data) => {
    const posts = data.search
    .pages("type=post", "date=desc")
    return {
        head: (
            <>
                <title>Blog</title>
            </>
        ),
        body: (
            <>
                <h1>Blog</h1>
                {posts.map((post) => {
                    const postDate = post.date.toISOString().split("T")[0];

                    return (
                        <article>
                            <h2>
                                <a href={post.url}>{post.title}</a>
                            </h2>
                            <p>
                                (<time datetime={postDate}>{postDate}</time>)
                            </p>
                        </article>
                    );
                })}
            </>
        ),
    };
};
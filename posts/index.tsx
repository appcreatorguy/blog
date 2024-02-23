export const layout = "base.jsx";
export const url = "/posts/";
export const type = "posts";
export const title = "Posts";

export default (data: Lume.Data) => {
    const posts = data.search
    .pages("type=post", "date=desc")
    return {
        head: (
            <>
                <link rel="stylesheet" href="/styles/posts.css" />
            </>
        ),
        body: (
            <>
                <header>
                    <h1>posts</h1>
                </header>
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
                            <p class="desc">
                                {post.description}
                            </p>
                        </article>
                    );
                })}
            </>
        ),
    };
};
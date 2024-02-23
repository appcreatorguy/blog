export const layout = "base.jsx";

export default ({search, tag}: Lume.Data, helpers: Lume.Helpers) => {
    const posts = search.pages("'" + tag + "' " + "type=post", "date=desc");
    return {
        head: (
            <>
                <link rel="stylesheet" href="/styles/posts.css" />
            </>
        ),
        body: (
            <>
                <header>
                    <h1>posts tagged with "{tag.toLowerCase()}"</h1>
                </header>

                {posts.map((post) => {
                    const postDate = post.date.toISOString().split("T")[0];

                    return (
                        <article key={post.url}>
                            <h2>
                                <a href={post.url}>{post.title}</a>
                            </h2>
                            <p>
                                (<time datetime={postDate}>{postDate}</time>)
                            </p>
                        </article>
                    );
                })}

                <hr/>
                
                <p>see <a href="/tags/">all tags</a></p>
            </>
        )
    }
}
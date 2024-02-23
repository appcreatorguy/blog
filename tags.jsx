export const layout = "base.jsx";
export const title = "Tags";

export default (data) => {
    const tagPages = data.search.pages("type=tag", "tag");
    return {
        head: (
            <>
                <link rel="stylesheet" href="/styles/posts.css" />
            </>
        ),
        body: (
            <>
                <header>
                    <h1>tags</h1>
                </header>
                {tagPages.map((page) => {
                    return (
                        <p>
                        <a href={page.url}>{page.tag.toLowerCase()}</a>
                        </p>
                    )
                })}
            </>
        )
    }
}

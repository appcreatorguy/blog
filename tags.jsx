export const layout = "base.jsx";

export default (data) => {
    const tagPages = data.search.pages("type=tag", "tag");
    // console.log(data.search.pages("Music"));
    return {
        body: (
            <>
                <h1>Tags</h1>
                {tagPages.map((page) => {
                    return (
                        <p>
                        <a href={page.url}>{page.tag}</a>
                        </p>
                    )
                })}
            </>
        )
    }
}

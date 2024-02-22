export const layout = "base.jsx";

export default ({title, description, children, date, tags}) => {
    return {
        head: (
            <>
                <link rel="stylesheet" href="/styles/post.css" />

                <link rel="alternate" type="application/rss+xml" href="https://alphacerium.dev/blog/feed.rss"/>
                <link rel="alternate" type="application/json" href="https://alphacerium.dev/blog/feed.json"/>

                <meta name="description" content={description} />
                <meta itemprop="description" content={description} />
                <meta property="og:description" content={description} />
                <meta property="og:article:published_time" content={date} />
            </>
        ),
        body: (
            <>
                <header>
                    <h1>{title}</h1>
                    <p>
                        <time datetime={date.toISOString().split("T")[0]}>{date.toISOString().split("T")[0]}</time>
                    </p>
                </header>

                {children}
            </>
        )
    }
}
const Navbar = (data) => {
  const { url } = data;

  return (
    <nav>
      <img class="pfp" src="/assets/profile.png" alt="alphacerium icon"/>
      <p> <a href="https://alphacerium.dev">alphacerium</a></p>
      <a href="/">Home</a>
      <a href="/posts">Posts</a>
    </nav>
  );
}

export default (data) => {
    const { url, lang, title, children } = data;
  
    return (
      <html lang={lang || "en"} prefix="og: http://ogp.me/ns#">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
  
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
  
          <link rel="stylesheet" href="/styles/styles.css" />
          <link rel="stylesheet" href="/styles/fonts.css" />
  
          <script type="text/javascript" src="scripts/optOut.js" />
          <script
            defer
            data-domains="alphacerium.dev"
            src="https://umami.alphacerium.dev/script.js"
            data-website-id="731296fb-a90e-4f5c-9f77-6aa42094c3be"
          ></script>  

          {children.head}
        </head>
  
        <body>
          <Navbar data={data} />
          <main>{children.body}</main>
          <footer>
            <p>alphacerium is Manas Mengle (मानस मेंगले)</p>
            <p>This site anoymously collects analytics using <a href="https://umami.alphacerium.dev/share/5rY7aEQOWI7QnXhE/alphacerium.dev">umami</a>. you can <a id="optOut" href="javascript:void(0)">opt out</a> here.</p>
            <p><a href="https://github.com/appcreatorguy/blog">guts</a></p>
          </footer>
        </body>
      </html>
    );
  };
  
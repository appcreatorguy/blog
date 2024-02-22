export default (data) => {
    const { lang, title, children } = data;
  
    return (
      <html lang={lang || "en"} prefix="og: http://ogp.me/ns#">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
  
          <title>{title}</title>
          <meta property="og:title" content={title} />
  
          <link rel="stylesheet" href="/styles/styles.css" />
          <link rel="stylesheet" href="/styles/fonts.css" />
  
          {children.head}
        </head>
  
        <body>
          <main>{children.body}</main>
          <footer>
            <p>alphacerium is Manas Mengle (मानस मेंगले)</p>
            <p><a href="https://github.com/appcreatorguy/blog">guts</a></p>
          </footer>
        </body>
      </html>
    );
  };
  
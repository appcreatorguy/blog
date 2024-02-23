import lume from "lume/mod.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import filter_pages from "lume/plugins/filter_pages.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import katex from "lume/plugins/katex.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import relativeUrls from "lume/plugins/relative_urls.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import postcss from "lume/plugins/postcss.ts";

import mdAnchor from "npm:markdown-it-anchor";
import mdFootnote from "npm:markdown-it-footnote";

const site = lume(
    {
        location: new URL("https://alphacerium.dev"),
    },
    {
        markdown: { options: { linkify: true, typographer: true } },
    }
);

site.copy("assets");
site.copy("styles");

site.use(code_highlight());
site.use(date());
site.use(favicon());
site.use(feed({
    output: ["/feed.json", "/feed.rss"],
    query: "type=post",
    info: {
        title: "the alphacerium blog",
        description: "ramblings from alphacerium",
    },
    items: {
        title: "=title",
        description: "=excerpt",
    },
}));
site.use(filter_pages({
    fn: (page) => page.data.ignored !== true,
}));
site.use(nunjucks());
site.use(jsx());
site.use(katex({ options: { displayMode: false } }));
site.use(resolveUrls());
site.use(relativeUrls());
site.use(slugifyUrls());
site.use(postcss());

const customizeMarkdown = (md: any) => {
    md.use(mdAnchor, { level: 2 });
    md.use(mdFootnote);
};

const md: any = await new Promise((resolve) => site.hooks.markdownIt(resolve));
customizeMarkdown(md);

export default site;

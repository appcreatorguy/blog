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
import metas from "lume/plugins/metas.ts";

import mdAnchor from "npm:markdown-it-anchor";
import mdFootnote from "npm:markdown-it-footnote";

const site = lume(
    {
        location: new URL("https://alphacerium.dev/blog"),
    },
    {
        markdown: { options: { linkify: true, typographer: true } },
    }
);

site.copy("assets");
site.copy("styles");
site.copy("scripts");

site.use(code_highlight());
site.use(date());
site.use(favicon());
site.use(feed({
    output: ["/feed.json", "/feed.rss"],
    query: "type=post",
    info: {
        title: "the alphacerium blog",
        description: "ramblings from alphacerium",
        lang: "en",

    },
    items: {
        title: "=title",
        description: "=excerpt",
        content: "$.post-content",
        published: "=created",
        updated: "=date",
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
site.use(metas());

const customizeMarkdown = (md: any) => {
    md.use(mdAnchor, { level: 2 });
    md.use(mdFootnote);

    // footnote captions without surrounding square brackets
    md.renderer.rules.footnote_caption = (tokens: any, idx: any) => {
        let n = Number(tokens[idx].meta.id + 1).toString();
        if (tokens[idx].meta.subId > 0) {
            n += ":" + tokens[idx].meta.subId;
        }
        return n;
    };

    // insert .non-footnote-content around markdown so that we can flexbox expand it
    // (and push the footnotes section to the bottom of the body)
    md.core.ruler.before("block", "content-wrapper-open", (state: any) => {
        state.tokens.push(new state.Token("non_footnote_content_open"));
    });
    md.core.ruler.before(
        "footnote_tail",
        "content-wrapper-close",
        (state: any) => {
        state.tokens.push(new state.Token("non_footnote_content_close"));
        }
    );
    md.renderer.rules.non_footnote_content_open = (_tokens: any, _idx: any) => {
        return `<div class="non-footnote-content">`;
    };
    md.renderer.rules.non_footnote_content_close = (_tokens: any, _idx: any) => {
        return `</div>`;
    };
};

const md: any = await new Promise((resolve) => site.hooks.markdownIt(resolve));
customizeMarkdown(md);

export default site;

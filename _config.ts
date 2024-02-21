import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import filter_pages from "lume/plugins/filter_pages.ts";

const site = lume();

site.use(base_path());
site.use(code_highlight());
site.use(date());
site.use(favicon());
site.use(feed());
site.use(filter_pages());

export default site;

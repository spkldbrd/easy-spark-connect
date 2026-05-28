import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { CinematicCTA } from "@/components/site/PageHero";
import { buildSeo } from "@/lib/seo";
import { fetchPostBySlug, featuredImage, stripHtml, formatDate, hasCategorySlug } from "@/lib/wp";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return buildSeo({ title: "Blog", description: "Digital Solution blog.", path: "/blog" });
    }
    const { post } = loaderData;
    const title = stripHtml(post.title.rendered);
    const description = stripHtml(post.excerpt.rendered).slice(0, 160) ||
      `Article from the Digital Solution blog — ${title}.`;
    return buildSeo({
      title,
      description,
      path: `/blog/${post.slug}`,
      image: featuredImage(post),
      type: "article",
      noindex: hasCategorySlug(post, "techtips") ? "follow" : false,
    });
  },
  notFoundComponent: () => (
    <SiteShell overDark={false}>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl font-semibold">Post not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-brand underline">
          Back to the blog
        </Link>
      </div>
    </SiteShell>
  ),
  errorComponent: ({ error }) => (
    <SiteShell overDark={false}>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-semibold">Couldn't load this post</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <Link to="/blog" className="mt-6 inline-block text-brand underline">
          Back to the blog
        </Link>
      </div>
    </SiteShell>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const img = featuredImage(post);
  const author = post._embedded?.author?.[0]?.name;

  return (
    <SiteShell overDark={false}>
      <article>
        <header className="border-b border-border bg-surface">
          <div className="mx-auto max-w-3xl px-6 pt-24 pb-12 lg:pt-32">
            <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              ← All posts
            </Link>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-cyan">
              {formatDate(post.date)}
              {author ? <> · {author}</> : null}
            </p>
            <h1
              className="mt-4 font-display font-semibold tracking-tight text-ink"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", lineHeight: 1.05, letterSpacing: "-0.035em" }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </div>
          {img && (
            <div className="mx-auto max-w-5xl px-6 pb-16">
              <img
                src={img}
                alt={stripHtml(post.title.rendered)}
                className="aspect-[16/9] w-full rounded-2xl object-cover"
              />
            </div>
          )}
        </header>

        <div className="mx-auto max-w-3xl px-6 py-16">
          <div
            className="wp-content prose prose-lg max-w-none text-ink"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </article>

      <CinematicCTA
        title="Need a hand with this?"
        subtitle="We're a quick call away. Real people, no scripts."
      />
    </SiteShell>
  );
}

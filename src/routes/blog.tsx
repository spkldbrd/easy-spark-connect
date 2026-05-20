import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { buildSeo } from "@/lib/seo";
import { fetchPosts, featuredImage, stripHtml, formatDate, type WPPost } from "@/lib/wp";
import { z } from "zod";

const searchSchema = z.object({
  page: z.coerce.number().int().min(1).max(500).optional().default(1),
});

export const Route = createFileRoute("/blog")({
  validateSearch: searchSchema,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps }) => fetchPosts(deps.page, 12),
  head: () => buildSeo({
    title: "Blog",
    description:
      "Practical IT, cybersecurity, and AI insights from the Digital Solution team — based on the Central Coast since 1997.",
    path: "/blog",
  }),
  errorComponent: ({ error }) => (
    <SiteShell overDark={false}>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold">Couldn't load the blog</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
      </div>
    </SiteShell>
  ),
  component: BlogIndex,
});

function BlogIndex() {
  const { posts, totalPages } = Route.useLoaderData();
  const { page } = Route.useSearch();

  return (
    <SiteShell overDark={false}>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 lg:pt-32 lg:pb-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan">Field Notes</p>
          <h1
            className="mt-4 font-display font-semibold tracking-tight text-ink"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)", lineHeight: 0.95, letterSpacing: "-0.04em" }}
          >
            What we're <span className="text-gradient-brand italic">writing</span> about.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Plain-spoken notes from the bench — fixes, threats, AI experiments, and the
            occasional opinion. Twenty-seven years of doing the work, written down.
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts yet.</p>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              {page > 1 && (
                <Link
                  to="/blog"
                  search={{ page: page - 1 }}
                  className="rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-surface"
                >
                  ← Newer
                </Link>
              )}
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  to="/blog"
                  search={{ page: page + 1 }}
                  className="rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-surface"
                >
                  Older →
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function PostCard({ post }: { post: WPPost }) {
  const img = featuredImage(post);
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 180);
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition hover:shadow-soft"
    >
      <div className="aspect-[16/10] overflow-hidden bg-surface">
        {img ? (
          <img
            src={img}
            alt={stripHtml(post.title.rendered)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-brand text-white/80">
            <span className="font-display text-3xl">DS</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {formatDate(post.date)}
        </p>
        <h2
          className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-brand"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {excerpt && (
          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{excerpt}…</p>
        )}
        <span className="mt-5 text-sm font-semibold text-brand">Read →</span>
      </div>
    </Link>
  );
}

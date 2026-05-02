import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import FooterReveal from "../../components/FooterReveal";
import CTAButton from "../../components/CTAButton";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = any;

type Post = {
  _id: string;
  title: string;
  slug: string;
  category: string | null;
  publishedAt: string | null;
  excerpt: string | null;
  coverImage: Block | null;
  imageUrl: string | null;
  body: Block[] | null;
};

const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    coverImage,
    imageUrl,
    body
  }
`;

const ALL_SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`;

export async function generateStaticParams() {
  const items = await client.fetch<{ slug: string }[]>(ALL_SLUGS_QUERY, {}, { cache: "no-store" });
  return items.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_QUERY, { slug }, { cache: "no-store" });
  if (!post) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://h.studio";
  const coverUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : null;

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `/news/${slug}`,
      type: "article",
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
      ...(coverUrl && { images: [{ url: coverUrl, width: 1200, height: 630 }] }),
      authors: [`${siteUrl}/about`],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
      ...(coverUrl && { images: [coverUrl] }),
    },
  };
}

function renderMarks(child: Block): React.ReactNode {
  let node: React.ReactNode = child.text;
  const marks: string[] = child.marks ?? [];
  if (marks.includes("strong")) node = <strong key="s">{node}</strong>;
  if (marks.includes("em"))     node = <em key="e">{node}</em>;
  if (marks.includes("underline")) node = <u key="u">{node}</u>;
  return node;
}

function PortableTextBlock({ block, index }: { block: Block; index: number }) {
  if (block._type === "image" && block.asset) {
    const src = urlFor(block).width(1200).url();
    return (
      <figure key={index} className="my-8 md:my-12">
        <img src={src} alt={block.alt ?? ""} className="w-full object-cover" />
      </figure>
    );
  }

  if (block._type !== "block") return null;

  const children = (block.children ?? []).map((child: Block, i: number) => (
    <span key={i}>{renderMarks(child)}</span>
  ));

  const base = "leading-[1.6] [letter-spacing:-0.02em]";

  switch (block.style) {
    case "h2":
      return <h2 key={index} className={`font-bold text-[28px] md:text-[36px] text-black mt-10 mb-4 ${base}`}>{children}</h2>;
    case "h3":
      return <h3 key={index} className={`font-bold text-[20px] md:text-[24px] text-black mt-8 mb-3 ${base}`}>{children}</h3>;
    case "blockquote":
      return (
        <blockquote key={index} className={`border-l-2 border-black pl-6 my-6 font-light italic text-[20px] text-[#1f1f1f] ${base}`}>
          {children}
        </blockquote>
      );
    default:
      return <p key={index} className={`text-[16px] md:text-[18px] text-[#1f1f1f] my-4 ${base}`}>{children}</p>;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_QUERY, { slug }, { cache: "no-store" });

  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://h.studio";
  const coverSrc = post.coverImage
    ? urlFor(post.coverImage).width(1600).url()
    : post.imageUrl ?? null;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    ...(coverSrc && { image: coverSrc }),
    ...(post.publishedAt && { datePublished: post.publishedAt }),
    author: { "@type": "Person", name: "Harvey Specter", url: `${siteUrl}/about` },
    publisher: { "@type": "Person", name: "Harvey Specter", url: siteUrl },
    url: `${siteUrl}/news/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <NavBar />
      <main className="relative bg-white z-[1]">

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section data-nav-theme="dark" className="bg-black px-4 pt-32 pb-16 md:px-8 md:pt-40 md:pb-20 overflow-hidden">
          <div className="flex flex-col gap-10 md:gap-14">

            <Link
              href="/#news"
              className="flex items-center gap-2 font-mono text-[13px] text-white/50 uppercase leading-[1.1] hover:text-white transition-colors duration-200 self-start"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              News
            </Link>

            <div className="flex flex-col gap-3">
              {post.category && (
                <p className="font-mono text-[12px] text-white/50 uppercase leading-[1.1] [letter-spacing:0.04em]">
                  {post.category}
                </p>
              )}
              <h1 className="font-light text-[10vw] md:text-[7vw] text-white leading-[0.88] [letter-spacing:-0.08em] uppercase">
                {post.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/20 pt-6">
              {post.publishedAt && (
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-[11px] text-white/40 uppercase leading-[1.1]">Published</p>
                  <p className="font-medium text-[14px] text-white uppercase leading-[1.1] [letter-spacing:-0.56px]">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              )}
              {post.category && (
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-[11px] text-white/40 uppercase leading-[1.1]">Category</p>
                  <p className="font-medium text-[14px] text-white uppercase leading-[1.1] [letter-spacing:-0.56px]">
                    {post.category}
                  </p>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ── Cover image ────────────────────────────────────────── */}
        {coverSrc && (
          <div className="relative overflow-hidden h-[300px] md:h-[560px] lg:h-[680px]">
            <img
              src={coverSrc}
              alt={post.title}
              className="absolute inset-0 size-full object-cover pointer-events-none select-none"
            />
          </div>
        )}

        {/* ── Content ────────────────────────────────────────────── */}
        <section className="px-4 py-16 md:px-8 md:py-24 max-w-[860px]">

          {post.excerpt && (
            <p className="font-light text-[22px] md:text-[28px] text-black leading-[1.3] [letter-spacing:-0.04em] mb-12 md:mb-16 border-b border-[#1f1f1f]/15 pb-12 md:pb-16">
              {post.excerpt}
            </p>
          )}

          {(post.body ?? []).length > 0 && (
            <div>
              {(post.body ?? []).map((block: Block, i: number) => (
                <PortableTextBlock key={block._key ?? i} block={block} index={i} />
              ))}
            </div>
          )}

          {!post.excerpt && (post.body ?? []).length === 0 && (
            <p className="text-[18px] text-[#1f1f1f]/50 leading-[1.6] [letter-spacing:-0.02em]">
              Full article coming soon.
            </p>
          )}

        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section data-nav-theme="dark" className="bg-black px-4 py-16 md:px-8 md:py-24 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[13px] text-white/40 uppercase leading-[1.1]">[ Next step ]</p>
              <p className="font-light text-[8vw] md:text-[5vw] text-white uppercase leading-[0.88] [letter-spacing:-0.08em]">
                Start your<br />
                <span className="font-playfair italic font-normal" style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}>
                  project.
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <CTAButton
                variant="ghost"
                className="self-start md:self-auto border border-white text-white text-[14px] font-medium px-6 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap"
              >
                Let&apos;s talk
              </CTAButton>
              <Link
                href="/#news"
                className="font-mono text-[13px] text-white/50 uppercase leading-[1.1] hover:text-white transition-colors duration-200"
              >
                ← Back to news
              </Link>
            </div>
          </div>
        </section>

      </main>

      <FooterReveal>
        <footer data-nav-theme="dark" className="bg-black overflow-hidden">

          <div data-footer-item className="px-4 pt-12 lg:px-8 lg:pt-[48px] flex flex-col gap-6 lg:gap-12">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
              <div className="flex flex-col gap-3 lg:w-[298px]">
                <p className="font-light italic text-[24px] text-white uppercase leading-[1.1] [letter-spacing:-0.96px]">
                  Have a{" "}
                  <span className="font-black not-italic">project</span>
                  {" "}in mind?
                </p>
                <CTAButton variant="ghost" className="self-start border border-white text-white text-[14px] font-medium px-4 py-3 rounded-3xl [letter-spacing:-0.56px] whitespace-nowrap">
                  Let&apos;s talk
                </CTAButton>
              </div>
              <div className="lg:hidden flex flex-col gap-1 text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px]">
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Facebook</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Instagram</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">X.com</a>
                <a href="#" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Linkedin</a>
              </div>
              <div className="hidden lg:block text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px] text-center w-[298px]">
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">Facebook</a>
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">Instagram</a>
              </div>
              <div className="hidden lg:block text-white text-[18px] uppercase leading-[1.1] [letter-spacing:-0.72px] text-right w-[298px]">
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">X.com</a>
                <a href="#" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">Linkedin</a>
              </div>
            </div>
            <div className="h-px bg-white/20 w-full" />
          </div>

          <div data-footer-item className="hidden lg:flex items-end justify-between px-8 mt-[120px]">
            <div className="relative overflow-hidden h-[219px] w-[1093px]">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center h-[160px] w-[15px]">
                <p className="-rotate-90 font-mono text-[14px] text-white uppercase whitespace-nowrap leading-[1.1]">[ Coded By Claude ]</p>
              </div>
              <p className="absolute left-0 top-1/2 -translate-y-1/2 font-semibold text-[290px] text-white leading-[0.8] [letter-spacing:-0.06em] capitalize whitespace-nowrap">
                H.Studio
              </p>
            </div>
            <div className="flex gap-[34px] pb-8 text-[12px] text-white uppercase leading-[1.1] [letter-spacing:-0.48px] whitespace-nowrap">
              <a href="#" className="underline hover:opacity-70 transition-opacity">Licences</a>
              <a href="#" className="underline hover:opacity-70 transition-opacity">Privacy policy</a>
            </div>
          </div>

          <div data-footer-item className="lg:hidden px-4 mt-12 flex flex-col gap-4 overflow-hidden">
            <div className="flex gap-[34px] justify-center text-[12px] text-white uppercase leading-[1.1] [letter-spacing:-0.48px] whitespace-nowrap">
              <a href="#" className="underline hover:opacity-70 transition-opacity">Licences</a>
              <a href="#" className="underline hover:opacity-70 transition-opacity">Privacy policy</a>
            </div>
            <div className="overflow-hidden">
              <p className="font-mono text-[10px] text-white uppercase leading-[1.1] mb-3">[ Coded By Claude ]</p>
              <p className="font-semibold text-[91px] text-white leading-[0.8] [letter-spacing:-0.06em] capitalize whitespace-nowrap">H.Studio</p>
            </div>
          </div>

        </footer>
      </FooterReveal>
    </>
  );
}

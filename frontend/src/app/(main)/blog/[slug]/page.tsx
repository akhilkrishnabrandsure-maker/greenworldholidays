export default function BlogSlugPage({ params }: { params: { slug: string } }) {
  return <div className="p-8">Blog: {params.slug} Placeholder</div>;
}

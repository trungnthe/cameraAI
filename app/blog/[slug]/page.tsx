import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  author: string
  categories: string[]
  publishedAt: string
  body: any
  mainImage?: {
    asset: {
      url: string
    }
  }
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      "author": author->name,
      "categories": categories[]->title,
      publishedAt,
      body,
      mainImage {
        asset->{
          url
        }
      }
    }
  `
  return await client.fetch(query, { slug })
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) return notFound()

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="text-sm text-gray-600 mb-4 space-x-2">
        <span>{post.author}</span>
        <span>•</span>
        <span>{new Date(post.publishedAt).toLocaleDateString('vi-VN')}</span>
        <span>•</span>
        {post.categories.map((cat, i) => (
          <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            {cat}
          </span>
        ))}
      </div>

      {post.mainImage?.asset?.url && (
        <div className="w-full h-[400px] relative rounded overflow-hidden mb-6">
          <Image
            src={post.mainImage.asset.url}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body} />
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { client } from '../../lib/sanity'
import { postsQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  author: string
  categories: string[]
  publishedAt: string
  body: PortableTextBlock[]
  mainImage?: {
    asset: {
      url: string
    }
  }
}


export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  useEffect(() => {
    client.fetch(postsQuery).then((data) => {
      console.log('Fetched posts:', data)
      setPosts(data)
    })
  }, [])


  const uniqueCategories = Array.from(
    new Set(posts.flatMap((post) => post.categories))
  )

  const filteredPosts =
  categoryFilter === 'all'
    ? posts
    : posts.filter((post) => post.categories.includes(categoryFilter))


  return (
    <section className="py-20 md:py-32 bg-white" id="blog">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Bài viết của chúng tôi </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 text-sm rounded border ${
              categoryFilter === 'all'
                ? 'bg-black text-white'
                : 'bg-white text-black border-gray-300'
            }`}
          >
            Tất cả
          </button>
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 text-sm rounded border ${
                categoryFilter === cat
                  ? 'bg-black text-white'
                  : 'bg-white text-black border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {filteredPosts.map((post) => (
            <div key={post._id} className="border rounded overflow-hidden shadow">
              {post.mainImage?.asset?.url && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

              )}
              <div className="p-4">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-semibold hover:underline">{post.title}</h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {post.author} • {new Date(post.publishedAt).toLocaleDateString()} 

                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.categories.map((cat, i) => (
                    <span key={i} className="text-xs text-white bg-blue-500 px-2 py-1 rounded">
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="mt-3 line-clamp-3 text-sm text-gray-700">
                  <PortableText value={post.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

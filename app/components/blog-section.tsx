'use client'

import { useEffect, useState } from 'react'
import { client } from '../../lib/sanity'
import { postsQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { motion } from 'framer-motion'

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
  const [currentPage, setCurrentPage] = useState(0)
  const postsPerPage = 3

  useEffect(() => {
    client.fetch(postsQuery).then((data) => {
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

  const pageCount = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice(
    currentPage * postsPerPage,
    currentPage * postsPerPage + postsPerPage
  )

  useEffect(() => {
    setCurrentPage(0)
  }, [categoryFilter])

  return (
    <section className="py-20 md:py-32 bg-white" id="blog">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Bài viết của chúng tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Những chia sẻ và kiến thức từ đội ngũ CameraAI - MCK Group
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 text-sm rounded border ${
              categoryFilter === 'all'
                ? 'bg-black text-white'
                : 'bg-white text-black border-gray-300'
            }`}
          >
            Tất cả
          </motion.button>
          {uniqueCategories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 text-sm rounded border ${
                categoryFilter === cat
                  ? 'bg-black text-white'
                  : 'bg-white text-black border-gray-300'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {paginatedPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border rounded overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            >
              {post.mainImage?.asset?.url && (
                <div className="relative w-full h-48 overflow-hidden group">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
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
                    <span
                      key={i}
                      className="text-xs text-white bg-blue-500 px-2 py-1 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="mt-3 line-clamp-3 text-sm text-gray-700">
                  <PortableText value={post.body} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {pageCount > 1 && (
          <motion.div
            className="flex justify-center mt-10 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="px-4 py-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              ◀ Trang trước
            </button>
            <span className="self-center font-medium">
              Trang {currentPage + 1} / {pageCount}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))}
              disabled={currentPage >= pageCount - 1}
              className="px-4 py-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Trang sau ▶
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

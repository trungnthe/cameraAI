"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, User, Edit, Trash2, Plus } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([
  {
    id: 1,
    title: "Tương lai của camera an ninh tích hợp trí tuệ nhân tạo",
    excerpt:
      "Khám phá cách trí tuệ nhân tạo đang thay đổi ngành công nghiệp camera an ninh với khả năng phát hiện và phân tích thông minh.",
    content:
      "Trí tuệ nhân tạo (AI) đang cách mạng hóa ngành camera an ninh. Các thiết bị hiện đại không chỉ ghi hình mà còn có thể nhận diện khuôn mặt, phân loại đối tượng, phát hiện hành vi bất thường và thậm chí dự đoán rủi ro an ninh tiềm ẩn. Đây là bước tiến vượt bậc so với hệ thống giám sát truyền thống...",
    author: "TS. Nguyễn Minh Tuấn",
    date: "2024-06-15",
    category: "Công nghệ AI",
  },
  {
    id: 2,
    title: "Lưu ý quan trọng khi triển khai công nghệ nhận diện khuôn mặt",
    excerpt:
      "Tìm hiểu các nguyên tắc triển khai nhận diện khuôn mặt một cách hiệu quả và đảm bảo quyền riêng tư của người dùng.",
    content:
      "Việc ứng dụng công nghệ nhận diện khuôn mặt trong doanh nghiệp cần được cân nhắc kỹ lưỡng. Từ độ chính xác, tính minh bạch, đến các vấn đề pháp lý và quyền riêng tư. Một hệ thống hiệu quả phải vừa đảm bảo an ninh, vừa không xâm phạm quyền cá nhân của người dùng...",
    author: "Trần Bảo Khang",
    date: "2024-06-10",
    category: "Ứng dụng thực tiễn",
  },
  {
    id: 3,
    title: "Xu hướng Edge Computing trong hệ thống giám sát thông minh",
    excerpt:
      "Edge computing đang mang lại tốc độ xử lý nhanh hơn và bảo mật tốt hơn cho các hệ thống camera hiện đại.",
    content:
      "Thay vì gửi toàn bộ dữ liệu lên đám mây, công nghệ edge computing xử lý trực tiếp tại thiết bị. Điều này giúp giảm độ trễ, nâng cao hiệu quả, đồng thời đảm bảo dữ liệu không bị rò rỉ ra ngoài hệ thống. Đây là một xu hướng quan trọng trong việc phát triển camera AI thông minh trong môi trường đô thị và công nghiệp...",
    author: "Lê Thảo Nguyên",
    date: "2024-06-05",
    category: "Xu hướng công nghệ",
  },
]);


  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
  })

  const handleCreate = () => {
    const newPost: BlogPost = {
      id: Date.now(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author,
      date: new Date().toISOString().split("T")[0],
      category: formData.category,
    }
    setPosts([newPost, ...posts])
    setFormData({ title: "", excerpt: "", content: "", author: "", category: "" })
    setIsCreateOpen(false)
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
    })
  }

  const handleUpdate = () => {
    if (!editingPost) return

    const updatedPosts = posts.map((post) => (post.id === editingPost.id ? { ...post, ...formData } : post))
    setPosts(updatedPosts)
    setEditingPost(null)
    setFormData({ title: "", excerpt: "", content: "", author: "", category: "" })
  }

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  const resetForm = () => {
    setFormData({ title: "", excerpt: "", content: "", author: "", category: "" })
    setEditingPost(null)
  }

  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex justify-between items-center mb-16">
          <div className="text-center space-y-4 flex-1">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Bài viết của chúng tôi</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cập nhật những xu hướng, hiểu biết sâu sắc và đổi mới mới nhất về công nghệ camera hỗ trợ AI.
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 ml-4">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Tạo bài viết mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Người viết</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Trích đoạn</Label>
                  <Textarea
                    id="excerpt"
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Nội dung</Label>
                  <Textarea
                    id="content"
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleCreate} className="bg-red-600 hover:bg-red-700">
                    Create Post
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetForm()
                      setIsCreateOpen(false)
                    }}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {post.category}
                  </Badge>
                  <div className="flex space-x-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Blog Post</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-author">Author</Label>
                            <Input
                              id="edit-author"
                              value={formData.author}
                              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Input
                              id="edit-category"
                              value={formData.category}
                              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-excerpt">Excerpt</Label>
                            <Textarea
                              id="edit-excerpt"
                              rows={2}
                              value={formData.excerpt}
                              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-content">Content</Label>
                            <Textarea
                              id="edit-content"
                              rows={6}
                              value={formData.content}
                              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleUpdate} className="bg-red-600 hover:bg-red-700">
                              Update Post
                            </Button>
                            <Button variant="outline" onClick={resetForm}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 text-sm line-clamp-3">{post.content.substring(0, 150)}...</p>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  Đọc thêm
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

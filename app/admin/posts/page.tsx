"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Eye, X, RotateCcw } from "lucide-react";
import AdminLayout from "../components/admin-layout";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { useNotifications } from "@/components/ui/use-notifications";

export default function BlogPostsPage() {
  const { showSuccess, showError } = useNotifications();
  const [posts, setPosts] = useState<{
    id: string;
    title: string;
    createdAt: string;
    published: boolean;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<{ id: string; title: string; createdAt: string; published: boolean } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingPost, setEditingPost] = useState<{ id: string; title: string; createdAt: string; published: boolean } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    published: true
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?limit=5`);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`);
      const data = await response.json();
      if (data.success) {
        const post = data.data;
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
          tags: post.tags.join(', '),
          published: post.published
        });
        setEditingPost(posts.find(p => p.id === id) || null);
        setIsCreateDialogOpen(true);
      } else {
        showError('Error Loading Post', 'Failed to load post details');
      }
    } catch {
      showError('Error', 'Failed to load post details. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCreatePost = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setIsCreating(true);

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        showError('Validation Error', 'Please enter a title');
        setIsCreating(false);
        return;
      }
      
      if (!formData.content.trim() || formData.content === '<p><br></p>') {
        showError('Validation Error', 'Please enter content');
        setIsCreating(false);
        return;
      }

      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const postData = {
        title: formData.title,
        content: formData.content,
        author: formData.author || 'Admin',
        tags: tagsArray,
        published: formData.published
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      
      if (data.success) {
        // Reset form and states
        setFormData({
          title: '',
          content: '',
          author: '',
          tags: '',
          published: true
        });
        setIsPreviewMode(false);
        setIsCreateDialogOpen(false);
        // Refresh posts list
        fetchPosts();
        showSuccess('Success!', 'Blog post created successfully');
      } else {
        showError('Error Creating Post', data.message || 'Failed to create blog post');
      }
    } catch {
      showError('Error', 'Failed to create blog post. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdatePost = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!editingPost) return;
    
    setIsUpdating(true);

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        showError('Validation Error', 'Please enter a title');
        setIsUpdating(false);
        return;
      }
      
      if (!formData.content.trim() || formData.content === '<p><br></p>') {
        showError('Validation Error', 'Please enter content');
        setIsUpdating(false);
        return;
      }

      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const postData = {
        title: formData.title,
        content: formData.content,
        author: formData.author || 'Admin',
        tags: tagsArray,
        published: formData.published
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      
      if (data.success) {
        // Reset form and states
        setFormData({
          title: '',
          content: '',
          author: '',
          tags: '',
          published: true
        });
        setEditingPost(null);
        setIsPreviewMode(false);
        setIsCreateDialogOpen(false);
        // Refresh posts list
        fetchPosts();
        showSuccess('Success!', 'Blog post updated successfully');
      } else {
        showError('Error Updating Post', data.message || 'Failed to update blog post');
      }
    } catch {
      showError('Error', 'Failed to update blog post. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      tags: '',
      published: true
    });
    setEditingPost(null);
    setIsPreviewMode(false);
    setIsResetConfirmOpen(false);
  };

  const handleOpenCreateDialog = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      tags: '',
      published: true
    });
    setEditingPost(null);
    setIsPreviewMode(false);
    setIsCreateDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setEditingPost(null);
    setIsPreviewMode(false);
    setFormData({
      title: '',
      content: '',
      author: '',
      tags: '',
      published: true
    });
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;
    
    setIsDeleting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${postToDelete.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        // Close confirmation dialog and refresh posts list
        setIsDeleteConfirmOpen(false);
        setPostToDelete(null);
        fetchPosts();
        showSuccess('Success!', 'Blog post deleted successfully');
      } else {
        showError('Error Deleting Post', data.message || 'Failed to delete blog post');
      }
    } catch {
      showError('Error', 'Failed to delete blog post. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenDeleteConfirm = (post: { id: string; title: string; createdAt: string; published: boolean }) => {
    setPostToDelete(post);
    setIsDeleteConfirmOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleOpenCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="blog-dialog-large max-h-[98vh] overflow-y-auto" style={{ width: '70vw', maxWidth: '70vw' }}>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
                    <DialogDescription>
                      {editingPost ? 'Update the details below to modify the blog post.' : 'Fill in the details below to create a new blog post.'}
                    </DialogDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant={!isPreviewMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsPreviewMode(false)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant={isPreviewMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsPreviewMode(true)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </DialogHeader>

              {!isPreviewMode ? (
                /* Edit Mode - Form */
                <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog post title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Content</Label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                    placeholder="Enter blog post content"
                    height="300px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="e.g. technology, ai, camera"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>
                
                <div className="flex justify-between sticky bottom-0 bg-white border-t mt-6 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsResetConfirmOpen(true)}
                    className="text-orange-600 hover:bg-orange-50"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseDialog}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={editingPost ? isUpdating : isCreating}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {editingPost 
                        ? (isUpdating ? 'Updating...' : 'Update Post')
                        : (isCreating ? 'Creating...' : 'Create Post')
                      }
                    </Button>
                  </div>
                </div>
                </form>
              ) : (
                /* Preview Mode */
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border">
                    <h1 className="text-3xl font-bold mb-2">{formData.title || 'Untitled Post'}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>By {formData.author || 'Admin'}</span>
                      <span>•</span>
                      <span>{new Date().toLocaleDateString()}</span>
                      <span>•</span>
                      <Badge variant={formData.published ? "default" : "secondary"}>
                        {formData.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    
                    {formData.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {formData.tags.split(',').map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: formData.content || '<p class="text-gray-500">No content yet...</p>' 
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-between sticky bottom-0 bg-white border-t pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsResetConfirmOpen(true)}
                      className="text-orange-600 hover:bg-orange-50"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCloseDialog}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsPreviewMode(false)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Back to Edit
                      </Button>
                      <Button
                        type="button"
                        disabled={editingPost ? isUpdating : isCreating}
                        className="bg-red-600 hover:bg-red-700"
                        onClick={editingPost ? handleUpdatePost : handleCreatePost}
                      >
                        {editingPost 
                          ? (isUpdating ? 'Updating...' : 'Update Post')
                          : (isCreating ? 'Creating...' : 'Create Post')
                        }
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
          
          {/* Reset Confirmation Dialog */}
          <Dialog open={isResetConfirmOpen} onOpenChange={setIsResetConfirmOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Reset Form</DialogTitle>
                <DialogDescription>
                  Are you sure you want to reset the form? All content will be cleared and cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsResetConfirmOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleResetForm}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Form
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Delete Confirmation Dialog */}
          <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Delete Blog Post</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete &quot;{postToDelete?.title}&quot;? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDeleteConfirmOpen(false);
                    setPostToDelete(null);
                  }}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeletePost}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete Post'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Blog Posts</CardTitle>
            <CardDescription>Create, edit, and publish your blog content</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading posts...</p>
            ) : (
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <p className="text-gray-500">No blog posts found.</p>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => fetchPost(post.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleOpenDeleteConfirm(post)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

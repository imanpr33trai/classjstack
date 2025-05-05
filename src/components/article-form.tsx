'use client';

import { useState } from 'react';
import { MaxWidthWrapper } from './max-width-wrapper';
import { SiteButton } from './site-button';

import { InputUI } from './ui/input';

type ArticleFormData = {
  title: string;
  content: string;
  category: string;
  author: string;
  email: string;
  tags: string;
  featuredImage?: string;
};

const categories = [
  { id: 'news', name: 'News' },
  { id: 'business', name: 'Business' },
  { id: 'technology', name: 'Technology' },
  { id: 'health', name: 'Health & Wellness' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'sports', name: 'Sports' },
  { id: 'education', name: 'Education' },
];

export default function ArticleForm() {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    category: '',
    author: '',
    email: '',
    tags: '',
    featuredImage: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit article');
      }

      setSuccess(true);
      setFormData({
        title: '',
        content: '',
        category: '',
        author: '',
        email: '',
        tags: '',
        featuredImage: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MaxWidthWrapper className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold mb-4">Submit Your Article</h1>
        <p className="text-gray-600">Share your knowledge and insights with our community. All fields marked with * are required.</p>
      </div>

      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>Your article has been submitted successfully! It will be reviewed and published shortly.</p>
          <SiteButton className="mt-4" onClick={() => setSuccess(false)}>Submit Another Article</SiteButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Article Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Article Title *</label>
                <InputUI
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a descriptive title"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-100"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Article Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your article content here"
                  required
                  className="w-full min-h-[300px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <InputUI
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Enter tags separated by commas (e.g., news, technology, business)"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                <InputUI
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  placeholder="Enter URL for featured image"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Author Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author Name *</label>
                <InputUI
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <InputUI
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          )}
          
          <div className="flex justify-end">
            <SiteButton type="submit">
              {isSubmitting ? 'Submitting...' : 'Submit Article'}
            </SiteButton>
          </div>
        </form>
      )}
    </MaxWidthWrapper>
  );
}
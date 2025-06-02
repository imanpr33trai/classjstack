"use client";
import Link from "next/link";

const posts = [
  { id: "123", title: "First Post", category: "Technology" },
  { id: "456", title: "Second Post", category: "Business" },
];

export default function CategoryPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Category Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <div className="p-4 border rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-500">{post.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

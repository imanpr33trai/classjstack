// components/ArticleCard.tsx
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/api"; // Assuming BlogPost type is in api.ts

interface ArticleCardProps {
  post: BlogPost;
  assetBaseUrl: string; // For user image if not part of post.image
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, assetBaseUrl }) => {
  return (
    <div className="col-span-1">
      {" "}
      {/* Tailwind grid column span */}
      <div className="article-card relative border border-gray-200 rounded-lg shadow-sm flex flex-col h-full">
        <div className="card-img-blog relative w-full h-48 md:h-56">
          <Link href={`/articles/${post.id}`}>
            {" "}
            {/* Adjust route as needed */}
            <Image
              src={post.image || `${assetBaseUrl}assets/images/test-img.png`} // Fallback image
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-t-lg"
            />
          </Link>
        </div>
        <div className="card-body-blog p-4 md:p-5 flex-grow">
          <h1 className="text-xl font-poppins font-medium mb-3 md:mb-5 line-clamp-2 h-[3.75rem] leading-tight">
            {" "}
            {/* fos-20, mb-20 */}
            <Link
              href={`/articles/${post.id}`}
              className="text-gray-800 hover:text-theme-pink no-underline"
            >
              {post.title}
            </Link>
          </h1>
          <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
        </div>
        <div className="card-foot-blog flex items-center gap-2 p-4 md:p-5 border-t border-gray-200">
          <Image
            src={`${assetBaseUrl}assets/images/userimage.png`} // Assuming this is a static placeholder
            alt={post.author_name}
            width={36}
            height={36}
            className="user-image-blog rounded-full" // max-width: 45px
          />
          <div className="text-xs">
            <span className="usernameblog font-medium text-gray-700">
              {post.author_name}
            </span>
            <span className="mx-1 text-gray-400">|</span>
            <span className="dateblog text-gray-500">
              {post.formatted_date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

// components/Breadcrumbs.tsx
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <section className="breadcrump py-4 md:py-6 bg-gray-50"> {/* Example styling */}
      <div className="container mx-auto px-4">
        <div className="flex gap-2 items-center text-sm">
          {items.map((item, index) => (
            <span key={item.href} className="flex items-center">
              {index > 0 && <span className="mx-1 text-gray-400">>></span>}
              <Link
                href={item.href}
                className={`text-decoration-none ${
                  item.isActive
                    ? 'text-gray-800 font-semibold breadcrump-link-2' // Active link style
                    : 'text-gray-500 hover:text-gray-700 breadcrump-link-1' // Inactive link style
                }`}
              >
                {item.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Breadcrumbs;
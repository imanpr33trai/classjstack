import { db } from "@/db";
import { Prisma } from "../generated/prisma";

async function main() {
  // Create Users
  const category = await db.category.createMany({
    data: [
      {
        id: "cat1",
        name: "Electronics",
        slug: "electronics",
        description: "Gadgets and devices",
      },
      {
        id: "cat2",
        name: "Real Estate",
        slug: "real-estate",
        description: "Properties and lands",
      },
      {
        id: "cat3",
        name: "Vehicles",
        slug: "vehicles",
        description: "Cars, bikes, and more",
      },
      { id: "cat4", name: "Jobs", slug: "jobs", description: "Job listings" },
      {
        id: "cat5",
        name: "Services",
        slug: "services",
        description: "Professional services",
      },
    ],
  });

  const subCategory = await db.subCategory.createMany({
    data: [
      {
        id: "sub1",
        name: "Mobile Phones",
        slug: "mobile-phones",
        categoryId: "cat1",
      },
      { id: "sub2", name: "Laptops", slug: "laptops", categoryId: "cat1" },
      {
        id: "sub3",
        name: "Apartments",
        slug: "apartments",
        categoryId: "cat2",
      },
      { id: "sub4", name: "Cars", slug: "cars", categoryId: "cat3" },
      { id: "sub5", name: "IT Jobs", slug: "it-jobs", categoryId: "cat4" },
    ],
  });
  const user = await db.user.createMany({
    data: [
      { id: 1, email: "john@example.com", firstName: "John", lastName: "Doe" },
      {
        id: 2,
        email: "jane@example.com",
        firstName: "Jane",
        lastName: "Smith",
      },
      { id: 3, email: "bob@example.com", firstName: "Bob", lastName: "Brown" },
      {
        id: 4,
        email: "alice@example.com",
        firstName: "Alice",
        lastName: "Johnson",
      },
      {
        id: 5,
        email: "mark@example.com",
        firstName: "Mark",
        lastName: "Taylor",
      },
    ],
  });
  const ad = await db.ad.createMany({
    data: [
      {
        id: "ad1",
        title: "iPhone 13 for Sale",
        description: "Mint condition, barely used.",
        categoryId: "cat1",
        subCategoryId: "sub1",
        price: new Prisma.Decimal("699.99"),
        location: "New York",
        pinCode: 10001,
        phone: "1234567890",
        organization: "Apple Store",
        link: "https://example.com/iphone13",
        platform: "web",
        userId: 1,
        expiredAt: new Date(Date.now() + 10 * 86400000),
      },
      {
        id: "ad2",
        title: "2BHK Apartment in LA",
        description: "Spacious and furnished.",
        categoryId: "cat2",
        subCategoryId: "sub3",
        price: new Prisma.Decimal("1500.00"),
        location: "Los Angeles",
        pinCode: 90001,
        phone: "2345678901",
        organization: "Real Estate Inc.",
        link: "https://example.com/apartment",
        platform: "web",
        userId: 2,
        expiredAt: new Date(Date.now() + 15 * 86400000),
      },
      {
        id: "ad3",
        title: "Used Toyota Camry",
        description: "2018 model, great condition.",
        categoryId: "cat3",
        subCategoryId: "sub4",
        price: new Prisma.Decimal("11000.00"),
        location: "San Francisco",
        pinCode: 94101,
        phone: "3456789012",
        organization: "Toyota Dealership",
        link: "https://example.com/car",
        platform: "app",
        userId: 3,
        expiredAt: new Date(Date.now() + 20 * 86400000),
      },
      {
        id: "ad4",
        title: "Frontend Developer Wanted",
        description: "Remote position, React experience required.",
        categoryId: "cat4",
        subCategoryId: "sub5",
        price: new Prisma.Decimal("0.00"),
        location: "Remote",
        pinCode: 12345,
        phone: "4567890123",
        organization: "Tech Startup",
        link: "https://example.com/job",
        platform: "web",
        userId: 4,
        expiredAt: new Date(Date.now() + 30 * 86400000),
      },
      {
        id: "ad5",
        title: "House Cleaning Services",
        description: "Available daily in NYC area.",
        categoryId: "cat5",
        price: new Prisma.Decimal("80.00"),
        location: "Brooklyn",
        pinCode: 11201,
        phone: "5678901234",
        organization: "CleanCo",
        link: "https://example.com/cleaning",
        platform: "web",
        userId: 5,
        expiredAt: new Date(Date.now() + 7 * 86400000),
      },
    ],
  });
  const blogCategory = await db.blogCategory.createMany({
    data: [
      {
        id: "blogCat1",
        name: "Tech News",
        image: "https://example.com/img/tech.jpg",
      },
      {
        id: "blogCat2",
        name: "Lifestyle",
        image: "https://example.com/img/lifestyle.jpg",
      },
      {
        id: "blogCat3",
        name: "Business",
        image: "https://example.com/img/business.jpg",
      },
      {
        id: "blogCat4",
        name: "Jobs",
        image: "https://example.com/img/jobs.jpg",
      },
      {
        id: "blogCat5",
        name: "Education",
        image: "https://example.com/img/education.jpg",
      },
    ],
  });
  const blogPost = await db.blogPost.createMany({
    data: [
      {
        id: "post1",
        title: "Top 5 Programming Languages in 2025",
        content: "Python, JavaScript, Go, Rust, TypeScript...",
        excerpt: "Explore the top programming languages...",
        image: "https://example.com/img/code.jpg",
        status: "PUBLISHED",
        userId: 1,
        categoryId: "blogCat1",
        publishedAt: new Date(),
      },
      {
        id: "post2",
        title: "Work from Home Tips",
        content: "Create a routine, take breaks...",
        excerpt: "Boost your productivity at home...",
        image: "https://example.com/img/home.jpg",
        status: "PUBLISHED",
        userId: 2,
        categoryId: "blogCat2",
        publishedAt: new Date(),
      },
      {
        id: "post3",
        title: "How to Save Money in 2025",
        content: "Track your expenses, invest smart...",
        status: "DRAFT",
        userId: 3,
        categoryId: "blogCat3",
      },
      {
        id: "post4",
        title: "Resume Building for Tech Roles",
        content: "Highlight skills, projects, and experience...",
        status: "PUBLISHED",
        userId: 4,
        categoryId: "blogCat4",
        publishedAt: new Date(),
      },
      {
        id: "post5",
        title: "Top 10 Online Courses for Developers",
        content: "Check out Coursera, Udemy, edX...",
        excerpt: "Free and paid resources for coders...",
        image: "https://example.com/img/learn.jpg",
        status: "PUBLISHED",
        userId: 5,
        categoryId: "blogCat5",
        publishedAt: new Date(),
      },
    ],
  });

  console.log("🌱 Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

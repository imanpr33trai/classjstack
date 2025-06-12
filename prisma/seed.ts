import { db } from "@/db";
import { Prisma } from "../generated/prisma";
import Electronic from "../public/electronics.svg";
import Clothes from "../public/clothes.svg";
import Education from "../public/education.svg";
import Announcement from "../public/announcement.svg";
import Furniture from "../public/furniture.svg";
import Property from "../public/property.svg";
import Sports from "../public/sports.svg";
import Settings from "../public/settings.svg";
import Vehicles from "../public/vehicles.svg";
import slugify from "slugify";

function generateSlug(name: string): string {
  return slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });
}

async function main() {
  // Create Users
  const catElectronics = await db.category.create({
    data: {
      name: "Electronics",
      slug: generateSlug("Electronics"),
      image: Electronic,
      description: "Gadgets and devices",
    },
  });
  const catFurniture = await db.category.create({
    data: {
      name: "Furniture",
      slug: generateSlug("Furniture"),
      description: "Home and office furniture",
      image: Furniture,
    },
  });
  const catSports = await db.category.create({
    data: {
      name: "Sports",
      slug: generateSlug("Sports"),
      description: "Sports equipment and gear",
      image: Sports,
    },
  });
  const catClothes = await db.category.create({
    data: {
      name: "Clothes",
      slug: generateSlug("Clothes"),
      description: "Fashion and apparel",
      image: Clothes,
    },
  });
  const catEducation = await db.category.create({
    data: {
      name: "Education",
      slug: generateSlug("Education"),
      description: "Books and courses",
      image: Education,
    },
  });
  const catRealEstate = await db.category.create({
    data: {
      name: "Real Estate",
      slug: generateSlug("Real Estate"),
      description: "Properties and lands",
      image: Property,
    },
  });
  const catVehicles = await db.category.create({
    data: {
      name: "Vehicles",
      slug: generateSlug("Vehicles"),
      description: "Cars, bikes, and more",
      image: Vehicles,
    },
  });

  const catJobs = await db.category.create({
    data: {
      name: "Jobs",
      slug: generateSlug("Jobs"),
      description: "Job listings",
      image: Announcement,
    },
  });
  const catServices = await db.category.create({
    data: {
      name: "Services",
      slug: generateSlug("Services"),
      description: "Professional services",
      image: Settings,
    },
  });

  const subCatMobile = await db.subCategory.create({
    data: {
      name: "Mobile Phones",
      slug: generateSlug("Mobile Phones"),
      categoryId: catElectronics.id,
      image: "https://example.com/img/tech.jpg",
    },
  });
  const subCatApartments = await db.subCategory.create({
    data: {
      name: "Apartments",
      slug: generateSlug("Apartments"),
      categoryId: catRealEstate.id,
      image: "https://example.com/img/tech.jpg",
    },
  });
  const subCatJobs = await db.subCategory.create({
    data: {
      name: "IT Jobs",
      slug: generateSlug("IT Jobs"),
      categoryId: catJobs.id,
      image: "https://example.com/img/tech.jpg",
    },
  });
  const subCatCars = await db.subCategory.create({
    data: {
      name: "Cars",
      slug: generateSlug("Cars"),
      categoryId: catVehicles.id,
      image: "https://example.com/img/tech.jpg",
    },
  });
  const user1 = await db.user.create({
    data: {
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      emailVerified: true,
    },
  });
  const user2 = await db.user.create({
    data: {
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Smith",
      emailVerified: true,
    },
  });
  const user3 = await db.user.create({
    data: {
      email: "bob@example.com",
      firstName: "Bob",
      lastName: "Brown",
      emailVerified: true,
    },
  });
  const user4 = await db.user.create({
    data: {
      email: "alice@example.com",
      firstName: "Alice",
      lastName: "Johnson",
      emailVerified: true,
    },
  });
  const user5 = await db.user.create({
    data: {
      email: "mark@example.com",
      firstName: "Mark",
      lastName: "Taylor",
      emailVerified: true,
    },
  });
  const ad = await db.ad.createMany({
    data: [
      {
        id: "ad1",
        title: "iPhone 13 for Sale",
        description: "Mint condition, barely used.",
        categoryId: catElectronics.id,
        subCategoryId: subCatMobile.id,
        price: new Prisma.Decimal("699.99"),
        location: "New York",
        pinCode: 10001,
        phone: "1234567890",
        organization: "Apple Store",
        link: "https://example.com/iphone13",
        platform: "web",
        userId: user1.id,
        expiredAt: new Date(Date.now() + 10 * 86400000),
      },
      {
        id: "ad2",
        title: "2BHK Apartment in LA",
        description: "Spacious and furnished.",
        categoryId: catRealEstate.id,
        subCategoryId: subCatApartments.id,
        price: new Prisma.Decimal("1500.00"),
        location: "Los Angeles",
        pinCode: 90001,
        phone: "2345678901",
        organization: "Real Estate Inc.",
        link: "https://example.com/apartment",
        platform: "web",
        userId: user2.id,
        expiredAt: new Date(Date.now() + 15 * 86400000),
      },
      {
        id: "ad3",
        title: "Used Toyota Camry",
        description: "2018 model, great condition.",
        categoryId: catVehicles.id,
        subCategoryId: subCatCars.id,
        price: new Prisma.Decimal("11000.00"),
        location: "San Francisco",
        pinCode: 94101,
        phone: "3456789012",
        organization: "Toyota Dealership",
        link: "https://example.com/car",
        platform: "app",
        userId: user3.id,
        expiredAt: new Date(Date.now() + 20 * 86400000),
      },
      {
        id: "ad4",
        title: "Frontend Developer Wanted",
        description: "Remote position, React experience required.",
        categoryId: catJobs.id,
        subCategoryId: subCatJobs.id,
        price: new Prisma.Decimal("0.00"),
        location: "Remote",
        pinCode: 12345,
        phone: "4567890123",
        organization: "Tech Startup",
        link: "https://example.com/job",
        platform: "web",
        userId: user4.id,
        expiredAt: new Date(Date.now() + 30 * 86400000),
      },
      {
        id: "ad5",
        title: "House Cleaning Services",
        description: "Available daily in NYC area.",
        categoryId: catServices.id,
        price: new Prisma.Decimal("80.00"),
        location: "Brooklyn",
        pinCode: 11201,
        phone: "5678901234",
        organization: "CleanCo",
        link: "https://example.com/cleaning",
        platform: "web",
        userId: user5.id,
        subCategoryId: subCatJobs.id,
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
        slug: generateSlug("Tech News"),
      },
      {
        id: "blogCat2",
        name: "Lifestyle",
        image: "https://example.com/img/lifestyle.jpg",
        slug: generateSlug("Lifestyle"),
      },
      {
        id: "blogCat3",
        name: "Business",
        image: "https://example.com/img/business.jpg",
        slug: generateSlug("Business"),
      },
      {
        id: "blogCat4",
        name: "Jobs",
        image: "https://example.com/img/jobs.jpg",
        slug: generateSlug("Jobs"),
      },
      {
        id: "blogCat5",
        name: "Education",
        image: "https://example.com/img/education.jpg",
        slug: generateSlug("Education"),
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
        userId: user1.id,
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
        userId: user2.id,
        categoryId: "blogCat2",
        publishedAt: new Date(),
      },
      {
        id: "post3",
        title: "How to Save Money in 2025",
        content: "Track your expenses, invest smart...",
        status: "DRAFT",
        userId: user3.id,
        categoryId: "blogCat3",
      },
      {
        id: "post4",
        title: "Resume Building for Tech Roles",
        content: "Highlight skills, projects, and experience...",
        status: "PUBLISHED",
        userId: user4.id,
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
        userId: user5.id,
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

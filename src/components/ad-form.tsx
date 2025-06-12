"use client";

import { useState } from "react";
import { MaxWidthWrapper } from "./max-width-wrapper";

import { InputComponent } from "./input";
import { Input } from "./ui/input";
import { MapPin } from "lucide-react";
import { Label } from "./ui/label";
import { FileUpload } from "./ui/file-upload";
import { Button } from "./ui/button";

type AdFormData = {
  title: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  location: string;
  city: string;
  name: string;
  email: string;
  phone: string;
};

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories"],
  },
  {
    id: "vehicles",
    name: "Vehicles",
    subcategories: ["Cars", "Motorcycles", "Bicycles", "Auto Parts"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    subcategories: [
      "Apartments for Rent",
      "Houses for Sale",
      "Commercial",
      "Land",
    ],
  },
  {
    id: "jobs",
    name: "Jobs",
    subcategories: [
      "IT & Software",
      "Sales & Marketing",
      "Education",
      "Healthcare",
    ],
  },
  {
    id: "furniture",
    name: "Furniture",
    subcategories: ["Sofas", "Beds", "Tables", "Chairs"],
  },
  {
    id: "services",
    name: "Services",
    subcategories: ["Cleaning", "Repairs", "Education", "Beauty"],
  },
  {
    id: "pets",
    name: "Pets",
    subcategories: ["Dogs", "Cats", "Birds", "Fish"],
  },
  {
    id: "fashion",
    name: "Fashion",
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Jewelry",
      "Accessories",
    ],
  },
];

export default function AdForm() {
  const [formData, setFormData] = useState<AdFormData>({
    title: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    location: "",
    city: "",
    name: "",
    email: "",
    phone: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "category") {
      setSelectedCategory(value);
      setFormData((prev) => ({
        ...prev,
        subcategory: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit ad");
      }

      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        subcategory: "",
        location: "",
        city: "",
        name: "",
        email: "",
        phone: "",
      });
      setSelectedCategory("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubcategories = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.subcategories : [];
  };

  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <MaxWidthWrapper className="px-0">
      <form className="w-full font-poppins flex flex-col gap-7">
        <div className="font-poppins w-full flex gap-7">
          <div className="w-full text-sm">
            <label htmlFor="category" className="block text-sm font-sm  mb-1">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300  focus:outline-none"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full text-sm">
            <label htmlFor="subcategory" className="block text-sm font-sm mb-1">
              SubCategory*
            </label>
            <select
              value={formData.subcategory}
              onChange={handleChange}
              required
              name="subcategory"
              id="subcategory"
              className="w-full p-3 border border-gray-300  focus:outline-none "
            >
              <option value=""> Select a Subcategory</option>
              {getSubcategories().map((subcategory) => (
                <option value={subcategory} key={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="Other" className="block text-sm font-sm  mb-1">
              Other*
            </label>
            <Input
              type="text"
              id="Other"
              name="Other"
              onChange={handleChange}
              placeholder="Other"
              className="w-full h-[50px] border border-gray-300  focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full flex gap-7">
          <div className="w-full">
            <label htmlFor="Ad-title" className="block text-sm font-sm  mb-1">
              Ad Title*
            </label>
            <InputComponent
              type="text"
              id="Ad-title"
              name="Ad-title"
              isSearch={false}
              className="w-full border border-gray-300 focus:outline-none pe-2 ps-2"
            />
          </div>
          <div className="w-full">
            <label htmlFor="Ad-title" className="block text-sm font-sm  mb-1">
              Asking Price
            </label>
            <InputComponent
              type="text"
              id="Ad-title"
              name="Ad-title"
              isSearch={false}
              placeholder="if Any"
              className="w-full border border-gray-300 focus:outline-none pe-2 ps-2"
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="description" className="block  text-sm font-sm  mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Type..."
            className="border p-3 border-gray-400 w-full"
            maxLength={200}
            cols={10}
            rows={5}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <div className="text-end">{formData.description.length}/200</div>
        </div>
        <div className="flex w-full text-sm gap-7">
          <div className="w-full">
            <label htmlFor="name" className="block text-sm font-sm  mb-1">
              Your Name*
            </label>
            <InputUI className="border h-[50px] border-gray-300 w-full" />
          </div>
          <div className="w-full">
            <label htmlFor="name" className="block text-sm font-sm  mb-1">
              Organisation
            </label>
            <InputUI className="border h-[50px] border-gray-300 w-full" />
          </div>
        </div>
        <div className="flex w-full text-sm gap-7">
          <div className="w-full">
            <label htmlFor="name" className="block text-sm font-sm  mb-1">
              Email*
            </label>
            <InputUI className="border h-[50px] border-gray-300 w-full" />
          </div>
          <div className="w-full">
            <label htmlFor="name" className="block text-sm font-sm  mb-1">
              Phone
            </label>
            <InputUI className="border h-[50px] border-gray-300 w-full" />
          </div>
        </div>
        <div className="w-full text-sm gap-7">
          <label htmlFor="name" className="block text-sm font-sm  mb-1">
            Location
          </label>
          <div className="relative">
            <InputUI className="border h-[50px] border-gray-300 w-full" />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center ps-3 pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <MapPin
                size={16}
                strokeWidth={2}
                role="status"
                aria-label="Loading..."
              />
            </div>
          </div>
        </div>
        <div className="w-full text-sm gap-7">
          <label htmlFor="name" className="block text-sm font-sm  mb-1">
            City, Town, Or Neighborhood
          </label>
          <InputUI className="border h-[50px] border-gray-300 w-full" />
        </div>
        <div className="flex w-full text-sm gap-7">
          <div className="w-full">
            <label htmlFor="name" className="block text-sm font-sm  mb-1">
              Postal Code*
            </label>
            <InputComponent
              isSearch={false}
              className="border border-gray-300 w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="name" className="block text-sm font-sm  mb-1">
              Expire In
            </label>
            <select
              name="Expire"
              id="expireIn"
              title="expire"
              className="w-full p-3 border border-gray-300 focus:outline-none"
            >
              <option value=""> </option>
              <option value="">2001</option>
              <option value="">2</option>
              <option value="">4</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="" className="block text-sm font-sm  mb-1">
              Please Type This Code
            </label>
            <InputComponent
              isSearch={false}
              className="border border-gray-300 w-full"
            />
          </div>
        </div>
        <div>
          <label htmlFor="" className="block text-sm font-sm mb-1">
            Images
          </label>
          <div className="w-full  max-w-3xl m border border-dashed bg-background border-neutral-200  rounded-lg">
            <FileUpload onChange={handleFileUpload} />
          </div>
        </div>
        <div className="w-full flex gap-7 text-sm">
          <div className="w-full">
            <label htmlFor="platform">Platform</label>
            <InputUI
              type="text"
              id="platform"
              name="platform"
              onChange={handleChange}
              placeholder="Type..."
              className="w-full border h-[50px] border-gray-300 focus:outline-none pe-2 ps-2"
            />
          </div>
          <div className="w-full">
            <label htmlFor="platform">Link</label>
            <InputUI
              type="text"
              id="platform"
              name="platform"
              onChange={handleChange}
              placeholder="Type..."
              className="w-full border h-[50px] border-gray-300 focus:outline-none pe-2 ps-2"
            />
          </div>
        </div>
        <div>
          <button
            className=" text-brand-1000 text-brand-100 text-base font-bold hover:underline transition-all"
            type="submit"
            disabled={isSubmitting}
          >
            Add More
          </button>
        </div>
        <div className="">
          <Button
            type="submit"
            className="bg-brand-100 text-base w-[200px] hover:underline transition-all"
            onClick={handleSubmit}
          >
            Post This Ad
          </Button>
        </div>
      </form>
    </MaxWidthWrapper>
  );
}

// // <div className="mb-8">
// {
//   /* <h1 className="text-3xl font-playfair font-bold mb-4">Post Your Classified Ad</h1>
// <p className="text-gray-600">Fill out the form below to post your classified ad. All fields marked with * are required.</p>
// </div>

// {success ? (
// <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//   <p>Your ad has been submitted successfully! It will be reviewed and published shortly.</p>
//   <SiteButton className="mt-4" onClick={() => setSuccess(false)}>Post Another Ad</SiteButton>
// </div>
// ) : (
// <form onSubmit={handleSubmit} className="space-y-6">
//   <div className="bg-gray-50 p-6 rounded-lg">
//     <h2 className="text-xl font-semibold mb-4">Ad Details</h2>
//     <div className="space-y-4">
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Ad Title *</label>
//         <InputUI
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Enter a descriptive title"
//           required
//           className="w-full"
//         />
//       </div>

//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Provide detailed information about what you're offering"
//           required
//           className="w-full min-h-[150px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-100"
//         />
//       </div>

//       <div>
//         <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
//         <InputUI
//           id="price"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           placeholder="Enter price"
//           required
//           className="w-full"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//         <select
//           id="category"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-100"
//         >
//           <option value="">Select a category</option>
//           {categories.map(category => (
//             <option key={category.id} value={category.id}>{category.name}</option>
//           ))}
//         </select>
//       </div>

//         <div>
//           <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">Subcategory *</label>
//           <select
//             id="subcategory"
//             name="subcategory"
//             value={formData.subcategory}
//             onChange={handleChange}
//             required
//             disabled={!selectedCategory}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-100"
//           >
//             <option value="">Select a subcategory</option>
//             {getSubcategories().map(subcategory => (
//               <option key={subcategory} value={subcategory}>{subcategory}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="bg-gray-50 p-6 rounded-lg">
//     <h2 className="text-xl font-semibold mb-4">Location Information</h2>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location/State *</label>
//         <InputUI
//           id="location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           placeholder="Enter your state or region"
//           required
//           className="w-full"
//         />
//       </div>

//       <div>
//         <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
//         <InputUI
//           id="city"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           placeholder="Enter your city"
//           required
//           className="w-full"
//         />
//       </div>
//     </div>
//   </div>

//   <div className="bg-gray-50 p-6 rounded-lg">
//     <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
//     <div className="space-y-4">
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
//         <InputUI
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Enter your name"
//           required
//           className="w-full"
//         />
//       </div>

//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//         <InputUI
//           id="email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Enter your email address"
//           required
//           className="w-full"
//         />
//       </div>

//       <div>
//         <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
//         <InputUI
//           id="phone"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Enter your phone number"
//           required
//           className="w-full"
//         />
//       </div>
//     </div>
//   </div>

//   {error && (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//       <p>{error}</p>
//     </div>
//   )}

//   <div className="flex justify-end">
//     <SiteButton type="submit">
//       {isSubmitting ? 'Submitting...' : 'Post Ad'}
//     </SiteButton>
//   </div>
// </form>
// )}

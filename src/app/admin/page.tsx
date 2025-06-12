import {
  Home,
  FileText,
  Book,
  Megaphone,
  LayoutGrid,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {} from "@/components/ui/sidebar";
import React, { useState, useMemo } from "react";

// STYLES - In a real app, this would be in your global CSS file.
const styles = `
  .sidebar-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

// MOCK DATA & API HELPERS (Replace with your actual API calls)
const api = {
  createCategory: async (name) => {
    console.log(`Creating category: ${name}`);
    await new Promise((res) => setTimeout(res, 500));
    return { id: Date.now().toString(), name };
  },
  createSubcategory: async (name, parentId) => {
    console.log(`Creating subcategory: ${name} under parent ${parentId}`);
    await new Promise((res) => setTimeout(res, 500));
    return { id: Date.now().toString(), name, parentId };
  },
};

// --- REFACTORED & NEW COMPONENTS ---

// Component for the navigation links in the sidebar
const SidebarNav = ({ activeView, setActiveView, setSidebarOpen }) => {
  const navItems = useMemo(
    () => [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "articles", label: "Articles", icon: FileText },
      { id: "blogs", label: "Blogs", icon: Book },
      { id: "ads", label: "Ads", icon: Megaphone },
      { id: "categories", label: "Categories", icon: LayoutGrid },
    ],
    []
  );

  return (
    <nav className="flex-1 px-2 py-4 space-y-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setActiveView(item.id);
            if (window.innerWidth < 768) setSidebarOpen(false);
          }}
          className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            activeView === item.id
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-200"
          }`}
        >
          <item.icon className="sidebar-icon mr-3" />
          {item.label}
        </button>
      ))}
    </nav>
  );
};

// A more structured Sidebar component
const Sidebar = ({
  activeView,
  setActiveView,
  isSidebarOpen,
  setSidebarOpen,
}) => (
  <>
    <div
      className={`fixed inset-0 bg-black/60 z-30 md:hidden ${
        isSidebarOpen ? "block" : "hidden"
      }`}
      onClick={() => setSidebarOpen(false)}
    ></div>
    <aside
      className={`fixed top-0 left-0 md:relative z-40 h-full w-64 bg-slate-50 border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 h-16">
        <div className="flex items-center space-x-2">
          <Building className="h-7 w-7 text-slate-900" />
          <h1 className="text-xl font-bold">MyPanel</h1>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden">
          <X className="h-6 w-6" />
        </button>
      </div>
      <SidebarNav
        activeView={activeView}
        setActiveView={setActiveView}
        setSidebarOpen={setSidebarOpen}
      />
    </aside>
  </>
);

// Header for the main content area
const DashboardHeader = ({ setSidebarOpen, title }) => (
  <header className="flex items-center justify-between h-16 mb-4 md:mb-8">
    <button
      onClick={() => setSidebarOpen(true)}
      className="md:hidden p-2 -ml-2"
    >
      <Menu className="h-6 w-6" />
    </button>
    <h1 className="text-2xl font-bold text-slate-800 capitalize md:text-3xl">
      {title}
    </h1>
    {/* Placeholder for user menu */}
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 rounded-full bg-slate-300"></div>
      <span className="hidden md:inline">Admin User</span>
      <ChevronDown className="h-4 w-4 hidden md:inline" />
    </div>
  </header>
);

const DashboardView = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Total Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">1,204</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Total Blogs</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">89</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Active Ads</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">12</p>
      </CardContent>
    </Card>
  </div>
);

const PlaceholderView = ({ title }) => (
  <Card>
    <CardHeader>
      <CardTitle>Manage {title}</CardTitle>
      <CardDescription>
        A list of all {title.toLowerCase()} will be displayed here.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg bg-slate-50">
        <p className="text-slate-500">{title} Management Area</p>
      </div>
    </CardContent>
  </Card>
);

const CategoryForm = ({ onSubmit, isLoading, typeLabel }) => {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name);
        setName("");
      }}
      className="mt-6 space-y-4 max-w-md"
    >
      <div>
        <Label htmlFor={`${typeLabel}-name`}>New {typeLabel} Name</Label>
        <Input
          id={`${typeLabel}-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`e.g., Technology`}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        <PlusCircle className="mr-2 h-4 w-4" />
        {isLoading ? "Creating..." : `Create ${typeLabel}`}
      </Button>
    </form>
  );
};

const SubcategoryForm = ({
  onSubmit,
  isLoading,
  typeLabel,
  parentCategories,
}) => {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name, parentId);
        setName("");
        setParentId("");
      }}
      className="mt-6 space-y-4 max-w-md"
    >
      <div>
        <Label htmlFor={`parent-${typeLabel}`}>Parent {typeLabel}</Label>
        <Select
          id={`parent-${typeLabel}`}
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a parent category
          </option>
          {parentCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor={`sub-${typeLabel}-name`}>
          New {typeLabel} Subcategory Name
        </Label>
        <Input
          id={`sub-${typeLabel}-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., AI & Machine Learning"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading || !parentId}>
        <PlusCircle className="mr-2 h-4 w-4" />
        {isLoading ? "Creating..." : `Create Subcategory`}
      </Button>
    </form>
  );
};

const CategoryManager = () => {
  const [activeTab, setActiveTab] = useState("category");
  const [articleCategories, setArticleCategories] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCategory = async (name, type) => {
    setIsLoading(true);
    const newCat = await api.createCategory(name);
    if (type === "blog") {
      setBlogCategories((prev) => [...prev, newCat]);
    } else {
      setArticleCategories((prev) => [...prev, newCat]);
    }
    setIsLoading(false);
  };

  const handleCreateSubcategory = async (name, parentId) => {
    setIsLoading(true);
    await api.createSubcategory(name, parentId);
    // In a real app, you'd fetch the updated list or add it to state
    setIsLoading(false);
  };

  const tabs = useMemo(
    () => [
      { id: "category", label: "Article Category" },
      { id: "subcategory", label: "Article Subcategory" },
      { id: "blog_category", label: "Blog Category" },
      { id: "blog_subcategory", label: "Blog Subcategory" },
    ],
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Categories</CardTitle>
        <CardDescription>
          Create and manage all category types for your content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                isActive={activeTab === tab.id}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent>
            {activeTab === "category" && (
              <CategoryForm
                onSubmit={(name) => handleCreateCategory(name, "article")}
                isLoading={isLoading}
                typeLabel="Article Category"
              />
            )}
            {activeTab === "subcategory" && (
              <SubcategoryForm
                onSubmit={handleCreateSubcategory}
                isLoading={isLoading}
                typeLabel="Article"
                parentCategories={articleCategories}
              />
            )}
            {activeTab === "blog_category" && (
              <CategoryForm
                onSubmit={(name) => handleCreateCategory(name, "blog")}
                isLoading={isLoading}
                typeLabel="Blog Category"
              />
            )}
            {activeTab === "blog_subcategory" && (
              <SubcategoryForm
                onSubmit={handleCreateSubcategory}
                isLoading={isLoading}
                typeLabel="Blog"
                parentCategories={blogCategories}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

function AdminPage() {
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "articles":
        return <PlaceholderView title="Articles" />;
      case "blogs":
        return <PlaceholderView title="Blogs" />;
      case "ads":
        return <PlaceholderView title="Ads" />;
      case "categories":
        return <CategoryManager />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <style>{styles}</style>
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 overflow-y-auto">
        <DashboardHeader setSidebarOpen={setSidebarOpen} title={activeView} />
        <div className="flex-1">{renderContent()}</div>
      </main>
    </div>
  );
}

export default function App() {
  return <AdminPage />;
}

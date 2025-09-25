import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Grid, List, Eye, ShoppingCart, ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
// Using images from public folder

const ShopPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const allProducts = [
    {
      id: "kuboos-5pc",
      name: "Fresh Kuboos",
      image: "/images/kuboos 5.jpg",
      price: 25,
      originalPrice: 30,
      packSize: "Pack of 5",
      description: "Soft, fluffy kuboos made fresh daily with premium ingredients. Perfect for breakfast or dinner.",
      isNew: true,
      category: "kuboos"
    },
    {
      id: "kuboos-10pc",
      name: "Fresh Kuboos",
      image: "/images/kuboos 5.jpg",
      price: 45,
      originalPrice: 55,
      packSize: "Pack of 10",
      description: "Value pack of fresh kuboos for families. Same great taste, better value.",
      category: "kuboos"
    },
    {
      id: "chapati-5pc",
      name: "Whole Wheat Chapati",
      image: "/images/chapathi 5.png",
      price: 20,
      packSize: "Pack of 5",
      description: "Healthy whole wheat chapatis made with organic flour. Perfect for daily meals.",
      category: "chapati"
    },
    {
      id: "chapati-10pc",
      name: "Whole Wheat Chapati",
      image: "/images/chapathi 5.png",
      price: 40,
      packSize: "Pack of 10",
      description: "Family size pack of nutritious whole wheat chapatis.",
      category: "chapati"
    },
    {
      id: "chapati-15pc",
      name: "Whole Wheat Chapati",
      image: "/images/chapathi 5.png",
      price: 55,
      packSize: "Pack of 15",
      description: "Bulk pack perfect for large families or small gatherings.",
      category: "chapati"
    },
    {
      id: "parotta-5pc",
      name: "Layered Parotta",
      image: "/images/parotta 5.png",
      price: 35,
      packSize: "Pack of 5",
      description: "Crispy, flaky parottas with perfect layers. A South Indian favorite.",
      category: "parotta"
    },
    {
      id: "parotta-10pc",
      name: "Layered Parotta",
      image: "/images/parotta 10.png",
      price: 65,
      packSize: "Pack of 10",
      description: "Family pack of crispy layered parottas. Great for special meals.",
      category: "parotta"
    },
    {
      id: "mixed-pack",
      name: "Mixed Bread Pack",
      image: "/images/1.png",
      price: 80,
      originalPrice: 90,
      packSize: "2 Kuboos + 3 Chapati + 2 Parotta",
      description: "Try all our specialties in one convenient pack. Perfect for first-time customers.",
      isNew: true,
      category: "mixed"
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    if (filterBy === "all") return true;
    return product.category === filterBy;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        packSize: product.packSize,
        category: product.category
      }, quantity);
      
      toast({
        title: "Added to Cart",
        description: `${quantity}x ${product.name} added to your cart`,
      });
    }
  };

  const handleViewDetails = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown mb-4">
            Our Fresh Products
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover our complete range of freshly baked kuboos, chapati, and parotta. 
            All products are made fresh daily with premium ingredients.
          </p>
        </div>

        {/* Filters and Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-label text-lg">Filter & Sort Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-label font-medium mb-2 block">
                    Category
                  </label>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="kuboos">Kuboos</SelectItem>
                      <SelectItem value="chapati">Chapati</SelectItem>
                      <SelectItem value="parotta">Parotta</SelectItem>
                      <SelectItem value="mixed">Mixed Packs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-label font-medium mb-2 block">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* View Mode */}
              <div>
                <label className="text-sm font-label font-medium mb-2 block">
                  View
                </label>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid size={16} />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {sortedProducts.length} of {allProducts.length} products
          </p>
          {filterBy !== "all" && (
            <Badge variant="secondary" className="font-label">
              {filterBy.charAt(0).toUpperCase() + filterBy.slice(1)}
            </Badge>
          )}
        </div>

        {/* Products Grid */}
        {viewMode === "grid" ? (
          <div className="flex flex-wrap justify-center gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-full max-w-sm sm:w-80">
                <ProductCard
                  {...product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="card-product">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="md:w-40 lg:w-48 flex-shrink-0 flex justify-center md:justify-start">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full max-w-40 md:max-w-none aspect-square object-cover rounded-lg shadow-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-heading font-semibold text-xl text-foreground mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground font-label">
                            {product.packSize}
                          </p>
                        </div>
                        {product.isNew && (
                          <Badge className="bg-accent text-accent-foreground">
                            Fresh
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-2xl text-primary">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleViewDetails(product.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Eye size={16} className="mr-2" />
                            View Details
                          </Button>
                          <Button 
                            onClick={() => handleAddToCart(product.id, 1)}
                            className="bg-primary hover:bg-primary/90"
                            size="sm"
                          >
                            <ShoppingCart size={16} className="mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more products.
            </p>
            <Button onClick={() => setFilterBy("all")}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Product Details Modal */}
        <ProductDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      </div>
    </div>
  );
};

export default ShopPage;
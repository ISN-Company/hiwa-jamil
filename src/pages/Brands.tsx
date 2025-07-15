import * as React from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ShoppingCart, Star, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const Brands = () => {
  const { language } = useLanguage();
  const { getContent, getSection } = useWebsiteContent();
  const brandsSection = getSection('brands');
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedBrand, setSelectedBrand] = React.useState("all");
  const [products, setProducts] = React.useState<any[]>([]);
  const [brands, setBrands] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // Fetch brands
      const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (brandsError) throw brandsError;

      setProducts(productsData || []);
      setBrands(brandsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (product: any) => {
    if (language === 'AR' && product.name_ar) return product.name_ar;
    if (language === 'KU' && product.name_ku) return product.name_ku;
    return product.name_en;
  };

  const getProductDescription = (product: any) => {
    if (language === 'AR' && product.description_ar) return product.description_ar;
    if (language === 'KU' && product.description_ku) return product.description_ku;
    return product.description_en || 'No description available';
  };

  const categories = ["all", ...new Set(products.map(p => p.category).filter(Boolean))];
  const brandNames = ["all", ...brands.map(b => b.name)];

  const filteredProducts = products.filter(product => {
    const productName = getProductName(product);
    const productDesc = getProductDescription(product);
    
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         productDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "all" || brands.some(b => b.name === selectedBrand);
    
    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {brandsSection?.hero_title || "Premium Auto Products"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            {brandsSection?.hero_subtitle || "Quality oils, filters, and accessories from trusted brands"}
          </p>
          <Button size="lg" className="btn-secondary text-lg px-8 py-4">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Products</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              Products ({filteredProducts.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="glass-card hover:shadow-elevation transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img 
                        src={product.image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
                        alt={getProductName(product)}
                        className="w-full h-32 object-contain rounded-t-lg bg-white/5"
                      />
                      {!product.is_active && (
                        <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium">
                          Out of Stock
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium">
                        {product.category || 'Product'}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category || 'Product'}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg mb-2">{getProductName(product)}</CardTitle>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {getProductDescription(product)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary">
                        {product.price ? `$${product.price}` : 'Contact for Price'}
                      </div>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            className="btn-primary" 
                            disabled={!product.is_active}
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Tag className="h-4 w-4 mr-2" />
                            {product.is_active ? "View Details" : "Out of Stock"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl backdrop-blur-sm bg-background/95 border border-border/50">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                              {selectedProduct && getProductName(selectedProduct)}
                            </DialogTitle>
                          </DialogHeader>
                          {selectedProduct && (
                            <div className="space-y-6">
                              <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/2">
                                  <img 
                                    src={selectedProduct.image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
                                    alt={getProductName(selectedProduct)}
                                    className="w-full h-64 object-contain rounded-lg bg-muted/30"
                                  />
                                </div>
                                <div className="md:w-1/2 space-y-4">
                                  <div>
                                    <Badge variant="outline" className="mb-2">
                                      {selectedProduct.category || 'Product'}
                                    </Badge>
                                    <div className="flex items-center space-x-1 mb-3">
                                      <Star className="h-5 w-5 fill-secondary text-secondary" />
                                      <Star className="h-5 w-5 fill-secondary text-secondary" />
                                      <Star className="h-5 w-5 fill-secondary text-secondary" />
                                      <Star className="h-5 w-5 fill-secondary text-secondary" />
                                      <Star className="h-5 w-5 fill-secondary text-secondary" />
                                      <span className="text-sm font-medium ml-2">4.8 (124 reviews)</span>
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                                    <p className="text-muted-foreground">
                                      {getProductDescription(selectedProduct)}
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">Price</h3>
                                    <div className="text-3xl font-bold text-primary">
                                      {selectedProduct.price ? `$${selectedProduct.price}` : 'Contact for Price'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="font-medium">Category:</span>
                                      <span className="ml-2 text-muted-foreground">{selectedProduct.category || 'Not specified'}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">Availability:</span>
                                      <span className="ml-2 text-muted-foreground">
                                        {selectedProduct.is_active ? 'In Stock' : 'Out of Stock'}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="font-medium">SKU:</span>
                                      <span className="ml-2 text-muted-foreground">{selectedProduct.id.slice(-8).toUpperCase()}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">Brand:</span>
                                      <span className="ml-2 text-muted-foreground">{selectedProduct.category || 'Premium Brand'}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                  <Button 
                                    variant="outline" 
                                    className="w-full"
                                    onClick={() => {
                                      setIsDialogOpen(false);
                                      window.location.href = '/contact';
                                    }}
                                  >
                                    Contact for Quote
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No products found matching your criteria.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{brandsSection?.trusted_brands_title || "Trusted Brands"}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {brandsSection?.trusted_brands_subtitle || "We partner with industry-leading brands to provide you with the highest quality products"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="glass-card p-6 text-center hover:shadow-elevation transition-all duration-300">
                {brand.logo_url && (
                  <img 
                    src={brand.logo_url} 
                    alt={brand.name}
                    className="w-12 h-12 mx-auto mb-2 object-contain"
                  />
                )}
                <h3 className="font-bold text-lg text-primary">{brand.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">Premium Quality</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Need Help Choosing?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Our experts can help you find the right products for your vehicle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-secondary text-lg px-8 py-4" asChild>
              <Link to="/contact">Get Expert Advice</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90" asChild>
              <a href="tel:+9647508055005">Call Us Now</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;
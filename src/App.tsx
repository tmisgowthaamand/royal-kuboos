import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import { CartProvider } from "@/hooks/use-cart";
import Index from "./pages/Index";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import BulkOrdersPage from "./pages/BulkOrdersPage";
import BulkOrderFormPage from "./pages/BulkOrderFormPage";
import BulkOrderConfirmationPage from "./pages/BulkOrderConfirmationPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Layout><ShopPage /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
            <Route path="/order-confirmation" element={<Layout><OrderConfirmationPage /></Layout>} />
            <Route path="/bulk-orders" element={<Layout><BulkOrdersPage /></Layout>} />
            <Route path="/bulk-order-form" element={<Layout><BulkOrderFormPage /></Layout>} />
            <Route path="/bulk-order-confirmation" element={<Layout><BulkOrderConfirmationPage /></Layout>} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;

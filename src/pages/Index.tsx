import { useState, useEffect } from 'react';
import { menuItems, RESTAURANT_NAME } from '@/data/menu';
import { MenuItemCard } from '@/components/MenuItemCard';
import { CartSidebar } from '@/components/CartSidebar';
import { CartItem, MenuItem } from '@/types/order';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-image.jpg';
import { Zap } from 'lucide-react';

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fastpass_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast({
      title: 'Added to cart',
      description: `${item.name} has been added to your cart`,
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    toast({
      title: 'Removed from cart',
      description: 'Item has been removed from your cart',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={heroImage}
          alt="ASU FastPass Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full mb-4">
              <Zap className="w-4 h-4" />
              <span className="font-semibold text-sm">Skip the Line</span>
            </div>
            <h1 className="text-5xl font-bold mb-3">ASU FastPass</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Order ahead from your favorite campus restaurants and pick up when it's ready.
            </p>
          </div>
        </div>
      </div>

      {/* Restaurant & Menu */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{RESTAURANT_NAME}</h2>
          <p className="text-muted-foreground">Available now • Est. pickup time: 15-20 min</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      <CartSidebar 
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
};

export default Index;

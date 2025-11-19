import { useState, useEffect } from 'react';
import { restaurants } from '@/data/menu';
import { MenuItemCard } from '@/components/MenuItemCard';
import { CartSidebar } from '@/components/CartSidebar';
import { CartItem, MenuItem } from '@/types/order';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-image.jpg';
import { Zap, Clock, ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { orderStore } from '@/lib/orderStore';

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('fastpass_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const orders = orderStore.getOrders();
    if (orders.length > 0) {
      setLastOrder(orders[orders.length - 1]);
    }
  }, []);

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

  const handleReorder = () => {
    if (lastOrder) {
      setCart(lastOrder.items);
      setSelectedRestaurant(lastOrder.restaurantId);
      toast({
        title: 'Order restored',
        description: 'Your last order has been added to cart',
      });
    }
  };

  const restaurant = restaurants.find(r => r.id === selectedRestaurant);

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

      <div className="container mx-auto px-4 py-12">
        {!selectedRestaurant ? (
          <>
            {/* Re-order Button */}
            {lastOrder && (
              <Card className="p-6 mb-8 bg-accent border-accent-foreground/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Order Again?</h3>
                    <p className="text-sm text-muted-foreground">
                      Last order from {lastOrder.restaurantName} • ${lastOrder.total.toFixed(2)}
                    </p>
                  </div>
                  <Button onClick={handleReorder} size="lg" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Re-order
                  </Button>
                </div>
              </Card>
            )}

            {/* Restaurant List */}
            <h2 className="text-3xl font-bold mb-6">Choose a Restaurant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {restaurants.map((rest) => (
                <Card 
                  key={rest.id}
                  className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => setSelectedRestaurant(rest.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{rest.emoji}</span>
                      <div>
                        <h3 className="font-bold text-lg">{rest.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{rest.waitTime} min wait</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {rest.menuItems.length} items available
                  </p>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Restaurant Menu */}
            <Button 
              variant="ghost" 
              onClick={() => setSelectedRestaurant(null)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Restaurants
            </Button>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{restaurant?.emoji}</span>
                <div>
                  <h2 className="text-3xl font-bold">{restaurant?.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <span className="text-sm">Available now</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Est. pickup: {restaurant?.waitTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurant?.menuItems.map((item) => (
                <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
              ))}
            </div>
          </>
        )}
      </div>

      <CartSidebar 
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        selectedRestaurant={selectedRestaurant}
      />
    </div>
  );
};

export default Index;

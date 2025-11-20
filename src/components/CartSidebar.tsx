import { CartItem } from '@/types/order';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  selectedRestaurant: { id: string; name: string } | null;
}

export const CartSidebar = ({ cart, onUpdateQuantity, onRemoveItem, selectedRestaurant }: CartSidebarProps) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (selectedRestaurant) {
      localStorage.setItem('fastpass_selected_restaurant', selectedRestaurant.id);
    }
    navigate('/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg">
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full mt-6">
          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-accent rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-primary font-bold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button 
                          size="icon" 
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button 
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 ml-auto"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

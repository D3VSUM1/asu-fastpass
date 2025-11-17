import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CartItem, Order } from '@/types/order';
import { orderStore } from '@/lib/orderStore';
import { ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState('');
  const [venmoHandle, setVenmoHandle] = useState('');

  useEffect(() => {
    // Get cart from localStorage
    const savedCart = localStorage.getItem('fastpass_cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart.length === 0) {
        toast({
          title: 'Empty cart',
          description: 'Please add items to your cart first',
          variant: 'destructive',
        });
        navigate('/');
      }
      setCart(parsedCart);
    } else {
      navigate('/');
    }
  }, [navigate, toast]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !venmoHandle.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const order: Order = {
      id: crypto.randomUUID(),
      customerName: name,
      venmoHandle: venmoHandle,
      items: cart,
      total,
      status: 'received',
      createdAt: new Date().toISOString(),
    };

    orderStore.addOrder(order);
    localStorage.removeItem('fastpass_cart');
    
    toast({
      title: 'Order placed!',
      description: 'Your order has been received',
    });
    
    navigate(`/order/${order.id}`);
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('fastpass_cart', JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>

        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-muted-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="venmo">Venmo Handle</Label>
                  <Input
                    id="venmo"
                    value={venmoHandle}
                    onChange={(e) => setVenmoHandle(e.target.value)}
                    placeholder="@johnsmith"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    We'll send you a payment request after your order is ready
                  </p>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Place Order
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

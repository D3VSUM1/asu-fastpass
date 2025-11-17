import { useEffect, useState } from 'react';
import { Order } from '@/types/order';
import { orderStore } from '@/lib/orderStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Clock, Package } from 'lucide-react';

const ADMIN_PASSWORD = 'fastpass123';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
      const interval = setInterval(loadOrders, 2000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const loadOrders = () => {
    setOrders(orderStore.getOrders().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      toast({
        title: 'Access granted',
        description: 'Welcome to the admin dashboard',
      });
    } else {
      toast({
        title: 'Access denied',
        description: 'Incorrect password',
        variant: 'destructive',
      });
    }
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    orderStore.updateOrderStatus(orderId, status);
    loadOrders();
    toast({
      title: 'Order updated',
      description: `Order status changed to ${status.replace('_', ' ')}`,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingOrders = orders.filter(o => o.status === 'received');
  const inProgressOrders = orders.filter(o => o.status === 'in_progress');
  const completedOrders = orders.filter(o => o.status === 'ready');

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Kitchen Dashboard</h1>
          <Button 
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false);
              sessionStorage.removeItem('admin_auth');
            }}
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressOrders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ready</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedOrders.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.customerName} • {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge className={
                    order.status === 'received' ? 'bg-warning' :
                    order.status === 'in_progress' ? 'bg-primary' :
                    'bg-success'
                  }>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Items</h4>
                    {order.items.map((item) => (
                      <div key={item.id} className="text-sm py-1">
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'received' && (
                      <Button 
                        onClick={() => updateOrderStatus(order.id, 'in_progress')}
                        className="flex-1"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Start Order
                      </Button>
                    )}
                    {order.status === 'in_progress' && (
                      <Button 
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="flex-1"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark Ready
                      </Button>
                    )}
                    {order.status === 'ready' && (
                      <Badge className="bg-success text-success-foreground">
                        Order Complete
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {orders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No orders yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

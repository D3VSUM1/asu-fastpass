import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Order } from '@/types/order';
import { orderStore } from '@/lib/orderStore';
import { OrderStatusCard } from '@/components/OrderStatusCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const foundOrder = orderStore.getOrder(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }

    // Poll for order updates every 2 seconds
    const interval = setInterval(() => {
      if (orderId) {
        const updatedOrder = orderStore.getOrder(orderId);
        if (updatedOrder) {
          setOrder(updatedOrder);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button onClick={() => navigate('/')}>
            Return to Menu
          </Button>
        </div>
      </div>
    );
  }

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

        <h1 className="text-4xl font-bold mb-2">Track Your Order</h1>
        <p className="text-muted-foreground mb-4">
          Hello {order.customerName}, here's the status of your order
        </p>

        {order.status !== 'ready' && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estimated time until ready:</span>
              <span className="text-2xl font-bold text-primary">
                {order.status === 'received' ? order.estimatedTime : Math.ceil(order.estimatedTime / 2)} min
              </span>
            </div>
          </div>
        )}

        <OrderStatusCard order={order} />

        {order.status === 'ready' && (
          <div className="mt-6 p-4 bg-success/10 border border-success rounded-lg">
            <p className="font-semibold text-success">
              Your order is ready! Please proceed to the pickup counter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;

import { Order } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Package } from 'lucide-react';

interface OrderStatusCardProps {
  order: Order;
}

const statusConfig = {
  received: {
    label: 'Order Received',
    icon: Clock,
    color: 'bg-warning text-warning-foreground',
  },
  in_progress: {
    label: 'In Progress',
    icon: Package,
    color: 'bg-primary text-primary-foreground',
  },
  ready: {
    label: 'Ready for Pickup',
    icon: CheckCircle2,
    color: 'bg-success text-success-foreground',
  },
};

export const OrderStatusCard = ({ order }: OrderStatusCardProps) => {
  const config = statusConfig[order.status];
  const Icon = config.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
            <p className="text-sm font-semibold text-primary mt-1">
              {order.restaurantName}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <Badge className={config.color}>
            <Icon className="w-4 h-4 mr-1" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Items</h4>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span className="text-muted-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-primary">${order.total.toFixed(2)}</span>
          </div>
          
          {/* Status Timeline */}
          <div className="pt-4 space-y-2">
            <h4 className="font-semibold mb-3 text-sm text-muted-foreground">Order Progress</h4>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                order.status === 'received' || order.status === 'in_progress' || order.status === 'ready'
                  ? 'bg-success' : 'bg-muted'
              }`}>
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold">Order Received</span>
                <p className="text-xs text-muted-foreground">We've got your order!</p>
              </div>
            </div>
            <div className="ml-5 h-8 w-0.5 bg-border"></div>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                order.status === 'in_progress' || order.status === 'ready'
                  ? 'bg-primary' : 'bg-muted'
              }`}>
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold">Preparing</span>
                <p className="text-xs text-muted-foreground">Kitchen is working on it</p>
              </div>
            </div>
            <div className="ml-5 h-8 w-0.5 bg-border"></div>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                order.status === 'ready' ? 'bg-success' : 'bg-muted'
              }`}>
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold">Ready for Pickup</span>
                <p className="text-xs text-muted-foreground">Come get your food!</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { MenuItem } from '@/types/order';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuItemCard = ({ item, onAddToCart }: MenuItemCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
        <Button 
          onClick={() => onAddToCart(item)}
          className="w-full"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

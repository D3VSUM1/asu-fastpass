import { MenuItem } from '@/types/order';

export interface Restaurant {
  id: string;
  name: string;
  emoji: string;
  waitTime: number; // in minutes
  menuItems: MenuItem[];
}

export const restaurants: Restaurant[] = [
  {
    id: 'engrained',
    name: 'Engrained Restaurant',
    emoji: '🌾',
    waitTime: 12,
    menuItems: [
      { id: 'eng1', name: 'Mediterranean Bowl', price: 11.99, description: 'Fresh vegetables, hummus, and grilled chicken', image: '/menu/sandwich.jpg' },
      { id: 'eng2', name: 'Artisan Flatbread', price: 9.99, description: 'Wood-fired flatbread with seasonal toppings', image: '/menu/spicy-sandwich.jpg' },
      { id: 'eng3', name: 'Garden Salad', price: 8.99, description: 'Mixed greens with house vinaigrette', image: '/menu/nuggets.jpg' },
    ],
  },
  {
    id: 'starbucks',
    name: 'Starbucks',
    emoji: '☕',
    waitTime: 8,
    menuItems: [
      { id: 'sbx1', name: 'Caffe Latte', price: 5.45, description: 'Espresso with steamed milk', image: '/menu/lemonade.jpg' },
      { id: 'sbx2', name: 'Iced Coffee', price: 4.25, description: 'Sweetened, served over ice', image: '/menu/lemonade.jpg' },
      { id: 'sbx3', name: 'Bacon Egg Bites', price: 5.95, description: 'Sous vide egg bites with bacon', image: '/menu/sandwich.jpg' },
      { id: 'sbx4', name: 'Blueberry Muffin', price: 3.95, description: 'Fresh baked daily', image: '/menu/nuggets.jpg' },
    ],
  },
  {
    id: 'einstein',
    name: 'Einstein Bros. Bagels',
    emoji: '🥯',
    waitTime: 10,
    menuItems: [
      { id: 'ein1', name: 'Plain Bagel with Cream Cheese', price: 3.99, description: 'Fresh baked bagel', image: '/menu/sandwich.jpg' },
      { id: 'ein2', name: 'Everything Bagel', price: 2.99, description: 'Classic everything seasoning', image: '/menu/sandwich.jpg' },
      { id: 'ein3', name: 'Breakfast Sandwich', price: 6.99, description: 'Egg, cheese, and choice of meat', image: '/menu/spicy-sandwich.jpg' },
      { id: 'ein4', name: 'Coffee', price: 2.49, description: 'Fresh brewed', image: '/menu/lemonade.jpg' },
    ],
  },
  {
    id: 'chickfila',
    name: 'Chick-fil-A',
    emoji: '🐔',
    waitTime: 15,
    menuItems: [
      { id: 'cfa1', name: 'Chicken Sandwich', price: 5.49, description: 'Hand-breaded, pressure cooked chicken breast', image: '/menu/sandwich.jpg' },
      { id: 'cfa2', name: 'Spicy Chicken Sandwich', price: 5.79, description: 'Spicy seasoned chicken breast', image: '/menu/spicy-sandwich.jpg' },
      { id: 'cfa3', name: 'Chicken Nuggets (8-count)', price: 6.29, description: 'Bite-sized tender chicken', image: '/menu/nuggets.jpg' },
      { id: 'cfa4', name: 'Waffle Fries', price: 3.19, description: 'Crispy waffle-cut potatoes', image: '/menu/fries.jpg' },
      { id: 'cfa5', name: 'Frosted Lemonade', price: 4.99, description: 'Lemonade blended with Icedream', image: '/menu/lemonade.jpg' },
    ],
  },
  {
    id: 'bento',
    name: 'Bento Sushi',
    emoji: '🍱',
    waitTime: 18,
    menuItems: [
      { id: 'ben1', name: 'California Roll', price: 7.99, description: 'Crab, avocado, cucumber', image: '/menu/sandwich.jpg' },
      { id: 'ben2', name: 'Spicy Tuna Roll', price: 8.99, description: 'Fresh tuna with spicy mayo', image: '/menu/spicy-sandwich.jpg' },
      { id: 'ben3', name: 'Salmon Nigiri', price: 6.99, description: 'Fresh salmon over rice', image: '/menu/nuggets.jpg' },
      { id: 'ben4', name: 'Miso Soup', price: 3.99, description: 'Traditional Japanese soup', image: '/menu/lemonade.jpg' },
    ],
  },
  {
    id: 'gigis',
    name: "Gigi's Gelato",
    emoji: '🍦',
    waitTime: 5,
    menuItems: [
      { id: 'gig1', name: 'Vanilla Gelato', price: 5.99, description: 'Classic Italian vanilla', image: '/menu/lemonade.jpg' },
      { id: 'gig2', name: 'Chocolate Gelato', price: 5.99, description: 'Rich dark chocolate', image: '/menu/nuggets.jpg' },
      { id: 'gig3', name: 'Strawberry Gelato', price: 5.99, description: 'Fresh strawberry', image: '/menu/sandwich.jpg' },
    ],
  },
  {
    id: 'choolaah',
    name: 'Choolaah',
    emoji: '🍛',
    waitTime: 14,
    menuItems: [
      { id: 'cho1', name: 'Chicken Tikka Masala Bowl', price: 10.99, description: 'Tender chicken in creamy tomato sauce', image: '/menu/sandwich.jpg' },
      { id: 'cho2', name: 'Paneer Tikka Bowl', price: 9.99, description: 'Grilled cottage cheese', image: '/menu/spicy-sandwich.jpg' },
      { id: 'cho3', name: 'Garlic Naan', price: 3.49, description: 'Fresh baked flatbread', image: '/menu/nuggets.jpg' },
      { id: 'cho4', name: 'Samosa (2pc)', price: 4.99, description: 'Crispy pastry with spiced filling', image: '/menu/fries.jpg' },
    ],
  },
  {
    id: 'qdoba',
    name: 'Qdoba',
    emoji: '🌯',
    waitTime: 11,
    menuItems: [
      { id: 'qdo1', name: 'Chicken Burrito', price: 9.49, description: 'Grilled chicken, rice, beans, and toppings', image: '/menu/sandwich.jpg' },
      { id: 'qdo2', name: 'Steak Bowl', price: 10.99, description: 'Grilled steak over rice', image: '/menu/spicy-sandwich.jpg' },
      { id: 'qdo3', name: 'Queso & Chips', price: 5.99, description: 'Creamy queso with tortilla chips', image: '/menu/fries.jpg' },
      { id: 'qdo4', name: 'Vegetarian Burrito', price: 8.49, description: 'Fresh veggies and black beans', image: '/menu/nuggets.jpg' },
    ],
  },
  {
    id: 'shake-smart',
    name: 'Shake Smart',
    emoji: '🥤',
    waitTime: 7,
    menuItems: [
      { id: 'shk1', name: 'Peanut Butter Protein Shake', price: 7.99, description: '30g protein, peanut butter, banana', image: '/menu/lemonade.jpg' },
      { id: 'shk2', name: 'Berry Blast Smoothie', price: 6.99, description: 'Mixed berries, yogurt', image: '/menu/lemonade.jpg' },
      { id: 'shk3', name: 'Green Machine', price: 7.49, description: 'Spinach, mango, pineapple', image: '/menu/lemonade.jpg' },
    ],
  },
  {
    id: 'subway',
    name: 'Subway',
    emoji: '🥪',
    waitTime: 13,
    menuItems: [
      { id: 'sub1', name: 'Turkey & Cheese Sub (6")', price: 6.99, description: 'Fresh sliced turkey with your choice of toppings', image: '/menu/sandwich.jpg' },
      { id: 'sub2', name: 'Italian B.M.T. (6")', price: 7.49, description: 'Ham, salami, pepperoni', image: '/menu/spicy-sandwich.jpg' },
      { id: 'sub3', name: 'Veggie Delite (6")', price: 5.99, description: 'Fresh vegetables and cheese', image: '/menu/nuggets.jpg' },
      { id: 'sub4', name: 'Chips', price: 1.99, description: 'Classic potato chips', image: '/menu/fries.jpg' },
    ],
  },
  {
    id: 'burger-king',
    name: 'Burger King',
    emoji: '👑',
    waitTime: 16,
    menuItems: [
      { id: 'bk1', name: 'Whopper', price: 7.99, description: 'Flame-grilled beef with fresh toppings', image: '/menu/sandwich.jpg' },
      { id: 'bk2', name: 'Chicken Sandwich', price: 6.99, description: 'Crispy chicken on a toasted bun', image: '/menu/spicy-sandwich.jpg' },
      { id: 'bk3', name: 'Onion Rings', price: 3.49, description: 'Crispy breaded onion rings', image: '/menu/fries.jpg' },
      { id: 'bk4', name: 'Vanilla Shake', price: 4.49, description: 'Creamy vanilla milkshake', image: '/menu/lemonade.jpg' },
    ],
  },
];

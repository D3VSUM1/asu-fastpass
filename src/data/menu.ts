import { MenuItem } from '@/types/order';

export const RESTAURANT_NAME = "Chick-fil-A";

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Chick-fil-A Chicken Sandwich',
    price: 5.49,
    description: 'A boneless breast of chicken seasoned to perfection, hand-breaded, pressure cooked in 100% refined peanut oil',
    image: '/menu/sandwich.jpg',
  },
  {
    id: '2',
    name: 'Spicy Chicken Sandwich',
    price: 5.79,
    description: 'A boneless breast of chicken seasoned with a spicy blend of peppers, hand-breaded, pressure cooked',
    image: '/menu/spicy-sandwich.jpg',
  },
  {
    id: '3',
    name: 'Chicken Nuggets (8-count)',
    price: 6.29,
    description: 'Bite-sized pieces of tender chicken breast, seasoned to perfection, freshly breaded and pressure cooked',
    image: '/menu/nuggets.jpg',
  },
  {
    id: '4',
    name: 'Waffle Potato Fries',
    price: 3.19,
    description: 'Waffle-shaped potatoes with the skin. Cooked in canola oil until crispy outside and tender inside',
    image: '/menu/fries.jpg',
  },
  {
    id: '5',
    name: 'Frosted Lemonade',
    price: 4.99,
    description: 'A refreshing combination of Chick-fil-A Lemonade and our signature Icedream dessert',
    image: '/menu/lemonade.jpg',
  },
];

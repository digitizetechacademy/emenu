import type { MenuCategory, RestaurantInfo } from './types';

export const RESTAURANT_INFO: RestaurantInfo = {
  name: 'MenuSwift Bistro',
  description: 'Fresh ingredients, bold flavors. Your next favorite meal is just a tap away.',
  address: '123 Culinary Lane, Foodie City, 45678',
  contact: 'contact@menuswift.example.com | (555) 123-4567',
  hours: 'Mon-Sun: 11:00 AM - 10:00 PM',
};

export const MENU_DATA: MenuCategory[] = [
  {
    name: 'Appetizers',
    items: [
      {
        id: 'app-01',
        name: 'Classic Bruschetta',
        description:
          'Toasted baguette slices topped with a mix of fresh tomatoes, garlic, basil, and a balsamic glaze.',
        price: 8.99,
        imageId: 'bruschetta',
      },
      {
        id: 'app-02',
        name: 'Golden Calamari',
        description:
          'Lightly battered and fried calamari served with a zesty marinara sauce and lemon wedges.',
        price: 12.5,
        imageId: 'calamari',
      },
      {
        id: 'app-03',
        name: 'Caprese Salad Skewers',
        description:
          'Cherry tomatoes, fresh mozzarella balls, and basil leaves drizzled with olive oil and balsamic.',
        price: 9.5,
        imageId: 'caprese-salad',
      },
    ],
  },
  {
    name: 'Main Courses',
    items: [
      {
        id: 'main-01',
        name: 'Spaghetti Carbonara',
        description:
          'A classic Roman pasta dish with creamy egg yolk sauce, pecorino cheese, and crispy pancetta.',
        price: 16.99,
        imageId: 'spaghetti-carbonara',
      },
      {
        id: 'main-02',
        name: 'Margherita Pizza',
        description:
          'Artisanal pizza with a San Marzano tomato base, fresh mozzarella, basil, and a drizzle of olive oil.',
        price: 14.0,
        imageId: 'margherita-pizza',
      },
      {
        id: 'main-03',
        name: 'Grilled Salmon',
        description:
          'Atlantic salmon fillet grilled to perfection, served with roasted asparagus and a lemon-dill sauce.',
        price: 22.5,
        imageId: 'grilled-salmon',
      },
    ],
  },
  {
    name: 'Desserts',
    items: [
      {
        id: 'des-01',
        name: 'Classic Tiramisu',
        description:
          "Layers of coffee-soaked ladyfingers and a rich, creamy mascarpone mixture, dusted with cocoa powder.",
        price: 7.5,
        imageId: 'tiramisu',
      },
      {
        id: 'des-02',
        name: 'Panna Cotta',
        description:
          'A silky smooth Italian custard served with a vibrant raspberry coulis and fresh berries.',
        price: 6.99,
        imageId: 'panna-cotta',
      },
    ],
  },
  {
    name: 'Beverages',
    items: [
      {
        id: 'bev-01',
        name: 'Homemade Lemonade',
        description: 'Freshly squeezed lemons make this the perfect tangy and sweet refreshment.',
        price: 3.5,
        imageId: 'lemonade',
      },
      {
        id: 'bev-02',
        name: 'Freshly Brewed Iced Tea',
        description: 'A tall glass of our signature black tea blend, lightly sweetened and served over ice.',
        price: 3.0,
        imageId: 'iced-tea',
      },
    ],
  },
];

export const POPULAR_ITEMS: string[] = [
  'Garlic Bread',
  'Margherita Pizza',
  'Classic Tiramisu',
  'Homemade Lemonade'
];

export const ALL_MENU_ITEMS = MENU_DATA.flatMap(category => category.items).concat({
  id: 'side-01',
  name: 'Garlic Bread',
  description: 'Warm, buttery garlic bread, perfect for sharing.',
  price: 5.0,
  imageId: 'garlic-bread',
});

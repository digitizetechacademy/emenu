export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface OrderItem extends MenuItem {
  quantity: number;
  specialInstructions: string;
}

export interface RestaurantInfo {
  name: string;
  description: string;
  address: string;
  contact: string;
  hours: string;
}

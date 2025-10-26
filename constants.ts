import { NavLink, MenuItem, SpecialItem } from './types';
import { Home, BookOpenText, Star, CalendarClock, ShoppingCart, Info, Mail } from 'lucide-react';

export const navLinks: NavLink[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: BookOpenText },
    { name: 'Chef’s Specials', path: '/specials', icon: Star },
    { name: 'Reservations', path: '/reservations', icon: CalendarClock },
    { name: 'Online Order', path: '/order', icon: ShoppingCart },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
];

export const menuItems: MenuItem[] = [
    {
        id: 1, name: 'Coral Reef Calamari', description: 'Crispy fried calamari served with a spicy marine aioli.', price: '$18', category: 'Appetizers', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761463002/coral_reef_calamari_sea_food_nn2yke.jpg',
        ingredients: ['Calamari', 'Flour', 'Spices', 'Marine Aioli', 'Lemon']
    },
    {
        id: 2, name: 'Neptune’s Trident Scallops', description: 'Pan-seared scallops on a bed of saffron risotto.', price: '$26', category: 'Appetizers', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761463075/neptunes_trident_scallops_sea_food_kxxlxa.jpg',
        ingredients: ['Scallops', 'Saffron Risotto', 'White Wine', 'Garlic', 'Parsley']
    },
    {
        id: 3, name: 'The Kraken’s Grilled Octopus', description: 'Tender grilled octopus with smoked paprika and olive oil.', price: '$42', category: 'Main Courses', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761463115/the_krakens_grilled_octopus_sea_food_iafmjf.jpg',
        ingredients: ['Octopus', 'Smoked Paprika', 'Olive Oil', 'Potatoes', 'Herbs']
    },
    {
        id: 4, name: 'Abyssal Black Cod', description: 'Miso-glazed black cod, cooked to perfection.', price: '$38', category: 'Main Courses', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761463115/abyssal_black_cod_sea_food_zkcnob.jpg',
        ingredients: ['Black Cod', 'Miso Paste', 'Sake', 'Mirin', 'Asparagus']
    },
    {
        id: 5, name: 'Mermaid’s Kiss Lava Cake', description: 'Molten chocolate lava cake with a raspberry coulis heart.', price: '$15', category: 'Desserts', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761463220/mermaids_kiss_lava_cake_dessert_nvem0x.jpg',
        ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Raspberry Coulis']
    },
    {
        id: 6, name: 'Sea Salt Caramel Gelato', description: 'Artisanal gelato with ribbons of sea salt caramel.', price: '$12', category: 'Desserts', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761463220/sea_salt_caramel_gelato_dessert_mzu5kh.jpg',
        ingredients: ['Milk', 'Cream', 'Sugar', 'Sea Salt', 'Caramel']
    },
    {
        id: 7, name: 'Pina Colada', description: 'A classic tropical cocktail with rum, coconut cream, and pineapple juice.', price: '$16', category: 'Beverages', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761463217/pina_colada_beverage_hhniat.jpg',
        ingredients: ['Rum', 'Coconut Cream', 'Pineapple Juice', 'Ice']
    },
    {
        id: 8, name: 'Virgin Mojito', description: 'A refreshing non-alcoholic blend of mint, lime, sugar, and soda water.', price: '$10', category: 'Beverages', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761463219/virgin_mojito_beverage_t0t5hx.jpg',
        ingredients: ['Mint Leaves', 'Lime Juice', 'Sugar', 'Soda Water', 'Ice']
    },
];

export const specialItems: SpecialItem[] = [
    {
        id: 101, name: 'The Golden Leviathan', description: 'A whole roasted branzino stuffed with citrus and herbs, encrusted in gold leaf.', price: '$120', category: 'Main Courses', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761459684/generated-image-1761459648957_k7akr0.jpg',
        tagline: "A Treasure from the Deep",
        ingredients: ['Branzino', 'Lemon', 'Thyme', 'Edible Gold Leaf', 'Fennel']
    },
    {
        id: 102, name: 'Poseidon’s Pearl Pasta', description: 'Handmade squid ink pasta with lobster, shrimp, and mussels in a delicate white wine sauce.', price: '$55', category: 'Main Courses', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761459712/generated-image-1761459695441_n3gqmz.jpg',
        tagline: "The Ocean's Bounty",
        ingredients: ['Squid Ink Pasta', 'Lobster Tail', 'Shrimp', 'Mussels', 'White Wine']
    },
    {
        id: 103, name: 'Siren’s Song Cocktail', description: 'A mesmerizing color-changing cocktail with gin, elderflower liqueur, and butterfly pea tea.', price: '$22', category: 'Beverages', image: 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1761459887/generated-image-1761459861924_nrsuvu.jpg',
        tagline: "An Enchanting Elixir",
        ingredients: ['Gin', 'Elderflower Liqueur', 'Butterfly Pea Tea', 'Citrus', 'Tonic']
    },
];
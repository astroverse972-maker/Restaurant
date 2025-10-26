import React from 'react';

export interface NavLink {
    name: string;
    path: string;
    icon: React.ComponentType<{ size?: number; className?: string; }>;
}

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    category: 'Appetizers' | 'Main Courses' | 'Desserts' | 'Beverages';
    image: string;
    ingredients: string[];
}

export interface SpecialItem extends MenuItem {
    tagline: string;
}

export interface CartItem extends MenuItem {
    quantity: number;
}

import {Product} from './product';
import { OrderStatus } from './enums';

export interface IInventory{
	addProduct(product: Product, quantity: number): void;
	removeProduct(id: string, quantity: number): void;
	findProductById(id: string): Product | undefined;
  findProductByName(name: string): Product | undefined;
	listAllProducts(): InventoryItem[];
} 

export interface InventoryItem{
	product: Product
	quantity: number
}

export interface OrderItem {
    product: Product;
    quantity: number;
}

export interface IOrder {
    readonly id: string;
    readonly items: ReadonlyArray<OrderItem>; 
    readonly status: OrderStatus;
    updateStatus(newStatus: OrderStatus): void;
    getSummary(): number; 
}

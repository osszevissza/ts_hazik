import { IInventory, InventoryItem } from "./interfaces";
import { Product } from "./product";

export class Inventory implements IInventory {
    private items: Map<string, InventoryItem> = new Map();

    addProduct(product: Product, quantity: number): void {
        if (quantity <= 0) {
            throw new Error("A hozzáadott mennyiségnek pozitívnak kell lennie.");
        }

        const currentItem = this.items.get(product.id);

        if (currentItem) {
            currentItem.quantity += quantity;
        } else {
            this.items.set(product.id, {
                product,
                quantity
            });
        }
    }
  
//ezredik próba után...
    removeProduct(id: string, quantity?: number): void {
        const currentItem = this.items.get(id);

        if (!currentItem) {
            throw new Error("A termék nem található.");
        }

        if (quantity === undefined) {
            this.items.delete(id);
            return;
        }

        if (quantity <= 0) {
            throw new Error("Az eltávolított mennyiség pozitív kéne legyen.");
        }

        if (quantity > currentItem.quantity) {
            throw new Error("Nincs ennyi készleten.");
        }

        currentItem.quantity -= quantity;

        if (currentItem.quantity === 0) {
            this.items.delete(id);
        }
    }

    findProductById(id: string): Product | undefined {
        return this.items.get(id)?.product;
    }

    findProductByName(name: string): Product | undefined {
        return Array.from(this.items.values())
            .find(item => item.product.name === name)
            ?.product;
    }

    listAllProducts(): InventoryItem[] {
        return Array.from(this.items.values());
    }
}

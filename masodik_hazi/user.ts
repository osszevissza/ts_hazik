import { Inventory } from './inventory' 
import { Order } from './order' 
import { OrderItem } from './interfaces' 

export class User {
    private _id: string 
    private _name: string 
    private _email: string 

    constructor(id: string, name: string, email: string) {
        if (!id || id.trim().length === 0) {
            throw new Error("A felhasználói ID nem lehet üres!") 
        }
        if (!name || name.trim().length === 0) {
            throw new Error("A név nem lehet üres!") 
        }
        if (!email || email.trim().length === 0) {
            throw new Error("Az email nem lehet üres!") 
        }

        this._id = id 
        this._name = name 
        this._email = email 
    }

    get id(): string {
        return this._id 
    }

    get name(): string {
        return this._name 
    }

    get email(): string {
        return this._email 
    }

    placeOrder(orderId: string, items: OrderItem[], inventory: Inventory): Order {
        const invalidItems: string[] = [] 

        for (const item of items) {
            const inventoryItem = inventory.findProductById(item.product.id) 
            if (!inventoryItem) {
                invalidItems.push(`${item.product.name} (ID: ${item.product.id})`)
            }
        }

        if (invalidItems.length > 0) {
            throw new Error(
                `A következő termékek nincsenek  készleten: ${invalidItems.join(', ')}`
            )
        }
        return new Order(orderId, items) 
    }
}

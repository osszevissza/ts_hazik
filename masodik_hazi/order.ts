import {OrderStatus} from './enums' 
import {IOrder, OrderItem} from './interfaces' 

export class Order implements IOrder {
    private _id: string 
    private _items: OrderItem[] 
    private _status: OrderStatus 

    constructor(id: string, items: OrderItem[]) {
        if (!id || id.trim().length === 0) {
            throw new Error("Nincs id, nincs rendelés!") 
        }
        if (!items || items.length === 0) {
            throw new Error("A rendeléshez legalább egy termék szükséges.") 
        }

        this._id = id 
        this._items = items 
        this._status = OrderStatus.New 
    }

    get id(): string {
        return this._id 
    }

    get items(): ReadonlyArray<OrderItem> {
        return this._items 
    }

    get status(): OrderStatus {
        return this._status 
    }

    updateStatus(newStatus: OrderStatus): void {
        this._status = newStatus 
    }

    getSummary(): number {
        return this._items.reduce(
            (total, item) => total + item.product.price * item.quantity, 
            0
        ) 
    }
} 

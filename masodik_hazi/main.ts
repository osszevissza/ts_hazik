import {Product} from './product' 
import {Inventory} from './inventory' 
import {Order} from './order' 
import {User} from './user' 
import {OrderItem} from './interfaces' 

const nyakörv = new Product('1', 'nyakörv', 3000, 'fekete, M-es') 
const jutalomfalat = new Product('2', 'jutalomfalat', 800, 'marhafül') 
const játék = new Product('3', 'mackó', 2000) 

const inventory = new Inventory() 
inventory.addProduct(nyakörv, 10) 
inventory.addProduct(jutalomfalat, 25) 
inventory.addProduct(játék, 15) 

const user = new User('1', 'Marina', 'marina.barsi@posteo.no') 

const orderItems: OrderItem[] = [
    {product: jutalomfalat, quantity: 8},
    {product: játék, quantity: 1}
] 

const order = user.placeOrder('R001', orderItems, inventory) 

console.log(`Összesen: ${order.getSummary()} Ft`) 

for (const item of orderItems) {
    inventory.removeProduct(item.product.id, item.quantity) 
}

console.log('Készletlistázás:') 
console.log(inventory.listAllProducts()) 

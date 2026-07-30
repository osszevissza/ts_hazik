export  function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value
    descriptor.value = function(...args: any[]) {
        console.log(`[LOG] Metódus: ${propertyKey}, idő: ${new Date().toLocaleTimeString()}`)
        console.log(`[LOG] Paraméterek:`, args)
        originalMethod.apply(this, args)
        console.log(`[LOG] ${propertyKey} befejeződött`)
    }
}








































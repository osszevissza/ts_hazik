export class Product {
    private _id: string;
    private _name: string;
    private _price: number;
    private _description?: string;

    constructor(
        id: string,
        name: string,
        price: number,
        description?: string)
    {
        if (price <= 0) {
        throw new Error("Az ár nem lehet negatív.")
    }


        if (!id || id.trim().length === 0 ) {
        throw new Error("Az id nem lehet üres!")
    }
    //a falsy, undifined miatt nem jó a sima id.trim().length === 0 és úgy raise error

    this._id = id
    this._name = name
    this._price = price
    this._description = description
}

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    get description(): string | undefined {
        return this._description
    }
}

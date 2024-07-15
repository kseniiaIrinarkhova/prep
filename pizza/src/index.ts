//ingredient interface

abstract class Ingredient {
#name:string;
#price:number;
constructor (price?:number, name?:string ){
    this.#name = (name)? name:"New Ingredient";
    this.#price = (price)?price: 0;
}
get name():string{
return this.#name;
}
get price():number{
    return this.#price;
}
set price(newPrice:number){
    this.#price = newPrice;
}
set name(newName:string){
    this.#name = newName;
}
}

class Cheese extends Ingredient{
    constructor(price:number){
        super(price,'Cheese');
    }
}
class Pepperoni extends Ingredient{
    constructor(price:number){
        super(price,'Pepperoni');
    }
}

class DoubbleIngredient extends Ingredient{
    #ingredient:Ingredient;
    constructor(ingredient:Ingredient){
        super(ingredient.price, ingredient.name);
        this.#ingredient = ingredient;

    }
    get price():number{
        return this.#ingredient.price *2;
    }
}

abstract class Pizza{
    #ingredients:Array<Ingredient>;
    #basePrice:number;
    #name:string;
    constructor(name?:string, basePrice?:number, ingredients?:Array<Ingredient>){
        this.#ingredients = (ingredients)?[...ingredients]:[];
        this.#name = (name)?name:"New Pizza";
        this.#basePrice = (basePrice)?basePrice:0;
    }
    set basePrice(newBasePrice:number){
        this.#basePrice = newBasePrice;
    }
    getPrice():number{
        let pizzaPrice = this.#basePrice;
        this.#ingredients.forEach((ingredient)=>{
            pizzaPrice += ingredient.price;
        })
        return pizzaPrice;
    }
    get name():string{
        return this.#name;
    }
}
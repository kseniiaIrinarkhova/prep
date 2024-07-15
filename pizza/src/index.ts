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
    constructor(price?:number){
        super((price)?price:2.5,'Cheese');
    }
}
class Pepperoni extends Ingredient{
    constructor(price?:number){
        super((price)?price:2.5,'Pepperoni');
    }
}
class Daugh extends Ingredient{
    constructor(price?:number){
        super((price)?price:8,'Daugh');
    } 
}

class ThinCrispDaugh extends Daugh{
    constructor(){
        super();
        this.name = 'Thin Crisp Daugh'
    }
}

class ThickCheesyDaugh extends Daugh{
    constructor(){
        super();
        this.name = "Thick Cheesy Daugh";
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
    get name():string{
        return `Double ${this.#ingredient.name}`;
    }
}
class DoubleCheese extends DoubbleIngredient{
    constructor(){
        super(new Cheese());
    }
}

abstract class Pizza{
    #ingredients:Array<Ingredient>;
    #name:string;
    constructor(name?:string, ingredients?:Array<Ingredient>){
        this.#ingredients = (ingredients)?[...ingredients]:[];
        this.#name = (name)?name:"New Pizza";
    }
    
    getPrice():number{
        let pizzaPrice = 0;
        this.#ingredients.forEach((ingredient)=>{
            pizzaPrice += ingredient.price;
        })
        return pizzaPrice;
    }
    get name():string{
        return this.#name;
    }
    addIngredient(ingredient: Ingredient){
        this.#ingredients.push(ingredient);
    }
    prepare():void{
    console.log(`Start to prepare pizza: ${this.#name}`);
    console.log(`add ingredients:`);
    this.#ingredients.forEach((ingredient)=>{
        console.log(`Add ${ingredient.name}`);
    })
    console.log(`Pizza is ready for you!`)
    }
}

class CheesePizza extends Pizza{
    constructor(daugh:Daugh){
        super("Margarita");
        this.addIngredient(daugh);
        this.addIngredient(new DoubleCheese());
    }
}

class PepperoniPizza extends Pizza{
    constructor(daugh:Daugh){
        super("Pepperoni");
        this.addIngredient(daugh);
        this.addIngredient(new Cheese());
    }
}

class PizzaFactory{
    public createPizza(name:string, isThin:boolean=true):Pizza{
        switch(name){
            case 'Margarita':
                return this.createCheesePizza(isThin);
                break;
            case 'Pepperoni':
                return this.createPepperoni(isThin);
                break;
            default:
                return this.createCheesePizza(isThin);
                break;
        }
    }
    public createCheesePizza(isThin:boolean=true):CheesePizza{
        return (isThin)?new CheesePizza(new ThinCrispDaugh()): new CheesePizza(new ThickCheesyDaugh());
    }
    public createPepperoni(isThin:boolean=true):PepperoniPizza{
        return (isThin)?new PepperoniPizza(new ThinCrispDaugh()):new PepperoniPizza(new ThickCheesyDaugh());
    }
}


class PizzaStore{
    constructor(){
        console.log('Welcome to our store!')
    }
    getOrder(pizzaName:string, daugh?:string){
        let pizza: Pizza;
        let isThin:boolean = daugh === 'thin';
        let pizzaFactory = new PizzaFactory();
        pizza = pizzaFactory.createPizza(pizzaName,isThin);
        this.prepareOrder(pizza);
    }
    prepareOrder(pizza:Pizza){
        console.log(`*******New Order**************`)
        pizza.prepare();
        console.log(`Pizza's price: ${pizza.getPrice()}`);
    }
}

let pizzaStore = new PizzaStore();

pizzaStore.getOrder('Margarita','thin');
pizzaStore.getOrder('Margarita','thick');
pizzaStore.getOrder('Pepperoni','thin');
pizzaStore.getOrder('Pepperoni','thick');

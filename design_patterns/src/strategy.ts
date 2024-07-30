export default class MiniDuckSimulator{
    public static main():void{
        let mallad:Duck = new MalladDuck();
        mallad.display();
        mallad.performQuack();
        mallad.performFly();

        let model:Duck = new ModelDuck();
        model.display();
        model.performFly();
        model.setFlyBehavior(new FlyRockedPowered());
        model.performFly();
    }
}

abstract class Duck{
    #flyBehavior: IFlyBehavior;
    #quackBehavior: IQuackBehavior;
    constructor(flyBehavior:IFlyBehavior, quackBehavior:IQuackBehavior){
        this.#flyBehavior = flyBehavior;
        this.#quackBehavior = quackBehavior;
    }
    abstract display():void;
    public performQuack(){
        this.#quackBehavior.quack();
    }
    public performFly(){
        this.#flyBehavior.fly();
    }
    public setQuackBehavior(newQuackBehavior:IQuackBehavior){
        this.#quackBehavior = newQuackBehavior;
    }
    public setFlyBehavior(newFlyBehavior:IFlyBehavior){
        this.#flyBehavior = newFlyBehavior;
    }
}

interface IFlyBehavior{
    fly():void
}
interface IQuackBehavior{
    quack():void;
}

class MalladDuck extends Duck{
    constructor(){
        super(new FlyWithWings(), new Quack());
    }
    display(): void {
        console.log("I'm a Mallad Duck!")
    }

}
class FlyWithWings implements IFlyBehavior{
    fly(): void {
        console.log(`...wings movings...`)
    }
}
class FlyNoWay implements IFlyBehavior{
    fly(): void {
        console.log('Can not fly...');
    }
}
class FlyRockedPowered implements IFlyBehavior{
    fly(): void {
        console.log('....wshooo.....');
    }
}
class Quack implements IQuackBehavior{
    quack(): void {
        console.log('QUACK quack');
    }
}
class Squeak implements IQuackBehavior{
    quack(): void {
        console.log(`SQUEAK squeak`);
    }
}
class MuteQuack implements IQuackBehavior{
    quack(): void {
        console.log('silance.....');
    }
}

class ModelDuck extends Duck{
    constructor(){
        super(new FlyNoWay(), new MuteQuack());
    }
    display(): void {
        console.log('I am a model of the duck!')
    }
}
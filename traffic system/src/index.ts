class Pedestrian {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}

enum LightSignal{
    OFF,
    LEFT,
    RIGHT
}
abstract class Vehicle {
    id: string;
    turnLight: LightSignal;
    constructor(id: string,signal:LightSignal=LightSignal.OFF) {
        this.id = id;
        this.turnLight = signal;
    }
    setTurnLight(signal:LightSignal){
        this.turnLight = signal;
    }
    resetTurnLight(){
        this.turnLight = LightSignal.OFF;
    }
}

class Car extends Vehicle {
    constructor(id: string) {
        super(id);
    }
}
class EmergencyVehicle extends Vehicle {
    vehicle: Vehicle;
    constructor(vehicle: Vehicle) {
        super(vehicle.id);
        this.vehicle = vehicle;
    }

}
enum EntranceDirection {
    NORTH,
    NORTHEAST,
    EAST,
    SOUTHEAST,
    SOUTH,
    SOUTHWEST,
    WEST,
    NORTHWEST
}
enum LineType {
    L = "Only Left",
    S = "Straight",
    R = "Only Right",
    SL = 'Straight and Left'
}

type Entrance = {
    [key in EntranceDirection]?: Array<LineType>;
}

abstract class Crossroad {
    id: number;
    entrances: Entrance;
    emepgencyVehicles: Array<Vehicle>;
    // vehicles: Array<Vehicle>;
    constructor(id: number) {
        this.id = id;
        this.entrances = {};
        // this.pedestrians = [];
        // this.vehicles = [];
        this.emepgencyVehicles = [];
    }
    abstract addPedestrian(pedestrian: Pedestrian, direction?: EntranceDirection): void
    abstract addVehicle(vehicle: Vehicle , direction?:EntranceDirection, line?:LineType): void
    abstract removePedestrian(): void
    abstract removeVehicle(): void
    abstract resolveTraffic(): void
    emergencyTraffic(): void {
        while (this.emepgencyVehicles.length) {
            console.log(`Attention! Emergency vehicle ${this.emepgencyVehicles[0]} is crossing the road!`);
            this.emepgencyVehicles.shift();
        }
    }
}

class EntranceFactory {
    getFourEntrances(firstLines:Array<LineType> = [LineType.S], secondLines:Array<LineType> = [LineType.S],thirdLines :Array<LineType> = [LineType.S], fourthLines:Array<LineType> = [LineType.S] ) {
        let entrances: Entrance = {
            [EntranceDirection.NORTH]: firstLines,
            [EntranceDirection.EAST]: secondLines,
            [EntranceDirection.WEST]: thirdLines,
            [EntranceDirection.SOUTH]: fourthLines,
        }
        return entrances;
    }
    getTwoEntrances(firstLines:Array<LineType> = [LineType.S], secondLines:Array<LineType> = [LineType.S]) {
        let entrances: Entrance = {
            [EntranceDirection.NORTH]: firstLines,
            [EntranceDirection.SOUTH]: secondLines,
        }
        return entrances;
    }
    getTreeEntrances(firstLines:Array<LineType> = [LineType.S], secondLines:Array<LineType> = [LineType.S],thirdLines :Array<LineType> = [LineType.S]) {
        let entrances: Entrance = {
            [EntranceDirection.NORTH]: firstLines,
            [EntranceDirection.EAST]: secondLines,
            [EntranceDirection.WEST]: thirdLines,
        }
        return entrances;
    }
    getFiveEntrances(firstLines:Array<LineType> = [LineType.S], secondLines:Array<LineType> = [LineType.S],thirdLines :Array<LineType> = [LineType.S], fourthLines:Array<LineType> = [LineType.S] , fifthLines:Array<LineType> = [LineType.S]) {
        let entrances: Entrance = {
            [EntranceDirection.NORTH]: firstLines,
            [EntranceDirection.EAST]: secondLines,
            [EntranceDirection.WEST]: thirdLines,
            [EntranceDirection.SOUTH]: fourthLines,
            [EntranceDirection.NORTHEAST]: fifthLines,
        }
        return entrances;
    }
}

class AllWaysStopCrossroads extends Crossroad {
    pedestrians: Array<Pedestrian>;
    vehicles:Array<Vehicle>;
    constructor(id: number, entranceFactory: EntranceFactory) {
        super(id);
        this.entrances = entranceFactory.getFourEntrances();
        this.vehicles = [];
        this.pedestrians =[];
        console.log(` All Ways Stop Crossroad ${this.id}  was created`)
    }
    addPedestrian(pedestrian: Pedestrian): void {
        console.log(`New pedestrian ${pedestrian.id} came, there are/is : ${this.pedestrians.length} on crossroad ${this.id}`);
        this.pedestrians.push(pedestrian);
    }
    addVehicle(vehicle: Vehicle): void {
        if (vehicle instanceof EmergencyVehicle) {
            this.emepgencyVehicles.push(vehicle);
            console.log(`New emergency vehicle  ${vehicle.id} arrive, there are/is : ${this.emepgencyVehicles.length} on crossroad ${this.id}`);

        }
        else {
            this.vehicles.push(vehicle);
            console.log(`New vehicle ${vehicle.id} arrive, there are/is : ${this.vehicles.length} on crossroad ${this.id}`);

        }

    }
    removePedestrian(): void {
        console.log(`Pedestrian ${this.pedestrians[0].id} crossed the road, there are/is : ${this.pedestrians.length - 1} on crossroad ${this.id}`);

        this.pedestrians.shift();

    }
    removeVehicle(): void {
        console.log(`Vehicle ${this.vehicles[0].id} crossed the road, there are/is : ${this.vehicles.length - 1} on crossroad ${this.id}`);

        this.vehicles.shift();

    }
    resolveTraffic(): void {

        console.log(`resolving traffic for ${this.id} crossroad`)
        while (this.vehicles.length) {
            this.emergencyTraffic();
            while (this.pedestrians.length) {
                this.removePedestrian();
            }
            this.removeVehicle();
        }
    }
}


class CrossroadWithTraficLight extends Crossroad{
    vehiclesOnEntrances: Object;
    pedestriansOnEntrances: Object;
    constructor(id:number, entranceFactory:EntranceFactory) {
        super(id);
this.entrances = entranceFactory.getFourEntrances();
this.vehiclesOnEntrances ={};
this.pedestriansOnEntrances = {};
        
    }
    addPedestrian(pedestrian: Pedestrian, direction?: EntranceDirection): void {
        throw new Error("Method not implemented.");
    }
    addVehicle(vehicle: Vehicle, direction?: EntranceDirection, line?: LineType): void {
        throw new Error("Method not implemented.");
    }
    removePedestrian(): void {
        throw new Error("Method not implemented.");
    }
    removeVehicle(): void {
        throw new Error("Method not implemented.");
    }
    resolveTraffic(): void {
        throw new Error("Method not implemented.");
    }


}

class CrossroadsFactory {
    entranceFactory: EntranceFactory;
    constructor(entranceFactory: EntranceFactory) {
        this.entranceFactory = entranceFactory;
    }
    createAllWaysStopCrossroad(id: number) {
        return new AllWaysStopCrossroads(id, this.entranceFactory);
    }
}

class TrafficSystem {
    crossroads: Array<Crossroad>
    constructor() {
        this.crossroads = [];
    }
    addCrossroad(crossroad: Crossroad) {
        this.crossroads.push(crossroad);
    }
    startTrafficSystem(pedestrians: Array<Pedestrian>, vehicles: Array<Vehicle>) {
        let partition = Math.floor(pedestrians.length / this.crossroads.length);
        for (let i = 0; i < this.crossroads.length; i++) {
            for (let j = partition * i; j < partition * i + partition; j++) {
                if (pedestrians.length) {
                    this.crossroads[i].addPedestrian(pedestrians.pop() as Pedestrian);
                }

            }
        }
        partition = Math.floor(vehicles.length / this.crossroads.length);
        for (let i = 0; i < this.crossroads.length; i++) {
            for (let j = partition * i; j < partition * i + partition; j++) {
                if (vehicles.length) {
                    this.crossroads[i].addVehicle(vehicles.pop() as Vehicle);
                }
            }
        }

        this.resolveCrossroads();
    }

    resolveCrossroads(): void {
        this.crossroads.forEach((cr) => { cr.resolveTraffic() })
    }

}

let entranceFactory = new EntranceFactory();
let crossroadsFactory = new CrossroadsFactory(entranceFactory);

let trafficSystem = new TrafficSystem();

for (let i = 0; i < 5; i++) {
    trafficSystem.addCrossroad(crossroadsFactory.createAllWaysStopCrossroad(i));
}

let pedestrians: Array<Pedestrian> = new Array();
for (let i = 0; i < 10; i++) {
    pedestrians.push(new Pedestrian(i))
}
let vehicles: Array<Vehicle> = new Array();
let stringId = 'qwertyuiopasdfghjklzxcvbnm'
for (let i = 0; i < 26; i++) {
    vehicles.push((i % 4 === 0) ? new EmergencyVehicle(new Car(stringId[i])) : new Car(stringId[i]));
}

trafficSystem.startTrafficSystem(pedestrians, vehicles);
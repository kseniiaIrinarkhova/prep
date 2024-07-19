// abstract class Container {
//     heigth: number;
//     width: number;
//     depth: number;
//     weigth: number;
//     isTemperatureSensitive: boolean;
//     constructor(heigth: number, width: number, depth: number, weight: number, isTemperatureSensitive: boolean = false) {
//         this.heigth = heigth;
//         this.width = width;
//         this.depth = depth;
//         this.weigth = weight;
//         this.isTemperatureSensitive = isTemperatureSensitive;
//     }


// }

// class Locker extends Container {
//     isEmpty: boolean;
//     lockerNumber: number;
//     constructor(heigth: number, width: number, lockerNumber: number, isTemperatureSensitive: boolean = false) {
//         super(heigth, width, 50, 20, isTemperatureSensitive);
//         this.lockerNumber = lockerNumber;
//         this.isEmpty = true;

//     }
//     fillLocker(): void {
//         if (!this.isEmpty) {
//             throw 'Locker is not empty!'
//         }
//         else {
//             this.isEmpty = false;
//         }
//     }
//     clearLocker(): void {
//         this.isEmpty = true;
//     }

// }

// class Box extends Container {
//     isLocationSensitive: boolean;
//     trackingNumber: string;
//     constructor(heigth: number, width: number, depth: number, weight: number, trackingNumber: string, isTemperatureSensitive: boolean = false, isLocationSensitive: boolean = false) {
//         super(heigth, width, depth, weight, isLocationSensitive);
//         this.isLocationSensitive = isLocationSensitive;
//         this.trackingNumber = trackingNumber;
//         this.rotate();
//     }
//     rotate(): void {
//         if (!this.isLocationSensitive) {
//             //change directions depth should be minimum:
//             if (this.depth > this.heigth) {
//                 let tmp: number = this.depth;
//                 this.depth = this.heigth;
//                 this.heigth = tmp;
//             }
//             if (this.depth > this.width) {
//                 let tmp: number = this.depth;
//                 this.depth = this.width;
//                 this.width = this.depth;
//             }

//         }
//     }
// }

// class LockerStand {
//     smallLockers: Array<Locker>;
//     mediumLockers: Array<Locker>;
//     largeLockers: Array<Locker>;
//     constructor(smallLockersAmount:number, smallLockersHeight:number, mediumLockersAmount:number, mediumLockersHeight:number, largeLockersAmount:number, largeLockersHeight:number, width:number) {
//         let lockerNumber = 0;
//         this.smallLockers = new Array<Locker>;
//         for(let locker=0; locker<smallLockersAmount;locker++){
//             this.smallLockers.push(new Locker(smallLockersHeight,width,++lockerNumber));
//         }
//         this.mediumLockers = new Array<Locker>;
//         for(let locker=0; locker<mediumLockersAmount;locker++){
//             this.mediumLockers.push(new Locker(mediumLockersHeight,width,++lockerNumber));
//         }
//         this.largeLockers = new Array<Locker>;
//         for(let locker=0; locker<largeLockersAmount;locker++){
//             this.largeLockers.push(new Locker(largeLockersAmount,width,++lockerNumber));
//         }
//        }
    
//     findLockers(boxes: Box[]): number[] {
//         //calsulate dimentions
//         //find suitable set of lockers for packages;
//         return []
//     }
    
// }



// let lockerPit = new LockerStand(5,10,3,50,1,150,50);
// console.log(lockerPit);
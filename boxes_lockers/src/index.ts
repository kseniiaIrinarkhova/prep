//additional data
const enum Size {
    small = "SMALL",
    medium = "MEDIUM",
    large = "LARGE"
}
type PassCode = string;
type LockersSet = {
    [Size.small]: Array<Locker>;
    [Size.medium]: Array<Locker>;
    [Size.large]: Array<Locker>;
}

class User {
    userID: number;
    username: string;
    constructor(username: string, userID: number) {
        this.username = username;
        this.userID = userID;
    }
}
//locker info
class Locker {
    size: Size;
    isAvailable: boolean;
    index: number;
    passcode: PassCode;
    package: Package | null;
    constructor(size: Size, index: number) {
        this.size = size;
        this.index = index;
        this.isAvailable = true;
        this.passcode = "";
        this.package = null;
    }

    occupy(storedPackage: Package): PassCode {
        this.isAvailable = false;
        this.package = storedPackage;
        this.passcode = this.generatePasscode();
        return this.passcode;
    }
    generatePasscode(): PassCode {
        let newPasscode: PassCode = Math.random().toString(36).substring(2, 6);
        return newPasscode;
    }
    free(): Package {
        this.isAvailable = true;
        if (this.package === null) {
            throw 'Something does wrong!'
        }
        let storedPackage = this.package;
        this.package = null;
        return storedPackage;
    }

}


//package info
class Package {
    size: Size;
    user: User;
    index: number;
    constructor(size: Size, user: User, index: number) {
        this.size = size;
        this.user = user;
        this.index = index;
    }
}
class LockerManagerFactory{
    create(smallLockersAmount: number, mediumLockersAmount: number, largeLockersAmount: number){
        let lockerSet:LockersSet= { SMALL: [], MEDIUM: [], LARGE: [] };
        lockerSet[Size.small] = this.getLockers(Size.small, smallLockersAmount, 1);
        lockerSet[Size.medium] = this.getLockers(Size.medium, mediumLockersAmount, smallLockersAmount + 1);
        lockerSet[Size.large] = this.getLockers(Size.medium, largeLockersAmount, mediumLockersAmount + smallLockersAmount + 1);
        let lockerManager = new LockerManager(lockerSet);
        return lockerManager;
    }
    private getLockers(size: Size, amount: number, startIndex: number): Array<Locker> {
        let lockers: Array<Locker> = [];
        for (let i = 0; i < amount; i++) {
            lockers.push(new Locker(size, startIndex + i));
        }
        return lockers;
    }

}
//lockerManager
class LockerManager {
    freeLockers: LockersSet;
    occupiedLockers: { [key: PassCode]: Locker };
    constructor(lockersSet:LockersSet) {
        this.freeLockers = lockersSet;
        this.occupiedLockers = {};
    }

   
    findEmptyLocker(size: Size): boolean {
        return this.freeLockers[size].length > 0;
    }
    occupyLocker(userPackage: Package): PassCode {
        if (this.findEmptyLocker(userPackage.size)) {
            let occupiedLocker: Locker = this.freeLockers[userPackage.size].pop() as Locker;
            let passcode = occupiedLocker.occupy(userPackage);
            this.occupiedLockers[passcode] = occupiedLocker;
            return passcode;

        } else {
            throw "We don't have lockers for package!"
        }
    }
    emptyLocker(passcode: PassCode): void {

        if (passcode in this.occupiedLockers) {
            let occupiedLocker = this.occupiedLockers[passcode];
            delete this.occupiedLockers[passcode];
            let userPackage = occupiedLocker.free();
            this.freeLockers[occupiedLocker.size].push(occupiedLocker);
            console.log(`Successfully retrive package ${userPackage.index} for user! Take it from ${occupiedLocker.index} locker.`)
        }
        else {
            console.log(`The passcode ${passcode} doesn't suite for any packages!`)
        }
    }
}

//lockersManager

//userInterface
class UserInterface {
    user: User;
    passcodes: Array<PassCode>;
    lockerManager: LockerManager;
    constructor(user: User, lockerManager: LockerManager) {
        this.user = user;
        this.passcodes = [];
        this.lockerManager = lockerManager;
    }
    addPasscode(passcode: PassCode) {
        this.passcodes.push(passcode);
    }
    retrivePackages() {
        for (let passcode of this.passcodes) {
            this.lockerManager.emptyLocker(passcode);
        }
        this.passcodes = [];
    }
}

//delivery man interface
class DeliveryInterface {
    packages: Array<Package>;
    lockerManager: LockerManager;
    constructor(lockerManager: LockerManager) {
        this.lockerManager = lockerManager;
        this.packages = [];
    }
    addPackage(storedPackage: Package): void {
        this.packages.push(storedPackage);
    }
    storePackages(): { user: User; passcode: PassCode }[] {
        let storedResult: { user: User; passcode: PassCode }[] = [];
        for (let pack of this.packages) {
            try {
                let passcode = this.lockerManager.occupyLocker(pack);
                storedResult.push({ user: pack.user, passcode: passcode })

            }
            catch (err) {
                console.log(err)
            }
        }
        return storedResult;
    }
}

let user: User = new User("Seny", 1);

let lockerMaangerFactory = new LockerManagerFactory();
let lockerManager = lockerMaangerFactory.create(5, 3, 1);
console.log(lockerManager);

let deliverer: DeliveryInterface = new DeliveryInterface(lockerManager);
let userInterface: UserInterface = new UserInterface(user, lockerManager);

deliverer.addPackage(new Package(Size.small, user, 1))
deliverer.addPackage(new Package(Size.small, user, 2))
deliverer.addPackage(new Package(Size.small, user, 3))
deliverer.addPackage(new Package(Size.small, user, 4))

deliverer.addPackage(new Package(Size.medium, user, 1))
deliverer.addPackage(new Package(Size.medium, user, 2))

deliverer.addPackage(new Package(Size.large, user, 1))
deliverer.addPackage(new Package(Size.large, user, 2))

let storeResult = deliverer.storePackages();

console.log(storeResult);
console.log(lockerManager);

for(let res of storeResult){
    if(res.user === userInterface.user){
        userInterface.addPasscode(res.passcode);
    }
}

userInterface.retrivePackages();
console.log(lockerManager);
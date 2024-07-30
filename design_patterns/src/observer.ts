interface ISubject {
    registerObserver(newObserver: IObserver): void;
    removeObserver(observer: IObserver): void;
    notifyObserver(): void;
}

class WeatherData implements ISubject {
    #observers: Array<IObserver>;
    #temperature: number;
    #humidity: number;
    #preasure: number;
    constructor() {
        this.#observers = [];
        this.#temperature = 0;
        this.#humidity = 0;
        this.#preasure = 0;
    }
    registerObserver(newObserver: IObserver): void {
        this.#observers.push(newObserver);
    }
    removeObserver(observer: IObserver): void {
        this.#observers = this.#observers.filter((o) => { o !== observer; });
    }
    notifyObserver(): void {
        this.#observers.forEach((el) => { el.update(this.#temperature, this.#humidity, this.#preasure); })
    }
    setMeasurements(temperature: number, humidity: number, preasure: number) {
        this.#temperature = temperature;
        this.#humidity = humidity;
        this.#preasure = preasure;
        this.measurementsChanged()
    }
    measurementsChanged(): void {
        this.notifyObserver();
    }
}



interface IObserver {
    update(newTemperature: number, newHumidity: number, newPreasure: number): void;
}

interface IDisplayElement {
    display(): void;
}

class CurrentConditionalsDisplay implements IObserver, IDisplayElement {
    temperature: number;
    humidity: number;
    preasure: number;
    #weatherData:ISubject;
    constructor(weatherData:ISubject) {
        this.temperature = 0;
        this.preasure = 0;
        this.humidity = 0;
        this.#weatherData = weatherData;
        this.#weatherData.registerObserver(this);
    }
    update(newTemperature: number, newHumidity: number, newPreasure: number): void {
        this.humidity = newHumidity;
        this.temperature = newTemperature;
        this.preasure = newPreasure;
        this.display();
    }
    display(): void {
        console.log(`Latest results:
            temperature: ${this.temperature},
            humidity: ${this.humidity},
            preassure: ${this.preasure}`);
    }
}

export default class WeatherStation{
    public static main():void{
        let weatherData: WeatherData = new WeatherData();
        let currentConditionalDisplay: CurrentConditionalsDisplay = new CurrentConditionalsDisplay(weatherData);
        weatherData.setMeasurements(80,65,30.4);
        weatherData.setMeasurements(82,70,29.2);
        weatherData.setMeasurements(78,90,29.2);
    }
}


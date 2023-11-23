import { Client } from "../Client";
import { Vehicle } from "../Vehicle";

export class Rental {
    static id: number = 1
    private agreedDailyValue: number
    private returnDay: string = ''
    private status: string = 'Aguardando entrega'

    constructor(
        private client: Client,
        private vehicle: Vehicle,
        private initalDate: string,
        private deliveryDay: string
    ){
        this.agreedDailyValue = vehicle.value
        Rental.id++
    }

    get rentalClient(): Client {
        return this.client
    }

    get rentalVehicle(): Vehicle {
        return this.vehicle
    }

    setStatus(): void {
        this.status = 'Finalizado'
    }
}
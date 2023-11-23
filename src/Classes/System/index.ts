import { Client } from "../Client"
import { Vehicle } from "../Vehicle"

export class System {
    private static instance: System
    private name: string = 'Unidos'
    private vehicles: Vehicle[] = []
    private clients: Client[] = []

    private constructor(){}

    get listVehicles(): Vehicle[] {
        return this.vehicles
    }

    get listClients(): Client[] {
        return this.clients
    }

    public static getInstance(): System {
        if (!System.instance) {
            System.instance = new System()
        }

        return System.instance
    }

    registerVehicle(plate: string, model: string, licenseType: string, dailyValue: number): void {
        const exist: Vehicle | undefined = this.vehicles.find(vehicle => vehicle.plateNumber === plate)

        if(!exist) {
            const newVehicle = new Vehicle(plate, model, licenseType.toUpperCase(), dailyValue)
            this.vehicles.push(newVehicle)
        } else {
            console.log('Veiculo já cadastrado')
        }
    }

    registerClient(name: string, cpf: string, licenseType: string): void {
        const exist: Client | undefined = this.clients.find(client => client.cpfNumber === cpf)

        if(!exist) {
            const newClient = new Client(name, cpf, licenseType.toUpperCase())
            this.clients.push(newClient)
        } else {
            console.log('Cliente já cadastrado')
        }
    }
}
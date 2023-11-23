import { Client } from "../Client"
import { Rental } from "../Rental"
import { Vehicle } from "../Vehicle"

export class System {
    private static instance: System
    private name: string = 'Unidos SME'
    private vehicles: Vehicle[] = [
        new Vehicle('SME1234', 'Celta', 'B', 50),
        new Vehicle('SME0001', 'Corola', 'B', 70),
        new Vehicle('SME1001', 'CB 500X', 'A', 50),
    ]
    private clients: Client[] = [
        new Client('Mariano Junior', '01234567890', 'B'),
        new Client('Silvio Lucas', '09876543210', 'B'),
        new Client('Enei Pereira', '01234567890', 'A'),
    ]
    
    private allRent: Rental[] = []

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

    returnClient(cpf: string): Client | undefined {
        const client: Client | undefined = this.clients.find(client => client.cpfNumber === cpf)

        if (!client) {
            return undefined
        }

        return client
    }

    registerVehicle(plate: string, model: string, licenseType: string, dailyValue: number): void {
        const exist: Vehicle | undefined = this.vehicles.find(vehicle => vehicle.plateNumber === plate)

        if(!exist) {
            const newVehicle = new Vehicle(plate, model, licenseType.toUpperCase(), dailyValue)
            this.vehicles.push(newVehicle)
            console.log('Veiculo Cadastrado com Sucesso!')
        } else {
            console.log('Veiculo já cadastrado')
        }
    }

    registerClient(name: string, cpf: string, licenseType: string): void {
        const exist: Client | undefined = this.clients.find(client => client.cpfNumber === cpf)

        if(!exist) {
            const newClient = new Client(name, cpf, licenseType.toUpperCase())
            this.clients.push(newClient)
            console.log('Cliente Cadastrado com Sucesso!')
        } else {
            console.log('Cliente já cadastrado')
        }
    }

    rentAVehicle(clientCpf: string, vehicleId: number, initalDate: string, deliveryDay: string): void {
        const existClient: Client | undefined = this.clients.find(client => client.cpfNumber === clientCpf)
        const existVehicle: Vehicle | undefined = this.vehicles.find(vehicle => vehicle.idNumber === vehicleId)

        if (existClient && existVehicle) {
            if(!existClient.rentSituation) {
                const newRental = new Rental(existClient, existVehicle, initalDate, deliveryDay)
                this.allRent.push(newRental)
                existClient.setRenting(newRental)
                existVehicle.setRented()
                console.log(`Veiculo ${existVehicle.modelVehicle} foi alugado com sucesso para o cliente ${existClient.clientName}`)
            } else {
                console.log('Cliente já possui um aluguel')
            }
        } else if (!existClient){
            console.log('Cliente não cadastrado')
        } else {
            console.log('Veiculo não cadastrado')
        }
    }

    returnVehicle(clientCpf: string, plateVehicle: string): void {
        const existClient: Client | undefined = this.clients.find(client => client.cpfNumber === clientCpf)
        const existVehicle: Vehicle | undefined = this.vehicles.find(vehicle => vehicle.plateNumber === plateVehicle)
        const existRental: Rental | undefined = this.allRent.find(rental => rental.rentalClient === existClient && rental.rentalVehicle === existVehicle)

        if(existClient && existVehicle && existRental) {
            existClient.setRenting()
            existVehicle.setRented()
            existRental.setStatus()
        }
    }

    listVehiclesLicenseType(licenseType: string): Vehicle[] | undefined {
        const vehicles: Vehicle[] = []

        this.vehicles.map(vehicle => {
            if(vehicle.vehicleLicenseType === licenseType) {
                vehicles.push(vehicle)
            }
        })

        if(vehicles.length > 0) {
            return vehicles
        } else {
            console.log('Não temos veiculos cadastrados para essa categoria.')
        }
    }
}
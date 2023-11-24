import * as readlineSync from 'readline-sync'
import { Vehicle } from "../../models/vehicle";
import { VehicleRepositoryInterface } from "../../infra/database/interfaces/vehicle";
import { formatCurrency } from '../helpers/currency';

export class VehicleController {
    constructor(
        private vehicleRepository: VehicleRepositoryInterface,
    ) { }

    public list(filter: boolean): void {
        const vehicles = this.vehicleRepository.listByFilter(filter)
        console.log(`\n ----------------------------------\n|   Lista de veiculos ${filter ? 'disponiveis' : ' alugados  '}   |\n ----------------------------------\n`)
        vehicles.map(vehicle => {
            console.log(`- ID: ${vehicle.id} | Tipo: ${vehicle.type} | Modelo: ${vehicle.model} | Placa: ${vehicle.plate} | Valor da Diária: ${formatCurrency(vehicle.daily_value)} \n`)
        })
    }

    public register(): void | boolean {
        const type = readlineSync.question('\nDigite a tipo de veiculo: (Carro/Moto) ')
        const model = readlineSync.question('\nDigite o modelo do veiculo: ')
        const plate = readlineSync.question('\nDigite a placa do veiculo: ')
        const vehicleExists = this.vehicleRepository.findByPlate(plate)
        if (vehicleExists) {
            console.log('\nErro: Veiculo já cadastrado no sistema')
            return false
        }
        const daily_value = +readlineSync.question('\nDigite o valor da diaria do aluguel: ')

        const vehicle = new Vehicle(type, model, plate, daily_value)
        this.vehicleRepository.save(vehicle)
        console.log('\nVeiculo cadastrado')
    }
}

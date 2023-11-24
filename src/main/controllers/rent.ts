import * as readlineSync from 'readline-sync'
import { Rent } from "../../models/rent";
import { ClientRepositoryInterface } from "../../infra/database/interfaces/client";
import { VehicleRepositoryInterface } from "../../infra/database/interfaces/vehicle";
import { RentRepositoryInterface } from "../../infra/database/interfaces/rent";
import { formatCurrency } from '../helpers/currency';
import { formatDate } from '../helpers/date';

export class RentController {
    constructor(
        private clientRepository: ClientRepositoryInterface,
        private vehicleRepository: VehicleRepositoryInterface,
        private rentRepository: RentRepositoryInterface,
    ) { }

    public generateInvoice(): void | boolean {
        const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
        const client = this.clientRepository.findByCpf(cpf)
        if (!client) {
            console.log('\nErro: Cliente nao encontrado')
            return false
        }
        const rentals = this.rentRepository.findByClientId(client.id)
        if (!rentals) {
            console.log('\nErro: O cliente nao possui alugueis')
            return false
        }
        console.log('\n-------------------------\n| Lista alugueis do cliente |\n-------------------------\n')
        rentals.map(rent => {
            const vehicle = this.vehicleRepository.findById(rent.vehicle_id)
            console.log(`- ID: ${rent.id} | Cliente: ${client.name} | Veiculo: ${vehicle!.model} | Data de Locacao: ${formatDate(rent.start_date)}\n`)
        })
        const rent_id = +readlineSync.question('\nDigite o id do aluguel: ')
        const rentExists = this.rentRepository.findById(rent_id)
        if (!rentExists) {
            console.log('\nErro: Aluguel nao encontrado')
            return false
        }
        const vehicle = this.vehicleRepository.findById(rentExists.vehicle_id)
        console.log(`\n---------------------------------------\n|              Fatura #${rentExists.id}              |\n---------------------------------------\n`)
        console.log(`ID: ${rentExists.id}\nCliente: ${client.name}\nVeiculo: ${vehicle!.model}\nData de Locacao: ${formatDate(rentExists.start_date)}\nData de Entrega: ${formatDate(rentExists.return_date!)}\nValor total: ${formatCurrency(rentExists.daily_value)}\n`)
    }

    public register(): void | boolean {
        const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
        const clientExists = this.clientRepository.findByCpf(cpf)
        if (!clientExists) {
            console.log('\nErro: Cliente nao encontrado')
            return false
        }
        let rentExists = this.rentRepository.findByClientIdAndStatus(clientExists.id, 'Andamento')
        if (rentExists) {
            console.log('\nErro: Esse cliente já possui um aluguel em andamento!')
            return false
        }
        const license_type = readlineSync.question('\nDigite o tipo de licenca do cliente: (A/B) ')
        const vehiclesExists = this.vehicleRepository.findByLicenseAndAvailable(license_type, true)
        if (!vehiclesExists) {
            console.log('\nErro: licenca invalida, ou não ha veiculos dessa licenca para alugar')
            return false
        }
        console.log('\n-------------------------\n| Lista de veiculos disponiveis |\n-------------------------\n')
        console.log(vehiclesExists)
        const vehicle_id = +readlineSync.question('\nDigite o Id do veiculo: ')
        const vehicle = this.vehicleRepository.findById(vehicle_id)
        if (!vehicle) {
            console.log('\nErro: Veiculo nao encontrado')
            return false
        }
        const daily_value = vehicle.daily_value
        const start_date = readlineSync.question('\nDigite a data de inicio do aluguel: ')

        const rent = new Rent(clientExists.id, vehicle_id, daily_value, new Date(start_date))
        this.rentRepository.save(rent)
        console.log('\nVeiculo alugado com sucesso')
    }

    public return(): void | boolean {
        const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
        const client = this.clientRepository.findByCpf(cpf)
        if (!client) {
            console.log('\nErro: Cliente nao encontrado')
            return false
        }
        const plate = readlineSync.question('\nDigite a placa do veiculo: ')
        const vehicle = this.vehicleRepository.findByPlate(plate)
        if (!vehicle) {
            console.log('\nErro: Veiculo nao encontrado')
            return false
        }

        let rent = this.rentRepository.findByClientIdAndStatus(client.id, 'Andamento')
        rent = Rent.return(rent!, vehicle.type)
        this.rentRepository.update(rent)
        console.log('\nVeiculo devolvido com sucesso')
    }
}

import { ClientRepository } from "../infra/database/repositories/client"
import { RentRepository } from "../infra/database/repositories/rent"
import { VehicleRepository } from "../infra/database/repositories/veihcle"
import { Client } from "../models/client"
import { Rent } from "../models/rent"
import { Vehicle } from "../models/vehicle"
import * as readlineSync from 'readline-sync'

const clientRepository = new ClientRepository()
const vehicleRepository = new VehicleRepository()
const rentRepository = new RentRepository()

function registerClient() {
    const name = readlineSync.question('\nDigite o nome do cliente: ')
    const cpf = readlineSync.question('\nDigite o cpf do cliente, apenas numeros: ')
    const clientExists = clientRepository.findByCpf(cpf)
    if (clientExists) {
        console.log('\nErro: Cliente já cadastrado no sistema')
        return false
    }
    const license_type = readlineSync.question('\nDigite o tipo de carteira do cliente: (A/B) ')

    const client = new Client(name, cpf, license_type)
    clientRepository.save(client)
    console.log('\nCliente cadastrado com sucesso!')
}

function registerVehicle() {
    const type = readlineSync.question('\nDigite a tipo de veiculo: (Carro/Moto) ')
    const model = readlineSync.question('\nDigite o modelo do veiculo: ')
    const plate = readlineSync.question('\nDigite a placa do veiculo: ')
    const vehicleExists = vehicleRepository.findByPlate(plate)
    if (vehicleExists) {
        console.log('\nErro: Veiculo já cadastrado no sistema')
        return false
    }
    const daily_value = +readlineSync.question('\nDigite o valor da diaria do aluguel: ')

    const vehicle = new Vehicle(type, model, plate, daily_value)
    vehicleRepository.save(vehicle)
    console.log('\nVeiculo cadastrado')
}

function rentVehicle() {
    const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
    const clientExists = clientRepository.findByCpf(cpf)
    if (!clientExists) {
        console.log('\nErro: Cliente nao encontrado')
        return false
    }
    let rentExists = rentRepository.findByClientIdAndStatus(clientExists.id, 'Andamento')
    if (!rentExists) {
        console.log('\nErro: Esse cliente já possui um aluguel em andamento!')
        return false
    }
    const license_type = readlineSync.question('\nDigite o tipo de licenca do cliente: (A/B) ')
    const vehiclesExists = vehicleRepository.findByLicenseAndAvailable(license_type, true)
    if (!vehiclesExists) {
        console.log('\nErro: licenca invalida, ou não ha veiculos dessa licenca para alugar')
        return false
    }
    console.log('\n-------------------------\n| Lista de veiculos disponiveis |\n-------------------------\n')
    console.log(vehiclesExists)
    const vehicle_id = +readlineSync.question('\nDigite o Id do veiculo: ')
    const vehicle = vehicleRepository.findById(vehicle_id)
    if (!vehicle) {
        console.log('\nErro: Veiculo nao encontrado')
        return false
    }
    const daily_value = vehicle.daily_value
    const start_date = readlineSync.question('\nDigite a data de inicio do aluguel: ')

    const rent = new Rent(clientExists.id, vehicle_id, daily_value, new Date(start_date))
    rentRepository.save(rent)
    console.log('\nVeiculo alugado com sucesso')
}

function returnVehicle() {
    const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
    const client = clientRepository.findByCpf(cpf)
    if (!client) {
        console.log('\nErro: Cliente nao encontrado')
        return false
    }
    const plate = readlineSync.question('\nDigite a placa do veiculo: ')
    const vehicle = vehicleRepository.findByPlate(plate)
    if (!vehicle) {
        console.log('\nErro: Veiculo nao encontrado')
        return false
    }

    let rent = rentRepository.findByClientIdAndStatus(client.id, 'Andamento')
    rent = Rent.return(rent!, vehicle.type)
    rentRepository.update(rent)
    console.log('\nVeiculo devolvido com sucesso')
}

function listVehicles(filter: boolean) {
    const vehicles = vehicleRepository.listByFilter(filter)
    console.log(`\n---------------------------------\n| Lista de veiculos ${filter ? 'disponiveis' : ' alugados  '} |\n---------------------------------\n`)
    vehicles.map(vehicle => {
        console.log(`- ID: ${vehicle.id} | Tipo: ${vehicle.type} | Modelo: ${vehicle.model} | Placa: ${vehicle.plate} | Valor da Diária: R$ ${vehicle.daily_value},00 \n`)
    })
}

function getInvoice() {
    const cpf = readlineSync.question('\nDigite o CPF do cliente: ')
    const client = clientRepository.findByCpf(cpf)
    if (!client) {
        console.log('\nErro: Cliente nao encontrado')
        return false
    }
    const rentals = rentRepository.findByClientId(client.id)
    console.log('\n-------------------------\n| Lista alugueis do cliente |\n-------------------------\n')
    console.log(rentals)
    const rent_id = +readlineSync.question('\nDigite o id do aluguel: ')
    const rentExists = rentRepository.findById(rent_id)
    if (!rentExists) {
        console.log('\nErro: Aluguel nao encontrado')
        return false
    }
    console.log('\n-------------------------\n| Lista alugueis do cliente |\n-------------------------\n')
    console.log(rentExists)
}

function main(): void {
    let welcome = true
    let message
    let option

    do {
        if (welcome) {
            welcome = false
            message = '\n--------------------------------------\n| Bem Vindo ao sistema da Unidos SME |\n--------------------------------------\n\nPara prosseguir, escolha uma das opcoes abaixo:\n'
        } else {
            message = '\nEscola outra opcao para continuar:\n'
        }

        option = +readlineSync.question(
            message + '\n1 - Cadastrar Cliente\n2 - Cadastrar Veiculo\n3 - Alugar Veiculo\n4 - Devolver Veiculo\n5 - Listar Veiculos Disponiveis\n6 - Listar Veiculos Alugados\n7 - Mostrar Fatura do Cliente\n0 - Sair do sistema\n\n'
        )

        switch (option) {
            case 1:
                registerClient()
                break
            case 2:
                registerVehicle()
                break
            case 3:
                rentVehicle()
                break
            case 4:
                returnVehicle()
                break
            case 5:
                listVehicles(true)
                break
            case 6:
                listVehicles(false)
                break
            case 7:
                getInvoice()
                break
            case 0:
                console.log('\nSaindo do sistema\n')
                break
            default:
                console.log('\nOpcao invalida\n')
        }
    } while (option != 0)
}
main()
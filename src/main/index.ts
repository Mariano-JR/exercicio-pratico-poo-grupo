import { ClientRepository } from "../infra/database/repositories/client"
import { RentRepository } from "../infra/database/repositories/rent"
import { VehicleRepository } from "../infra/database/repositories/vehicle"
import * as readlineSync from 'readline-sync'
import { ClientController } from "./controllers/client"
import { VehicleController } from "./controllers/vehicle"
import { RentController } from "./controllers/rent"

const clientRepository = new ClientRepository()
const vehicleRepository = new VehicleRepository()
const rentRepository = new RentRepository()

const clientController = new ClientController(clientRepository)
const vehicleController = new VehicleController(vehicleRepository)
const rentController = new RentController(
    clientRepository,
    vehicleRepository,
    rentRepository
)

function main(): void {
    let welcome = true
    let message
    let option

    do {
        if (welcome) {
            welcome = false
            message = '\n --------------------------------------------------------------------------------------------------------------\n|                                      Bem Vindo ao sistema da Unidos SME                                      |\n --------------------------------------------------------------------------------------------------------------\n\nPara prosseguir, escolha uma das opcoes abaixo:\n'
        } else {
            message = '\nEscola outra opcao para continuar:\n'
        }

        option = +readlineSync.question(
            message + '\n1 - Cadastrar Cliente\n2 - Listar Clientes\n3 - Cadastrar Veiculo\n4 - Alugar Veiculo\n5 - Devolver Veiculo\n6 - Listar Veiculos Disponiveis\n7 - Listar Veiculos Alugados\n8 - Mostrar Fatura do Cliente\n0 - Sair do sistema\n\n'
        )

        switch (option) {
            case 1:
                clientController.register()
                break
            case 2:
                clientController.list()
                break
            case 3:
                vehicleController.register()
                break
            case 4:
                rentController.register()
                break
            case 5:
                rentController.return()
                break
            case 6:
                vehicleController.list(true)
                break
            case 7:
                vehicleController.list(false)
                break
            case 8:
                rentController.generateInvoice()
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
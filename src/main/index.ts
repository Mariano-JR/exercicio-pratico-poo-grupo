var readlineSync = require('readline-sync')

function registerClient() {
    const plate = readlineSync.question('\nDigite a placa do veiculo: ')
    const model = readlineSync.question('\nDigite o modelo do veiculo: ')
    const license_type = readlineSync.question('\nDigite o tipo de licensa do veiculo: ')
    const daily_value = readlineSync.question('\nDigite o valor da diaria do aluguel: ')
}

function registerVehicle() {
    const name = readlineSync.question('\nDigite o nome do cliente: ')
    const cpf = readlineSync.question('\nDigite o cpf do cliente, apenas números: ')
    const license_type = readlineSync.question('\nDigite o tipo de licensa do cliente: ')
}

function rentVehicle() {
    const cpf = readlineSync.question('Digite o CPF do cliente: ')
    // findByCpf

    const start_date = readlineSync.question('Digite a data de inicio do aluguel: ')
    const delivery_date = readlineSync.question('Digite a data prevista da entrega do veiculo: ')
    const vehicle_id = readlineSync.question('Digite o Id do veiculo: ')
}

function returnVehicle() {
}

function listVehicles(filter: number) {
}

function getInvoice() {
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
            message + '\n1 - Cadastrar Veiculo\n2 - Cadastrar Cliente\n3 - Alugar Veiculo\n4 - Devolver Veiculo\n5 - Listar Veiculos Disponiveis\n6 - Listar Veiculos Alugados\n7 - Mostrar Fatura do Cliente\n0 - Sair do sistema\n\n'
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
                listVehicles(1)
                break
            case 6:
                listVehicles(2)
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
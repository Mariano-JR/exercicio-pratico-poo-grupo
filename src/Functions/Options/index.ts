import { main, rl, system } from "../.."
import { Client } from "../../Classes/Client"
import { registerClient, registerVehicle } from "../Register"

export function options(option: string) {
    if (option !== '1'
        && option !== '2'
        && option !== '3'
        && option !== '4'
        && option !== '5'
        && option !== '6'
        && option !== '7'
        && option !== '0'
    ) {
        console.log('Opção Inválida')
        main()
    }

    if (option === '0') {
        console.log('Obrigado por utilizar o sistema. Até Mais!')
        rl.close()
    } else {
        switch(option) {
            case '1':
                rl.question('Digite a placa do veiculo: ', (plate: string) => {
                    rl.question('Digite o modelo do veiculo: ', (model: string) => {
                        rl.question('Digite o tipo de licensa do veiculo: ', (licenseType: string) => {
                            rl.question('Digite o valor da diaria do aluguel: ', (dailyValue: string) => {
                                registerVehicle(plate, model, licenseType, Number(dailyValue))
                                main()
                            })
                        })
                    })
                }) 
                break
            case '2':
                rl.question('Digite o nome do cliente: ', (name: string) => {
                    rl.question('Digite o cpf do cliente, apenas números: ', (cpf: string) => {
                        rl.question('Digite o tipo de licensa do cliente: ', (licenseType: string) => {
                            registerClient(name, cpf, licenseType)
                            main()
                        })
                    })
                })
                break
            case '3':
                rl.question('Digite o CPF do cliente: ', (cpf: string) => {
                    const client: Client | undefined = system.listClients.find(client => client.cpfNumber === cpf)

                    if(client) {
                        rl.question('Digite a data de inicio do aluguel: ', (initialDate: string) => {
                            rl.question('Digite a data prevista da entrega do veiculo: ', (deliveryDate: string) => {
                                system.listVehiclesLicenseType(client.clientLicenseType)
                                rl.question('Digite o Id do veiculo: ', (vehicleId: string) => {
                                    system.rentAVehicle(cpf, Number(vehicleId), initialDate, deliveryDate)
                                    main()
                                })
                            })
                        })
                    } else {
                        console.log('\nCliente não cadastrado')
                        main()
                    }
                })
                break
            case '4':
                
        }
    }
}
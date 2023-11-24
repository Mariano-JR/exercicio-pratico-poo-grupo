import { ClientRepositoryInterface } from "../../infra/database/interfaces/client";
import { Client } from "../../models/client";
import * as readlineSync from 'readline-sync'

export class ClientController {
    constructor(
        private clientRepository: ClientRepositoryInterface,
    ) { }

    public list(): void | boolean {
        const clients = this.clientRepository.list()
        console.log(`\n---------------------------------------\n|              Lista de Clientes              |\n---------------------------------------\n`)
        clients.map(client => {
            console.log(`- ID: ${client.id} | Nome: ${client.name} | CPF: ${client.cpf} | Licenca: ${client.license_type}\n`)
        })
    }

    public register(): void | boolean {
        const name = readlineSync.question('\nDigite o nome do cliente: ')
        const cpf = readlineSync.question('\nDigite o cpf do cliente, apenas numeros: ')
        const clientExists = this.clientRepository.findByCpf(cpf)
        if (clientExists) {
            console.log('\nErro: Cliente já cadastrado no sistema')
            return false
        }
        const license_type = readlineSync.question('\nDigite o tipo de carteira do cliente: (A/B) ')

        const client = new Client(name, cpf, license_type)
        this.clientRepository.save(client)
        console.log('\nCliente cadastrado com sucesso!')
    }
}

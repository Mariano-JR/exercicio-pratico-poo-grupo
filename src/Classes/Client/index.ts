import { Rental } from "../Rental"

export class Client {
    static id: number = 1
    private clientId = Client.id
    private invoices: Rental[] = []

    constructor(
        private name: string,
        private cpf: string,
        private licenseType: string
    ){
        Client.id++
    }

    get cpfNumber(): string {
        return this.cpf
    }
}
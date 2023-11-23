import { Rental } from "../Rental"

export class Client {
    static id: number = 1
    private clientId = Client.id
    private renting: boolean = false
    private invoices: Rental[] = []

    constructor(
        private name: string,
        private cpf: string,
        private licenseType: string
    ){
        Client.id++
    }

    get idNumber(): number {
        return this.clientId
    }

    get clientName(): string {
        return this.name
    }

    get cpfNumber(): string {
        return this.cpf
    }

    get clientLicenseType(): string {
        return this.licenseType
    }

    get rentSituation(): boolean {
        return this.renting
    }

    setRenting(rental?: Rental): void {
        if(this.renting) {
            this.renting = false
        } else {
            this.renting = true
            if(rental) this.invoices.push(rental)
        }
    }
}
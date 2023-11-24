import { Client } from "../../../models/client"

export interface ClientRepositoryInterface {
    findByCpf(cpf: string): Client | undefined
    save(client: Client): Client
}
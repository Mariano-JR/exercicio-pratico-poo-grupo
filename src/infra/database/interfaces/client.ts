import { Client } from "../../../models/client"

export interface ClientRepositoryInterface {
    list(): Client[]
    findById(id: number): Client | undefined
    save(client: Client): Client
    edit(id: number, updatedClient: Client): Client
    remove(id: number): void
}
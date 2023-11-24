import { clientsTable } from "../tables"
import { Client } from "../../../models/client"
import { ClientRepositoryInterface } from "../interfaces/client"

export class ClientRepository implements ClientRepositoryInterface {
    public list(): Client[] {
        return clientsTable
    }

    public findById(id: number): Client | undefined {
        const client = clientsTable.find((client) => client.id == id)
        return client
    }

    public save(client: Client): Client {
        client.id = clientsTable.length > 0 ? clientsTable[clientsTable.length - 1].id + 1 : 1
        clientsTable.push(client)
        return client
    }

    public edit(id: number, updatedClient: Client): Client {
        const index = clientsTable.findIndex((client) => client.id === id)
        if (index !== -1) {
            clientsTable[index] = { ...clientsTable[index], ...updatedClient }
        }
        return clientsTable[index]
    }

    public remove(id: number): void {
        const index = clientsTable.findIndex((client) => client.id === id)
        clientsTable.splice(index, 1)
    }
}

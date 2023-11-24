import { rentalsTable, vehiclesTable } from "../tables"
import { Rent } from "../../../models/rent"
import { RentRepositoryInterface } from "../interfaces/rent"

export class RentRepository implements RentRepositoryInterface {
    public findById(id: number): Rent | undefined {
        const rent = rentalsTable.find((rent) => rent.id == id)
        return rent
    }

    public findByClientId(client_id: number): Rent[] {
        const rentals = rentalsTable.filter((rent) => rent.client_id == client_id)
        return rentals
    }

    public findByClientIdAndStatus(id: number, status: string): Rent | undefined {
        const rent = rentalsTable.find((rent) => rent.id == id && rent.status == status)
        return rent
    }

    public save(rent: Rent): Rent {
        rent.id = rentalsTable.length > 0 ? rentalsTable[rentalsTable.length - 1].id + 1 : 1
        rentalsTable.push(rent)
        const vehicle = vehiclesTable.find((vehicle) => vehicle.id == rent.vehicle_id)
        vehicle!.available = false
        return rent
    }

    public update(rent: Rent): Rent {
        const index = rentalsTable.findIndex((rent) => rent.id === rent.id)
        if (index !== -1) rentalsTable[index] = { ...rentalsTable[index], ...rent }
        const vehicle = vehiclesTable.find((vehicle) => vehicle.id == rent.vehicle_id)
        vehicle!.available = true
        return rentalsTable[index]
    }
}

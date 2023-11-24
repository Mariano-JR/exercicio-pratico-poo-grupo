import { rentalsTable } from "../tables"
import { Rental } from "../../../models/rental"
import { RentalRepositoryInterface } from "../interfaces/rental"

export class RentalRepository implements RentalRepositoryInterface {
    public list(): Rental[] {
        return rentalsTable
    }

    public findById(id: number): Rental | undefined {
        const rental = rentalsTable.find((rental) => rental.id == id)
        return rental
    }

    public save(rental: Rental): Rental {
        rental.id = rentalsTable.length > 0 ? rentalsTable[rentalsTable.length - 1].id + 1 : 1
        rentalsTable.push(rental)
        return rental
    }

    public edit(id: number, updatedRental: Rental): Rental {
        const index = rentalsTable.findIndex((rental) => rental.id === id)
        if (index !== -1) {
            rentalsTable[index] = { ...rentalsTable[index], ...updatedRental }
        }
        return rentalsTable[index]
    }

    public remove(id: number): void {
        const index = rentalsTable.findIndex((rental) => rental.id === id)
        rentalsTable.splice(index, 1)
    }
}

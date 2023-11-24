import { Rental } from "../../../models/rental"

export interface RentalRepositoryInterface {
    list(): Rental[]
    findById(id: number): Rental | undefined
    save(rental: Rental): Rental
    edit(id: number, updatedRental: Rental): Rental
    remove(id: number): void
}
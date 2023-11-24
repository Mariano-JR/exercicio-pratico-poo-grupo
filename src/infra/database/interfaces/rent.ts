import { Rent } from "../../../models/rent"

export interface RentRepositoryInterface {
    findById(id: number): Rent | undefined
    findByClientId(client_id: number): Rent[]
    findByClientIdAndStatus(id: number, status: string): Rent | undefined
    save(rent: Rent): Rent
    update(rent: Rent): Rent
}
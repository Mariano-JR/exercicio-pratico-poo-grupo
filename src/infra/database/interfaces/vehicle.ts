import { Vehicle } from "../../../models/vehicle"

export interface VehicleRepositoryInterface {
    list(): Vehicle[]
    findById(id: number): Vehicle | undefined
    findByPlate(plate: string): Vehicle | undefined
    save(vehicle: Vehicle): Vehicle
    edit(id: number, updatedVehicle: Vehicle): Vehicle
    remove(id: number): void
}
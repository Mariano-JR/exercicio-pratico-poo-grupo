import { vehiclesTable } from "../tables"
import { Vehicle } from "../../../models/vehicle"
import { VehicleRepositoryInterface } from "../interfaces/vehicle"

export class VehicleRepository implements VehicleRepositoryInterface {
    public list(): Vehicle[] {
        return vehiclesTable
    }

    public findById(id: number): Vehicle | undefined {
        const vehicle = vehiclesTable.find((vehicle) => vehicle.id == id)
        return vehicle
    }

    public findByPlate(plate: string): Vehicle | undefined {
        const vehicle = vehiclesTable.find((vehicle) => vehicle.plate == plate)
        return vehicle
    }

    public save(vehicle: Vehicle): Vehicle {
        vehicle.id = vehiclesTable.length > 0 ? vehiclesTable[vehiclesTable.length - 1].id + 1 : 1
        vehiclesTable.push(vehicle)
        return vehicle
    }

    public edit(id: number, updatedVehicle: Vehicle): Vehicle {
        const index = vehiclesTable.findIndex((vehicle) => vehicle.id === id)
        if (index !== -1) {
            vehiclesTable[index] = { ...vehiclesTable[index], ...updatedVehicle }
        }
        return vehiclesTable[index]
    }

    public remove(id: number): void {
        const index = vehiclesTable.findIndex((vehicle) => vehicle.id === id)
        vehiclesTable.splice(index, 1)
    }
}

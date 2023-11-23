import { system } from "../..";

export function registerVehicle(plate: string, model: string, licenseType: string, dailyValue: number) {
    system.registerVehicle(plate, model, licenseType, dailyValue)
}

export function registerClient(name: string, cpf: string, licenseType: string) {
    system.registerClient(name, cpf, licenseType)
}
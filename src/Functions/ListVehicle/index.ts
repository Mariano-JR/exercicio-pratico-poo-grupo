import { system } from "../..";

export function listVehicleForLicenseType(licenseType: string) {
    console.log(system.listVehiclesLicenseType(licenseType))
}
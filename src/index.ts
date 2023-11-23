import { System } from "./Classes/System";

const system = System.getInstance()

system.registerVehicle('BOQ1234', 'Celta', 'B', 50)
system.registerClient('Mariano', '01234567890', 'B')

console.log(system.listVehicles)
console.log(system.listClients)
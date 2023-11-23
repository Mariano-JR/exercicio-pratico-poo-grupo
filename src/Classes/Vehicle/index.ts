export class Vehicle {
    static id: number = 1
    private vechicleId = Vehicle.id
    private typeVehicle: string = ''
    private rental: boolean = false

    constructor(
        private plate: string,
        private model: string,
        private licenseType: string,
        private dailyValue: number
    ){
        this.howTypeVehicle()
        Vehicle.id++
    }

    get value(): number {
        return this.dailyValue
    }

    get plateNumber(): string {
        return this.plate
    }

    howTypeVehicle(): void {
        switch(this.licenseType) {
            case 'A': 
                this.typeVehicle = 'Moto'
                break
            case 'B': 
                this.typeVehicle = 'Carro'
                break
            case 'C': 
                this.typeVehicle = 'Caminhão'
                break
            case 'D': 
                this.typeVehicle = 'Onibus'
                break
            case 'E': 
                this.typeVehicle = 'Carreta'
                break
        }
    }
}
export class Vehicle {
    static id: number = 1
    private vechicleId = Vehicle.id
    private typeVehicle: string = ''
    private rented: boolean = false

    constructor(
        private plate: string,
        private model: string,
        private licenseType: string,
        private dailyValue: number
    ){
        this.howTypeVehicle()
        Vehicle.id++
    }

    get idNumber(): number {
        return this.vechicleId
    }

    get modelVehicle(): string {
        return this.model
    }

    get vehicleLicenseType(): string {
        return this.licenseType
    }

    get value(): number {
        return this.dailyValue
    }

    get plateNumber(): string {
        return this.plate
    }

    setRented(): void {
        if (this.rented) {
            this.rented = false
        } else {
            this.rented = true
        }
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
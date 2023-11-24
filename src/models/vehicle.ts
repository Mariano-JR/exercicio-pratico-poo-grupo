export class Vehicle {
    public id: number = 0
    public type_id: number
    public model: string
    public plate: string
    public daily_value: number
    public license_type_id: number
    public available: boolean

    constructor(type_id: number, model: string, plate: string, daily_value: number, license_type_id: number, available: boolean) {
        this.type_id = type_id
        this.model = model
        this.plate = plate
        this.daily_value = daily_value
        this.license_type_id = license_type_id
        this.available = available
    }
}
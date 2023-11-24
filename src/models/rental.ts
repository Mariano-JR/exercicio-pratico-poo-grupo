export class Rental {
    public id: number = 0
    public client_id: number
    public vehicle_id: number
    public daily_value: number
    public start_date: Date
    public delivery_date?: Date
    public amount: number = 0
    public status: string

    constructor(client_id: number, vehicle_id: number, daily_value: number, end_date: Date) {
        this.client_id = client_id;
        this.vehicle_id = vehicle_id;
        this.daily_value = daily_value;
        this.start_date = new Date()
        this.status = 'Andamento'
    }
}
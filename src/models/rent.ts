export class Rent {
    public id: number = 0
    public client_id: number
    public vehicle_id: number
    public daily_value: number
    public start_date: Date
    public return_date?: Date
    public amount: string = ''
    public status: string

    constructor(client_id: number, vehicle_id: number, daily_value: number, start_date: Date) {
        this.client_id = client_id
        this.vehicle_id = vehicle_id
        this.daily_value = daily_value
        this.start_date = start_date
        this.status = 'Andamento'
    }

    public static return(rent: Rent, vehicle_type: string): Rent {
        rent.return_date = new Date()
        rent.amount = this.calculateAmount(rent, vehicle_type)
        rent.status = 'Finalizado'
        return rent
    }

    private static calculateAmount(rent: Rent, vehicle_type: string): string {
        const formatOption = {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };

        const addition = vehicle_type == 'Carro' ? 0.10 : 0.05
        const start_date = new Date(rent.start_date).getTime()
        const return_date = new Date(rent.return_date!).getTime()
        const differenceInDays = Math.floor((return_date - start_date) / (1000 * 60 * 60 * 24))
        return (differenceInDays * rent.daily_value * (1 + addition)).toLocaleString('pt-BR', formatOption)
    }
}
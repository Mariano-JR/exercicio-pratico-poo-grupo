export const vehiclesTable = [
    { id: 1, type_id: 2, model: 'Fiat Uno', plate: 'ZZZ111', daily_value: 40, license_type_id: 2, available: true },
    { id: 2, type_id: 2, model: 'Volkswagen Gol', plate: 'YYY222', daily_value: 45, license_type_id: 2, available: true },
    { id: 3, type_id: 1, model: 'Harley-Davidson Sportster', plate: 'XXX333', daily_value: 70, license_type_id: 1, available: true },
    { id: 4, type_id: 2, model: 'Chevrolet Onix', plate: 'WWW444', daily_value: 55, license_type_id: 2, available: true },
    { id: 5, type_id: 1, model: 'Suzuki GSX-R750', plate: 'VVV555', daily_value: 65, license_type_id: 1, available: true },
];

export const clientsTable = [
    { id: 1, name: 'Maria Silva', cpf: '111.222.333-44', license_type_id: 2 },
    { id: 2, name: 'Carlos Oliveira', cpf: '555.666.777-88', license_type_id: 2 },
    { id: 3, name: 'Fernanda Santos', cpf: '999.888.777-66', license_type_id: 1 },
    { id: 4, name: 'Ricardo Souza', cpf: '444.333.222-11', license_type_id: 2 },
    { id: 5, name: 'Felipe Santos', cpf: '777.888.999-11', license_type_id: 1 },
];

export const rentalsTable = [
    { id: 1, client_id: 1, vehicle_id: 1, daily_value: 45, start_date: new Date('2023-12-05T00:00:00'), delivery_date: undefined, amount: 0, status: 'Andamento' },
    { id: 2, client_id: 2, vehicle_id: 2, daily_value: 55, start_date: new Date('2023-12-08T00:00:00'), delivery_date: undefined, amount: 0, status: 'Andamento' },
    { id: 3, client_id: 3, vehicle_id: 3, daily_value: 50, start_date: new Date('2023-12-12T00:00:00'), delivery_date: new Date('2023-12-18T00:00:00'), amount: 300, status: 'Finalizado' },
    { id: 4, client_id: 4, vehicle_id: 4, daily_value: 65, start_date: new Date('2023-12-16T00:00:00'), delivery_date: undefined, amount: 0, status: 'Andamento' },
    { id: 5, client_id: 5, vehicle_id: 5, daily_value: 60, start_date: new Date('2023-12-20T00:00:00'), delivery_date: new Date('2023-12-26T00:00:00'), amount: 360, status: 'Finalizado' },
];

export const vehicleTypesTable = [
    { id: 1, type: 'Moto' },
    { id: 2, type: 'Carro' },
];

export const licenseTypesTable = [
    { id: 1, type: 'A' },
    { id: 2, type: 'B' },
];



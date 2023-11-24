export class Client {
    public id: number = 0
    public name: string
    public cpf: string
    public license_type_id: number

    constructor(name: string, cpf: string, license_type_id: number) {
        this.name = name;
        this.cpf = cpf;
        this.license_type_id = license_type_id;
    }
}
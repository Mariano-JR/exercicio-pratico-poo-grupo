import { System } from "./Classes/System";
import { options } from "./Functions/Options";

const readline = require('node:readline')
export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export const system = System.getInstance()

export function main(): void {

    console.log(`

        ******************************************
        *** Bem Vindo ao sistema da Unidos SME ***
        ******************************************

        Para dar continuidade ao sistema, escolha
        uma das opcoes abaixo:

        1 - Cadastrar Veiculo;
        2 - Cadastrar Cliente;
        3 - Alugar Veiculo;
        4 - Devolver Veiculo;
        5 - Listar Veiculos Disponiveis;
        6 - Listar Veiculos Alugados;
        7 - Mostrar Fatura do Cliente;
        0 - Sair do Sistema

    `)
    rl.question(' ', options)
}

main()
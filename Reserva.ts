import prompt from 'prompt-sync';
import { Quadra } from './Quadra';

const teclado = prompt();

const quadra = new Quadra();

export class Reserva {
  nome: string;
  quadra: string;
  dia: string;
  mes: string;
  horario: string;
  reservas: Array<string>;

  constructor() {
    this.nome = '';
    this.quadra = '';
    this.dia = '';
    this.mes = '';
    this.horario = '';
    this.reservas = [];
  }

  reservarQuadra() {
    this.nome = teclado('Nome: ');
    if (this.nome !== '') {
      console.log('Nome inválido. Tente novamente.');
      this.reservarQuadra();
    }
    this.quadra = teclado('Quadra: ');
    this.dia = teclado('Dia (ex: 01): ');
    this.mes = teclado('Mes (ex: 01): ');
    this.horario = teclado('Horário (ex: 14): ');
    this.reservas.push(`\n\nCliente: ${this.nome}\nQuadra: ${this.quadra}\nDia: ${this.dia}/${this.mes}\nHorário: ${this.horario}:00 - ${(+this.horario) + 1}:00`);
    console.log('Reserva realizada com sucesso!');
  }

  mostrarReservas() {
    console.log(`Reservas: ${this.reservas}`);
  }
}
import prompt from 'prompt-sync';
import { Clube } from './Clube';

const teclado = prompt();

const clube = new Clube();

export class Quadra {
  nome: string;
  esporte: string;
  horarios: Array<string>;

  constructor() {
    this.nome = '';
    this.esporte = '';
    this.horarios = [];
  }

  cadastroQuadras() {
    let continua = 's';
    const nome = teclado('Nome da quadra: ');
    if (clube.quadras.includes(this)) {
      console.log('Quadra já existente. Tente novamente.');
      this.cadastroQuadras();
    }
    this.nome = nome;
    const esporte = teclado('Esporte da quadra: ');
    this.esporte = esporte;
    while (continua === 's') {
      console.log('Lembre-se, a duração de cada horário é de 1 hora.');
      let horario = +teclado('Horário (ex: 14): ');
      for (let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i] === `\n${horario}:00 - ${(horario + 1)}:00`) {
          console.log('Horário indisponível. Tente novamente.');
          horario = +teclado('Horário (ex: 14): ');
          i = -1;
        }
      }
      this.horarios.push(`\n${horario}:00 - ${horario + 1}:00`);
      continua = teclado('Deseja adicionar mais um horário (S/N)? ').toLowerCase();
    }
    console.log('\nQuadra cadastrada com sucesso!\n');

    clube.quadras.push(this);
  }
}
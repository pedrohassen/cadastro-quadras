import prompt from 'prompt-sync';

const teclado = prompt();

export class Quadra {
  nome: string;
  esporte: string;
  dias: Array<number>;
  meses: Array<number>;
  anos: Array<number>;
  horarios: Array<Date>;

  constructor() {
    this.nome = '';
    this.esporte = '';
    this.dias = Array.from({ length: 31 }, (_, i) => i + 1); // De 1 a 31
    this.meses = Array.from({ length: 12 }, (_, i) => i); // De 0 (Janeiro) a 11 (Dezembro)
    this.anos = [new Date().getFullYear()]; // Ano atual
    this.horarios = [];
  }

  cadastroQuadras() {
    this.nome = teclado('Nome: ');
    this.esporte = teclado('Esporte: ');
    console.log(`\nRegistre os horários disponíveis para esta quadra.\n`);
    this.gerarHorarios();
  }

  gerarHorarios() {
    for (let ano of this.anos) {
      for (let mes of this.meses) {
        const diasNomes = new Date(ano, mes + 1, 0).getDate(); // Dias no mês

        for (let dia of this.dias) {
          if (dia > diasNomes) continue; // Ignorar dias inválidos

          for (let hora = 8; hora <= 20; hora++) { // Horário de 8:00 às 21:00
            const horario = new Date(ano, mes, dia, hora, 0, 0, 0);
            this.horarios.push(horario);
          }
        }
      }
    }
  }

  formatarData(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
  }

  formatarDataParaLista(data: Date): string {
    return this.formatarData(data);
  }
}

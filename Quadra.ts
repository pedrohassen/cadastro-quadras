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

    console.log('\n=== ESCOLHA O ESPORTE ===\n');
    console.log('1 - Futsal');
    console.log('2 - Basquete');
    console.log('3 - Vôlei');
    console.log('4 - Tênis');
    console.log('5 - Padel');
    console.log('6 - Poliesportiva\n');

    const opcao: number = +teclado('Escolha uma opção: ');

    switch (opcao) {
      case 1:
        this.esporte = 'Futsal';
        break;

      case 2:
        this.esporte = 'Basquete';
        break;
      
      case 3:
        this.esporte = 'Vôlei';
        break;
      
      case 4:
        this.esporte = 'Tênis';
        break;

      case 5:
        this.esporte = 'Padel';
        break;

      case 6:
        this.esporte = 'Poliesportiva';
        break;

      default:
        console.log('\nOpção inválida.\n');
        break;
    }

    const horaInicial = +teclado('Horário de abertura da quadra: ');
    const horaFinal = +teclado('Horário de fechamento da quadra: ');

    this.gerarHorarios(horaInicial, horaFinal);

    console.log(`\nQuadra registrada com sucesso.\n`);
  }

  gerarHorarios(horarioInicial: number, horarioFinal: number) {
    for (let ano of this.anos) {
      for (let mes of this.meses) {
        const diasMes = new Date(ano, mes + 1, 0).getDate(); // Dias no mês

        for (let dia of this.dias) {
          if (dia > diasMes) continue; // Ignorar dias inválidos

          for (let hora = horarioInicial; hora <= horarioFinal; hora++) { // Horário de X a Y
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

import prompt from 'prompt-sync';
import { Clube } from './Clube';

const teclado = prompt();

const clube: Clube = new Clube();

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
    const quadraNome = teclado('Nome da quadra: ');

    this.nome = quadraNome;

    if (this.nome === '') {
      console.log('\nNome inválido.\n');
      return;
    }

    // Verifica se o nome da quadra já existe antes de criar uma nova quadra
    if (clube.quadraExiste(quadraNome)) {
      console.log('\nJá existe uma quadra com este nome. Tente novamente.');
      return;
    }

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

    const horaInicial = +teclado('Horário de abertura da quadra (6 até 22): ');

    if (horaInicial < 6) {
      console.log('\nO clube abre às 6h.');
      return;
    }

    if (horaInicial > 22) {
      console.log('\nO clube fecha às 23h.');
      return;
    }

    const horaFinal = +teclado('Horário de fechamento da quadra (7 até 23): ');

    if (horaFinal < 7) {
      console.log('\nO clube abre até 6h.');
      return;
    }

    if (horaFinal > 23) {
      console.log('\nO clube fecha às 23h.');
      return;
    }

    this.gerarHorarios(horaInicial, horaFinal);

    console.log(`\nQuadra registrada com sucesso.`);

    clube.armazenaQuadra(this);
  }

  gerarHorarios(horarioInicial: number, horarioFinal: number) {
    const hoje = new Date();
    const dataLimite = new Date();
    dataLimite.setMonth(hoje.getMonth() + 2); // 2 meses a partir de hoje

    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    for (let ano of this.anos) {
      for (let mes of this.meses) {
        const diasMes = new Date(ano, mes + 1, 0).getDate(); // Dias no mês

        for (let dia of this.dias) {
          if (dia > diasMes) continue; // Ignorar dias inválidos

          // Ignorar dias passados e também ignorar se o dia estiver além da data limite
          if ((ano === anoAtual && mes === mesAtual && dia < diaAtual) || new Date(ano, mes, dia) > dataLimite) {
            continue;
          }

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
    return `${dia}/${mes}/${ano} - Horário: ${hora}:${minuto}`;
  }

  formatarDataParaLista(data: Date): string {
    return this.formatarData(data);
  }

  removerHorariosPassados() {
    const hoje = new Date();

    this.horarios = this.horarios.filter(horario => horario >= hoje);
  }
}

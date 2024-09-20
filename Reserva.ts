import { Clube } from './Clube';
import prompt from 'prompt-sync';

const teclado = prompt();

const clube: Clube = new Clube();

export class Reserva {
  clube: Clube;
  reservas: Array<{ quadra: string, esporte: string, horario: Date, usuario: string }>;

  constructor(clube: Clube) {
    this.clube = clube;
    this.reservas = [];
  }

  verificaReservas(): boolean {
    return this.reservas.length > 0;
  }

  reservarQuadra() {
    console.log('=== QUADRAS DISPONÍVEIS ===');
    let indice: number;
    let nomeQuadra: string;
    let nomeEsporte: string
    
    clube.quadras.forEach((quadra, index) => {
      console.log(`${index + 1}. Nome: ${quadra.nome} - Esporte: ${quadra.esporte}`);
    });
    const nomeQuadra = +teclado('Escolha a quadra a reservar: ');

    const horarioStr = teclado('Escolha o dia da sua reserva(dd/mm/aaaa): ');
    const [dia, mes, ano, hora, minuto] = horarioStr.split(/[/ :]/).map(Number);
    const horario = new Date(ano, mes - 1, dia, hora, minuto);
    const username = teclado('Digite seu nome de usuário: ');

    const quadra = this.clube.buscarQuadraPorNomeEsporte(nomeQuadra, esporte);

    if (!quadra) {
      console.log('Quadra não encontrada.');
      return;
    }

    if (!quadra.horarios.some(h => h.getTime() === horario.getTime())) {
      console.log('Horário indisponível.');
      return;
    }

    this.reservas.push({ quadra: nomeQuadra, esporte: esporte, horario: horario, usuario: username });
    console.log('Reserva realizada com sucesso.');
  }

  mostrarReservas(usuario?: string) {
    console.log('Reservas:');
    this.reservas
      .filter(reserva => !usuario || reserva.usuario === usuario)
      .forEach((reserva, index) => {
        console.log(`${index + 1}. Quadra: ${reserva.quadra}, Esporte: ${reserva.esporte}, Horário: ${reserva.horario.toLocaleDateString('pt-BR')} ${reserva.horario.toLocaleTimeString('pt-BR')}, Usuário: ${reserva.usuario}`);
      });
  }

  cancelarReserva() {
    const username = teclado('Digite seu nome de usuário: ');
    const idReserva = +teclado('Digite o ID da reserva: ');

    if (isNaN(idReserva) || idReserva < 1 || idReserva > this.reservas.length) {
      console.log('ID de reserva inválido.');
      return;
    }

    const reserva = this.reservas[idReserva - 1];
    if (reserva.usuario !== username) {
      console.log('Você não pode cancelar uma reserva que não é sua.');
      return;
    }

    this.reservas.splice(idReserva - 1, 1);
    console.log('Reserva cancelada com sucesso.');
  }
}

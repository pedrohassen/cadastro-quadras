import { Clube } from './Clube';
import prompt from 'prompt-sync';

const teclado = prompt();

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
    const nomeQuadra = teclado('Digite o nome da quadra: ');
    const esporte = teclado('Digite o esporte: ');
    const horarioStr = teclado('Digite o horário (dd/mm/aaaa hh:mm): ');
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

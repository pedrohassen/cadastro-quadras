import { Quadra } from './Quadra';

export class Clube {
  quadras: Array<Quadra>;
  reservas: Array<{ quadra: Quadra; usuario: string; horario: Date }>;

  constructor() {
    this.quadras = [];
    this.reservas = [];
  }

  armazenaQuadra(quadra: Quadra) {
    this.quadras.push(quadra);
  }

  verificaQuadras(): boolean {
    return this.quadras.length > 0;
  }

  quadraExiste(nome: string): boolean {
    return this.quadras.some(quadra => quadra.nome === nome);
  }

  mostraQuadrasDisponiveis(esporte?: string) {
    // Remover horários passados antes de mostrar as quadras disponíveis
    this.quadras.forEach(quadra => quadra.removerHorariosPassados());

    console.log('Quadras disponíveis:');
    this.quadras
      .filter(quadra => !esporte || quadra.esporte === esporte)
      .forEach((quadra, index) => {
        console.log(`${index + 1}. Nome: ${quadra.nome}, Esporte: ${quadra.esporte}`);
      });
  }

  reservarQuadra(teclado: any): { registro: string } | null {
    console.log('\n=== RESERVA DE QUADRA ===\n');
    console.log('Lembrete: O clube abre as 6h e fecha as 23h.\n');

    const usuario = teclado('Digite seu nome: ');

    console.log('\nAviso: Reservas apenas para o próximo 14 dias.\n');

    // Mostra as quadras disponíveis
    console.log('Quadras disponíveis:\n');
    this.quadras.forEach((quadra, index) => {
      console.log(`${index + 1}. Nome: ${quadra.nome}, Esporte: ${quadra.esporte}`);
    });

    const quadraIndex = +teclado('Escolha o número da quadra que deseja reservar: ') - 1;
    const quadra = this.quadras[quadraIndex];

    if (!quadra) {
      console.log('Quadra não encontrada.');
      return null;
    }

    // Filtra os horários disponíveis para os próximos 14 dias
    const hoje = new Date();
    const duasSemanasDepois = new Date(hoje.getTime() + (14 * 24 * 60 * 60 * 1000));
    const horariosDisponiveis = quadra.horarios.filter(horario => horario >= hoje && horario <= duasSemanasDepois);

    // Gera menu de dias disponíveis
    const diasDisponiveis = [...new Set(horariosDisponiveis.map(h => h.toLocaleDateString('pt-BR')))];
    console.log('Dias disponíveis para reserva:');
    diasDisponiveis.forEach((dia, index) => {
      console.log(`${index + 1}. ${dia}`);
    });

    console.log('\n');

    const diaIndex = +teclado('Escolha o número do dia que deseja reservar: ') - 1;
    const diaEscolhido = diasDisponiveis[diaIndex];

    if (!diaEscolhido) {
      console.log('\nDia indisponível.');
      return null;
    }

    // Filtra os horários disponíveis para o dia escolhido
    const horariosDoDia = horariosDisponiveis.filter(h => h.toLocaleDateString('pt-BR') === diaEscolhido);
    console.log('\nHorários disponíveis para o dia escolhido:\n');
    horariosDoDia.forEach((horario, index) => {
      console.log(`${index + 1}. ${horario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`);
    });

    const horarioIndex = +teclado('Escolha o número do horário que deseja reservar: ') - 1;
    const horarioEscolhido = horariosDoDia[horarioIndex];

    if (!horarioEscolhido) {
      console.log('\nHorário indisponível.');
      return null;
    }

    // Adiciona a reserva
    this.reservas.push({ quadra, usuario, horario: horarioEscolhido });
    // Remove o horário reservado
    quadra.horarios = quadra.horarios.filter(h => h.getTime() !== horarioEscolhido.getTime());

    const opcao = teclado('Deseja reservar outro horário? (s/n): ');

    if (opcao.toLowerCase() === 's') {
      console.log({ registro: `${usuario}. Quadra: ${quadra.nome}, Esporte: ${quadra.esporte}, Data: ${diaEscolhido}, Horário: ${horarioEscolhido.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` });
      return this.reservarQuadra(teclado);
    }

    return { registro: `${usuario}. Quadra: ${quadra.nome}, Esporte: ${quadra.esporte}, Data: ${diaEscolhido}, Horário: ${horarioEscolhido.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` };
  }

  listarReservas(): void {
    if (this.reservas.length === 0) {
      console.log('Nenhuma reserva encontrada.');
      return;
    }

    console.log('Reservas atuais:\n');
    
    this.reservas.forEach((reserva, index) => {
      const dataFormatada = reserva.horario.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      console.log(`${index + 1}. Usuário: ${reserva.usuario}, Quadra: ${reserva.quadra.nome}, Esporte: ${reserva.quadra.esporte}, Data: ${dataFormatada}`);
    });
  }

  cancelarReserva(teclado: any): boolean {
    const usuario = teclado('Digite seu nome: ');

    // Filtra as reservas do usuário
    const reservasUsuario = this.reservas.filter(r => r.usuario === usuario);

    if (reservasUsuario.length === 0) {
      console.log('\nNenhuma reserva encontrada para este usuário.');
      return false;
    }

    // Gera menu com as reservas do usuário
    console.log('\nReservas do usuário:');
    reservasUsuario.forEach((reserva, index) => {
      console.log(`${index + 1}. Quadra: ${reserva.quadra.nome}, Horário: ${reserva.horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    });

    const reservaIndex = +teclado('Escolha o número da reserva que deseja cancelar: ') - 1;

    if (reservaIndex < 0 || reservaIndex >= reservasUsuario.length) {
      console.log('\nReserva inválida.');
      return false;
    }

    // Recupera a reserva escolhida
    const reserva = reservasUsuario[reservaIndex];

    // Adiciona o horário de volta à quadra
    reserva.quadra.horarios.push(reserva.horario);
    // Organiza os horários em ordem crescente
    reserva.quadra.horarios.sort((a, b) => a.getTime() - b.getTime()); // Organiza os horários

    // Remove a reserva
    this.reservas.splice(this.reservas.indexOf(reserva), 1);
    return true;
  }
}

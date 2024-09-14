import prompt from 'prompt-sync';
import { Quadra } from './Quadra';
import { Reserva } from './Reserva';
import { Clube } from './Clube';

const teclado = prompt();

const clube = new Clube();
const reserva = new Reserva(clube);

while (true) {
  console.log('\n====== BEM VINDO ======\n');
  console.log('1 - Cadastrar nova quadra');
  console.log('2 - Listar quadras disponíveis');
  console.log('3 - Reservar quadra');
  console.log('4 - Listar reservas');
  console.log('5 - Cancelar reserva');
  console.log('0 - Sair\n');

  const opcao: number = +teclado('Escolha uma opção: ');

  if (opcao === 0) {
    break;
  }

  switch (opcao) {
    case 1:
      console.log('\nCadastrando nova quadra...\n');

      const novaQuadra = new Quadra(); // Cria uma nova instância de Quadra
      novaQuadra.cadastroQuadras(); // Chama o método para cadastrar a quadra
      clube.armazenaQuadra(novaQuadra); // Armazena a quadra no clube
      break;

    case 2:
      console.log('\nListando quadras disponíveis...\n');

      if (!clube.verificaQuadras()) {
        console.log('Nenhuma quadra cadastrada.');
        break;
      }

      const filtroEsporte = teclado('Deseja filtrar por esporte? (s/n): ').toLowerCase();

      if (filtroEsporte === 's') {
        const esporte = teclado('Digite o esporte: ');
        clube.mostraQuadrasDisponiveis(esporte); // Chama o método para listar todas as quadras filtradas por esporte
      } else {
        clube.mostraQuadrasDisponiveis(); // Chama o método para listar todas as quadras
      }
      break;

    case 3:
      console.log('\nReservando quadra...\n');

      if (!clube.verificaQuadras()) {
        console.log('Nenhuma quadra cadastrada para reserva.');
        break;
      }
      reserva.reservarQuadra(); // Chama o método para reservar uma quadra
      break;

    case 4:
      console.log('\nListando reservas...\n');

      if (!reserva.verificaReservas()) {
        console.log('Nenhuma reserva encontrada.');
        break;
      }

      const filtroUsuario = teclado('Deseja filtrar por usuário? (s/n): ').toLowerCase();
      if (filtroUsuario === 's') {
        const usuario = teclado('Digite o nome do usuário: ');
        reserva.mostrarReservas(usuario); // Chama o método para listar reservas filtradas por usuário
      } else {
        reserva.mostrarReservas(); // Chama o método para listar todas as reservas
      }
      break;

    case 5:
      console.log('\nCancelando reserva...\n');
      if (!reserva.verificaReservas()) {
        console.log('Nenhuma reserva cadastrada para cancelar.');
        break;
      }
      reserva.cancelarReserva(); // Chama o método para cancelar uma reserva
      break;

    default:
      console.log('\nOpção inválida.\n');
      break;
  }
}

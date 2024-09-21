import prompt from 'prompt-sync';
import { Quadra } from './Quadra';
import { Clube } from './Clube';

const teclado = prompt();
const clube = new Clube();

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
      const novaQuadra = new Quadra();
      novaQuadra.cadastroQuadras();
      if (novaQuadra.esporte === '') {
        break;
      }
      clube.armazenaQuadra(novaQuadra);
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
        clube.mostraQuadrasDisponiveis(esporte);
      } else {
        clube.mostraQuadrasDisponiveis();
      }
      break;

    case 3:
      console.log('\nReservando quadra...');
      if (!clube.verificaQuadras()) {
        console.log('Nenhuma quadra cadastrada para reserva.');
        break;
      }
      // Chamar método para reservar uma quadra, que deve ser implementado na classe Clube
      const quadraReservada = clube.reservarQuadra(teclado);
      if (quadraReservada) {
        console.log('Reserva feita com sucesso:', quadraReservada);
      } else {
        console.log('Falha ao reservar a quadra.');
      }
      break;

    case 4:
      console.log('\nListando reservas...\n');
      clube.listarReservas();
      break;

    case 5:
      console.log('\nCancelando reserva...\n');
      const sucesso = clube.cancelarReserva(teclado);
      if (sucesso) {
        console.log('Reserva cancelada com sucesso.');
      } else {
        console.log('Falha ao cancelar a reserva.');
      }
      break;

    default:
      console.log('\nOpção inválida.\n');
      break;
  }
}

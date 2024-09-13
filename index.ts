import prompt from 'prompt-sync';
import { Quadra } from './Quadra';
import { Reserva } from './Reserva';
import { Clube } from './Clube';

const teclado = prompt();

const quadra = new Quadra();
const clube = new Clube();
const reserva = new Reserva();

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
      quadra.cadastroQuadras();
      break;

    case 2:
      console.log('\nListando quadras disponíveis...\n');
      clube.mostrarQuadras();
      break;

    case 3:
      console.log('\nReservando quadra...\n');
      reserva.reservarQuadra();
      break;
      
      case 4:
      console.log('\nListando reservas...\n');
      reserva.mostrarReservas();
      break;

    case 5:
      console.log('\nCancelando reserva...\n');
      break;

    default:
      console.log('\nOpção inválida.\n');
      break;
  }
}
import { Quadra } from './Quadra';
import { daysToMilliseconds } from './utils/Util';

export class Clube {
  quadras: Array<Quadra>;

  constructor() {
    this.quadras = [];
  }

  armazenaQuadra(quadra: Quadra) {
    this.quadras.push(quadra);
  }

  verificaQuadras(): boolean {
    return this.quadras.length > 0;
  }

  mostrarQuadras() {
    console.log('Quadras cadastradas:');
    this.quadras.forEach((quadra, index) => {
      console.log(`${index + 1}. Nome: ${quadra.nome}, Esporte: ${quadra.esporte}`);
      quadra.horarios.forEach(horario => {
        console.log(`  - Horário: ${quadra.formatarDataParaLista(horario)}`);
      });
    });
  }

  mostraQuadrasDisponiveis(esporte?: string) {
    const duasSemanas = daysToMilliseconds(14);
    // const duasSemanas = 14 * 24 * 60 * 60 * 1000;
    const hoje = new Date();
    const duasSemanasDepois = new Date(hoje.getTime() + duasSemanas);

    console.log('Quadras disponíveis:');
    this.quadras
      .filter(quadra => !esporte || quadra.esporte === esporte)
      .forEach((quadra, index) => {
        console.log(`${index + 1}. Nome: ${quadra.nome}, Esporte: ${quadra.esporte}`);
        quadra.horarios
          .filter(horario => horario >= hoje && horario <= duasSemanasDepois)
          .forEach(horario => {
            console.log(`  - Horário: ${quadra.formatarDataParaLista(horario)}`);
          });
      });
  }

  buscarQuadraPorNomeEsporte(nome: string, esporte: string): Quadra | undefined {
    return this.quadras.find(quadra => quadra.nome === nome && quadra.esporte === esporte);
  }
}

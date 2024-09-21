import { writeFileSync, existsSync, readFileSync } from 'fs';
import { Quadra } from './Quadra';

export class DataManager {
  static saveData(quadras: Quadra[], reservas: Array<{ quadra: Quadra; usuario: string; horario: Date }>) {
    try {
      // Salvando quadras no arquivo quadras.txt
      const quadrasData = quadras.map(quadra => ({
        nome: quadra.nome,
        esporte: quadra.esporte,
        horarios: quadra.horarios.map(horario => horario.toISOString()) // Salvar as datas como strings
      }));
      writeFileSync('quadras.txt', JSON.stringify(quadrasData, null, 2));

      // Salvando reservas no arquivo reservas.txt
      const reservasData = reservas.map(reserva => ({
        quadra: reserva.quadra.nome, // Podemos salvar o nome da quadra
        usuario: reserva.usuario,
        horario: reserva.horario.toISOString()
      }));
      writeFileSync('reservas.txt', JSON.stringify(reservasData, null, 2));

      console.log('Dados salvos com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  }

  static loadData(): { quadras: Quadra[], reservas: Array<{ quadra: Quadra; usuario: string; horario: Date }> } {
    const quadras: Quadra[] = [];
    const reservas: Array<{ quadra: Quadra; usuario: string; horario: Date }> = [];

    try {
      // Carregando dados de quadras
      if (existsSync('quadras.txt')) {
        const quadrasContent = readFileSync('quadras.txt', 'utf-8');
        const quadrasData = JSON.parse(quadrasContent);

        for (const quadraData of quadrasData) {
          const novaQuadra = new Quadra();
          novaQuadra.nome = quadraData.nome;
          novaQuadra.esporte = quadraData.esporte;
          novaQuadra.horarios = quadraData.horarios.map((h: string) => new Date(h)); // Convertendo de string para Date
          quadras.push(novaQuadra);
        }
      }

      // Carregando dados de reservas
      if (existsSync('reservas.txt')) {
        const reservasContent = readFileSync('reservas.txt', 'utf-8');
        const reservasData = JSON.parse(reservasContent);

        for (const reservaData of reservasData) {
          const quadra = quadras.find(q => q.nome === reservaData.quadra);
          if (quadra) {
            reservas.push({
              quadra,
              usuario: reservaData.usuario,
              horario: new Date(reservaData.horario)
            });
          }
        }
      }

      console.log('Dados carregados com sucesso.');
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }

    return { quadras, reservas };
  }
}

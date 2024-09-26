import * as fs from 'fs';
import { Quadra } from '../Quadra';
import { DataManager } from '../Data';

jest.mock('fs');

describe('DataManager', () => {
  it('should save data correctly', () => {
    const quadra = new Quadra();
    quadra.nome = 'Quadra 1';
    quadra.esporte = 'Futebol';
    quadra.horarios = [new Date()];

    const reservas = [
      { quadra, usuario: 'Pedro', horario: new Date() }
    ];

    DataManager.saveData([quadra], reservas);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'quadras.txt',
      expect.stringContaining('"nome": "Quadra 1"')
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'reservas.txt',
      expect.stringContaining('"usuario": "Pedro"')
    );
  });

  it('should load data correctly', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock)
      .mockReturnValueOnce(JSON.stringify([{ nome: 'Quadra 1', esporte: 'Futebol', horarios: [new Date().toISOString()] }]))
      .mockReturnValueOnce(JSON.stringify([{ quadra: 'Quadra 1', usuario: 'Pedro', horario: new Date().toISOString() }]));

    const { quadras, reservas } = DataManager.loadData();

    expect(quadras.length).toBe(1);
    expect(quadras[0].nome).toBe('Quadra 1');
    expect(reservas.length).toBe(1);
    expect(reservas[0].usuario).toBe('Pedro');
  });
});

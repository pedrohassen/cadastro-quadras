import { Clube } from "../Clube";
import { Quadra } from "../Quadra";
import { daysToMilliseconds, formatarData } from "../utils/Util";

describe('Clube', () => {
  let clube: Clube;
  let tecladoMock: jest.Mock;

  beforeEach(() => {
    clube = new Clube();
    tecladoMock = jest.fn();
  });

  it('should store and verify courts', () => {
    const quadra = new Quadra();
    quadra.nome = 'Quadra 1';
    clube.armazenaQuadra(quadra);
    
    expect(clube.verificaQuadras()).toBe(true);
    expect(clube.quadraExiste('Quadra 1')).toBe(true);
    expect(clube.quadraExiste('Quadra 2')).toBe(false);
  });

  it('should filter available courts based on sport', () => {
    const quadra1 = new Quadra();
    quadra1.nome = 'Quadra 1';
    quadra1.esporte = 'Futebol';
    
    const quadra2 = new Quadra();
    quadra2.nome = 'Quadra 2';
    quadra2.esporte = 'Basquete';
    
    clube.armazenaQuadra(quadra1);
    clube.armazenaQuadra(quadra2);

    // Mock console.log to capture output
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    clube.mostraQuadrasDisponiveis('Futebol');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Nome: Quadra 1, Esporte: Futebol'));
    expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining('Nome: Quadra 2, Esporte: Basquete'));

    logSpy.mockRestore();
  });

  it('should allow creating a sports court successfully', () => {
    const quadra = new Quadra();
    quadra.nome = 'Quadra 1';
    quadra.esporte = 'Futebol';
    clube.armazenaQuadra(quadra);

    expect(clube.quadraExiste('Quadra 1')).toBe(true);
  });

  it('should allow reserving a court with valid inputs', () => {
    const quadra = new Quadra();
    quadra.nome = 'Quadra 1';
    quadra.esporte = 'Futebol';
    quadra.horarios = [new Date(Date.now() + 10000)]; // One future time slot

    clube.armazenaQuadra(quadra);

    tecladoMock.mockImplementationOnce(() => 'Pedro') // Nome
      .mockImplementationOnce(() => '1') // Quadra
      .mockImplementationOnce(() => '1') // Dia
      .mockImplementationOnce(() => '1') // Horário
      .mockImplementationOnce(() => 'n'); // Não reservar outro horário

    const result = clube.reservarQuadra(tecladoMock);
    expect(result).toEqual({
      registro: expect.stringContaining('Pedro. Quadra: Quadra 1')
    });
  });

  it('should mark courts as occupied after reservation', () => {
    const quadra = new Quadra();
    quadra.nome = 'Quadra 1';
    quadra.horarios = [new Date(Date.now() + 10000)]; // One future time slot

    clube.armazenaQuadra(quadra);
    
    tecladoMock.mockImplementationOnce(() => 'Pedro') // Nome
      .mockImplementationOnce(() => '1') // Quadra
      .mockImplementationOnce(() => '1') // Dia
      .mockImplementationOnce(() => '1') // Horário
      .mockImplementationOnce(() => 'n'); // Não reservar outro horário

    clube.reservarQuadra(tecladoMock);
    expect(quadra.horarios.length).toBe(0); // Check if the time slot is removed
  });

  it('should handle no courts scenario', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    clube.mostraQuadrasDisponiveis();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Quadras disponíveis:'));

    logSpy.mockRestore();
  });

  it('should cancel a reservation', () => {
    const quadra = new Quadra();
    quadra.nome = 'Quadra 1';
    quadra.horarios = [new Date(Date.now() + 10000)];

    clube.armazenaQuadra(quadra);
    clube.reservas.push({ quadra, usuario: 'Pedro', horario: quadra.horarios[0] });

    tecladoMock.mockImplementationOnce(() => 'Pedro') // Nome
      .mockImplementationOnce(() => '1'); // Reserva

    const result = clube.cancelarReserva(tecladoMock);
    expect(result).toBe(true);
    expect(clube.reservas.length).toBe(0); // Reserva foi removida
  });
}); // Fim do describe Clube

describe('Util functions', () => {
  describe('daysToMilliseconds', () => {
    it('should convert days to milliseconds correctly', () => {
      expect(daysToMilliseconds(1)).toBe(86400000);
      expect(daysToMilliseconds(2)).toBe(172800000);
      expect(daysToMilliseconds(0)).toBe(0);
    });
  });

  describe('formatarData', () => {
    it('should format date correctly', () => {
      const date = new Date(2024, 8, 26, 15, 30); // 26/09/2024 - 15:30
      expect(formatarData(date)).toBe('26/09/2024 - Horário: 15:30');
    });

    it('should pad single digits correctly', () => {
      const date = new Date(2024, 0, 1, 5, 9); // 01/01/2024 - 05:09
      expect(formatarData(date)).toBe('01/01/2024 - Horário: 05:09');
    });
  });
}); // Fim do describe Util functions

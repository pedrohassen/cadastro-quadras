import { Quadra } from "./Quadra";

export class Clube {
  quadras: Array<Quadra>;

  constructor() {
    this.quadras = [];
  }

  mostrarQuadras() {
    console.log(`Nome: ${this.quadras}`);
  }
}
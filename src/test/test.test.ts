function add(n1: number, n2: number): number {
  return n1 + n2;
}

describe('Comprueba si se suman 2 numeros - Es 2', () => {
  test('Probando metodo sumar', () => {
    const result = add(1, 1);
    expect(result).toBe(2);
  });
});

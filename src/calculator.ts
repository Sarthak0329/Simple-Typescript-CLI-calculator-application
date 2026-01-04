/* Core logic of calculator */

// Addition
function add(a: number, b: number): number {
    return a + b;
}

// Subtraction
function sub(a: number, b: number): number {
    return Math.abs(a - b);
}

// Multiplication
function mult(a: number, b: number): number {
    return a * b;
}

// Division
function division(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Cannot divide by 0");
    }
    return a / b;
}

// Power
function power(a: number, b: number): number {
    return a ** b;
}

// Square root
function squareroot(a: number): number {
    if (a < 0) {
        throw new Error("Cannot take square root of a negative number");
    }
    return Math.sqrt(a);
}

export { add, sub, mult, division, power, squareroot };

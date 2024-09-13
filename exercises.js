import { open } from "node:fs/promises"

export function change(amount) {
  if (!Number.isInteger(amount)) {
    throw new TypeError("Amount must be an integer")
  }
  if (amount < 0) {
    throw new RangeError("Amount cannot be negative")
  }
  let [counts, remaining] = [{}, amount]
  for (const denomination of [25, 10, 5, 1]) {
    counts[denomination] = Math.floor(remaining / denomination)
    remaining %= denomination
  }
  return counts
}

// Write your first then lower case function here
export function firstThenLowerCase(strings, predicate) {
  for (const string of strings) {
    if (predicate?.(string)) {
      return string.toLowerCase()
    }
  }
  return undefined
}

// Write your powers generator here
function* powersGenerator({ ofBase, upTo }) {
    let value = 1;  // Start with b^0 = 1
    let exponent = 0;
    
    // Yield successive powers of the base as long as the value is <= upTo
    while (value <= upTo) {
        yield value;
        exponent++;
        value = Math.pow(ofBase, exponent);
    }
}

// Write your say function here

// Write your line count function here
export async function meaningfulLineCount(file) {
  let fileHandle;
  try {
    const fileHandle = await open(file, "r")
    const content = await fileHandle.readFile({ encoding: 'utf-8' })
    const lines = content.split('\n')
    let count = 0
    for (const line of lines) {
      const trimmedLine = line.trim()
      if (trimmedLine !== "" && trimmedLine[0] !== '#')
        count++
    }
    return count
  } catch (error) {
    return Promise.reject(error)
  } finally {
    if (fileHandle) {
      await fileHandle.close()
    }
  }

}

// Write your Quaternion class here
class Quaternion {
    constructor(a, b, c, d) {
      this.a = a;  // real part
      this.b = b;  // i component
      this.c = c;  // j component
      this.d = d;  // k component
      Object.freeze(this); // make immutable
    }
  
    // String representation
    toString() {
      const parts = [];
      if (this.a !== 0) parts.push(`${this.a}`);
      if (this.b !== 0) parts.push(`${this.b === 1 ? '' : this.b === -1 ? '-' : this.b}i`);
      if (this.c !== 0) parts.push(`${this.c === 1 ? '' : this.c === -1 ? '-' : this.c}j`);
      if (this.d !== 0) parts.push(`${this.d === 1 ? '' : this.d === -1 ? '-' : this.d}k`);
      
      return parts.length === 0 ? '0' : parts.join('');
    }
  
    // Add two quaternions
    plus(q) {
      return new Quaternion(this.a + q.a, this.b + q.b, this.c + q.c, this.d + q.d);
    }
  
    // Multiply two quaternions
    times(q) {
      return new Quaternion(
        this.a * q.a - this.b * q.b - this.c * q.c - this.d * q.d,
        this.a * q.b + this.b * q.a + this.c * q.d - this.d * q.c,
        this.a * q.c - this.b * q.d + this.c * q.a + this.d * q.b,
        this.a * q.d + this.b * q.c - this.c * q.b + this.d * q.a
      );
    }
  
    // Conjugate of a quaternion
    conjugate() {
      return new Quaternion(this.a, -this.b, -this.c, -this.d);
    }
  
    // Coefficients list
    get coefficients() {
      return [this.a, this.b, this.c, this.d];
    }
  
    // Equality check
    equals(q) {
      return this.a === q.a && this.b === q.b && this.c === q.c && this.d === q.d;
    }
  }
  
  // Export if needed for test framework
  module.exports = { Quaternion };
  
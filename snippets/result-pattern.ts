// Result pattern — evitar exceptions para fluxo esperado
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }

function divide(a: number, b: number): Result<number> {
  if (b === 0) return { ok: false, error: new Error('division by zero') }
  return { ok: true, value: a / b }
}

// Uso
const r = divide(10, 2)
if (r.ok) {
  console.log(r.value)
} else {
  console.error(r.error)
}

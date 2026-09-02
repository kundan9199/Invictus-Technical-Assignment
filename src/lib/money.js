export function formatMoney(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

export function splitEqual(amount, ids) {
  const n = ids.length || 1;
  const totalCents = Math.round(Number(amount) * 100);
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  const shares = {};

  ids.forEach((id, index) => {
    const cents = base + (index < remainder ? 1 : 0);
    shares[id] = cents / 100;
  });

  return shares;
}

export function percentsSumTo100(percents) {
  const values = Object.values(percents).map(Number);
  return values.reduce((a, b) => a + b, 0) === 100;
}

export function splitByPercent(amount, percents) {
  const shares = {};
  for (const [id, pct] of Object.entries(percents)) {
    shares[id] = Number(((amount * Number(pct)) / 100).toFixed(2));
  }
  return shares;
}

export function sharesForExpense(expense) {
  if (expense.splitType === "percent" && expense.percents) {
    return splitByPercent(expense.amount, expense.percents);
  }
  return splitEqual(expense.amount, expense.splitWith);
}

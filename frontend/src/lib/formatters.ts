/**
 * Deterministic number formatting with commas (e.g. 145,000,000)
 * Completely immune to server vs browser locale mismatch
 */
export function formatNumberFixed(n: number | undefined | null): string {
  if (n === undefined || n === null || isNaN(n)) return "0";
  const parts = Math.round(n).toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

/**
 * Deterministic USD currency formatting (e.g. $341,727)
 */
export function formatUSD(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) return "$0";
  return `$${formatNumberFixed(amount)}`;
}

/**
 * Format currency in Pakistan Rupees (PKR) with Crore, Lakh, or standard comma grouping.
 */
export function formatPKR(amount: number | undefined | null, compact: boolean = false): string {
  if (amount === undefined || amount === null || isNaN(amount)) return "PKR 0";

  if (compact) {
    if (amount >= 10000000) {
      const crore = amount / 10000000;
      return `PKR ${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      const lakh = amount / 100000;
      return `PKR ${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2)} Lakh`;
    }
  }

  if (amount >= 10000000) {
    const crore = amount / 10000000;
    return `PKR ${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(2)} Crore`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `PKR ${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2)} Lakh`;
  }

  return `PKR ${formatNumberFixed(amount)}`;
}

/**
 * Format area values with their units (Marla, Kanal, Sq. Ft, Sq. Yd).
 */
export function formatArea(value: number | undefined | null, unit: string = "Marla"): string {
  if (value === undefined || value === null) return `0 ${unit}`;
  return `${formatNumberFixed(value)} ${unit}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Deterministic date formatting.
 */
export function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate();
    const month = MONTHS[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return dateStr;
  }
}

/**
 * Deterministic date with time formatting.
 */
export function formatDateTime(dateStr: string | undefined | null): string {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate();
    const month = MONTHS[d.getMonth()];
    const year = d.getFullYear();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${day} ${month} ${year}, ${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  } catch {
    return dateStr;
  }
}

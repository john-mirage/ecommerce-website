export const formatLocale = "fr-FR";

export const formatOptions = {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
}

export function formatProductPrice(cameraPrice) {
  const price = cameraPrice / 100;
  const numberFormatter = new Intl.NumberFormat(formatLocale, formatOptions);
  return numberFormatter.format(price);
}
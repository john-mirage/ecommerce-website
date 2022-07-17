const currencyFormatter = new Intl.NumberFormat(
  "fr-FR",
  {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }
);

export default currencyFormatter;
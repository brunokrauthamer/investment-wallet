export default function profitabilitySimulator () {
  let date = new Date("2015-01-01");
let endDate = new Date("2023-02-13");
let profitability = 0;

let data = [["Data", "Rentabilidade"]];

while (date <= endDate) {
  profitability += Math.random() * (0.1) - 0.0493;
  // profitability = Math.max(-0.05, Math.min(0.1, profitability));

  data.push([
    date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }),
  profitability,
]);

  date.setDate(date.getDate() + 1);
}

return data;

}
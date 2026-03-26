import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function DonutChart({ expenses }) {

  // ✅ FIX: ensure it's always an array
  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  const data = Object.values(
    safeExpenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = {
          name: expense.category,
          value: 0
        };
      }
      acc[expense.category].value += Number(expense.amount);
      return acc;
    }, {})
  );

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#14B8A6"];

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Expense Overview</h2>

      {data.length === 0 ? (
        <p>No data to display</p>   // ✅ prevents crash
      ) : (
        <PieChart width={350} height={300}>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}

export default DonutChart;
import { useState } from "react";

function ExpenseForm({ addExpense }) {

  const [form, setForm] = useState({
    amount: "",
    category: "Food",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(form);
    setForm({ amount: "", category: "Food", description: "" });
  };

  return (
    <div style={{
      background: "white",
      padding: "25px",
      borderRadius: "12px",
      marginBottom: "25px"
    }}>
      <h2 style={{ marginBottom: "20px" }}>Add Expense</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
        </select>

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <button
          type="submit"
          style={{
            background: "#6366F1",
            color: "white",
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add Expense
        </button>

      </form>
    </div>
  );
}

export default ExpenseForm;

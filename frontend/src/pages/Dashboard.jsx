import { useState, useEffect } from "react";   
import DonutChart from "../components/DonutChart";
import ExpenseList from "../components/ExpenseList";

function Dashboard({ setIsLoggedIn }) {

  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    amount: "",
    category: "Food"
  });

  const totalAmount = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/expenses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setExpenses(data);
        } else {
          console.error("Invalid data:", data);
          setExpenses([]);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleAdd = async () => {
    if (!form.amount) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: form.amount,
          category: form.category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data);
        return;
      }

      setExpenses(prev => [data, ...prev]);

      setForm({ amount: "", category: "Food" });

    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const handleClearAccount = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch("http://localhost:8000/api/expenses/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses([]);
    } catch (err) {
      console.error("Clear error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="p-10">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          DASHBOARD
        </h1>

        <button
          onClick={handleLogout}
          className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-xl shadow-lg transition"
        >
          Logout
        </button>
      </div>

      <div className="mb-6 text-lg font-semibold text-gray-700">
        Total Spent: ₹ {totalAmount}
      </div>

      <div className="grid grid-cols-2 gap-10">

        {/* Add Expense */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">

          <h2 className="text-xl font-semibold mb-6">
            Add Expense
          </h2>

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="w-full p-3 border rounded-xl mb-4"
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="w-full p-3 border rounded-xl mb-4"
          >
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Bills</option>
          </select>

          <button
            onClick={handleAdd}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold"
          >
            Add Expense
          </button>

          <button
            onClick={handleClearAccount}
            className="w-full mt-4 bg-red-100 text-red-600 py-2 rounded-xl"
          >
            Clear Account
          </button>

        </div>

        {/* Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-xl font-semibold mb-6">
            Expense Overview
          </h2>
          <DonutChart expenses={expenses} />
        </div>

      </div>

      {/* Recent Expenses */}
      <div className="bg-white p-8 rounded-3xl shadow-xl mt-10">
        <h2 className="text-xl font-semibold mb-6">
          Recent Expenses
        </h2>

        <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      </div>

    </div>
  );
}

export default Dashboard;

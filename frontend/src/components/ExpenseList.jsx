import { useState } from "react";

function ExpenseList({ expenses, setExpenses }) {

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    category: "Food"
  });

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8000/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setExpenses(prev => prev.filter(exp => exp._id !== id));
  };

  const handleEdit = (exp) => {
    setEditId(exp._id);
    setEditData({
      amount: exp.amount,
      category: exp.category
    });
  };

  const handleSave = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:8000/api/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editData),
    });

    const updated = await res.json();

    if (!res.ok || !updated) {
      console.error("Update failed:", updated);
      return;
    }

    setExpenses(prev =>
      prev.map(exp => (exp._id === id ? updated : exp))
    );

    setEditId(null);

  } catch (err) {
    console.error("Save error:", err);
  }
};

  return (
    <div>
      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        expenses.map((exp) => (
          <div key={exp._id} className="flex justify-between items-center border-b py-2">

            {editId === exp._id ? (
              <>
                <input
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({ ...editData, amount: e.target.value })
                  }
                  className="border px-2"
                />

                <select
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                >
                  <option>Food</option>
                  <option>Shopping</option>
                  <option>Travel</option>
                  <option>Bills</option>
                </select>

                <button
                  onClick={() => handleSave(exp._id)}
                  className="text-green-600 ml-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{exp.category}</span>

                <div className="flex gap-4 items-center">
                  <span>₹ {exp.amount}</span>

                  <button
                    onClick={() => handleEdit(exp)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;

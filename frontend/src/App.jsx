import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <Dashboard setIsLoggedIn={setIsLoggedIn} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[420px] transition-all duration-300">

        {showRegister ? (
          <Register onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login
            setIsLoggedIn={setIsLoggedIn}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )}

      </div>

    </div>
  );
}

export default App;

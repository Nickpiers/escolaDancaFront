import { jwtDecode } from "jwt-decode";

let tokenTimerStarted = false;

export const scheduleTokenCheck = () => {
  if (tokenTimerStarted) return;
  tokenTimerStarted = true;

  const token = localStorage.getItem("token");
  if (!token) return;

  const decoded = jwtDecode(token);
  const now = Date.now() / 1000;
  const timeLeft = (decoded.exp - now) * 1000;

  if (timeLeft > 0) {
    setTimeout(() => {
      alert("Sua sessão expirou. Faça login novamente.");
      localStorage.removeItem("token");
      window.location.href = "/login";
      tokenTimerStarted = false;
    }, timeLeft);
  } else {
    localStorage.removeItem("token");
    window.location.href = "/login";
    tokenTimerStarted = false;
  }
};

export const isValidTime = (timeStr) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(timeStr);
};

export const formatTimeWhileTyping = (raw) => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  const hh = digits.slice(0, 2);
  const mm = digits.slice(2, 4);
  return `${hh}:${mm}`;
};

export const normalizeTimeOnBlur = (value) => {
  if (!value) return "";
  if (isValidTime(value)) return value;
  const digits = value.replace(/\D/g, "");
  let hh = "00";
  let mm = "00";
  if (digits.length <= 2) {
    hh = digits.padStart(2, "0");
    mm = "00";
  } else {
    hh = digits.slice(0, 2);
    mm = digits.slice(2, 4).padEnd(2, "0");
  }
  let hhNum = parseInt(hh, 10);
  let mmNum = parseInt(mm, 10);
  if (isNaN(hhNum)) hhNum = 0;
  if (isNaN(mmNum)) mmNum = 0;
  if (hhNum > 23) hhNum = 23;
  if (mmNum > 59) mmNum = 59;
  return `${String(hhNum).padStart(2, "0")}:${String(mmNum).padStart(2, "0")}`;
};

export const isValidDateDDMMYYYY = (dateStr) => {
  if (!dateStr) return false;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return false;
  const [d, m, y] = parts.map((p) => parseInt(p, 10));
  if ([d, m, y].some((n) => isNaN(n))) return false;
  const dt = new Date(y, m - 1, d);
  return (
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
  );
};

export const formatDateWhileTyping = (raw) => {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

export const normalizeDateOnBlur = (value) => {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  const d = digits.slice(0, 2).padStart(2, "0");
  const m = digits.slice(2, 4).padStart(2, "0");
  const y = digits
    .slice(4, 8)
    .padEnd(4, new Date().getFullYear().toString().slice(0, 4));

  let dayNum = parseInt(d, 10);
  let monthNum = parseInt(m, 10);
  let yearNum = parseInt(y, 10);
  if (isNaN(dayNum)) dayNum = 1;
  if (isNaN(monthNum)) monthNum = 1;
  if (isNaN(yearNum)) yearNum = new Date().getFullYear();
  if (monthNum < 1) monthNum = 1;
  if (monthNum > 12) monthNum = 12;

  const maxDay = new Date(yearNum, monthNum, 0).getDate();
  if (dayNum < 1) dayNum = 1;
  if (dayNum > maxDay) dayNum = maxDay;
  return `${String(dayNum).padStart(2, "0")}/${String(monthNum).padStart(2, "0")}/${String(yearNum).padStart(4, "0")}`;
};

export const convertDDMMYYYYToISODate = (ddmmyyyy) => {
  const [d, m, y] = ddmmyyyy.split("/");
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
};

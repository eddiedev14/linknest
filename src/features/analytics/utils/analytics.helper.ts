import { Timestamp } from "firebase/firestore";

const getAnalyticsDay = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return {
    id: `${year}-${month}-${day}`,
    date: Timestamp.fromDate(today),
  };
};

export { getAnalyticsDay };

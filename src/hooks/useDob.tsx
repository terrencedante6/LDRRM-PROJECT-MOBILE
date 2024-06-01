"use client";

import { useState, useEffect } from "react";

export default function useAge(birthDate: string) {
  const [date, setDate] = useState<Date | null>(null);
  const [age, setAge] = useState(0);

  useEffect(() => {
    try {
      const parsedDate = new Date(birthDate);
      setDate(parsedDate);
    } catch (error) {
      console.error("Error parsing birth date:", error);
    }
  }, [birthDate]);

  useEffect(() => {
    if (date) {
      const today = new Date();
      const birthYear = date.getFullYear();
      const birthMonth = date.getMonth();
      const birthDay = date.getDate();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const currentDay = today.getDate();

      let calculatedAge = currentYear - birthYear;
      if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDay < birthDay)
      ) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    }
  }, [date]);

  return { date, age };
}

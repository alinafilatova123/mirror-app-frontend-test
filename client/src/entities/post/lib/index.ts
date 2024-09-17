export const getDay = (days: number): string => {
    if (days === 1) return "день";
    if (days >= 2 && days <= 4) return "дня";
    return "дней";
};

export const getDate = (date: Date): string => {
    const msPerDay = 1000 * 60 * 60 * 24;

    const currentDate = new Date();
    const diffTime = Math.abs(date.getTime() - currentDate.getTime());
    const diffDays = Math.floor(diffTime / msPerDay);

    if (diffDays < 7) {
      if (diffDays === 0) return "сегодня";
      return `${diffDays} ${getDay(diffDays)} назад`;
    }
  
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
};
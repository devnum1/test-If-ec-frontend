export const mockInsStartDate = () => {
  const today = new Date();
  const from = new Date();
  from.setDate(today.getDate() + 30);
  const to = new Date();
  to.setDate(today.getDate() + 60);

  const format = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  };

  const insStartDateRange = {
    from: format(from),
    to: format(to),
  };

  return insStartDateRange;
};

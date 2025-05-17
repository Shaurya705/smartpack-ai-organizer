
export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const formatOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  
  // Add year if different from current year
  if (start.getFullYear() !== new Date().getFullYear()) {
    formatOptions.year = 'numeric';
  }
  
  const formattedStart = start.toLocaleDateString('en-US', formatOptions);
  const formattedEnd = end.toLocaleDateString('en-US', formatOptions);
  
  return `${formattedStart} - ${formattedEnd}`;
};

export const formatDate = (dateString: string, withTime = false): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  if (withTime) {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

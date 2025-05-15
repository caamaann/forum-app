import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(dateString) {
  const date = new Date(dateString);
  return format(date, 'PPP');
}

export function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

import { format } from "date-fns";

export const formatTimestamp = (isoString: Date): string => {
  const date = new Date(isoString);
  return format(date, "MMM dd, yyyy HH:mm");
};

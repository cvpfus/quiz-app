import { formatDuration, intervalToDuration } from "date-fns";

export const getReadableTimeFormat = (seconds) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  const formattedDuration = [];
  if (duration.hours) formattedDuration.push(`${duration.minutes}h`);
  if (duration.minutes) formattedDuration.push(`${duration.minutes}m`);
  if (duration.seconds) formattedDuration.push(`${duration.seconds}s`);

  return `${formattedDuration.join(" ")} left`;
};

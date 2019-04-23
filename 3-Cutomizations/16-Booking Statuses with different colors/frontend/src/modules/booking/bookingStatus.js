const bookingStatus = {
  BOOKED: 'booked',
  PROGRESS: 'progress',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export function bookingStatusColor(status) {
  if (!status || status === bookingStatus.COMPLETED) {
    return undefined;
  }

  if (status === bookingStatus.CANCELLED) {
    return '#f50';
  }

  if (status === bookingStatus.PROGRESS) {
    return '#87d068';
  }

  if (status === bookingStatus.BOOKED) {
    return '#108ee9';
  }
}

export default bookingStatus;

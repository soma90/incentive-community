export function timeAgo(date) {
  const inputDate = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  //if (diffInSeconds < 60) {
  //return `${diffInSeconds} seconds ago`;}
  if (diffInSeconds < 120) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else {
    return inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    //return date.toLocaleDateString();
  }
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

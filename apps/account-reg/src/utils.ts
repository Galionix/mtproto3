export const fetchAndGetRawBody = async (
  url: string,
  parseJson = false,
  onSuccess?: (data: string) => void,
  onError?: (error: Error) => Promise<string>
) => {
  const response = await fetch(url);
  if (!response.ok) {
    onError?.(new Error("Network response was not ok"));
    return null;
  }
  const data = await response.text();
  try {
    if (parseJson) {
      return JSON.parse(data);
    }
  } catch (error) {
    onError?.(error);
    onSuccess?.(data);
    return data;
  }
  onSuccess?.(data);
  return data;
};

export const wait = async (seconds: number) => {
  const waitRand = (Math.floor(Math.random() * 12) + 5) * 100;
  console.log("waitRand: ", waitRand);
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000 + waitRand);
  });
};

export function systemVersionFaker(seed: string): string {
  // Hash the input string
  const hashValue = hash(seed);

  // Convert hash value to positive integer
  const positiveHash = Math.abs(hashValue);

  // Determine the number of dots
  const numDots = (positiveHash % 3) + 1;

  // Map hash value to version-like numbers
  const versionParts = [
    (positiveHash % 1000) + 1, // Major (limited to 1000, add 1 to avoid zero)
    (Math.floor(positiveHash / 1000) % 100) + 1, // Minor (limited to 100, add 1 to avoid zero)
    (Math.floor(positiveHash / 100000) % 100) + 1, // Patch (limited to 100, add 1 to avoid zero)
  ];

  // Insert build number based on the number of dots
  for (let i = 0; i < numDots; i++) {
    versionParts.splice(
      i + 1,
      0,
      (Math.floor(positiveHash / (10000000 * Math.pow(10, i))) % 100) + 1
    ); // Build (limited to 100, add 1 to avoid zero)
  }

  // Format the version-like string
  return versionParts.join(".");
}

// Simple hashing function for demonstration purposes
function hash(str: string): number {
  let hash = 0;
  if (str.length == 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

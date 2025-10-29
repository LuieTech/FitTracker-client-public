/**
 * Generate consistent avatar URLs from any client ID
 * Maps IDs to pravatar.cc's available range (1-70)
 */
export const getAvatarUrl = (id, size = 150) => {
  if (!id) return `https://i.pravatar.cc/${size}?img=1`;
  
  // Map any ID to 1-70 range using modulo
  const imageNumber = ((id - 1) % 70) + 1;
  return `https://i.pravatar.cc/${size}?img=${imageNumber}`;
};

/**
 * Generate deterministic but varied avatar from any string
 * Useful if you want consistent avatars per email/name
 */
export const getAvatarUrlFromString = (str, size = 150) => {
  if (!str) return `https://i.pravatar.cc/${size}?img=1`;
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  const imageNumber = (Math.abs(hash) % 70) + 1;
  return `https://i.pravatar.cc/${size}?img=${imageNumber}`;
};


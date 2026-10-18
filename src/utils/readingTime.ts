export const calculateReadingTime = (content: string): string => {
  if (!content) return '1 min read';
  const cleanText = content.replace(/[#*`_[\]()]/g, ' ').trim();
  const words = cleanText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} min read`;
};

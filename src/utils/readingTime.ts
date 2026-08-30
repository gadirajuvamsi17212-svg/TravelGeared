/**
 * Calculates reading time dynamically based on actual article word count.
 * Rate: ~200 words per minute, rounded to the nearest whole minute.
 */
export function calculateReadingTime(content: string = ''): string {
  if (!content || typeof content !== 'string') {
    return '1 min read';
  }

  // Strip Markdown image tags ![alt](url)
  const withoutImages = content.replace(/!\[.*?\]\(.*?\)/g, '');
  // Strip Markdown links [text](url) -> text
  const withoutLinks = withoutImages.replace(/\[(.*?)\]\(.*?\)/g, '$1');
  // Strip HTML tags if any
  const withoutHtml = withoutLinks.replace(/<[^>]*>/g, ' ');
  // Strip markdown formatting symbols
  const cleanText = withoutHtml.replace(/[#*_`~>|+-]/g, ' ').trim();
  
  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  
  return `${minutes} min read`;
}

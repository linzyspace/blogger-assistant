// Strip HTML tags from Blogger post content
function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Search posts for keywords in user query.
 * Returns top 3 matching posts combined into a single response.
 */
exports.searchPosts = (posts, query) => {
  if (!query || posts.length === 0) return null;

  const keywords = query.toLowerCase().split(/\s+/);

  // Array to store matching posts
  const matches = [];

  for (let post of posts) {
    const title = post.title.toLowerCase();
    const content = stripHtml(post.content).toLowerCase();

    // Check if all keywords exist in title or content
    const matched = keywords.every(word => title.includes(word) || content.includes(word));

    if (matched) {
      matches.push({
        title: post.title,
        content: stripHtml(post.content),
        url: post.url
      });
    }
  }

  if (matches.length === 0) return null;

  // Return top 3 matches combined
  return matches.slice(0, 3).map(post => 
    `From "${post.title}":\n${post.content}\nLink: ${post.url}`
  ).join("\n\n");
};

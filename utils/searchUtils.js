function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

exports.searchPosts = (posts, query) => {
  if (!query || posts.length === 0) return null;

  const keywords = query.toLowerCase().split(/\s+/);
  const matches = [];

  for (let post of posts) {
    const title = post.title.toLowerCase();
    const content = stripHtml(post.content).toLowerCase();

    // Match if ANY keyword exists
    const matched = keywords.some(word => title.includes(word) || content.includes(word));

    if (matched) {
      matches.push({
        title: post.title,
        content: stripHtml(post.content).substring(0, 500), // first 500 chars
        url: post.url
      });
    }
  }

  if (matches.length === 0) return null;

  return matches.slice(0, 3).map(post => 
    `From "${post.title}":\n${post.content}...\nLink: ${post.url}`
  ).join("\n\n");
};

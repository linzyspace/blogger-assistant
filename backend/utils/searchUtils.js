
exports.searchPosts = (posts, query) => {
  query = query.toLowerCase();

  for (let post of posts) {
    if (post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)) {
      // Return first matching post's content
      return `From "${post.title}":\n${post.content.replace(/<[^>]+>/g, "")}`;
    }
  }

  return null;
};

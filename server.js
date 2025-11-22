import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const BLOG_ID = "6604544777764868713";
const API_KEY = "AIzaSyCaUZEDFK50huQDi-WLKjUwOHEp0h";

let blogPosts = [];

// Fetch posts from Blogger
async function loadBlogPosts() {
  try {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?maxResults=200&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    blogPosts = data.items || [];
    console.log(`Loaded ${blogPosts.length} blog posts`);
  } catch (err) {
    console.error("Failed to load blog posts:", err);
  }
}

// Load on startup
loadBlogPosts();

// Reload every hour
setInterval(loadBlogPosts, 3600000);

// Simple keyword search
function searchBlog(query) {
  const q = query.toLowerCase();
  return blogPosts
    .filter(post =>
      (post.title && post.title.toLowerCase().includes(q)) ||
      (post.content && post.content.toLowerCase().includes(q))
    )
    .slice(0, 3); // top 3
}

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message || "";

  const results = searchBlog(userMsg);

  if (results.length === 0) {
    return res.json({
      reply: "I couldn't find anything in your blog about that topic."
    });
  }

  let reply = "Here’s what I found from your blog:\n\n";

  results.forEach(post => {
    reply += `📝 **${post.title}**\n`;
    reply += post.content.replace(/<[^>]*>?/gm, "").slice(0, 500);
    reply += "\n\n";
  });

  res.json({ reply });
});

app.listen(3000, () => console.log("Server running on port 3000"));

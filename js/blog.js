// ============================================
// blog.js
// Récupère data/posts.json et affiche automatiquement
// la liste des articles sur blog.html
// ============================================

async function loadPosts() {
  const grid = document.getElementById('blogGrid');

  try {
    const res = await fetch('data/posts.json');
    if (!res.ok) throw new Error('posts.json not found');
    const posts = await res.json();

    if (posts.length === 0) {
      grid.innerHTML = '<p class="blog-empty">No articles yet. Check back soon!</p>';
      return;
    }

    // Génère une carte HTML par article, lien vers article.html?slug=...
    grid.innerHTML = posts.map(post => `
      <a href="article.html?slug=${encodeURIComponent(post.slug)}" class="blog-card">
        ${post.cover ? `<div class="blog-card-img" style="background-image:url('${post.cover}')"></div>` : ''}
        <div class="blog-card-body">
          <span class="blog-card-category">${post.category}</span>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <span class="blog-card-date">${formatDate(post.date)}</span>
        </div>
      </a>
    `).join('');

  } catch (err) {
    grid.innerHTML = '<p class="blog-empty">Unable to load articles right now.</p>';
    console.error(err);
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

loadPosts();

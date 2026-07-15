// ============================================
// article.js
// 1. Récupère le "slug" depuis l'URL (?slug=...)
// 2. Trouve l'article correspondant dans posts.json
// 3. Charge le fichier .md brut correspondant
// 4. Convertit le Markdown en HTML avec Marked.js
// 5. Affiche le résultat dans la page
// ============================================

async function loadArticle() {
  const container = document.getElementById('articleContent');
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (!slug) {
    container.innerHTML = '<p class="blog-empty">No article specified.</p>';
    return;
  }

  try {
    // 1. Récupère les métadonnées depuis posts.json
    const res = await fetch('data/posts.json');
    const posts = await res.json();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      container.innerHTML = '<p class="blog-empty">Article not found.</p>';
      return;
    }

    // 2. Charge le fichier Markdown brut correspondant
    const mdRes = await fetch(`posts/${post.file}`);
    const rawMd = await mdRes.text();

    // 3. Retire le bloc front matter (--- ... ---) avant conversion
    const body = rawMd.replace(/^---[\s\S]*?---\s*/, '');

    // 4. Convertit le Markdown restant en HTML avec Marked.js
    const htmlContent = marked.parse(body);

    // 5. Met à jour le titre de l'onglet du navigateur
    document.getElementById('articleTitleTag').textContent = `PJr — ${post.title}`;

    // 6. Injecte tout le contenu dans la page
    container.innerHTML = `
      <div class="article-tag">${post.category}</div>
      <h1 class="article-title">${post.title}</h1>
      <p class="article-date">${formatDate(post.date)}</p>
      ${post.cover ? `<img src="${post.cover}" alt="${post.title}" class="article-cover">` : ''}
      <div class="article-body">${htmlContent}</div>
      <a href="blog.html" class="btn-secondary article-back">
        <i class="fas fa-arrow-left"></i> Back to Blog
      </a>
    `;

  } catch (err) {
    container.innerHTML = '<p class="blog-empty">Unable to load this article.</p>';
    console.error(err);
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

loadArticle();

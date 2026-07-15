// ============================================
// generate-blog.js
// Lit tous les articles Markdown du dossier /posts,
// extrait leurs métadonnées (front matter) et génère
// automatiquement /data/posts.json
//
// Usage : node scripts/generate-blog.js
// À lancer localement AVANT chaque déploiement.
// ============================================

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'posts.json');

// ---- Parse un front matter simple type : ---\nkey: "value"\n--- ----
function parseFrontMatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return { data: {} };

  const block = match[1];
  const data = {};

  block.split('\n').forEach(line => {
    const sep = line.indexOf(':');
    if (sep === -1) return;
    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();
    // Enlève les guillemets si présents
    value = value.replace(/^"(.*)"$/, '$1');
    data[key] = value;
  });

  return { data };
}

function generate() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('❌ Dossier /posts introuvable.');
    process.exit(1);
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

  if (files.length === 0) {
    console.warn('⚠️  Aucun fichier .md trouvé dans /posts.');
  }

  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data } = parseFrontMatter(raw);

    return {
      title: data.title || 'Untitled',
      slug: data.slug || file.replace('.md', ''),
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: data.category || 'General',
      cover: data.cover || '',
      file: file // nom du fichier .md, utilisé pour le fetch côté client
    };
  });

  // Tri du plus récent au plus ancien
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`✅ ${posts.length} article(s) généré(s) dans data/posts.json`);
}

generate();

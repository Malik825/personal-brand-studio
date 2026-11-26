import { projectsData, articlesData } from '../src/content/providers/static.ts';

const KEY = 'a849f7e2c9164b4cb7135e8240f69da1';
const HOST = 'www.sulemalik.com';
const BASE_URL = `https://${HOST}`;

async function submitIndexNow() {
  const coreRoutes = ['', '/about', '/work', '/writing', '/contact'];
  const projectRoutes = projectsData.map((p) => `/work/${p.slug}`);
  const articleRoutes = articlesData.map((a) => `/writing/${a.slug}`);

  const urlList = [...coreRoutes, ...projectRoutes, ...articleRoutes].map(
    (path) => `${BASE_URL}${path}`
  );

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE_URL}/${KEY}.txt`,
    urlList,
  };

  console.log(`Submitting ${urlList.length} URLs to IndexNow (Bing / Yandex / SearchGPT)...`);

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✓ Success! IndexNow returned HTTP ${res.status}: URLs accepted for immediate crawl.`);
    } else {
      console.log(`IndexNow response HTTP ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error('Failed to submit to IndexNow:', err);
  }
}

submitIndexNow();

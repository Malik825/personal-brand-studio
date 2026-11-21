# GROQ Query Reference for `src/content/providers/sanity.ts`

These GROQ queries match the `ContentProvider` interface.

### `getSite()`
```groq
*[_type == "siteSettings"][0]{
  name,
  role,
  email,
  linkedin,
  location,
  stack
}
```

### `getProjects()`
```groq
*[_type == "project"] | order(year desc){
  "slug": slug.current,
  title,
  category,
  year,
  role,
  summary,
  stack,
  tone,
  challenge,
  approach,
  outcome
}
```

### `getProject(slug)`
```groq
*[_type == "project" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  category,
  year,
  role,
  summary,
  stack,
  tone,
  challenge,
  approach,
  outcome
}
```

### `getArticles()`
```groq
*[_type == "article"] | order(date desc){
  "slug": slug.current,
  title,
  topic,
  date,
  readingTime,
  excerpt
}
```

### `getArticle(slug)`
```groq
*[_type == "article" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  topic,
  date,
  readingTime,
  excerpt,
  body
}
```

### `getExperience()`
```groq
*[_type == "experience"]{
  period,
  role,
  org,
  note
}
```

### `getAbout()`
```groq
*[_type == "about"][0]{
  intro,
  sections[]{
    title,
    body
  },
  capabilities
}
```

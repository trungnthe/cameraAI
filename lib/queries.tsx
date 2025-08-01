export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "author": author->name,
    "categories": categories[]->title,
    publishedAt,
    body,
   mainImage {
    asset->{
        url
        }
    }
  }
`

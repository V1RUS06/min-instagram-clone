
export const loadPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=21&_page=0`)
    const posts = await response.json()

    return posts
}

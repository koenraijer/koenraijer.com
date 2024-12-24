export async function load({ data }) {
    let { post } = data;
    
    // Process categories
    let categoryObject = post.categories.reduce((acc, cat) => {
        return { ...acc, [cat]: post.allCategories[cat] };
    }, {});

    // Dynamically import the MDsveX component
    const postModule = await import(`../../posts/${post.slug}.md`)
    const postComponent = postModule.default;

    post = { 
        ...post,
        categories: categoryObject,
        content: postComponent // The actual MDsveX component
    };
    
    delete post.allCategories;
    delete post.modulePath;

    return {
        post
    };
}
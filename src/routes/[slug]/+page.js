export async function load({ data }) {
    let { post } = data;
    let categoryObject = post.categories.reduce((acc, cat) => {
        return { ...acc, [cat]: post.allCategories[cat] };
    }, {});

    post = { ...post, categories: categoryObject };

    delete post.allCategories; // To not return AllCategories

    return {
        post,
    }
}

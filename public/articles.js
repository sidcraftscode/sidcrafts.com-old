async function gql(query, variables={}) {
    const data = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}
const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "sidcraftscode") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                }
            }
        }
    }
`;

gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const articles = result.data.user.publication.posts;
        let container = document.createElement('div');

        articles.forEach(article => {
            let title = document.createElement('h2');
            // add classes to title
            title.classList = "mt-6 text-gray-900 max-w-3xl mx-auto font-extrabold text-lg sm:text-xl lg:text-2xl tracking-tight text-left"
            title.innerText = article.title;

            let brief = document.createElement('p');
            brief.classList = "mt-4 text-lg text-gray-600 text-left max-w-3xl mx-auto"
            brief.innerText = article.brief;

            let link = document.createElement('a');
            link.classList = "block mt-2 mb-12 text-lg text-gray-900 font-medium underline text-left max-w-3xl mx-auto"
            link.innerHTML = 'Read on Hashnode &rarr;'
            link.href = `https://sidcraftscode.hashnode.dev/${article.slug}`;

            container.appendChild(title);
            container.appendChild(brief);
            container.appendChild(link);
        })

        document.querySelector('.app').appendChild(container);
});
document.getElementById('articles').parentNode.innerHTML = `
<div class="app relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
<h1 class="text-gray-900 max-w-3xl mx-auto font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-left">Blog</h1>
<p class="mt-6 text-lg text-gray-600 text-left max-w-3xl mx-auto">All the latest posts. I use Hashnode to publish my blog posts. This page was created using the Hashnode API.</p>
</div>`;
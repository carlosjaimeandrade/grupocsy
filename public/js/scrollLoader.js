window.onscroll = () => {
    loadingInfo()
}

async function loadingInfo() {
    const doc = document.documentElement
    const percentualBar = parseInt(doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100)
    const scrollLoader = document.querySelector('[scrollLoader]')
    const category = scrollLoader.id
    let offset = document.querySelectorAll('[scrollLoaderOffset]').length
    if (percentualBar >= 75) {
        let publications = await fetch(`/api/publications/${category}/${offset}`)
        publications = await publications.json()
        if (category == "blog") {
            insertHtmlbodyBlog(publications, scrollLoader)
        } else {
            insertHtmlbody(publications, scrollLoader)
        }

    }
}

function insertHtmlbodyBlog(publications, scrollLoader) {
    if (publications.length > 0) {
        publications.forEach(publication => {
            scrollLoader.insertAdjacentHTML('beforeend', `
            <div scrollLoaderOffset class="content-post-blog">
                <div class="post-img-blog">
                    <img src="/upload/publication/${publication.id}/${publication.nameImage}" alt="">
                </div>
                <div class="blog-text">
                    <div class="post-title-blog">
                        <h3>
                            ${publication.title}
                        </h3>
                    </div>
                    <div class="post-description">
                        <div remove-tag>
                            ${publication.previewText}
                        </div>
                    </div>
                    <div class="post-more">
                        <a href="/post/${publication.d}/${publication.t}/${publication.slug}">Ver mais...</a>
                    </div>
                </div>
            </div>`)
        })
    }
}

function insertHtmlbody(publications, scrollLoader) {
    if (publications.length > 0) {
        publications.forEach(publication => {
            scrollLoader.insertAdjacentHTML('beforeend', `
            <div scrollLoaderOffset class="content-post">
                <div class="post-img">
                    <img src="/upload/publication/${publication.id}/${publication.nameImage}" alt="">
                </div>
                <div class="post-title">
                    <h3>
                        <b>${publication.title [0].toUpperCase() + publication.title .slice(1).toLowerCase().substring(0,59)}</b>
                    </h3>
                </div>
                <div class="post-description">
                    ${publication.previewText}...
                </div>
                <div class="post-more">
                    <a href="/post/${publication.id}/${publication.t}/${publication.slug}">Ver mais...</a>
                </div>
            </div>`)
        })
    }
}
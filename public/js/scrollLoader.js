window.onload = () => {
    window.onscroll = () => {
        loadingInfo()
    }

    async function loadingInfo() {
        const doc = document.documentElement
        const percentualBar = parseInt(doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100)
        const scrollLoader = document.querySelector('[scrollLoader]')
        const category = scrollLoader.id
        let offset = document.querySelectorAll('[scrollLoaderOffset]').length
        let width = window.screen.width;
        if (width <= 820) {
            if (percentualBar == 75) {
                let publications = await fetch(`/api/publications/${category}/${offset}`)
                publications = await publications.json()
                if (publications.length > 0) {
                    if (category == "blog") {
                        insertHtmlbodyBlog(publications, scrollLoader)
                    } else {
                        insertHtmlbody(publications, scrollLoader)
                    }
                }
            }
        }

        if (width > 820) {
            if (percentualBar >= 75) {
                let publications = await fetch(`/api/publications/${category}/${offset}`)
                publications = await publications.json()
                if (publications.length > 0) {
                    if (category == "blog") {
                        insertHtmlbodyBlog(publications, scrollLoader)
                    } else {
                        insertHtmlbody(publications, scrollLoader)
                    }
                }
            }
        }

    }

    function insertHtmlbodyBlog(publications, scrollLoader) {
        if (publications.length > 0) {
            publications.forEach(publication => {
                scrollLoader.insertAdjacentHTML('beforeend', `
                <div scrollLoaderOffset class="content-post-blog" data-aos="fade-right">
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
                <div scrollLoaderOffset class="content-post" data-aos="fade-right">
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
                        <a href="/post/${publication.d}/${publication.t}/${publication.slug}">Ver mais...</a>
                    </div>
                </div>`)
            })
        }

    }

    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 10,
        centeredSlides: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    AOS.init();

    var swiper = new Swiper(".myProject", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        },
    });
}
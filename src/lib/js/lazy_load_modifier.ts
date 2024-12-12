let observer: IntersectionObserver;

function getObserver() {

    if (observer) return;

    observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.dispatchEvent(new CustomEvent('isVisible'));
                }
            });
        },
        {
            rootMargin: '150px 0px' // Load when element is 50px from entering viewport
        }
    );
}

export default function lazyLoad(element: any) {
    getObserver();
    
    observer.observe(element);

    return {
        destroy() {
            observer.unobserve(element);
        }
    }
}

/* 
export function useLazyImage(
    node,
    { root = null, rootMargin = '0px 0px 0px 0px', threshold = 0.0 } = {},
    ) {
        if (window && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const image = entry.target;

                            if (image.dataset.src) {
                                image.src = image.dataset.src;
                            }

                            if (image.dataset.srcset) {
                                image.srcset = image.dataset.srcset;
                            }

                            observer.unobserve(image);
                        }
                    });
                },
                {
                    root,
                    rootMargin,
                    threshold,
                },
            );
            observer.observe(node);

            return {
                destroy() {
                    if (observer) {
                        observer.unobserve(node);
                    }
                },
            };
        }
}
*/
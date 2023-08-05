<script>
    import * as info from "$lib/js/info.js"
</script>

<div class="section flex justify-between text-surface-500 gap-2 mb-8 flex-wrap">
    <span class="whitespace-nowrap sm:w-fit w-full">
        © {new Date().getFullYear()} <a href="/" class="hover:underline">{info.title}</a>
    </span>
    <a href="/rss.xml" class="hover:underline whitespace-nowrap">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-flex align-middle">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        RSS
    </a>
    <a href="/changelog" class="hover:underline">Changelog</a>
    <a href="https://github.com/koenraijer/koenraijer.2.0" class="hover:underline" target="_self" rel="nofollow noopener noreferrer">Source</a>
</div>
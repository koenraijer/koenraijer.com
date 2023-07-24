<script>
    import Socials from '$lib/components/Socials.svelte';
</script>

<section class="grid grid-cols-1 md:grid-cols-2 bg-surface-100 dark:bg-surface-800 shadow-sm overflow-hidden">
<div class="relative p-8 row-span-2 lg:row-span-1">
    <div class="relative h-full" style="padding-bottom: 66.66%; background: url('/ducks.webp') no-repeat center / cover;"></div>
</div>
<div class="flex flex-col p-8 md:pl-0 pt-0 md:pt-8 row-span-1 lg:row-span-1 overflow-auto">
    <p class="text-xl font-normal flex-grow">
        I'm <b>Koen</b>, a soon to be graduated medical doctor and data scientist based in Maastricht, The Netherlands. While COVID forced me to stay at home, I started to learn how to code. This ultimately led to me studying Data Science & Society at Tilburg University. Medically speaking, I am fully comitted to the field of psychiatry, and am doing research on the crossroads of psychiatry and data science.
    </p>
    <div class="pt-8">
        <Socials />
    </div>
</div>
</section>




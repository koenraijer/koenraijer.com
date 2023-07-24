<script>
    import Socials from '$lib/components/Socials.svelte';
</script>

<section class="grid grid-cols-1 lg:grid-cols-2 bg-surface-100 dark:bg-surface-800 h-full max-h-[70vh] md:max-h-[60vh] shadow-sm">
    <div class="relative h-full overflow-hidden">
        <img src="/ducks.webp" alt="Ducks" class="md:absolute inset-0 w-full h-full object-cover">
    </div>
    <div class="grid grid-rows-2 p-6">
      <p class="text-lg font-light leading-relaxed row-start-1">
            I'm <b>Koen</b>, a soon to be graduated medical doctor and data scientist based in Maastricht, The Netherlands. While COVID forced me to stay at home, I started to learn how to code. This ultimately led to me studying Data Science & Society at Tilburg University. Medically speaking, I am fully comitted to the field of psychiatry, and am doing research on the crossroads of psychiatry and data science. 
      </p>
      <div class="pt-4 row-start-2 mt-auto">
        <Socials />
      </div>
    </div>
</section>

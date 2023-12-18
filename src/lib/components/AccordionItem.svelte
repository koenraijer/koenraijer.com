<script>
    /**
     * Specify the accordion item title text.
     * Alternatively, use the "title" slot
     */
    export let title = "Title";
  
    /**
     * Set to `true` to expand the accordion item
     */
    export let expanded = false;
  
    /**
     * Set to `true` to disable the accordion item
     */
    export let disabled = false;
  
    /**
     * Specify the id
     */
    export let id = "item" + Math.random().toString(36);
  
    /**
     * Obtain a reference to the `button` element
     */
    export let ref = null;
  
    import { getContext, onMount } from "svelte";
  
    const ctx = getContext("Accordion");
  
    let unsubscribe = undefined;
  
    onMount(() => {
      return () => {
        if (ctx) ctx.remove({ id });
        if (unsubscribe) unsubscribe();
      };
    });
  
    $: button_id = `button-${id}`;
    $: if (ctx) {
      ctx.add({ id, expanded });
      unsubscribe = ctx.items.subscribe((value) => {
        expanded = value[id];
      });
    }
  </script>
  
  <li data-accordion-item {...$$restProps}>
    <button
      bind:this={ref}
      type="button"
      aria-expanded={expanded}
      aria-controls={id}
      aria-disabled={disabled}
      {disabled}
      id={button_id}
      on:click
      on:click={() => {
        if (ctx) {
          ctx.toggle({ id, expanded: !expanded });
          if (expanded && ref && ref.getBoundingClientRect().top < 0) {
            ref.scrollIntoView();
          }
        }
      }}
      class="flex justify-between flex-nowrap w-full place-items-center"
    >
        <slot name="title">{title}</slot>
        <svg
        class="inline-flex h-6 w-6 text-surface-200-700-token {expanded
            ? 'rotate-180'
            : 'rotate-0'} transition-transform duration-200"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
            />
        </svg>
    </button>
    <div role="region" {id} aria-labelledby={button_id} hidden={!expanded}>
      <slot />
    </div>
  </li>
  
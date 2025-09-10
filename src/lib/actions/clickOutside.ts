export type ClickOutsideOptions = {
  exclude?: HTMLElement[];
  enabled?: boolean;
  event?: keyof DocumentEventMap; // default: 'pointerdown'
};

export function clickOutside(node: HTMLElement, options: ClickOutsideOptions = {}) {
  let { exclude = [], enabled = true, event = 'pointerdown' } = options;

  const handler = (e: Event) => {
    if (!enabled) return;
    const target = e.target as Node | null;
    if (!target) return;

    const isInsideNode = node.contains(target);
    const isInsideExcluded = exclude.some((el) => el && el.contains(target as Node));

    if (!isInsideNode && !isInsideExcluded) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  };

  const add = () => document.addEventListener(event, handler, { capture: true });
  const remove = () => document.removeEventListener(event, handler, { capture: true });

  add();

  return {
    update(newOptions: ClickOutsideOptions = {}) {
      const needsRebind = newOptions.event !== event;
      exclude = newOptions.exclude ?? [];
      enabled = newOptions.enabled ?? true;
      event = newOptions.event ?? 'pointerdown';
      if (needsRebind) {
        remove();
        add();
      }
    },
    destroy() {
      remove();
    }
  };
}


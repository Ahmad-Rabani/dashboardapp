/** Layering priority: modal > sidebar > floating actions > header > content */
export const Z_INDEX = {
  content: 1,
  header: 100,
  floatingActions: 1300,
  sidebarBackdrop: 1999,
  sidebar: 2000,
  modal: 3000,
} as const;

export type ZIndexLayer = (typeof Z_INDEX)[keyof typeof Z_INDEX];

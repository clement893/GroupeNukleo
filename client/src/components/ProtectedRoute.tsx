import { ComponentType } from "react";

/**
 * Wraps a component (legacy). Page visibility check removed;
 * always renders the component.
 */
export function withPageVisibility<T extends ComponentType<any>>(
  Component: T,
  _path: string
): T {
  return Component;
}

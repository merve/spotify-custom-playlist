// eslint-disable-next-line
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: unknown;
  }
}

export const disableReactDevTools = (): void => {
  // Check if the React Developer Tools global hook exists
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'object') {
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    if (prop === 'renderers') {
      // this line will remove that one console error

      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map();
    } else {
      // Replace all of its properties with a no-op function or a null value
      // depending on their types

      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] =
        typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] === 'function' ? () => {} : null;
    }
  }
};

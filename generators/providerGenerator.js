/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));

const name = argv._[0];
const cwd = argv["cwd"] || "src";

if (!name) {
  return console.log("\x1B[31m%s\x1b[0m", `--name argument is required!`);
}

const createDirectories = (pathname) => {
  const split = pathname.split("/");
  split.pop();
  fs.mkdirSync(split.join("/"), { recursive: true }, (e) => {
    if (e) {
      console.error(e);
    }
  });
};

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const lowercase = (string) => string.charAt(0).toLowerCase() + string.slice(1);

const sections = [
  {
    section: "Hooks",
    name: capitalize(name),
    get dirName() {
      return `${cwd}/hooks/use${this.name}`;
    },
    get files() {
      return [
        {
          name: "Index",
          path: `${this.dirName}/index.ts`,
          content: `export { default } from './use${this.name}';
`,
        },
        {
          name: `use${this.name} Tests`,
          path: `${this.dirName}/use${this.name}.test.tsx`,
          content: `import React, { FC } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ${this.name}Provider } from 'providers/${this.name}Provider';
import use${this.name} from './use${this.name}';

describe('the use${this.name} hook', () => {
  it('should throw an error if used outside of the ${this.name}Provider', () => {
    const { result } = renderHook(use${this.name});

    expect(result.error.message).toBe('use${this.name} must be used within a ${this.name}Provider');
  });

  it('should return conext in ${this.name}Provider', () => {
    const wrapper: FC = ({ children }) => <${this.name}Provider>{children}</${this.name}Provider>;

    const { result } = renderHook(use${this.name}, { wrapper });

    expect(result.current.loading).toBe(true);
  });
});
`,
        },
        {
          name: `use${this.name}`,
          path: `${this.dirName}/use${this.name}.ts`,
          content: `import { useContext } from 'react';
import { I${this.name}ContextType } from 'providers/${this.name}Provider/types';
import { ${this.name}Context } from 'providers/${this.name}Provider/${this.name}ProviderContext';

export default function use${this.name}(): I${this.name}ContextType {
  const context = useContext(${this.name}Context);

  /* istanbul ignore if */
  if (!context) {
    throw new Error('use${this.name} must be used within a ${this.name}Provider');
  }

  return context;
}
`,
        },
      ];
    },
  },
  {
    section: "Providers",
    name: capitalize(name),
    get dirName() {
      return `${cwd}/providers/${this.name}Provider`;
    },
    get files() {
      return [
        {
          name: "Types",
          path: `${this.dirName}/types.ts`,
          content: `/* eslint-disable @typescript-eslint/no-empty-interface */
import { IContext } from 'providers/types';

// TODO: Replace void with desired MODEL
// you can fill this interface for required params like forceLoading etc.
export interface I${this.name}Store extends IContext<void> {}

// this interface for functions
export interface I${this.name}ContextType extends Omit<I${this.name}Store, 'fetch'> {
  fetch: () => Promise<void>;
  reset${this.name}State: () => void;
}
`,
        },
        {
          name: "Test",
          path: `${this.dirName}/index.test.tsx`,
          content: `import React, { FC } from 'react';
import { renderHook } from '@testing-library/react-hooks';

// hooks
import use${this.name} from 'hooks/use${this.name}';

import { ${this.name}Provider } from './index';
import { ${lowercase(name)}ContextDefault } from './${
            this.name
          }ProviderContext';

jest.mock('hooks/use${this.name}', () => jest.fn(() => ({ ...${lowercase(
            name
          )}ContextDefault })));

describe('the ${this.name}Provider component', () => {
  it('should correctly return the ${this.name} Context object', () => {
    const wrapper: FC = ({ children }) => <${this.name}Provider>{children}</${
            this.name
          }Provider>;

    const { result } = renderHook(use${this.name}, { wrapper });

    expect(result.current).toEqual({
      data: undefined,
      loading: true,
      loaded: false,
      fetch: expect.any(Function),
      reset${this.name}State: expect.any(Function),
    });
  });
});
`,
        },
        {
          name: "Index",
          path: `${this.dirName}/index.tsx`,
          content: `import React, { useState } from 'react';

/// types
import { IContextProps } from 'providers/types';

/// data
import { ${this.name}Context, initial${this.name}Data } from './${this.name}ProviderContext';

export function ${this.name}Provider({ children }: IContextProps): React.ReactElement<IContextProps> {
  const [state, setState] = useState(initial${this.name}Data);

  const fetch = async (): Promise<void> => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      // TODO: get data from API and store response into data
      const res = new Promise<void>((resolve, reject) => {
        resolve();
      });

      setState((prevState) => ({
        ...prevState,
        loading: false,
        loaded: true,
        // data: res,
      }));
    } catch (error) {
      setState({ ...state, loading: false, loaded: true });
      throw error;
    }
  };

  const reset${this.name}State = (): void => {
    setState((prevState) => ({
      ...prevState,
      ...initial${this.name}Data,
    }));
  };

  return (
    <${this.name}Context.Provider value={{ ...state, fetch, reset${this.name}State }}>
      {children}
    </${this.name}Context.Provider>
  );
}
`,
        },
        {
          name: "Context",
          path: `${this.dirName}/${this.name}ProviderContext.tsx`,
          content: `import { createContext } from 'react';

/// types
import { I${this.name}ContextType, I${this.name}Store } from './types';

export const initial${this.name}Data: I${this.name}Store = {
  data: undefined,
  loading: true,
  loaded: false,
};

export const ${lowercase(name)}ContextDefault: I${this.name}ContextType = {
  ...initial${this.name}Data,
  reset${this.name}State: () => {},
  fetch: () => new Promise(() => {}),
};

export const ${this.name}Context = createContext<I${
            this.name
          }ContextType>(null!);
`,
        },
      ];
    },
  },
];

for (const section of sections) {
  for (const file of section.files) {
    createDirectories(file.path);
    fs.writeFileSync(file.path, file.content);
  }
}

return console.log(
  "\x1b[36m%s\x1b[0m",
  `${capitalize(name)}Provider Generated
Modify the initial data model! in: src/providers/${capitalize(
    name
  )}Provider/types.ts:6
to use it you can wrap your <App /> with that provider in: src\\index.tsx`
);

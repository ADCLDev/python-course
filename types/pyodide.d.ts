declare module 'pyodide' {
  export interface PyodideInterface {
    runPython(code: string): string | number | boolean | undefined;
    runPythonAsync(code: string): Promise<string | number | boolean | undefined>;
    loadPackage(names: string | string[]): Promise<void>;
  }

  export interface PyodideConfig {
    indexURL: string;
    fullStdLib?: boolean;
    stdin?: () => string;
    stdout?: (text: string) => void;
    stderr?: (text: string) => void;
    packages?: string[];
  }

  export function loadPyodide(config: PyodideConfig): Promise<PyodideInterface>;
} 
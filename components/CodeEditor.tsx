'use client';

import { useState, useEffect } from 'react';

// Define more specific types for Pyodide
interface PyodideInterface {
  runPython(code: string): string | number | boolean | undefined;
  runPythonAsync(code: string): Promise<string | number | boolean | undefined>;
}

interface PyodideConfig {
  indexURL: string;
  stdout?: (output: string) => void;
  stderr?: (output: string) => void;
  fullStdLib?: boolean;
}

declare global {
  interface Window {
    loadPyodide: (config: PyodideConfig) => Promise<PyodideInterface>;
  }
}

interface CodeEditorProps {
  initialCode: string;
  expectedOutput: string[];
}

interface PythonError extends Error {
  message: string;
}

const PYODIDE_VERSION = process.env.NEXT_PUBLIC_PYODIDE_VERSION || 'v0.24.1';
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full`;

const CodeEditor = ({ initialCode, expectedOutput }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function loadPyodideScript() {
      try {
        // Check if Pyodide is already loaded
        if (window.loadPyodide) {
          setLoading(true);
          const pyodideInstance = await window.loadPyodide({
            indexURL: `${PYODIDE_CDN}/`,
          });
          setPyodide(pyodideInstance);
          setLoading(false);
          return;
        }

        // Load Pyodide script
        const script = document.createElement('script');
        script.src = `${PYODIDE_CDN}/pyodide.js`;
        script.async = true;
        
        const loadScript = new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });

        document.head.appendChild(script);
        await loadScript;

        // Initialize Pyodide
        setLoading(true);
        const pyodideInstance = await (window.loadPyodide as (config: PyodideConfig) => Promise<PyodideInterface>)({
          indexURL: `${PYODIDE_CDN}/`,
        });
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput('Failed to initialize Python environment');
      } finally {
        setLoading(false);
      }
    }

    loadPyodideScript();

    // Cleanup function
    return () => {
      const script = document.querySelector(`script[src="${PYODIDE_CDN}/pyodide.js"]`);
      if (script) {
        script.remove();
      }
    };
  }, []);

  const runCode = async () => {
    if (!pyodide) return;
    
    setStatus('running');
    try {
      // Initialize sys module for output capture
      pyodide.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);
      
      // Run the user's code
      await pyodide.runPythonAsync(code);
      
      // Get the output
      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      setOutput(stdout ? stdout.toString() : '');
      setStatus('success');
    } catch (error) {
      const pythonError = error as PythonError;
      setOutput(`Error: ${pythonError.message}`);
      setStatus('error');
    }
  };

  const testCode = async () => {
    if (!pyodide) return;
    
    setStatus('running');
    try {
      // Initialize sys module for output capture
      pyodide.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);
      
      // Run the user's code
      await pyodide.runPythonAsync(code);
      
      // Get the output
      
      // Split the user's code into lines and remove empty lines
      const userLines = code
        .split('\n')
        .filter(line => line.trim() && !line.trim().startsWith('#'));

      // Compare with expected output
      const allCorrect = expectedOutput.every((expected, index) => 
        userLines[index]?.trim() === expected.trim()
      );

      if (allCorrect) {
        // Run the code again to verify the swap worked
        const result = pyodide.runPython(`
          import sys
          sys.stdout = StringIO()
          
          # Initial setup
          glass1 = "milk"
          glass2 = "juice"
          
          # Student's code
          ${code}
          
          # Print results
          print(glass1)
          print(glass2)
        `);
        
        const finalOutput = result?.toString().trim().split('\n') || [];
        
        if (finalOutput[0] === 'juice' && finalOutput[1] === 'milk') {
          setOutput('✅ All tests passed! Great job!');
          setStatus('success');
        } else {
          setOutput('❌ The variables were not correctly swapped. Try again!');
          setStatus('error');
        }
      } else {
        setOutput('❌ Your code doesn\'t match the expected solution. Make sure to use glass3 as your temporary variable!');
        setStatus('error');
      }
    } catch (error) {
      const pythonError = error as PythonError;
      setOutput(`Error: ${pythonError.message}`);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-64 p-4 font-mono text-sm border rounded-lg"
        placeholder="Write your Python code here..."
      />
      <div className="flex gap-4">
        <button
          onClick={runCode}
          disabled={loading || !pyodide}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? 'Loading Python...' : 'Run Code'}
        </button>
        <button
          onClick={testCode}
          disabled={loading || !pyodide}
          className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Test Code
        </button>
      </div>
      {output && (
        <div className={`p-4 rounded-lg ${
          status === 'success' ? 'bg-green-50 text-green-800' :
          status === 'error' ? 'bg-red-50 text-red-800' :
          'bg-gray-50 text-gray-800'
        }`}>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor; 
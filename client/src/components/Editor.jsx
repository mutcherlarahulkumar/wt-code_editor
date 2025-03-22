import React, { useState,useRef } from "react";
import Editor from "@monaco-editor/react";
import './editor.css';
import DecryptedText from '../Extras/DeprycatedText'
import VariableProximity from '../Extras/VariableProximity'
import { useRecoilState } from 'recoil';
import { code, terminaltext } from "../recoil/atoms";

export default function CodeEditor() {
    // const [content, setContent] = useState("");
    const [language, setLanguage] = useState("javascript");
    // const [terminal, setTerminal] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);

    const [content, setContent] = useRecoilState(code);
    const [terminal, setTerminal] = useRecoilState(terminaltext);

    const runCode = async () => {
        setIsExecuting(true);
        setTerminal("Executing your code...");

        try {
            const response = await fetch("http://localhost:5000/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    language,
                    code: content,
                    input: "",
                }),
            });

            const data = await response.json();
            if (data.output) {
                setTerminal(data.output);
            } else {
                setTerminal(`Error: ${data.error || "Something went wrong."}`);
            }
        } catch (err) {
            setTerminal(`Error: ${err.message}`);
        } finally {
            setIsExecuting(false);
        }
    };
    const containerRef = useRef(null);
    return (
        <div
            className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white"
        >
            <div className="border">
            <DecryptedText
                text="Persnolized Editor"
                animateOn="view"
                revealDirection="center"
            />
            </div>
            <div className="text-5xl font-bold p-6 text-blue-300">Code Editor</div>
            <div style={{ marginTop: '4rem' }}>
            
</div>

            {/* Language Selector */}
            <div className="mb-4">
                <select
                    className="p-3 bg-gray-800 text-blue-300 rounded-lg shadow-md border border-gray-600"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                </select>
            </div>

            {/* Monaco Editor */}
            <Editor
                height="400px"
                width="80%"
                theme="vs-dark"
                language={language}
                value={content}
                onChange={(value) => setContent(value || "")}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    lineNumbers: "on",
                    tabSize: 4,
                }}
                className="rounded-lg shadow-lg border border-gray-700"
            />

            {/* Run Button */}
            <button
                className="m-5 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-all"
                onClick={runCode}
                disabled={isExecuting}
            >
                {isExecuting ? "Executing..." : "Run Code"}
            </button>

            {/* Terminal */}
            <div className="w-4/5">
                <div className="text-3xl font-semibold p-3 text-blue-300">Terminal</div>
                <div className="bg-gray-900 p-4 text-green-400 font-mono rounded-lg shadow-lg border border-gray-700">
                    <div
                        className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 p-2 animate-pulse"
                        style={{ whiteSpace: "pre-wrap", color: isExecuting ? "orange" : "#00ff00" }}
                    >
                        {terminal || "Welcome to the terminal. Output will appear here..."}
                    </div>
                </div>
            </div>
        </div>
    );
}

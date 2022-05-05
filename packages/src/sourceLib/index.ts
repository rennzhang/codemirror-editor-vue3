import _CodeMirror from "codemirror";

!window.CodeMirror && (window.CodeMirror = _CodeMirror);

const CodeMirror = window.CodeMirror || _CodeMirror;

export { CodeMirror };
export default CodeMirror;

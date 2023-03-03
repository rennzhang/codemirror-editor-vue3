import {
  require_simple
} from "./chunk-JSH3JXQT.js";
import {
  require_css,
  require_htmlmixed,
  require_xml
} from "./chunk-VLBYB5Q5.js";
import {
  require_javascript
} from "./chunk-YKAEQP53.js";
import {
  require_codemirror
} from "./chunk-D27VAOMI.js";
import {
  __commonJS
} from "./chunk-RSJERJUL.js";

// node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/addon/mode/overlay.js
var require_overlay = __commonJS({
  "node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/addon/mode/overlay.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror2) {
      "use strict";
      CodeMirror2.overlayMode = function(base, overlay, combine) {
        return {
          startState: function() {
            return {
              base: CodeMirror2.startState(base),
              overlay: CodeMirror2.startState(overlay),
              basePos: 0,
              baseCur: null,
              overlayPos: 0,
              overlayCur: null,
              streamSeen: null
            };
          },
          copyState: function(state) {
            return {
              base: CodeMirror2.copyState(base, state.base),
              overlay: CodeMirror2.copyState(overlay, state.overlay),
              basePos: state.basePos,
              baseCur: null,
              overlayPos: state.overlayPos,
              overlayCur: null
            };
          },
          token: function(stream, state) {
            if (stream != state.streamSeen || Math.min(state.basePos, state.overlayPos) < stream.start) {
              state.streamSeen = stream;
              state.basePos = state.overlayPos = stream.start;
            }
            if (stream.start == state.basePos) {
              state.baseCur = base.token(stream, state.base);
              state.basePos = stream.pos;
            }
            if (stream.start == state.overlayPos) {
              stream.pos = stream.start;
              state.overlayCur = overlay.token(stream, state.overlay);
              state.overlayPos = stream.pos;
            }
            stream.pos = Math.min(state.basePos, state.overlayPos);
            if (state.overlayCur == null)
              return state.baseCur;
            else if (state.baseCur != null && state.overlay.combineTokens || combine && state.overlay.combineTokens == null)
              return state.baseCur + " " + state.overlayCur;
            else
              return state.overlayCur;
          },
          indent: base.indent && function(state, textAfter, line) {
            return base.indent(state.base, textAfter, line);
          },
          electricChars: base.electricChars,
          innerMode: function(state) {
            return { state: state.base, mode: base };
          },
          blankLine: function(state) {
            var baseToken, overlayToken;
            if (base.blankLine)
              baseToken = base.blankLine(state.base);
            if (overlay.blankLine)
              overlayToken = overlay.blankLine(state.overlay);
            return overlayToken == null ? baseToken : combine && baseToken != null ? baseToken + " " + overlayToken : overlayToken;
          }
        };
      };
    });
  }
});

// node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/coffeescript/coffeescript.js
var require_coffeescript = __commonJS({
  "node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/coffeescript/coffeescript.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror2) {
      "use strict";
      CodeMirror2.defineMode("coffeescript", function(conf, parserConf) {
        var ERRORCLASS = "error";
        function wordRegexp(words) {
          return new RegExp("^((" + words.join(")|(") + "))\\b");
        }
        var operators = /^(?:->|=>|\+[+=]?|-[\-=]?|\*[\*=]?|\/[\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\|=?|\^=?|\~|!|\?|(or|and|\|\||&&|\?)=)/;
        var delimiters = /^(?:[()\[\]{},:`=;]|\.\.?\.?)/;
        var identifiers = /^[_A-Za-z$][_A-Za-z$0-9]*/;
        var atProp = /^@[_A-Za-z$][_A-Za-z$0-9]*/;
        var wordOperators = wordRegexp([
          "and",
          "or",
          "not",
          "is",
          "isnt",
          "in",
          "instanceof",
          "typeof"
        ]);
        var indentKeywords = [
          "for",
          "while",
          "loop",
          "if",
          "unless",
          "else",
          "switch",
          "try",
          "catch",
          "finally",
          "class"
        ];
        var commonKeywords = [
          "break",
          "by",
          "continue",
          "debugger",
          "delete",
          "do",
          "in",
          "of",
          "new",
          "return",
          "then",
          "this",
          "@",
          "throw",
          "when",
          "until",
          "extends"
        ];
        var keywords = wordRegexp(indentKeywords.concat(commonKeywords));
        indentKeywords = wordRegexp(indentKeywords);
        var stringPrefixes = /^('{3}|\"{3}|['\"])/;
        var regexPrefixes = /^(\/{3}|\/)/;
        var commonConstants = ["Infinity", "NaN", "undefined", "null", "true", "false", "on", "off", "yes", "no"];
        var constants = wordRegexp(commonConstants);
        function tokenBase(stream, state) {
          if (stream.sol()) {
            if (state.scope.align === null)
              state.scope.align = false;
            var scopeOffset = state.scope.offset;
            if (stream.eatSpace()) {
              var lineOffset = stream.indentation();
              if (lineOffset > scopeOffset && state.scope.type == "coffee") {
                return "indent";
              } else if (lineOffset < scopeOffset) {
                return "dedent";
              }
              return null;
            } else {
              if (scopeOffset > 0) {
                dedent(stream, state);
              }
            }
          }
          if (stream.eatSpace()) {
            return null;
          }
          var ch = stream.peek();
          if (stream.match("####")) {
            stream.skipToEnd();
            return "comment";
          }
          if (stream.match("###")) {
            state.tokenize = longComment;
            return state.tokenize(stream, state);
          }
          if (ch === "#") {
            stream.skipToEnd();
            return "comment";
          }
          if (stream.match(/^-?[0-9\.]/, false)) {
            var floatLiteral = false;
            if (stream.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i)) {
              floatLiteral = true;
            }
            if (stream.match(/^-?\d+\.\d*/)) {
              floatLiteral = true;
            }
            if (stream.match(/^-?\.\d+/)) {
              floatLiteral = true;
            }
            if (floatLiteral) {
              if (stream.peek() == ".") {
                stream.backUp(1);
              }
              return "number";
            }
            var intLiteral = false;
            if (stream.match(/^-?0x[0-9a-f]+/i)) {
              intLiteral = true;
            }
            if (stream.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/)) {
              intLiteral = true;
            }
            if (stream.match(/^-?0(?![\dx])/i)) {
              intLiteral = true;
            }
            if (intLiteral) {
              return "number";
            }
          }
          if (stream.match(stringPrefixes)) {
            state.tokenize = tokenFactory(stream.current(), false, "string");
            return state.tokenize(stream, state);
          }
          if (stream.match(regexPrefixes)) {
            if (stream.current() != "/" || stream.match(/^.*\//, false)) {
              state.tokenize = tokenFactory(stream.current(), true, "string-2");
              return state.tokenize(stream, state);
            } else {
              stream.backUp(1);
            }
          }
          if (stream.match(operators) || stream.match(wordOperators)) {
            return "operator";
          }
          if (stream.match(delimiters)) {
            return "punctuation";
          }
          if (stream.match(constants)) {
            return "atom";
          }
          if (stream.match(atProp) || state.prop && stream.match(identifiers)) {
            return "property";
          }
          if (stream.match(keywords)) {
            return "keyword";
          }
          if (stream.match(identifiers)) {
            return "variable";
          }
          stream.next();
          return ERRORCLASS;
        }
        function tokenFactory(delimiter, singleline, outclass) {
          return function(stream, state) {
            while (!stream.eol()) {
              stream.eatWhile(/[^'"\/\\]/);
              if (stream.eat("\\")) {
                stream.next();
                if (singleline && stream.eol()) {
                  return outclass;
                }
              } else if (stream.match(delimiter)) {
                state.tokenize = tokenBase;
                return outclass;
              } else {
                stream.eat(/['"\/]/);
              }
            }
            if (singleline) {
              if (parserConf.singleLineStringErrors) {
                outclass = ERRORCLASS;
              } else {
                state.tokenize = tokenBase;
              }
            }
            return outclass;
          };
        }
        function longComment(stream, state) {
          while (!stream.eol()) {
            stream.eatWhile(/[^#]/);
            if (stream.match("###")) {
              state.tokenize = tokenBase;
              break;
            }
            stream.eatWhile("#");
          }
          return "comment";
        }
        function indent(stream, state, type) {
          type = type || "coffee";
          var offset = 0, align = false, alignOffset = null;
          for (var scope = state.scope; scope; scope = scope.prev) {
            if (scope.type === "coffee" || scope.type == "}") {
              offset = scope.offset + conf.indentUnit;
              break;
            }
          }
          if (type !== "coffee") {
            align = null;
            alignOffset = stream.column() + stream.current().length;
          } else if (state.scope.align) {
            state.scope.align = false;
          }
          state.scope = {
            offset,
            type,
            prev: state.scope,
            align,
            alignOffset
          };
        }
        function dedent(stream, state) {
          if (!state.scope.prev)
            return;
          if (state.scope.type === "coffee") {
            var _indent = stream.indentation();
            var matched = false;
            for (var scope = state.scope; scope; scope = scope.prev) {
              if (_indent === scope.offset) {
                matched = true;
                break;
              }
            }
            if (!matched) {
              return true;
            }
            while (state.scope.prev && state.scope.offset !== _indent) {
              state.scope = state.scope.prev;
            }
            return false;
          } else {
            state.scope = state.scope.prev;
            return false;
          }
        }
        function tokenLexer(stream, state) {
          var style = state.tokenize(stream, state);
          var current = stream.current();
          if (current === "return") {
            state.dedent = true;
          }
          if ((current === "->" || current === "=>") && stream.eol() || style === "indent") {
            indent(stream, state);
          }
          var delimiter_index = "[({".indexOf(current);
          if (delimiter_index !== -1) {
            indent(stream, state, "])}".slice(delimiter_index, delimiter_index + 1));
          }
          if (indentKeywords.exec(current)) {
            indent(stream, state);
          }
          if (current == "then") {
            dedent(stream, state);
          }
          if (style === "dedent") {
            if (dedent(stream, state)) {
              return ERRORCLASS;
            }
          }
          delimiter_index = "])}".indexOf(current);
          if (delimiter_index !== -1) {
            while (state.scope.type == "coffee" && state.scope.prev)
              state.scope = state.scope.prev;
            if (state.scope.type == current)
              state.scope = state.scope.prev;
          }
          if (state.dedent && stream.eol()) {
            if (state.scope.type == "coffee" && state.scope.prev)
              state.scope = state.scope.prev;
            state.dedent = false;
          }
          return style;
        }
        var external = {
          startState: function(basecolumn) {
            return {
              tokenize: tokenBase,
              scope: { offset: basecolumn || 0, type: "coffee", prev: null, align: false },
              prop: false,
              dedent: 0
            };
          },
          token: function(stream, state) {
            var fillAlign = state.scope.align === null && state.scope;
            if (fillAlign && stream.sol())
              fillAlign.align = false;
            var style = tokenLexer(stream, state);
            if (style && style != "comment") {
              if (fillAlign)
                fillAlign.align = true;
              state.prop = style == "punctuation" && stream.current() == ".";
            }
            return style;
          },
          indent: function(state, text) {
            if (state.tokenize != tokenBase)
              return 0;
            var scope = state.scope;
            var closer = text && "])}".indexOf(text.charAt(0)) > -1;
            if (closer)
              while (scope.type == "coffee" && scope.prev)
                scope = scope.prev;
            var closes = closer && scope.type === text.charAt(0);
            if (scope.align)
              return scope.alignOffset - (closes ? 1 : 0);
            else
              return (closes ? scope.prev : scope).offset;
          },
          lineComment: "#",
          fold: "indent"
        };
        return external;
      });
      CodeMirror2.defineMIME("application/vnd.coffeescript", "coffeescript");
      CodeMirror2.defineMIME("text/x-coffeescript", "coffeescript");
      CodeMirror2.defineMIME("text/coffeescript", "coffeescript");
    });
  }
});

// node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/sass/sass.js
var require_sass = __commonJS({
  "node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/sass/sass.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror(), require_css());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "../css/css"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror2) {
      "use strict";
      CodeMirror2.defineMode("sass", function(config) {
        var cssMode = CodeMirror2.mimeModes["text/css"];
        var propertyKeywords = cssMode.propertyKeywords || {}, colorKeywords = cssMode.colorKeywords || {}, valueKeywords = cssMode.valueKeywords || {}, fontProperties = cssMode.fontProperties || {};
        function tokenRegexp(words) {
          return new RegExp("^" + words.join("|"));
        }
        var keywords = ["true", "false", "null", "auto"];
        var keywordsRegexp = new RegExp("^" + keywords.join("|"));
        var operators = [
          "\\(",
          "\\)",
          "=",
          ">",
          "<",
          "==",
          ">=",
          "<=",
          "\\+",
          "-",
          "\\!=",
          "/",
          "\\*",
          "%",
          "and",
          "or",
          "not",
          ";",
          "\\{",
          "\\}",
          ":"
        ];
        var opRegexp = tokenRegexp(operators);
        var pseudoElementsRegexp = /^::?[a-zA-Z_][\w\-]*/;
        var word;
        function isEndLine(stream) {
          return !stream.peek() || stream.match(/\s+$/, false);
        }
        function urlTokens(stream, state) {
          var ch = stream.peek();
          if (ch === ")") {
            stream.next();
            state.tokenizer = tokenBase;
            return "operator";
          } else if (ch === "(") {
            stream.next();
            stream.eatSpace();
            return "operator";
          } else if (ch === "'" || ch === '"') {
            state.tokenizer = buildStringTokenizer(stream.next());
            return "string";
          } else {
            state.tokenizer = buildStringTokenizer(")", false);
            return "string";
          }
        }
        function comment(indentation, multiLine) {
          return function(stream, state) {
            if (stream.sol() && stream.indentation() <= indentation) {
              state.tokenizer = tokenBase;
              return tokenBase(stream, state);
            }
            if (multiLine && stream.skipTo("*/")) {
              stream.next();
              stream.next();
              state.tokenizer = tokenBase;
            } else {
              stream.skipToEnd();
            }
            return "comment";
          };
        }
        function buildStringTokenizer(quote, greedy) {
          if (greedy == null) {
            greedy = true;
          }
          function stringTokenizer(stream, state) {
            var nextChar = stream.next();
            var peekChar = stream.peek();
            var previousChar = stream.string.charAt(stream.pos - 2);
            var endingString = nextChar !== "\\" && peekChar === quote || nextChar === quote && previousChar !== "\\";
            if (endingString) {
              if (nextChar !== quote && greedy) {
                stream.next();
              }
              if (isEndLine(stream)) {
                state.cursorHalf = 0;
              }
              state.tokenizer = tokenBase;
              return "string";
            } else if (nextChar === "#" && peekChar === "{") {
              state.tokenizer = buildInterpolationTokenizer(stringTokenizer);
              stream.next();
              return "operator";
            } else {
              return "string";
            }
          }
          return stringTokenizer;
        }
        function buildInterpolationTokenizer(currentTokenizer) {
          return function(stream, state) {
            if (stream.peek() === "}") {
              stream.next();
              state.tokenizer = currentTokenizer;
              return "operator";
            } else {
              return tokenBase(stream, state);
            }
          };
        }
        function indent(state) {
          if (state.indentCount == 0) {
            state.indentCount++;
            var lastScopeOffset = state.scopes[0].offset;
            var currentOffset = lastScopeOffset + config.indentUnit;
            state.scopes.unshift({ offset: currentOffset });
          }
        }
        function dedent(state) {
          if (state.scopes.length == 1)
            return;
          state.scopes.shift();
        }
        function tokenBase(stream, state) {
          var ch = stream.peek();
          if (stream.match("/*")) {
            state.tokenizer = comment(stream.indentation(), true);
            return state.tokenizer(stream, state);
          }
          if (stream.match("//")) {
            state.tokenizer = comment(stream.indentation(), false);
            return state.tokenizer(stream, state);
          }
          if (stream.match("#{")) {
            state.tokenizer = buildInterpolationTokenizer(tokenBase);
            return "operator";
          }
          if (ch === '"' || ch === "'") {
            stream.next();
            state.tokenizer = buildStringTokenizer(ch);
            return "string";
          }
          if (!state.cursorHalf) {
            if (ch === "-") {
              if (stream.match(/^-\w+-/)) {
                return "meta";
              }
            }
            if (ch === ".") {
              stream.next();
              if (stream.match(/^[\w-]+/)) {
                indent(state);
                return "qualifier";
              } else if (stream.peek() === "#") {
                indent(state);
                return "tag";
              }
            }
            if (ch === "#") {
              stream.next();
              if (stream.match(/^[\w-]+/)) {
                indent(state);
                return "builtin";
              }
              if (stream.peek() === "#") {
                indent(state);
                return "tag";
              }
            }
            if (ch === "$") {
              stream.next();
              stream.eatWhile(/[\w-]/);
              return "variable-2";
            }
            if (stream.match(/^-?[0-9\.]+/))
              return "number";
            if (stream.match(/^(px|em|in)\b/))
              return "unit";
            if (stream.match(keywordsRegexp))
              return "keyword";
            if (stream.match(/^url/) && stream.peek() === "(") {
              state.tokenizer = urlTokens;
              return "atom";
            }
            if (ch === "=") {
              if (stream.match(/^=[\w-]+/)) {
                indent(state);
                return "meta";
              }
            }
            if (ch === "+") {
              if (stream.match(/^\+[\w-]+/)) {
                return "variable-3";
              }
            }
            if (ch === "@") {
              if (stream.match("@extend")) {
                if (!stream.match(/\s*[\w]/))
                  dedent(state);
              }
            }
            if (stream.match(/^@(else if|if|media|else|for|each|while|mixin|function)/)) {
              indent(state);
              return "def";
            }
            if (ch === "@") {
              stream.next();
              stream.eatWhile(/[\w-]/);
              return "def";
            }
            if (stream.eatWhile(/[\w-]/)) {
              if (stream.match(/ *: *[\w-\+\$#!\("']/, false)) {
                word = stream.current().toLowerCase();
                var prop = state.prevProp + "-" + word;
                if (propertyKeywords.hasOwnProperty(prop)) {
                  return "property";
                } else if (propertyKeywords.hasOwnProperty(word)) {
                  state.prevProp = word;
                  return "property";
                } else if (fontProperties.hasOwnProperty(word)) {
                  return "property";
                }
                return "tag";
              } else if (stream.match(/ *:/, false)) {
                indent(state);
                state.cursorHalf = 1;
                state.prevProp = stream.current().toLowerCase();
                return "property";
              } else if (stream.match(/ *,/, false)) {
                return "tag";
              } else {
                indent(state);
                return "tag";
              }
            }
            if (ch === ":") {
              if (stream.match(pseudoElementsRegexp)) {
                return "variable-3";
              }
              stream.next();
              state.cursorHalf = 1;
              return "operator";
            }
          } else {
            if (ch === "#") {
              stream.next();
              if (stream.match(/[0-9a-fA-F]{6}|[0-9a-fA-F]{3}/)) {
                if (isEndLine(stream)) {
                  state.cursorHalf = 0;
                }
                return "number";
              }
            }
            if (stream.match(/^-?[0-9\.]+/)) {
              if (isEndLine(stream)) {
                state.cursorHalf = 0;
              }
              return "number";
            }
            if (stream.match(/^(px|em|in)\b/)) {
              if (isEndLine(stream)) {
                state.cursorHalf = 0;
              }
              return "unit";
            }
            if (stream.match(keywordsRegexp)) {
              if (isEndLine(stream)) {
                state.cursorHalf = 0;
              }
              return "keyword";
            }
            if (stream.match(/^url/) && stream.peek() === "(") {
              state.tokenizer = urlTokens;
              if (isEndLine(stream)) {
                state.cursorHalf = 0;
              }
              return "atom";
            }
            if (ch === "$") {
              stream.next();
              stream.eatWhile(/[\w-]/);
              if (isEndLine(stream)) {
                state.cursorHalf = 0;
              }
              return "variable-2";
            }
            if (ch === "!") {
              stream.next();
              state.cursorHalf = 0;
              return stream.match(/^[\w]+/) ? "keyword" : "operator";
            }
            if (stream.match(opRegexp)) {
              if (isEndLine(stream)) {
                state.cursorHalf = 0;
              }
              return "operator";
            }
            if (stream.eatWhile(/[\w-]/)) {
              if (isEndLine(stream)) {
                state.cursorHalf = 0;
              }
              word = stream.current().toLowerCase();
              if (valueKeywords.hasOwnProperty(word)) {
                return "atom";
              } else if (colorKeywords.hasOwnProperty(word)) {
                return "keyword";
              } else if (propertyKeywords.hasOwnProperty(word)) {
                state.prevProp = stream.current().toLowerCase();
                return "property";
              } else {
                return "tag";
              }
            }
            if (isEndLine(stream)) {
              state.cursorHalf = 0;
              return null;
            }
          }
          if (stream.match(opRegexp))
            return "operator";
          stream.next();
          return null;
        }
        function tokenLexer(stream, state) {
          if (stream.sol())
            state.indentCount = 0;
          var style = state.tokenizer(stream, state);
          var current = stream.current();
          if (current === "@return" || current === "}") {
            dedent(state);
          }
          if (style !== null) {
            var startOfToken = stream.pos - current.length;
            var withCurrentIndent = startOfToken + config.indentUnit * state.indentCount;
            var newScopes = [];
            for (var i = 0; i < state.scopes.length; i++) {
              var scope = state.scopes[i];
              if (scope.offset <= withCurrentIndent)
                newScopes.push(scope);
            }
            state.scopes = newScopes;
          }
          return style;
        }
        return {
          startState: function() {
            return {
              tokenizer: tokenBase,
              scopes: [{ offset: 0, type: "sass" }],
              indentCount: 0,
              cursorHalf: 0,
              // cursor half tells us if cursor lies after (1)
              // or before (0) colon (well... more or less)
              definedVars: [],
              definedMixins: []
            };
          },
          token: function(stream, state) {
            var style = tokenLexer(stream, state);
            state.lastToken = { style, content: stream.current() };
            return style;
          },
          indent: function(state) {
            return state.scopes[0].offset;
          },
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          lineComment: "//",
          fold: "indent"
        };
      }, "css");
      CodeMirror2.defineMIME("text/x-sass", "sass");
    });
  }
});

// node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/stylus/stylus.js
var require_stylus = __commonJS({
  "node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/stylus/stylus.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror2) {
      "use strict";
      CodeMirror2.defineMode("stylus", function(config) {
        var indentUnit = config.indentUnit, indentUnitString = "", tagKeywords = keySet(tagKeywords_), tagVariablesRegexp = /^(a|b|i|s|col|em)$/i, propertyKeywords = keySet(propertyKeywords_), nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_), valueKeywords = keySet(valueKeywords_), colorKeywords = keySet(colorKeywords_), documentTypes = keySet(documentTypes_), documentTypesRegexp = wordRegexp(documentTypes_), mediaFeatures = keySet(mediaFeatures_), mediaTypes = keySet(mediaTypes_), fontProperties = keySet(fontProperties_), operatorsRegexp = /^\s*([.]{2,3}|&&|\|\||\*\*|[?!=:]?=|[-+*\/%<>]=?|\?:|\~)/, wordOperatorKeywordsRegexp = wordRegexp(wordOperatorKeywords_), blockKeywords = keySet(blockKeywords_), vendorPrefixesRegexp = new RegExp(/^\-(moz|ms|o|webkit)-/i), commonAtoms = keySet(commonAtoms_), firstWordMatch = "", states = {}, ch, style, type, override;
        while (indentUnitString.length < indentUnit)
          indentUnitString += " ";
        function tokenBase(stream, state) {
          firstWordMatch = stream.string.match(/(^[\w-]+\s*=\s*$)|(^\s*[\w-]+\s*=\s*[\w-])|(^\s*(\.|#|@|\$|\&|\[|\d|\+|::?|\{|\>|~|\/)?\s*[\w-]*([a-z0-9-]|\*|\/\*)(\(|,)?)/);
          state.context.line.firstWord = firstWordMatch ? firstWordMatch[0].replace(/^\s*/, "") : "";
          state.context.line.indent = stream.indentation();
          ch = stream.peek();
          if (stream.match("//")) {
            stream.skipToEnd();
            return ["comment", "comment"];
          }
          if (stream.match("/*")) {
            state.tokenize = tokenCComment;
            return tokenCComment(stream, state);
          }
          if (ch == '"' || ch == "'") {
            stream.next();
            state.tokenize = tokenString(ch);
            return state.tokenize(stream, state);
          }
          if (ch == "@") {
            stream.next();
            stream.eatWhile(/[\w\\-]/);
            return ["def", stream.current()];
          }
          if (ch == "#") {
            stream.next();
            if (stream.match(/^[0-9a-f]{3}([0-9a-f]([0-9a-f]{2}){0,2})?\b(?!-)/i)) {
              return ["atom", "atom"];
            }
            if (stream.match(/^[a-z][\w-]*/i)) {
              return ["builtin", "hash"];
            }
          }
          if (stream.match(vendorPrefixesRegexp)) {
            return ["meta", "vendor-prefixes"];
          }
          if (stream.match(/^-?[0-9]?\.?[0-9]/)) {
            stream.eatWhile(/[a-z%]/i);
            return ["number", "unit"];
          }
          if (ch == "!") {
            stream.next();
            return [stream.match(/^(important|optional)/i) ? "keyword" : "operator", "important"];
          }
          if (ch == "." && stream.match(/^\.[a-z][\w-]*/i)) {
            return ["qualifier", "qualifier"];
          }
          if (stream.match(documentTypesRegexp)) {
            if (stream.peek() == "(")
              state.tokenize = tokenParenthesized;
            return ["property", "word"];
          }
          if (stream.match(/^[a-z][\w-]*\(/i)) {
            stream.backUp(1);
            return ["keyword", "mixin"];
          }
          if (stream.match(/^(\+|-)[a-z][\w-]*\(/i)) {
            stream.backUp(1);
            return ["keyword", "block-mixin"];
          }
          if (stream.string.match(/^\s*&/) && stream.match(/^[-_]+[a-z][\w-]*/)) {
            return ["qualifier", "qualifier"];
          }
          if (stream.match(/^(\/|&)(-|_|:|\.|#|[a-z])/)) {
            stream.backUp(1);
            return ["variable-3", "reference"];
          }
          if (stream.match(/^&{1}\s*$/)) {
            return ["variable-3", "reference"];
          }
          if (stream.match(wordOperatorKeywordsRegexp)) {
            return ["operator", "operator"];
          }
          if (stream.match(/^\$?[-_]*[a-z0-9]+[\w-]*/i)) {
            if (stream.match(/^(\.|\[)[\w-\'\"\]]+/i, false)) {
              if (!wordIsTag(stream.current())) {
                stream.match(".");
                return ["variable-2", "variable-name"];
              }
            }
            return ["variable-2", "word"];
          }
          if (stream.match(operatorsRegexp)) {
            return ["operator", stream.current()];
          }
          if (/[:;,{}\[\]\(\)]/.test(ch)) {
            stream.next();
            return [null, ch];
          }
          stream.next();
          return [null, null];
        }
        function tokenCComment(stream, state) {
          var maybeEnd = false, ch2;
          while ((ch2 = stream.next()) != null) {
            if (maybeEnd && ch2 == "/") {
              state.tokenize = null;
              break;
            }
            maybeEnd = ch2 == "*";
          }
          return ["comment", "comment"];
        }
        function tokenString(quote) {
          return function(stream, state) {
            var escaped = false, ch2;
            while ((ch2 = stream.next()) != null) {
              if (ch2 == quote && !escaped) {
                if (quote == ")")
                  stream.backUp(1);
                break;
              }
              escaped = !escaped && ch2 == "\\";
            }
            if (ch2 == quote || !escaped && quote != ")")
              state.tokenize = null;
            return ["string", "string"];
          };
        }
        function tokenParenthesized(stream, state) {
          stream.next();
          if (!stream.match(/\s*[\"\')]/, false))
            state.tokenize = tokenString(")");
          else
            state.tokenize = null;
          return [null, "("];
        }
        function Context(type2, indent, prev, line) {
          this.type = type2;
          this.indent = indent;
          this.prev = prev;
          this.line = line || { firstWord: "", indent: 0 };
        }
        function pushContext(state, stream, type2, indent) {
          indent = indent >= 0 ? indent : indentUnit;
          state.context = new Context(type2, stream.indentation() + indent, state.context);
          return type2;
        }
        function popContext(state, currentIndent) {
          var contextIndent = state.context.indent - indentUnit;
          currentIndent = currentIndent || false;
          state.context = state.context.prev;
          if (currentIndent)
            state.context.indent = contextIndent;
          return state.context.type;
        }
        function pass(type2, stream, state) {
          return states[state.context.type](type2, stream, state);
        }
        function popAndPass(type2, stream, state, n) {
          for (var i = n || 1; i > 0; i--)
            state.context = state.context.prev;
          return pass(type2, stream, state);
        }
        function wordIsTag(word) {
          return word.toLowerCase() in tagKeywords;
        }
        function wordIsProperty(word) {
          word = word.toLowerCase();
          return word in propertyKeywords || word in fontProperties;
        }
        function wordIsBlock(word) {
          return word.toLowerCase() in blockKeywords;
        }
        function wordIsVendorPrefix(word) {
          return word.toLowerCase().match(vendorPrefixesRegexp);
        }
        function wordAsValue(word) {
          var wordLC = word.toLowerCase();
          var override2 = "variable-2";
          if (wordIsTag(word))
            override2 = "tag";
          else if (wordIsBlock(word))
            override2 = "block-keyword";
          else if (wordIsProperty(word))
            override2 = "property";
          else if (wordLC in valueKeywords || wordLC in commonAtoms)
            override2 = "atom";
          else if (wordLC == "return" || wordLC in colorKeywords)
            override2 = "keyword";
          else if (word.match(/^[A-Z]/))
            override2 = "string";
          return override2;
        }
        function typeIsBlock(type2, stream) {
          return endOfLine(stream) && (type2 == "{" || type2 == "]" || type2 == "hash" || type2 == "qualifier") || type2 == "block-mixin";
        }
        function typeIsInterpolation(type2, stream) {
          return type2 == "{" && stream.match(/^\s*\$?[\w-]+/i, false);
        }
        function typeIsPseudo(type2, stream) {
          return type2 == ":" && stream.match(/^[a-z-]+/, false);
        }
        function startOfLine(stream) {
          return stream.sol() || stream.string.match(new RegExp("^\\s*" + escapeRegExp(stream.current())));
        }
        function endOfLine(stream) {
          return stream.eol() || stream.match(/^\s*$/, false);
        }
        function firstWordOfLine(line) {
          var re = /^\s*[-_]*[a-z0-9]+[\w-]*/i;
          var result = typeof line == "string" ? line.match(re) : line.string.match(re);
          return result ? result[0].replace(/^\s*/, "") : "";
        }
        states.block = function(type2, stream, state) {
          if (type2 == "comment" && startOfLine(stream) || type2 == "," && endOfLine(stream) || type2 == "mixin") {
            return pushContext(state, stream, "block", 0);
          }
          if (typeIsInterpolation(type2, stream)) {
            return pushContext(state, stream, "interpolation");
          }
          if (endOfLine(stream) && type2 == "]") {
            if (!/^\s*(\.|#|:|\[|\*|&)/.test(stream.string) && !wordIsTag(firstWordOfLine(stream))) {
              return pushContext(state, stream, "block", 0);
            }
          }
          if (typeIsBlock(type2, stream)) {
            return pushContext(state, stream, "block");
          }
          if (type2 == "}" && endOfLine(stream)) {
            return pushContext(state, stream, "block", 0);
          }
          if (type2 == "variable-name") {
            if (stream.string.match(/^\s?\$[\w-\.\[\]\'\"]+$/) || wordIsBlock(firstWordOfLine(stream))) {
              return pushContext(state, stream, "variableName");
            } else {
              return pushContext(state, stream, "variableName", 0);
            }
          }
          if (type2 == "=") {
            if (!endOfLine(stream) && !wordIsBlock(firstWordOfLine(stream))) {
              return pushContext(state, stream, "block", 0);
            }
            return pushContext(state, stream, "block");
          }
          if (type2 == "*") {
            if (endOfLine(stream) || stream.match(/\s*(,|\.|#|\[|:|{)/, false)) {
              override = "tag";
              return pushContext(state, stream, "block");
            }
          }
          if (typeIsPseudo(type2, stream)) {
            return pushContext(state, stream, "pseudo");
          }
          if (/@(font-face|media|supports|(-moz-)?document)/.test(type2)) {
            return pushContext(state, stream, endOfLine(stream) ? "block" : "atBlock");
          }
          if (/@(-(moz|ms|o|webkit)-)?keyframes$/.test(type2)) {
            return pushContext(state, stream, "keyframes");
          }
          if (/@extends?/.test(type2)) {
            return pushContext(state, stream, "extend", 0);
          }
          if (type2 && type2.charAt(0) == "@") {
            if (stream.indentation() > 0 && wordIsProperty(stream.current().slice(1))) {
              override = "variable-2";
              return "block";
            }
            if (/(@import|@require|@charset)/.test(type2)) {
              return pushContext(state, stream, "block", 0);
            }
            return pushContext(state, stream, "block");
          }
          if (type2 == "reference" && endOfLine(stream)) {
            return pushContext(state, stream, "block");
          }
          if (type2 == "(") {
            return pushContext(state, stream, "parens");
          }
          if (type2 == "vendor-prefixes") {
            return pushContext(state, stream, "vendorPrefixes");
          }
          if (type2 == "word") {
            var word = stream.current();
            override = wordAsValue(word);
            if (override == "property") {
              if (startOfLine(stream)) {
                return pushContext(state, stream, "block", 0);
              } else {
                override = "atom";
                return "block";
              }
            }
            if (override == "tag") {
              if (/embed|menu|pre|progress|sub|table/.test(word)) {
                if (wordIsProperty(firstWordOfLine(stream))) {
                  override = "atom";
                  return "block";
                }
              }
              if (stream.string.match(new RegExp("\\[\\s*" + word + "|" + word + "\\s*\\]"))) {
                override = "atom";
                return "block";
              }
              if (tagVariablesRegexp.test(word)) {
                if (startOfLine(stream) && stream.string.match(/=/) || !startOfLine(stream) && !stream.string.match(/^(\s*\.|#|\&|\[|\/|>|\*)/) && !wordIsTag(firstWordOfLine(stream))) {
                  override = "variable-2";
                  if (wordIsBlock(firstWordOfLine(stream)))
                    return "block";
                  return pushContext(state, stream, "block", 0);
                }
              }
              if (endOfLine(stream))
                return pushContext(state, stream, "block");
            }
            if (override == "block-keyword") {
              override = "keyword";
              if (stream.current(/(if|unless)/) && !startOfLine(stream)) {
                return "block";
              }
              return pushContext(state, stream, "block");
            }
            if (word == "return")
              return pushContext(state, stream, "block", 0);
            if (override == "variable-2" && stream.string.match(/^\s?\$[\w-\.\[\]\'\"]+$/)) {
              return pushContext(state, stream, "block");
            }
          }
          return state.context.type;
        };
        states.parens = function(type2, stream, state) {
          if (type2 == "(")
            return pushContext(state, stream, "parens");
          if (type2 == ")") {
            if (state.context.prev.type == "parens") {
              return popContext(state);
            }
            if (stream.string.match(/^[a-z][\w-]*\(/i) && endOfLine(stream) || wordIsBlock(firstWordOfLine(stream)) || /(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(firstWordOfLine(stream)) || !stream.string.match(/^-?[a-z][\w-\.\[\]\'\"]*\s*=/) && wordIsTag(firstWordOfLine(stream))) {
              return pushContext(state, stream, "block");
            }
            if (stream.string.match(/^[\$-]?[a-z][\w-\.\[\]\'\"]*\s*=/) || stream.string.match(/^\s*(\(|\)|[0-9])/) || stream.string.match(/^\s+[a-z][\w-]*\(/i) || stream.string.match(/^\s+[\$-]?[a-z]/i)) {
              return pushContext(state, stream, "block", 0);
            }
            if (endOfLine(stream))
              return pushContext(state, stream, "block");
            else
              return pushContext(state, stream, "block", 0);
          }
          if (type2 && type2.charAt(0) == "@" && wordIsProperty(stream.current().slice(1))) {
            override = "variable-2";
          }
          if (type2 == "word") {
            var word = stream.current();
            override = wordAsValue(word);
            if (override == "tag" && tagVariablesRegexp.test(word)) {
              override = "variable-2";
            }
            if (override == "property" || word == "to")
              override = "atom";
          }
          if (type2 == "variable-name") {
            return pushContext(state, stream, "variableName");
          }
          if (typeIsPseudo(type2, stream)) {
            return pushContext(state, stream, "pseudo");
          }
          return state.context.type;
        };
        states.vendorPrefixes = function(type2, stream, state) {
          if (type2 == "word") {
            override = "property";
            return pushContext(state, stream, "block", 0);
          }
          return popContext(state);
        };
        states.pseudo = function(type2, stream, state) {
          if (!wordIsProperty(firstWordOfLine(stream.string))) {
            stream.match(/^[a-z-]+/);
            override = "variable-3";
            if (endOfLine(stream))
              return pushContext(state, stream, "block");
            return popContext(state);
          }
          return popAndPass(type2, stream, state);
        };
        states.atBlock = function(type2, stream, state) {
          if (type2 == "(")
            return pushContext(state, stream, "atBlock_parens");
          if (typeIsBlock(type2, stream)) {
            return pushContext(state, stream, "block");
          }
          if (typeIsInterpolation(type2, stream)) {
            return pushContext(state, stream, "interpolation");
          }
          if (type2 == "word") {
            var word = stream.current().toLowerCase();
            if (/^(only|not|and|or)$/.test(word))
              override = "keyword";
            else if (documentTypes.hasOwnProperty(word))
              override = "tag";
            else if (mediaTypes.hasOwnProperty(word))
              override = "attribute";
            else if (mediaFeatures.hasOwnProperty(word))
              override = "property";
            else if (nonStandardPropertyKeywords.hasOwnProperty(word))
              override = "string-2";
            else
              override = wordAsValue(stream.current());
            if (override == "tag" && endOfLine(stream)) {
              return pushContext(state, stream, "block");
            }
          }
          if (type2 == "operator" && /^(not|and|or)$/.test(stream.current())) {
            override = "keyword";
          }
          return state.context.type;
        };
        states.atBlock_parens = function(type2, stream, state) {
          if (type2 == "{" || type2 == "}")
            return state.context.type;
          if (type2 == ")") {
            if (endOfLine(stream))
              return pushContext(state, stream, "block");
            else
              return pushContext(state, stream, "atBlock");
          }
          if (type2 == "word") {
            var word = stream.current().toLowerCase();
            override = wordAsValue(word);
            if (/^(max|min)/.test(word))
              override = "property";
            if (override == "tag") {
              tagVariablesRegexp.test(word) ? override = "variable-2" : override = "atom";
            }
            return state.context.type;
          }
          return states.atBlock(type2, stream, state);
        };
        states.keyframes = function(type2, stream, state) {
          if (stream.indentation() == "0" && (type2 == "}" && startOfLine(stream) || type2 == "]" || type2 == "hash" || type2 == "qualifier" || wordIsTag(stream.current()))) {
            return popAndPass(type2, stream, state);
          }
          if (type2 == "{")
            return pushContext(state, stream, "keyframes");
          if (type2 == "}") {
            if (startOfLine(stream))
              return popContext(state, true);
            else
              return pushContext(state, stream, "keyframes");
          }
          if (type2 == "unit" && /^[0-9]+\%$/.test(stream.current())) {
            return pushContext(state, stream, "keyframes");
          }
          if (type2 == "word") {
            override = wordAsValue(stream.current());
            if (override == "block-keyword") {
              override = "keyword";
              return pushContext(state, stream, "keyframes");
            }
          }
          if (/@(font-face|media|supports|(-moz-)?document)/.test(type2)) {
            return pushContext(state, stream, endOfLine(stream) ? "block" : "atBlock");
          }
          if (type2 == "mixin") {
            return pushContext(state, stream, "block", 0);
          }
          return state.context.type;
        };
        states.interpolation = function(type2, stream, state) {
          if (type2 == "{")
            popContext(state) && pushContext(state, stream, "block");
          if (type2 == "}") {
            if (stream.string.match(/^\s*(\.|#|:|\[|\*|&|>|~|\+|\/)/i) || stream.string.match(/^\s*[a-z]/i) && wordIsTag(firstWordOfLine(stream))) {
              return pushContext(state, stream, "block");
            }
            if (!stream.string.match(/^(\{|\s*\&)/) || stream.match(/\s*[\w-]/, false)) {
              return pushContext(state, stream, "block", 0);
            }
            return pushContext(state, stream, "block");
          }
          if (type2 == "variable-name") {
            return pushContext(state, stream, "variableName", 0);
          }
          if (type2 == "word") {
            override = wordAsValue(stream.current());
            if (override == "tag")
              override = "atom";
          }
          return state.context.type;
        };
        states.extend = function(type2, stream, state) {
          if (type2 == "[" || type2 == "=")
            return "extend";
          if (type2 == "]")
            return popContext(state);
          if (type2 == "word") {
            override = wordAsValue(stream.current());
            return "extend";
          }
          return popContext(state);
        };
        states.variableName = function(type2, stream, state) {
          if (type2 == "string" || type2 == "[" || type2 == "]" || stream.current().match(/^(\.|\$)/)) {
            if (stream.current().match(/^\.[\w-]+/i))
              override = "variable-2";
            return "variableName";
          }
          return popAndPass(type2, stream, state);
        };
        return {
          startState: function(base) {
            return {
              tokenize: null,
              state: "block",
              context: new Context("block", base || 0, null)
            };
          },
          token: function(stream, state) {
            if (!state.tokenize && stream.eatSpace())
              return null;
            style = (state.tokenize || tokenBase)(stream, state);
            if (style && typeof style == "object") {
              type = style[1];
              style = style[0];
            }
            override = style;
            state.state = states[state.state](type, stream, state);
            return override;
          },
          indent: function(state, textAfter, line) {
            var cx = state.context, ch2 = textAfter && textAfter.charAt(0), indent = cx.indent, lineFirstWord = firstWordOfLine(textAfter), lineIndent = line.match(/^\s*/)[0].replace(/\t/g, indentUnitString).length, prevLineFirstWord = state.context.prev ? state.context.prev.line.firstWord : "", prevLineIndent = state.context.prev ? state.context.prev.line.indent : lineIndent;
            if (cx.prev && (ch2 == "}" && (cx.type == "block" || cx.type == "atBlock" || cx.type == "keyframes") || ch2 == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") || ch2 == "{" && cx.type == "at")) {
              indent = cx.indent - indentUnit;
            } else if (!/(\})/.test(ch2)) {
              if (/@|\$|\d/.test(ch2) || /^\{/.test(textAfter) || /^\s*\/(\/|\*)/.test(textAfter) || /^\s*\/\*/.test(prevLineFirstWord) || /^\s*[\w-\.\[\]\'\"]+\s*(\?|:|\+)?=/i.test(textAfter) || /^(\+|-)?[a-z][\w-]*\(/i.test(textAfter) || /^return/.test(textAfter) || wordIsBlock(lineFirstWord)) {
                indent = lineIndent;
              } else if (/(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(ch2) || wordIsTag(lineFirstWord)) {
                if (/\,\s*$/.test(prevLineFirstWord)) {
                  indent = prevLineIndent;
                } else if (/^\s+/.test(line) && (/(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(prevLineFirstWord) || wordIsTag(prevLineFirstWord))) {
                  indent = lineIndent <= prevLineIndent ? prevLineIndent : prevLineIndent + indentUnit;
                } else {
                  indent = lineIndent;
                }
              } else if (!/,\s*$/.test(line) && (wordIsVendorPrefix(lineFirstWord) || wordIsProperty(lineFirstWord))) {
                if (wordIsBlock(prevLineFirstWord)) {
                  indent = lineIndent <= prevLineIndent ? prevLineIndent : prevLineIndent + indentUnit;
                } else if (/^\{/.test(prevLineFirstWord)) {
                  indent = lineIndent <= prevLineIndent ? lineIndent : prevLineIndent + indentUnit;
                } else if (wordIsVendorPrefix(prevLineFirstWord) || wordIsProperty(prevLineFirstWord)) {
                  indent = lineIndent >= prevLineIndent ? prevLineIndent : lineIndent;
                } else if (/^(\.|#|:|\[|\*|&|@|\+|\-|>|~|\/)/.test(prevLineFirstWord) || /=\s*$/.test(prevLineFirstWord) || wordIsTag(prevLineFirstWord) || /^\$[\w-\.\[\]\'\"]/.test(prevLineFirstWord)) {
                  indent = prevLineIndent + indentUnit;
                } else {
                  indent = lineIndent;
                }
              }
            }
            return indent;
          },
          electricChars: "}",
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          blockCommentContinue: " * ",
          lineComment: "//",
          fold: "indent"
        };
      });
      var tagKeywords_ = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "bgsound", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "nobr", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video"];
      var documentTypes_ = ["domain", "regexp", "url-prefix", "url"];
      var mediaTypes_ = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"];
      var mediaFeatures_ = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid", "dynamic-range", "video-dynamic-range"];
      var propertyKeywords_ = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-position", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode", "font-smoothing", "osx-font-smoothing"];
      var nonStandardPropertyKeywords_ = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"];
      var fontProperties_ = ["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"];
      var colorKeywords_ = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
      var valueKeywords_ = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "column", "compact", "condensed", "conic-gradient", "contain", "content", "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hebrew", "help", "hidden", "hide", "high", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "malayalam", "match", "matrix", "matrix3d", "media-play-button", "media-slider", "media-sliderthumb", "media-volume-slider", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeating-conic-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row-resize", "rtl", "run-in", "running", "s-resize", "sans-serif", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "spell-out", "square", "square-button", "standard", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "x-large", "x-small", "xor", "xx-large", "xx-small", "bicubic", "optimizespeed", "grayscale", "row", "row-reverse", "wrap", "wrap-reverse", "column-reverse", "flex-start", "flex-end", "space-between", "space-around", "unset"];
      var wordOperatorKeywords_ = ["in", "and", "or", "not", "is not", "is a", "is", "isnt", "defined", "if unless"], blockKeywords_ = ["for", "if", "else", "unless", "from", "to"], commonAtoms_ = ["null", "true", "false", "href", "title", "type", "not-allowed", "readonly", "disabled"], commonDef_ = ["@font-face", "@keyframes", "@media", "@viewport", "@page", "@host", "@supports", "@block", "@css"];
      var hintWords = tagKeywords_.concat(
        documentTypes_,
        mediaTypes_,
        mediaFeatures_,
        propertyKeywords_,
        nonStandardPropertyKeywords_,
        colorKeywords_,
        valueKeywords_,
        fontProperties_,
        wordOperatorKeywords_,
        blockKeywords_,
        commonAtoms_,
        commonDef_
      );
      function wordRegexp(words) {
        words = words.sort(function(a, b) {
          return b > a;
        });
        return new RegExp("^((" + words.join(")|(") + "))\\b");
      }
      function keySet(array) {
        var keys = {};
        for (var i = 0; i < array.length; ++i)
          keys[array[i]] = true;
        return keys;
      }
      function escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      }
      CodeMirror2.registerHelper("hintWords", "stylus", hintWords);
      CodeMirror2.defineMIME("text/x-styl", "stylus");
    });
  }
});

// node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/pug/pug.js
var require_pug = __commonJS({
  "node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/pug/pug.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror(), require_javascript(), require_css(), require_htmlmixed());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "../javascript/javascript", "../css/css", "../htmlmixed/htmlmixed"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror2) {
      "use strict";
      CodeMirror2.defineMode("pug", function(config) {
        var KEYWORD = "keyword";
        var DOCTYPE = "meta";
        var ID = "builtin";
        var CLASS = "qualifier";
        var ATTRS_NEST = {
          "{": "}",
          "(": ")",
          "[": "]"
        };
        var jsMode = CodeMirror2.getMode(config, "javascript");
        function State() {
          this.javaScriptLine = false;
          this.javaScriptLineExcludesColon = false;
          this.javaScriptArguments = false;
          this.javaScriptArgumentsDepth = 0;
          this.isInterpolating = false;
          this.interpolationNesting = 0;
          this.jsState = CodeMirror2.startState(jsMode);
          this.restOfLine = "";
          this.isIncludeFiltered = false;
          this.isEach = false;
          this.lastTag = "";
          this.scriptType = "";
          this.isAttrs = false;
          this.attrsNest = [];
          this.inAttributeName = true;
          this.attributeIsType = false;
          this.attrValue = "";
          this.indentOf = Infinity;
          this.indentToken = "";
          this.innerMode = null;
          this.innerState = null;
          this.innerModeForLine = false;
        }
        State.prototype.copy = function() {
          var res = new State();
          res.javaScriptLine = this.javaScriptLine;
          res.javaScriptLineExcludesColon = this.javaScriptLineExcludesColon;
          res.javaScriptArguments = this.javaScriptArguments;
          res.javaScriptArgumentsDepth = this.javaScriptArgumentsDepth;
          res.isInterpolating = this.isInterpolating;
          res.interpolationNesting = this.interpolationNesting;
          res.jsState = CodeMirror2.copyState(jsMode, this.jsState);
          res.innerMode = this.innerMode;
          if (this.innerMode && this.innerState) {
            res.innerState = CodeMirror2.copyState(this.innerMode, this.innerState);
          }
          res.restOfLine = this.restOfLine;
          res.isIncludeFiltered = this.isIncludeFiltered;
          res.isEach = this.isEach;
          res.lastTag = this.lastTag;
          res.scriptType = this.scriptType;
          res.isAttrs = this.isAttrs;
          res.attrsNest = this.attrsNest.slice();
          res.inAttributeName = this.inAttributeName;
          res.attributeIsType = this.attributeIsType;
          res.attrValue = this.attrValue;
          res.indentOf = this.indentOf;
          res.indentToken = this.indentToken;
          res.innerModeForLine = this.innerModeForLine;
          return res;
        };
        function javaScript(stream, state) {
          if (stream.sol()) {
            state.javaScriptLine = false;
            state.javaScriptLineExcludesColon = false;
          }
          if (state.javaScriptLine) {
            if (state.javaScriptLineExcludesColon && stream.peek() === ":") {
              state.javaScriptLine = false;
              state.javaScriptLineExcludesColon = false;
              return;
            }
            var tok = jsMode.token(stream, state.jsState);
            if (stream.eol())
              state.javaScriptLine = false;
            return tok || true;
          }
        }
        function javaScriptArguments(stream, state) {
          if (state.javaScriptArguments) {
            if (state.javaScriptArgumentsDepth === 0 && stream.peek() !== "(") {
              state.javaScriptArguments = false;
              return;
            }
            if (stream.peek() === "(") {
              state.javaScriptArgumentsDepth++;
            } else if (stream.peek() === ")") {
              state.javaScriptArgumentsDepth--;
            }
            if (state.javaScriptArgumentsDepth === 0) {
              state.javaScriptArguments = false;
              return;
            }
            var tok = jsMode.token(stream, state.jsState);
            return tok || true;
          }
        }
        function yieldStatement(stream) {
          if (stream.match(/^yield\b/)) {
            return "keyword";
          }
        }
        function doctype(stream) {
          if (stream.match(/^(?:doctype) *([^\n]+)?/)) {
            return DOCTYPE;
          }
        }
        function interpolation(stream, state) {
          if (stream.match("#{")) {
            state.isInterpolating = true;
            state.interpolationNesting = 0;
            return "punctuation";
          }
        }
        function interpolationContinued(stream, state) {
          if (state.isInterpolating) {
            if (stream.peek() === "}") {
              state.interpolationNesting--;
              if (state.interpolationNesting < 0) {
                stream.next();
                state.isInterpolating = false;
                return "punctuation";
              }
            } else if (stream.peek() === "{") {
              state.interpolationNesting++;
            }
            return jsMode.token(stream, state.jsState) || true;
          }
        }
        function caseStatement(stream, state) {
          if (stream.match(/^case\b/)) {
            state.javaScriptLine = true;
            return KEYWORD;
          }
        }
        function when(stream, state) {
          if (stream.match(/^when\b/)) {
            state.javaScriptLine = true;
            state.javaScriptLineExcludesColon = true;
            return KEYWORD;
          }
        }
        function defaultStatement(stream) {
          if (stream.match(/^default\b/)) {
            return KEYWORD;
          }
        }
        function extendsStatement(stream, state) {
          if (stream.match(/^extends?\b/)) {
            state.restOfLine = "string";
            return KEYWORD;
          }
        }
        function append(stream, state) {
          if (stream.match(/^append\b/)) {
            state.restOfLine = "variable";
            return KEYWORD;
          }
        }
        function prepend(stream, state) {
          if (stream.match(/^prepend\b/)) {
            state.restOfLine = "variable";
            return KEYWORD;
          }
        }
        function block(stream, state) {
          if (stream.match(/^block\b *(?:(prepend|append)\b)?/)) {
            state.restOfLine = "variable";
            return KEYWORD;
          }
        }
        function include(stream, state) {
          if (stream.match(/^include\b/)) {
            state.restOfLine = "string";
            return KEYWORD;
          }
        }
        function includeFiltered(stream, state) {
          if (stream.match(/^include:([a-zA-Z0-9\-]+)/, false) && stream.match("include")) {
            state.isIncludeFiltered = true;
            return KEYWORD;
          }
        }
        function includeFilteredContinued(stream, state) {
          if (state.isIncludeFiltered) {
            var tok = filter(stream, state);
            state.isIncludeFiltered = false;
            state.restOfLine = "string";
            return tok;
          }
        }
        function mixin(stream, state) {
          if (stream.match(/^mixin\b/)) {
            state.javaScriptLine = true;
            return KEYWORD;
          }
        }
        function call(stream, state) {
          if (stream.match(/^\+([-\w]+)/)) {
            if (!stream.match(/^\( *[-\w]+ *=/, false)) {
              state.javaScriptArguments = true;
              state.javaScriptArgumentsDepth = 0;
            }
            return "variable";
          }
          if (stream.match("+#{", false)) {
            stream.next();
            state.mixinCallAfter = true;
            return interpolation(stream, state);
          }
        }
        function callArguments(stream, state) {
          if (state.mixinCallAfter) {
            state.mixinCallAfter = false;
            if (!stream.match(/^\( *[-\w]+ *=/, false)) {
              state.javaScriptArguments = true;
              state.javaScriptArgumentsDepth = 0;
            }
            return true;
          }
        }
        function conditional(stream, state) {
          if (stream.match(/^(if|unless|else if|else)\b/)) {
            state.javaScriptLine = true;
            return KEYWORD;
          }
        }
        function each(stream, state) {
          if (stream.match(/^(- *)?(each|for)\b/)) {
            state.isEach = true;
            return KEYWORD;
          }
        }
        function eachContinued(stream, state) {
          if (state.isEach) {
            if (stream.match(/^ in\b/)) {
              state.javaScriptLine = true;
              state.isEach = false;
              return KEYWORD;
            } else if (stream.sol() || stream.eol()) {
              state.isEach = false;
            } else if (stream.next()) {
              while (!stream.match(/^ in\b/, false) && stream.next())
                ;
              return "variable";
            }
          }
        }
        function whileStatement(stream, state) {
          if (stream.match(/^while\b/)) {
            state.javaScriptLine = true;
            return KEYWORD;
          }
        }
        function tag(stream, state) {
          var captures;
          if (captures = stream.match(/^(\w(?:[-:\w]*\w)?)\/?/)) {
            state.lastTag = captures[1].toLowerCase();
            if (state.lastTag === "script") {
              state.scriptType = "application/javascript";
            }
            return "tag";
          }
        }
        function filter(stream, state) {
          if (stream.match(/^:([\w\-]+)/)) {
            var innerMode2;
            if (config && config.innerModes) {
              innerMode2 = config.innerModes(stream.current().substring(1));
            }
            if (!innerMode2) {
              innerMode2 = stream.current().substring(1);
            }
            if (typeof innerMode2 === "string") {
              innerMode2 = CodeMirror2.getMode(config, innerMode2);
            }
            setInnerMode(stream, state, innerMode2);
            return "atom";
          }
        }
        function code(stream, state) {
          if (stream.match(/^(!?=|-)/)) {
            state.javaScriptLine = true;
            return "punctuation";
          }
        }
        function id(stream) {
          if (stream.match(/^#([\w-]+)/)) {
            return ID;
          }
        }
        function className(stream) {
          if (stream.match(/^\.([\w-]+)/)) {
            return CLASS;
          }
        }
        function attrs(stream, state) {
          if (stream.peek() == "(") {
            stream.next();
            state.isAttrs = true;
            state.attrsNest = [];
            state.inAttributeName = true;
            state.attrValue = "";
            state.attributeIsType = false;
            return "punctuation";
          }
        }
        function attrsContinued(stream, state) {
          if (state.isAttrs) {
            if (ATTRS_NEST[stream.peek()]) {
              state.attrsNest.push(ATTRS_NEST[stream.peek()]);
            }
            if (state.attrsNest[state.attrsNest.length - 1] === stream.peek()) {
              state.attrsNest.pop();
            } else if (stream.eat(")")) {
              state.isAttrs = false;
              return "punctuation";
            }
            if (state.inAttributeName && stream.match(/^[^=,\)!]+/)) {
              if (stream.peek() === "=" || stream.peek() === "!") {
                state.inAttributeName = false;
                state.jsState = CodeMirror2.startState(jsMode);
                if (state.lastTag === "script" && stream.current().trim().toLowerCase() === "type") {
                  state.attributeIsType = true;
                } else {
                  state.attributeIsType = false;
                }
              }
              return "attribute";
            }
            var tok = jsMode.token(stream, state.jsState);
            if (state.attributeIsType && tok === "string") {
              state.scriptType = stream.current().toString();
            }
            if (state.attrsNest.length === 0 && (tok === "string" || tok === "variable" || tok === "keyword")) {
              try {
                Function("", "var x " + state.attrValue.replace(/,\s*$/, "").replace(/^!/, ""));
                state.inAttributeName = true;
                state.attrValue = "";
                stream.backUp(stream.current().length);
                return attrsContinued(stream, state);
              } catch (ex) {
              }
            }
            state.attrValue += stream.current();
            return tok || true;
          }
        }
        function attributesBlock(stream, state) {
          if (stream.match(/^&attributes\b/)) {
            state.javaScriptArguments = true;
            state.javaScriptArgumentsDepth = 0;
            return "keyword";
          }
        }
        function indent(stream) {
          if (stream.sol() && stream.eatSpace()) {
            return "indent";
          }
        }
        function comment(stream, state) {
          if (stream.match(/^ *\/\/(-)?([^\n]*)/)) {
            state.indentOf = stream.indentation();
            state.indentToken = "comment";
            return "comment";
          }
        }
        function colon(stream) {
          if (stream.match(/^: */)) {
            return "colon";
          }
        }
        function text(stream, state) {
          if (stream.match(/^(?:\| ?| )([^\n]+)/)) {
            return "string";
          }
          if (stream.match(/^(<[^\n]*)/, false)) {
            setInnerMode(stream, state, "htmlmixed");
            state.innerModeForLine = true;
            return innerMode(stream, state, true);
          }
        }
        function dot(stream, state) {
          if (stream.eat(".")) {
            var innerMode2 = null;
            if (state.lastTag === "script" && state.scriptType.toLowerCase().indexOf("javascript") != -1) {
              innerMode2 = state.scriptType.toLowerCase().replace(/"|'/g, "");
            } else if (state.lastTag === "style") {
              innerMode2 = "css";
            }
            setInnerMode(stream, state, innerMode2);
            return "dot";
          }
        }
        function fail(stream) {
          stream.next();
          return null;
        }
        function setInnerMode(stream, state, mode) {
          mode = CodeMirror2.mimeModes[mode] || mode;
          mode = config.innerModes ? config.innerModes(mode) || mode : mode;
          mode = CodeMirror2.mimeModes[mode] || mode;
          mode = CodeMirror2.getMode(config, mode);
          state.indentOf = stream.indentation();
          if (mode && mode.name !== "null") {
            state.innerMode = mode;
          } else {
            state.indentToken = "string";
          }
        }
        function innerMode(stream, state, force) {
          if (stream.indentation() > state.indentOf || state.innerModeForLine && !stream.sol() || force) {
            if (state.innerMode) {
              if (!state.innerState) {
                state.innerState = state.innerMode.startState ? CodeMirror2.startState(state.innerMode, stream.indentation()) : {};
              }
              return stream.hideFirstChars(state.indentOf + 2, function() {
                return state.innerMode.token(stream, state.innerState) || true;
              });
            } else {
              stream.skipToEnd();
              return state.indentToken;
            }
          } else if (stream.sol()) {
            state.indentOf = Infinity;
            state.indentToken = null;
            state.innerMode = null;
            state.innerState = null;
          }
        }
        function restOfLine(stream, state) {
          if (stream.sol()) {
            state.restOfLine = "";
          }
          if (state.restOfLine) {
            stream.skipToEnd();
            var tok = state.restOfLine;
            state.restOfLine = "";
            return tok;
          }
        }
        function startState() {
          return new State();
        }
        function copyState(state) {
          return state.copy();
        }
        function nextToken(stream, state) {
          var tok = innerMode(stream, state) || restOfLine(stream, state) || interpolationContinued(stream, state) || includeFilteredContinued(stream, state) || eachContinued(stream, state) || attrsContinued(stream, state) || javaScript(stream, state) || javaScriptArguments(stream, state) || callArguments(stream, state) || yieldStatement(stream) || doctype(stream) || interpolation(stream, state) || caseStatement(stream, state) || when(stream, state) || defaultStatement(stream) || extendsStatement(stream, state) || append(stream, state) || prepend(stream, state) || block(stream, state) || include(stream, state) || includeFiltered(stream, state) || mixin(stream, state) || call(stream, state) || conditional(stream, state) || each(stream, state) || whileStatement(stream, state) || tag(stream, state) || filter(stream, state) || code(stream, state) || id(stream) || className(stream) || attrs(stream, state) || attributesBlock(stream, state) || indent(stream) || text(stream, state) || comment(stream, state) || colon(stream) || dot(stream, state) || fail(stream);
          return tok === true ? null : tok;
        }
        return {
          startState,
          copyState,
          token: nextToken
        };
      }, "javascript", "css", "htmlmixed");
      CodeMirror2.defineMIME("text/x-pug", "pug");
      CodeMirror2.defineMIME("text/x-jade", "pug");
    });
  }
});

// node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/addon/mode/multiplex.js
var require_multiplex = __commonJS({
  "node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/addon/mode/multiplex.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror2) {
      "use strict";
      CodeMirror2.multiplexingMode = function(outer) {
        var others = Array.prototype.slice.call(arguments, 1);
        function indexOf(string, pattern, from, returnEnd) {
          if (typeof pattern == "string") {
            var found = string.indexOf(pattern, from);
            return returnEnd && found > -1 ? found + pattern.length : found;
          }
          var m = pattern.exec(from ? string.slice(from) : string);
          return m ? m.index + from + (returnEnd ? m[0].length : 0) : -1;
        }
        return {
          startState: function() {
            return {
              outer: CodeMirror2.startState(outer),
              innerActive: null,
              inner: null,
              startingInner: false
            };
          },
          copyState: function(state) {
            return {
              outer: CodeMirror2.copyState(outer, state.outer),
              innerActive: state.innerActive,
              inner: state.innerActive && CodeMirror2.copyState(state.innerActive.mode, state.inner),
              startingInner: state.startingInner
            };
          },
          token: function(stream, state) {
            if (!state.innerActive) {
              var cutOff = Infinity, oldContent = stream.string;
              for (var i = 0; i < others.length; ++i) {
                var other = others[i];
                var found = indexOf(oldContent, other.open, stream.pos);
                if (found == stream.pos) {
                  if (!other.parseDelimiters)
                    stream.match(other.open);
                  state.startingInner = !!other.parseDelimiters;
                  state.innerActive = other;
                  var outerIndent = 0;
                  if (outer.indent) {
                    var possibleOuterIndent = outer.indent(state.outer, "", "");
                    if (possibleOuterIndent !== CodeMirror2.Pass)
                      outerIndent = possibleOuterIndent;
                  }
                  state.inner = CodeMirror2.startState(other.mode, outerIndent);
                  return other.delimStyle && other.delimStyle + " " + other.delimStyle + "-open";
                } else if (found != -1 && found < cutOff) {
                  cutOff = found;
                }
              }
              if (cutOff != Infinity)
                stream.string = oldContent.slice(0, cutOff);
              var outerToken = outer.token(stream, state.outer);
              if (cutOff != Infinity)
                stream.string = oldContent;
              return outerToken;
            } else {
              var curInner = state.innerActive, oldContent = stream.string;
              if (!curInner.close && stream.sol()) {
                state.innerActive = state.inner = null;
                return this.token(stream, state);
              }
              var found = curInner.close && !state.startingInner ? indexOf(oldContent, curInner.close, stream.pos, curInner.parseDelimiters) : -1;
              if (found == stream.pos && !curInner.parseDelimiters) {
                stream.match(curInner.close);
                state.innerActive = state.inner = null;
                return curInner.delimStyle && curInner.delimStyle + " " + curInner.delimStyle + "-close";
              }
              if (found > -1)
                stream.string = oldContent.slice(0, found);
              var innerToken = curInner.mode.token(stream, state.inner);
              if (found > -1)
                stream.string = oldContent;
              else if (stream.pos > stream.start)
                state.startingInner = false;
              if (found == stream.pos && curInner.parseDelimiters)
                state.innerActive = state.inner = null;
              if (curInner.innerStyle) {
                if (innerToken)
                  innerToken = innerToken + " " + curInner.innerStyle;
                else
                  innerToken = curInner.innerStyle;
              }
              return innerToken;
            }
          },
          indent: function(state, textAfter, line) {
            var mode = state.innerActive ? state.innerActive.mode : outer;
            if (!mode.indent)
              return CodeMirror2.Pass;
            return mode.indent(state.innerActive ? state.inner : state.outer, textAfter, line);
          },
          blankLine: function(state) {
            var mode = state.innerActive ? state.innerActive.mode : outer;
            if (mode.blankLine) {
              mode.blankLine(state.innerActive ? state.inner : state.outer);
            }
            if (!state.innerActive) {
              for (var i = 0; i < others.length; ++i) {
                var other = others[i];
                if (other.open === "\n") {
                  state.innerActive = other;
                  state.inner = CodeMirror2.startState(other.mode, mode.indent ? mode.indent(state.outer, "", "") : 0);
                }
              }
            } else if (state.innerActive.close === "\n") {
              state.innerActive = state.inner = null;
            }
          },
          electricChars: outer.electricChars,
          innerMode: function(state) {
            return state.inner ? { state: state.inner, mode: state.innerActive.mode } : { state: state.outer, mode: outer };
          }
        };
      };
    });
  }
});

// node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/handlebars/handlebars.js
var require_handlebars = __commonJS({
  "node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/handlebars/handlebars.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror(), require_simple(), require_multiplex());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "../../addon/mode/simple", "../../addon/mode/multiplex"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror2) {
      "use strict";
      CodeMirror2.defineSimpleMode("handlebars-tags", {
        start: [
          { regex: /\{\{\{/, push: "handlebars_raw", token: "tag" },
          { regex: /\{\{!--/, push: "dash_comment", token: "comment" },
          { regex: /\{\{!/, push: "comment", token: "comment" },
          { regex: /\{\{/, push: "handlebars", token: "tag" }
        ],
        handlebars_raw: [
          { regex: /\}\}\}/, pop: true, token: "tag" }
        ],
        handlebars: [
          { regex: /\}\}/, pop: true, token: "tag" },
          // Double and single quotes
          { regex: /"(?:[^\\"]|\\.)*"?/, token: "string" },
          { regex: /'(?:[^\\']|\\.)*'?/, token: "string" },
          // Handlebars keywords
          { regex: />|[#\/]([A-Za-z_]\w*)/, token: "keyword" },
          { regex: /(?:else|this)\b/, token: "keyword" },
          // Numeral
          { regex: /\d+/i, token: "number" },
          // Atoms like = and .
          { regex: /=|~|@|true|false/, token: "atom" },
          // Paths
          { regex: /(?:\.\.\/)*(?:[A-Za-z_][\w\.]*)+/, token: "variable-2" }
        ],
        dash_comment: [
          { regex: /--\}\}/, pop: true, token: "comment" },
          // Commented code
          { regex: /./, token: "comment" }
        ],
        comment: [
          { regex: /\}\}/, pop: true, token: "comment" },
          { regex: /./, token: "comment" }
        ],
        meta: {
          blockCommentStart: "{{--",
          blockCommentEnd: "--}}"
        }
      });
      CodeMirror2.defineMode("handlebars", function(config, parserConfig) {
        var handlebars = CodeMirror2.getMode(config, "handlebars-tags");
        if (!parserConfig || !parserConfig.base)
          return handlebars;
        return CodeMirror2.multiplexingMode(
          CodeMirror2.getMode(config, parserConfig.base),
          { open: "{{", close: /\}\}\}?/, mode: handlebars, parseDelimiters: true }
        );
      });
      CodeMirror2.defineMIME("text/x-handlebars-template", "handlebars");
    });
  }
});

// node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/vue/vue.js
var require_vue = __commonJS({
  "node_modules/.pnpm/codemirror@5.65.12/node_modules/codemirror/mode/vue/vue.js"(exports, module) {
    (function(mod) {
      "use strict";
      if (typeof exports === "object" && typeof module === "object") {
        mod(
          require_codemirror(),
          require_overlay(),
          require_xml(),
          require_javascript(),
          require_coffeescript(),
          require_css(),
          require_sass(),
          require_stylus(),
          require_pug(),
          require_handlebars()
        );
      } else if (typeof define === "function" && define.amd) {
        define([
          "../../lib/codemirror",
          "../../addon/mode/overlay",
          "../xml/xml",
          "../javascript/javascript",
          "../coffeescript/coffeescript",
          "../css/css",
          "../sass/sass",
          "../stylus/stylus",
          "../pug/pug",
          "../handlebars/handlebars"
        ], mod);
      } else {
        mod(CodeMirror);
      }
    })(function(CodeMirror2) {
      var tagLanguages = {
        script: [
          ["lang", /coffee(script)?/, "coffeescript"],
          ["type", /^(?:text|application)\/(?:x-)?coffee(?:script)?$/, "coffeescript"],
          ["lang", /^babel$/, "javascript"],
          ["type", /^text\/babel$/, "javascript"],
          ["type", /^text\/ecmascript-\d+$/, "javascript"]
        ],
        style: [
          ["lang", /^stylus$/i, "stylus"],
          ["lang", /^sass$/i, "sass"],
          ["lang", /^less$/i, "text/x-less"],
          ["lang", /^scss$/i, "text/x-scss"],
          ["type", /^(text\/)?(x-)?styl(us)?$/i, "stylus"],
          ["type", /^text\/sass/i, "sass"],
          ["type", /^(text\/)?(x-)?scss$/i, "text/x-scss"],
          ["type", /^(text\/)?(x-)?less$/i, "text/x-less"]
        ],
        template: [
          ["lang", /^vue-template$/i, "vue"],
          ["lang", /^pug$/i, "pug"],
          ["lang", /^handlebars$/i, "handlebars"],
          ["type", /^(text\/)?(x-)?pug$/i, "pug"],
          ["type", /^text\/x-handlebars-template$/i, "handlebars"],
          [null, null, "vue-template"]
        ]
      };
      CodeMirror2.defineMode("vue-template", function(config, parserConfig) {
        var mustacheOverlay = {
          token: function(stream) {
            if (stream.match(/^\{\{.*?\}\}/))
              return "meta mustache";
            while (stream.next() && !stream.match("{{", false)) {
            }
            return null;
          }
        };
        return CodeMirror2.overlayMode(CodeMirror2.getMode(config, parserConfig.backdrop || "text/html"), mustacheOverlay);
      });
      CodeMirror2.defineMode("vue", function(config) {
        return CodeMirror2.getMode(config, { name: "htmlmixed", tags: tagLanguages });
      }, "htmlmixed", "xml", "javascript", "coffeescript", "css", "sass", "stylus", "pug", "handlebars");
      CodeMirror2.defineMIME("script/x-vue", "vue");
      CodeMirror2.defineMIME("text/x-vue", "vue");
    });
  }
});
export default require_vue();
//# sourceMappingURL=codemirror_mode_vue_vue__js.js.map

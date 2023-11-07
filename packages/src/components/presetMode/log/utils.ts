export interface MarkStates {
  start: number;
  end: number;
  node: HTMLAnchorElement;
}
// eslint-disable-next-line no-shadow
export enum logErrorType {
  info = "info",
  warning = "warning",
  error = "error"
}
export type logErrorTypes = keyof typeof logErrorType;
/**
 * Get Local time, format:  HH:mm:ss
 */
export function getLocalTime(): string {
  const date = new Date();
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  // Get local hours, minutes, secondes
  return `${h}:${m}:${s}`;
}

/**
 * Create a clickable link (A tag), such as downloading the full log.
 */
export function createLinkMark(attrs: {
  download?: any;
  href?: string;
  hrefLang?: string;
  media?: string;
  rel?: string;
  target?: string;
  type?: string;
  [key: string]: any;
}) {
  return `#link#${JSON.stringify(attrs)}#link#`;
}

/**
 * Get all linkMark.
 */
export function getLinkMarks(value: string) {
  const linkRegexp = /#link#(.+)#link#/g;
  const result: MarkStates[] = [];
  let indexObj: RegExpExecArray | null;
  indexObj = linkRegexp.exec(value);
  while (indexObj) {
    const node = document.createElement("a");
    const attrs = JSON.parse(indexObj[1]);
    const keyAndValues: any = Object.entries(attrs);
    for (const [_key, _value] of keyAndValues) {
      node.setAttribute(_key, _value);
    }
    node.className = "editor_custom_link";
    node.innerHTML = "logDownload";
    result.push({
      start: indexObj.index,
      end: indexObj.index + indexObj[0].length,
      node
    });
    indexObj = linkRegexp.exec(value);
  }
  return result;
}
/**
 * Create a controllable log output type.
 * @param { string } text - contents
 * @param { string } type - Log type: 'info' | 'warning' | 'error'
 */
export function createLogMark(text = "", type: logErrorTypes = "info") {
  return `#log<${type}>log#${text}#log<${type}>log#`;
}

/**
 * Gets the text of the current tag and returns an array of nodes.
 *
 */
export function getLogMark(value: string) {
  const result: MarkStates[] = [];
  function match() {
    const logRegexp = /#log<(\w*)>log#((.|\r\n|\n)*?)#log<(\w*)>log#/g;
    let indexObj: any;
    indexObj = logRegexp.exec(value);
    /**
     * 循环正则来匹配相应格式字段
     */
    while (indexObj) {
      const text = indexObj[0].replace(/\r\n/g, "\n");
      /**
       * 包含标记字段的数组
       */
      const textArr = text.split("\n");
      const content = indexObj[2].replace(/\r\n/g, "\n");
      /**
       * 不包含标记字段的数组
       */
      const contentArr = content.split("\n");

      /**
       * 创建一个node，便于拷贝
       */
      const node = document.createElement("span");
      const type = indexObj[1];
      node.className = `c-editor--log__${type}`;
      /**
       * 当前index偏移量
       */
      let offset = 0;

      for (let i = 0; i < textArr.length; i++) {
        const textItem = textArr[i];
        const contentItem = contentArr[i];
        const cloneNode: any = node.cloneNode(false); // 浅拷贝
        cloneNode.innerText = contentItem;
        result.push({
          start: indexObj.index + offset,
          end: indexObj.index + offset + textItem.length,
          node: cloneNode
        });
        offset = offset + textItem.length + 1;
      }
      indexObj = logRegexp.exec(value);
    }
  }
  match();
  return result;
}

/**
 * Create log text with time and type
 * @param { string } log - Log contents
 * @param { string } type - Log type: 'info' | 'warning' | 'error'
 * @example
 *
 * createLog("info content", "info")
 * // => [14:02:32] <info> info content
 *
 */
export function createLog(log: string, type: logErrorTypes) {
  const now = getLocalTime();
  return `[${now}] <${type}> ${log}`;
}

/**
 * Create a custom format title.
 * @param { string } title - title value
 * @param { Number } symbolLength - Customize the number of symbols on both sides of the title. The default value is 15.
 * @param { string } symbol - Customize the symbols on both sides of the title. The default value is "="
 * @example
 *
 * createTitle("base title")
 * // => ===============base title===============
 *
 * createTitle("base title",3)
 * // => ===base title===
 *
 * createTitle("base title", 3, "*")
 * // => ***base title***
 */
export function createTitle(title: string, symbolLength?: number, symbol?: string) {
  // const offsetLength = Math.floor((1.5 * title.length) / 2);
  const arr = new Array(Math.max(symbolLength || 15, 5));
  const wrapText = arr.join(symbol || "=");
  return `${wrapText}${title}${wrapText}`;
}

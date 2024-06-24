export const setCaretPosition = (element: HTMLElement, offset: number) => {
    const doc = element.ownerDocument;
    const win = doc.defaultView || (doc as any).parentWindow;
    const range = doc.createRange();
    const sel = win.getSelection();

    let charCount = 0;

    const traverseNodes = (node: Node): boolean => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textLength = node.textContent?.length || 0;
        if (charCount + textLength >= offset) {
          range.setStart(node, offset - charCount);
          range.collapse(true);
          sel?.removeAllRanges();
          sel?.addRange(range);
          return true;
        }
        charCount += textLength;
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          if (traverseNodes(node.childNodes[i])) {
            return true;
          }
        }
      }
      return false;
    };

    traverseNodes(element);
  };
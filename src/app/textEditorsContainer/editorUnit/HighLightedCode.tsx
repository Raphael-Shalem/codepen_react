import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'context/rootStore';
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';
import { TeditorVariant } from 'types';

hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('js', javascript);

interface IHighLightedCodeProps {
  variant: TeditorVariant;
}

const HighLightedCode: React.FC<IHighLightedCodeProps> = ({ variant }) => {
  const { sandBoxCode, updateSandBox } = useStore().sandBoxStore;
  const codeObject = toJS(sandBoxCode);
  const testRef = useRef<HTMLPreElement | null>(null);
  const [innerHtml, setInnerHtml] = useState<string>('');

  useEffect(() => {
    const highlightedJS = hljs.highlight(codeObject[variant], { language: variant }).value;
    setInnerHtml(highlightedJS);
  }, [codeObject, variant]);

  const getCaretCharacterOffsetWithin = (element: HTMLElement): number => {
    let caretOffset = 0;
    const doc = element.ownerDocument;
    const win = doc.defaultView || (doc as any).parentWindow;
    const sel = win.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
    return caretOffset;
  };

  const setCaretPosition = (element: HTMLElement, offset: number) => {
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

  const handleChange = action(() => {
    if (testRef.current) {
      const caretPosition = getCaretCharacterOffsetWithin(testRef.current);
      const myText = testRef.current.textContent || '';
      const userInputObject = { [variant]: myText };
      updateSandBox(userInputObject);

      // Update highlighted code and restore cursor position
      const newHighlightedJS = hljs.highlight(myText, { language: variant }).value;
      setInnerHtml(newHighlightedJS);

      setTimeout(() => {
        if (testRef.current) {
          setCaretPosition(testRef.current, caretPosition);
        }
      }, 0);
    }
  });

  return (
    <pre ref={testRef}>
      <code
        style={{ outline: 'none' }}
        dangerouslySetInnerHTML={{ __html: innerHtml }}
        contentEditable="true"
        onInput={handleChange}
      />
    </pre>
  );
};

export default observer(HighLightedCode);

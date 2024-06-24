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
import { getCaretCharacterOffsetWithin } from './functions/getCaretCharacterOffsetWithin';
import { setCaretPosition } from './functions/setCaretPosition';
import { makeStyles } from 'makeStyles'; 

hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('js', javascript);


const useStyles = makeStyles ()((theme) => ({
    pre: {
      textAlign: 'left',
      margin: 0,    
      padding: 0,
      border: "none",
      whiteSpace: "pre-wrap",
      overflowWrap: "break-word",
      boxSizing: "border-box",
      height: '100%',
      width: '100%',
      color: '#FFF',
      overflowY: 'scroll',
      backgroundColor: theme.darkGrey,
      cursor: "text"
    },
    code: {
      outline: 'none'
    }
}))


interface IHighLightedCodeProps {
  variant: TeditorVariant;
}

const HighLightedCode: React.FC<IHighLightedCodeProps> = ({ variant }) => {

  const { classes } = useStyles(); 
  const { sandBoxCode, updateSandBox } = useStore().sandBoxStore;
  const codeObject = toJS(sandBoxCode);
  const textRef = useRef<HTMLPreElement | null>(null);
  const [innerHtml, setInnerHtml] = useState<string>('');

  useEffect(() => {
    const highlightedJS = hljs.highlight(codeObject[variant], { language: variant }).value;
    setInnerHtml(highlightedJS);
  }, [codeObject, variant]);

  const handleChange = action(() => {
    if (textRef.current) {
      const caretPosition = getCaretCharacterOffsetWithin(textRef.current);
      const myText = textRef.current.textContent || '';
      const userInputObject = { [variant]: myText };
      updateSandBox(userInputObject);

      // Update highlighted code and restore cursor position
      const newHighlightedJS = hljs.highlight(myText, { language: variant }).value;
      setInnerHtml(newHighlightedJS);

      setTimeout(() => {
        if (textRef.current) {
          setCaretPosition(textRef.current, caretPosition);
        }
      }, 0);
    }
  });

  return (
    <pre 
      className={ classes.pre }
      ref = { textRef } 
    >
      <code
        className={ classes.code }
        dangerouslySetInnerHTML={{ __html: innerHtml }}
        contentEditable="true"
        onInput = { handleChange }
      />
    </pre>
  );
};

export default observer(HighLightedCode);

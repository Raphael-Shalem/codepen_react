import React, { useEffect, useRef } from 'react';
import { useStore } from 'context/rootStore';
import { toJS } from 'mobx';
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
  variant: TeditorVariant
}
  

const HighLightedCode: React.FC<IHighLightedCodeProps> = ({ variant }) => {
  const { sandBoxCode } = useStore().sandBoxStore;
  const codeObject = toJS(sandBoxCode);

  const highlightedJS = hljs.highlight(
    codeObject[`${ variant }`],
    { language: variant }
  ).value;

  const testRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => { 
    if (testRef && testRef.current && testRef.current.innerText) {
      console.log('testRef : ',testRef.current.innerText ) 
    }
  },[testRef, codeObject])

  return (
    <pre>
      <code 
         ref = { testRef }
         dangerouslySetInnerHTML = {{ __html: highlightedJS }}
        // contentEditable = "true"
      />
    </pre>
  );
}

export default observer(HighLightedCode);

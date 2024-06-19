import { useStore } from 'context/rootStore';
import HighLightedCode from './HighLightedCode';
import { makeStyles } from 'makeStyles'; 
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TeditorVariant } from 'types';
import { useRef } from 'react';
import { minEditorWidth } from 'myConstants';
import useResize from 'hooks/useResize';
import useStyle from './useStyle';
//import hljs  from 'highlight.js/lib/core';
//import javascript from 'highlight.js/lib/languages/javascript';


const useStyles = makeStyles ()((theme) => ({
    root: {
      display: 'flex',
      flexFlow: 'row',
    },
    container: {
      flex: 1,
      display: 'flex',
      flexFlow: 'column',
      minWidth: 0
    },
    title: {
       color: '#FFF',
       textAlign: 'left',
       width: 100,
       transition: 'transform 0.3s, font 0.3s',
    },
    textareaLabel: {
      borderTop: 'none',
      marginTop: 0,
      height: '100%',
      resize: 'none',
      outline: 0,
      backgroundColor: theme.darkGrey,
      color: '#FFF'
    },
    resizeEl: {
      cursor:     "col-resize",
      height:     '100%',
      width:      minEditorWidth, 
      minWidth:   minEditorWidth, 
      background: theme.black
    }
}))

interface IEditorProps {
  variant: TeditorVariant
}
  

const TextEditor: React.FC<IEditorProps> = ({ variant }) => {

    const { classes } = useStyles();
    const { sandBoxCode, updateSandBox } = useStore().sandBoxStore
    const { dimentions } = useStore().dimentsionsStore

    const codeObject = toJS(sandBoxCode);
    const dimentionsObject = toJS(dimentions);

    const style = useStyle(dimentionsObject, `${ variant }Width`)
    
    
    const handleChange = action((userInput: string) => {
      const userInputObject = Object.fromEntries([[`${ variant }`, userInput]])
      updateSandBox(userInputObject);
    })

    const resizableRef = useRef<HTMLDivElement>(null);
    const handleMouseDown = useResize(resizableRef, variant)


    return (
      <div 
         className = { classes.root } 
         ref       = { resizableRef } 
         style     = {{ 
          maxWidth: `${dimentionsObject[`${ variant }Width`]}px`, 
          minWidth: `${dimentionsObject[`${ variant }Width`]}px` 
        }}
      >
        {
          variant === 'html' &&
          <div className = { classes.resizeEl }/>
        }
        <div className = { classes.container } >
            <div
              className = { classes.title }
              style     = { style.title }
            >
              { variant }
            </div>
            <div className = { classes.textareaLabel }>
              <HighLightedCode variant = { variant }/>
            </div>
            <textarea
              id        = {`${ variant }`}
              value     = { `${ codeObject[`${ variant }`] }` }
              onChange  = { (e) => handleChange(e.target.value) }
            />
        </div>
        <div 
            className = { classes.resizeEl }
            onMouseDown = { () => { handleMouseDown() }}
        />
      </div>
    )
  }
  
  export default observer(TextEditor)
  
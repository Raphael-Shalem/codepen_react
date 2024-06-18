import { useStore } from 'context/rootStore';
import { makeStyles } from 'makeStyles'; 
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TeditorVariant } from 'types';
import { useRef } from 'react';
import { minEditorWidth } from 'constants';
import useResize from 'hooks/useResize';


const useStyles = makeStyles ()(() => ({
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
    headLine: {
      fontSize: 26,
      height: 30,
      margin: 0,
      textAlign: 'left'
    },
    textarea: {
      borderTop: 'none',
      marginTop: 0,
      height: '100%',
      resize: 'none',
      outline: 0
    },
    resizeEl: {
      cursor:     "col-resize",
      height:     '100%',
      width:      minEditorWidth, 
      minWidth:   minEditorWidth, 
      background: '#CCC'
    }
}))

interface IEditorProps {
  variant: TeditorVariant
}
  

const TextEditor: React.FC<IEditorProps> = ({ variant }) => {

    const { classes } = useStyles();
    const { code, updateSandBox } = useStore().sandBoxStore
    const { dimentions } = useStore().dimentsionsStore

    const codeObject = toJS(code);
    const dimentionsObject = toJS(dimentions);
    
    
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
            <h1 className={ classes.headLine }>{ variant }</h1>
            <textarea
              className = { classes.textarea }
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
  
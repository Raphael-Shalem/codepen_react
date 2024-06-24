import { useStore } from 'context/rootStore';
import HighLightedCode from './HighLightedCode';
import { makeStyles } from 'makeStyles'; 
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TeditorVariant } from 'types';
import { useRef } from 'react';
import { minEditorWidth } from 'myConstants';
import useResize from 'hooks/useResize';
import useStyle from './hooks/useStyle';
import TitleComponent from './TitleComponent';

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
    resizeEl: {
      cursor:     "col-resize",
      height:     '100%',
      width:      minEditorWidth, 
      minWidth:   minEditorWidth, 
      background: theme.black,
      border:     '1px solid #334'
    }
}))

interface IEditorProps {
  variant: TeditorVariant
}
  

const TextEditor: React.FC<IEditorProps> = ({ variant }) => {

    const { classes } = useStyles();
    const { dimentions } = useStore().dimentsionsStore
    const dimentionsObject = toJS(dimentions);

    const resizableRef = useRef<HTMLDivElement>(null);
    const handleMouseDown = useResize(resizableRef, variant)
    const style = useStyle(dimentionsObject, `${ variant }Width`)

    return (
      <div 
         className = { classes.root } 
         ref       = { resizableRef } 
         style     = { style.root }
      >
        {
          variant === 'html' &&
          <div className = { classes.resizeEl }/>
        }
        <div className = { classes.container } >
            <TitleComponent variant = { variant }/>
            <HighLightedCode variant = { variant }/>
        </div>
        <div 
            className = { classes.resizeEl }
            onMouseDown = { handleMouseDown }
        />
      </div>
    )
  }
  
  export default observer(TextEditor)
  
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
import Menu from './Menu';

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
    border: {
      height:     '100%',
      width:      minEditorWidth, 
      minWidth:   minEditorWidth, 
      background: theme.black,
      border:     '1px solid #334'
    },
    resizeBorder: {
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
    const { editorDimentions } = useStore().dimentsionsStore
    const editorDimentionsObject = toJS(editorDimentions);

    const resizableRef = useRef<HTMLDivElement>(null);
    const handleMouseDown = useResize(resizableRef, variant)
    const style = useStyle(editorDimentionsObject, `${ variant }Width`)

    const showLeftBorder = (variant === 'html' || editorDimentionsObject.smallScreen);

    return (
      <div 
         className = { classes.root } 
         ref       = { resizableRef } 
         style     = { style.root }
      >
        {
          showLeftBorder &&
          <div className = { classes.border }/>
        }
        <div className = { classes.container } >
            {
              editorDimentions.smallScreen ? <Menu/> : <TitleComponent variant = { variant }/>
            }
            <HighLightedCode variant = { variant }/>
        </div>
        <div 
            className = { variant === 'js' ? classes.border : classes.resizeBorder }
            onMouseDown = { handleMouseDown }
        />
      </div>
    )
  }
  
  export default observer(TextEditor)
  
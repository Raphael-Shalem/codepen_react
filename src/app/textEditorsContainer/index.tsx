import Editor         from "./editorUnit"
import { makeStyles } from 'makeStyles'; 
import useScreenSize from "hooks/useScreenSize";
import { TeditorVariant } from "types";
import { useEffect } from "react";
import { useStore } from "context/rootStore";
import { minEditorWidth } from "myConstants";
import { observer } from "mobx-react";

const useStyles = makeStyles ()((theme) => ({
    root: {
      width:    '100vw',
      display:  'flex',
      flexFlow: 'column',
      background: theme.black
    },
    editorContainer: {
      flex:     1,
      minWidth: '100%',
      display:  'flex',
      overflow: 'hidden',
    },
    resizeEl: {
      minWidth:  '100%',
      height:     minEditorWidth,
      background: '#CCC',
      cursor:     "row-resize",
    }
}))

const textEditorsArray: TeditorVariant[] = ['html', 'css', 'js'];


const TextEditorsContainer = () => {

    const { classes } = useStyles();
    const screenSize = useScreenSize();
    const { updateScreenSize } = useStore().dimentsionsStore

    useEffect(() => {
      updateScreenSize(screenSize.width)
    },[screenSize.width])


    return (
      <div 
          className = { classes.root }
          style     = {{ height: screenSize.height/2 }}
      >
          <div className = { classes.editorContainer }>  
            {
              textEditorsArray.map((val) => {
                return(
                  <Editor
                    key     = { val }
                    variant = { val }
                  />
                )
              })
            }
          </div>
      </div>
    )
  }
  
  export default observer(TextEditorsContainer)
  
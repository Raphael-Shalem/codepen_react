import Editor         from "./editorUnit"
import { makeStyles } from 'makeStyles'; 
import useScreenSize from "hooks/useScreenSize";
import { minEditorWidth } from "myConstants";
import { observer } from "mobx-react";
import { useStore } from "context/rootStore";

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


const TextEditorsContainer = () => {

    const { classes } = useStyles();
    const screenSize = useScreenSize();
    const { editorDimentions } = useStore().dimentsionsStore

    return (
      <div 
          className = { classes.root }
          style = {{ height: editorDimentions.showResult ? screenSize.height/2 : screenSize.height }}
      >
          <div className = { classes.editorContainer }>  
            {
              editorDimentions.textEditorsArray.map((val) => {
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
  
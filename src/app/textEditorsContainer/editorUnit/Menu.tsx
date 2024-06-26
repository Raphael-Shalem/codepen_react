import { useStore } from 'context/rootStore';
import { makeStyles, theme } from 'makeStyles'; 
import { action, toJS } from 'mobx';
import { editorVariants, maxTitleHeight } from 'myConstants';
import { observer } from 'mobx-react';
import clsx from 'classnames';
 
const useStyles = makeStyles ()((theme) => ({
    root: {
      width: '100%',
      height: maxTitleHeight,
      display: 'flex',
      flexFlow: 'row',
    },
    menuButton: {
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       color: '#FFF',
       textAlign: 'left',
       width: 70,
       marginLeft: 1,
       fontSize: 11,
       fontFamily: 'Archivo Black',
       border: 'none',
       backgroundColor: theme.mediumGrey,
       '&:hover': {
         backgroundColor: theme.brightGrey,
       }
    },
    pointer: {
        cursor: 'pointer'
    },
    default: {
        cursor: 'default'
    },
    brightGrey: {
        backgroundColor: theme.brightGrey
    }
}))


const TitleComponent = () => {

    const { classes } = useStyles();
    const { editorDimentions, toggleShowResult, selectEditor } = useStore().dimentsionsStore
    const editorDimentionsObject = toJS(editorDimentions);


    return (
        <div className = { classes.root } >
              {
                editorVariants.map((val) => {
                    const hightLight = editorDimentionsObject.textEditorsArray.includes(val);
                    return(
                        <button
                           key = { val }
                           className = { clsx(classes.menuButton, ( hightLight ? (classes.default,classes.brightGrey) : (classes.pointer))) }
                           onClick = { action(() => selectEditor(val)) }
                        >
                            { val.toUpperCase() }
                        </button>
                    )
                })
              }
              <button 
                className = { clsx(classes.menuButton, classes.pointer, ( editorDimentionsObject.showResult ? classes.brightGrey : '' )) }
                onClick = { action(() => toggleShowResult()) }
              >
                  RESULT
              </button>
        </div>
            
    )
  }
  
  export default observer(TitleComponent)
  
import TextEditors from 'app/textEditorsContainer'
import ResultDisplay from 'app/resultDisplay'
import { makeStyles } from 'makeStyles'; 
import { useStore } from 'context/rootStore';
import 'App.css'
import { useEffect } from 'react';
import useScreenSize from 'hooks/useScreenSize';
import { observer } from 'mobx-react';

const useStyles = makeStyles ()(() => ({
    root: {
      position: 'absolute',
      top:      0,
      left:     0,
      width:    '100%',
      height:   '100%',
      display:  'flex',
      flexFlow: 'column',
    }
}))


function App() {

  const { classes } = useStyles();
  const screenSize = useScreenSize();
  const { editorDimentions, updateScreenSize } = useStore().dimentsionsStore;

  useEffect(() => {
    updateScreenSize(screenSize)
  },[screenSize])

  return (
      <div className = { classes.root }>
        <TextEditors/>
        { editorDimentions.showResult && <ResultDisplay/> }
      </div>
  )
}

export default observer(App)

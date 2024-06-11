import TextEditors from 'app/textEditors'
import ResultDisplay from 'app/resultDisplay'
import { makeStyles } from 'makeStyles'; 

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


import 'App.css'

function App() {

  const { classes } = useStyles();

  return (
    <div className = { classes.root }>
       <TextEditors/>
       <ResultDisplay/>
    </div>
  )
}

export default App

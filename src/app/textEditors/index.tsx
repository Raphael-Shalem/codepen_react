import { useEffect, useState } from "react";
import Editor         from "./EditorUnit"
import { makeStyles } from 'makeStyles'; 
import useScreenSize from "hooks/useScreenSize";

const useStyles = makeStyles ()(() => ({
    root: {
      width:    '100vw',
      display:  'flex',
    }
}))


const TextEditorsContainer = () => {

    const { classes } = useStyles();
    const screenSize = useScreenSize();

    const [height, setHeight] = useState(0)

    useEffect(() => {
      setHeight(screenSize.height/2)
    },[screenSize])

    return (
      <div 
         className = { classes.root }
         style = {{ height: height }}
      >
         {
          ['html', 'css', 'js'].map((val) => {
            return(
              <Editor
                 key     = { val }
                 variant = { val }
              />
            )
          })
         }
      </div>
    )
  }
  
  export default TextEditorsContainer
  
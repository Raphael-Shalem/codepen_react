import { useEffect, useState } from "react";
import Editor         from "./editorUnit"
import { makeStyles } from 'makeStyles'; 
import useScreenSize from "hooks/useScreenSize";
import { TeditorVariant } from "types";

const useStyles = makeStyles ()(() => ({
    root: {
      width:    '100vw',
      display:  'flex',
    }
}))

const textEditorsArray: TeditorVariant[] = ['html', 'css', 'js'];

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
    )
  }
  
  export default TextEditorsContainer
  
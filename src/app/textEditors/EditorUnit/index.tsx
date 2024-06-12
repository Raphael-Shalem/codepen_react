import { useSandBoxStore } from 'context/sandBoxStore';
import { makeStyles } from 'makeStyles'; 
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TeditorVariant } from 'types';

const useStyles = makeStyles ()(() => ({
    root: {
      border: '1px dashed #F00',
      flex: 1,
      display: 'flex',
      flexFlow: 'column'
    },
    headLine: {
      fontSize: 26,
      height: 30,
      border: '1px dashed #0F0',
      margin: 0,
      textAlign: 'left'
    },
    textarea: {
      border: '1px dashed #00F',
      marginTop: 0,
      height: '100%',
      resize: 'none'
    }
}))

interface IEditorProps {
  variant: TeditorVariant
}
  

const TextEditor: React.FC<IEditorProps> = ({ variant }) => {

    const { classes } = useStyles();
    const { code, updateSandBox } = useSandBoxStore()
    const codeObject = toJS(code);


    const handleChange = action((userInput: string) => {
      const userInputObject = Object.fromEntries([[`${ variant }`, userInput]])
      updateSandBox(userInputObject);
    })

    return (
      <div className = { classes.root } >
          <h1 className={ classes.headLine }>{ variant }</h1>
          <textarea
            className = { classes.textarea }
            value     = { `${ codeObject[`${ variant }`] }` }
            onChange  = { (e) => handleChange(e.target.value) }
          />
      </div>
    )
  }
  
  export default observer(TextEditor)
  
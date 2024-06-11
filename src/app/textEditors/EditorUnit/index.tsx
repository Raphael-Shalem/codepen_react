import { makeStyles } from 'makeStyles'; 

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
  variant: string
}
  

const TextEditor: React.FC<IEditorProps> = ({ variant }) => {

    const { classes } = useStyles();

    return (
      <div className = { classes.root } >
          <h1 className={ classes.headLine }>{ variant }</h1>
          <textarea
            className={classes.textarea}
          />
      </div>
    )
  }
  
  export default TextEditor
  

import { makeStyles } from 'makeStyles'; 
  
  
  const useStyles = makeStyles ()(() => ({
      root: {
        width:           '100vw',
        display:         'flex',
        flex:            1,
        alignItems:      'center',
        justifyContent:  'center',
        border: '1px dashed #000'
      },
      iframe: {
          flex:  1,
          width: '100%'
      }
     
  }))
  
  interface IResultDisplayProps {
  }
  
  const ResultDisplay: React.FC<IResultDisplayProps> = () => {

    const { classes } = useStyles();
  
    let html = `<html>
    <head>
      <meta charset="UTF-8" />
      <title>Hello World</title>
    </head>
    <body>
      <style>
        p {
          color: red;
        }
      </style>
      <p id="demo">hello</p>
      <script>
         document.getElementById("demo").innerHTML = "hi";
      </script>
    </body>
  </html>`
      
  
    return (
      <div className={ classes.root } >
        <iframe
            title           = 'codePenCopy'
            width           = '100%'
            height          = '100%'
            srcDoc          ={ html }
            allowFullScreen
            sandbox         = 'allow-scripts'
        />
      </div>
  
    );
  }
  
  
  
  export default ResultDisplay
  
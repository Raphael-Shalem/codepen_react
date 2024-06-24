
//import { useSandBoxStore } from 'context/sandBoxStore';
import { useStore } from 'context/rootStore';
import { makeStyles } from 'makeStyles'; 
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useMemo } from 'react';

  
  const useStyles = makeStyles ()(() => ({
      root: {
        width:           '100vw',
        display:         'flex',
        flex:            1,
        alignItems:      'center',
        justifyContent:  'center',
      },
      iframe: {
          flex:  1,
          width: '100%',
      }
     
  }))
  
  interface IResultDisplayProps {
  }
  
  const ResultDisplay: React.FC<IResultDisplayProps> = () => {

    const { classes } = useStyles();
    const { sandBoxCode } = useStore().sandBoxStore;
    const codeObject = toJS(sandBoxCode);


    const srcDoc = useMemo(() => {
      return`<html>
              <body>
                <style>
                  ${ codeObject.css }
                </style>
                  ${ codeObject.html }
                <script>
                  ${ codeObject.js }
                </script>
              </body>
            </html>`
    },[codeObject])
      
  
    return (
      <div className={ classes.root } >
        <iframe
            title           = 'codePenCopy'
            width           = '100%'
            height          = '100%'
            srcDoc          = { srcDoc }
            sandbox         = 'allow-scripts'
            allowFullScreen = { false }
        />
      </div>
  
    );
  }
  
  
  export default observer(ResultDisplay)









    //   let html = `<html>
  //   <head>
  //     <meta charset="UTF-8" />
  //     <title>Hello World</title>
  //   </head>
  //   <body>
  //     <style>
  //       p {
  //         color: red;
  //       }
  //     </style>
  //     <p id="demo">hello</p>
  //     <script>
  //        document.getElementById("demo").innerHTML = "hi";
  //     </script>
  //   </body>
  // </html>`
  
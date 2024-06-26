import { useStore } from 'context/rootStore';
import { makeStyles } from 'makeStyles'; 
import { toJS } from 'mobx';
import { TeditorVariant } from 'types';
import { maxTitleHeight } from 'myConstants';
import useStyle from './hooks/useStyle';
import { observer } from 'mobx-react';


const svgIcons = {
   html: {
      path: "M10.97 2.29a.563.563 0 0 0-.495-.29.572.572 0 0 0-.488.277l-5.905 9.86a.565.565 0 0 0-.007.574c.102.18.287.289.495.289a.572.572 0 0 0 .488-.277l5.905-9.86a.565.565 0 0 0 .007-.574",
      fill: "#FF3C41"
   },
   css: {
      path: "M8 8.366l1.845 1.065a.507.507 0 0 0 .686-.181.507.507 0 0 0-.186-.685L8.5 7.5l1.845-1.065a.507.507 0 0 0 .186-.685.507.507 0 0 0-.686-.181L8 6.634v-2.13A.507.507 0 0 0 7.5 4c-.268 0-.5.225-.5.503v2.131L5.155 5.569a.507.507 0 0 0-.686.181.507.507 0 0 0 .186.685L6.5 7.5 4.655 8.565a.507.507 0 0 0-.186.685c.134.232.445.32.686.181L7 8.366v2.13c0 .271.224.504.5.504.268 0 .5-.225.5-.503V8.366z",
      fill: "#0EBEFF"
   },
   js: {
      path: "M6.554 3.705c0 .267-.19.496-.452.543-1.2.217-2.12 1.61-2.12 3.275 0 1.665.92 3.057 2.12 3.274a.554.554 0 0 1-.205 1.087c-1.733-.322-3.022-2.175-3.022-4.361 0-2.187 1.289-4.04 3.022-4.362a.554.554 0 0 1 .657.544zm1.892 0c0-.347.316-.607.657-.544 1.733.322 3.022 2.175 3.022 4.362 0 2.186-1.289 4.04-3.022 4.361a.554.554 0 0 1-.205-1.087c1.2-.217 2.12-1.61 2.12-3.274 0-1.665-.92-3.058-2.12-3.275a.551.551 0 0 1-.452-.543z",
      fill: "#FCD000"
   }
}

 
const useStyles = makeStyles ()(() => ({
    titleContainer: {
      width: '100%',
      height: maxTitleHeight,
    },
    title: {
       display: 'flex',
       alignItems: 'center',
       color: '#FFF',
       textAlign: 'left',
       transition: 'transform 0.3s, font 0.3s',
    },
    icon: {
        marginLeft: 8,
        marginRight: 8,
    }
}))

interface IEditorProps {
  variant: TeditorVariant
}
  

const TitleComponent: React.FC<IEditorProps> = ({ variant }) => {

    const { classes } = useStyles();
    const { editorDimentions } = useStore().dimentsionsStore
    const editorDimentionsObject = toJS(editorDimentions);

    const style = useStyle(editorDimentionsObject, `${ variant }Width`)

    return (
        <div className = { classes.titleContainer } >
            <div
              className = { classes.title }
              style     = { style.title }
            >
              <span>
                <svg 
                  viewBox="0 0 15 15" 
                  className={ classes.icon }
                  style={ style.icon }
                >
                    <rect fill={ `${ svgIcons[variant]['fill'] }` } width="15" height="15" rx="4"></rect>
                    <path d={ `${ svgIcons[variant]['path'] }` }></path>
                </svg>
              </span>
              { variant.toUpperCase() }
            </div>
        </div>
            
    )
  }
  
  export default observer(TitleComponent)
  
import { maxTitleHeight, minEditorWidth } from "myConstants";
import { theme } from "makeStyles";
import { useMemo } from "react"
import { IeditorDimentions, TeditorWidthVariant } from "types"

const useStyle = (editorDimentionsObject: IeditorDimentions, variant: TeditorWidthVariant) => {

    const style = useMemo(() => {

        const minimize = editorDimentionsObject[`${ variant }`] < 200;
        const { smallScreen } = editorDimentionsObject
        
        return{
            root: {
                maxWidth: smallScreen ? '100%' : `${editorDimentionsObject[variant]}px`, 
                minWidth: smallScreen ? '100%' : `${editorDimentionsObject[variant]}px` 
            },
            title: {
                fontSize: minimize ? 14 : 26,
                width: minimize ? 70 : 140,
                fontFamily: 'Archivo Black',
                height: minimize ? minEditorWidth : maxTitleHeight,
                transform: minimize ? `rotate(90deg) translate(30px, 44px)` : undefined,
                backgroundColor: minimize ? 'transparent' : theme.darkGrey,
            },
            icon: {
                height: minimize ? 10 : 20,
                width: minimize ? 10 : 20,
            }
        }
    },[editorDimentionsObject, variant])

    return style

}


export default useStyle

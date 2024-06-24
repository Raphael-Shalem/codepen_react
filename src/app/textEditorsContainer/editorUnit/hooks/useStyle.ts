import { maxTitleHeight, minEditorWidth } from "myConstants";
import { theme } from "makeStyles";
import { useMemo } from "react"
import { Idimentions, TeditorWidthVariant } from "types"

const useStyle = (dimentionsObject: Idimentions, variant: TeditorWidthVariant) => {

    const style = useMemo(() => {

        const minimize = dimentionsObject[`${ variant }`] < 200;
        
        return{
            root: {
                maxWidth: `${dimentionsObject[variant]}px`, 
                minWidth: `${dimentionsObject[variant]}px` 
            },
            title: {
                fontSize: minimize ? 14 : 26,
                fontFamily: 'Archivo Black',
                height: minimize ? minEditorWidth : maxTitleHeight,
                transform: minimize ? `rotate(90deg) translate(55px, 67px)` : undefined,
                backgroundColor: minimize ? 'transparent' : theme.darkGrey,
            },
            icon: {
                height: minimize ? 10 : 20,
                width: minimize ? 10 : 20,
            }
        }
    },[dimentionsObject, variant])

    return style

}


export default useStyle

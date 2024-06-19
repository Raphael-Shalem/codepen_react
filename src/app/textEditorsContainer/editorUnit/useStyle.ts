import { minEditorWidth } from "myConstants";
import { theme } from "makeStyles";
import { useMemo } from "react"
import { Idimentions, TeditorWidthVariant } from "types"

const useStyle = (dimentionsObject: Idimentions, variant: TeditorWidthVariant) => {

    const style = useMemo(() => {

        const minimize = dimentionsObject[`${ variant }`] < 200;
        
        return{
            title: {
                fontSize: minimize ? 14 : 30,
                fontFamily: 'Archivo Black',
                height: minimize ? minEditorWidth : 40,
                transform: minimize ? `rotate(90deg) translate(45px, 57px)` : undefined,
                backgroundColor: minimize ? 'transparent' : theme.darkGrey,
            }
        }
    },[dimentionsObject, variant])

    return style

}


export default useStyle

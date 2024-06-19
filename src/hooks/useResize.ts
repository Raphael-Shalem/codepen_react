import { minEditorWidth } from "myConstants";
import { useStore } from "context/rootStore";
import { action } from "mobx";
import { RefObject, useCallback } from "react";

const useResize = (
    ref: RefObject<HTMLDivElement>, 
    variant: string
) => {

    const { updateDimentions } = useStore().dimentsionsStore

    const handleMouseDown = () => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = action(useCallback((e: MouseEvent) => {

        if (ref.current) {
            if (['html','css','js'].includes(variant)) {
                const newWidth = Math.max(e.clientX, minEditorWidth*2) - ref.current.getBoundingClientRect().left;
                updateDimentions(variant, newWidth)
            }
        }
        
    }, [ref, variant]));

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    return ( handleMouseDown )
  }
  
  export default useResize
  
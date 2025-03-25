import { useEffect } from 'react';

export function useCloseMove(key, closeMove) {


    useEffect(function() {
        function callBack(e) {
          if(e.code.toLowerCase() === key.toLowerCase()){
           closeMove();
            
          }
        }
        document.addEventListener('keydown', callBack
        )
        return function(){
          document.removeEventListener('keydown', callBack)
        }
       }, [closeMove, key])
       
}
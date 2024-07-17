


    
    

    export function resizeFunction() {

 
        var draggingElement = null;

        const resizeHandles = document.querySelectorAll(".resize-handle");
    
        [...resizeHandles].forEach((handle) => {
          const {
            resizeTarget,
            resizeMinSize,
            resizeAxis,
            resizeTargetB,
            resizeTargetType
          } = handle.dataset;
          const target = document.querySelector(`[data-resize-name="${resizeTarget}"]`);
          const targetB = resizeTargetB
            ? document.querySelector(`[data-resize-name="${resizeTargetB}"`)
            : undefined;
          
          
          const isVertical = resizeAxis === "y";
          const handleResizeOnDrag = getResizeOnDragHandler({
            target,
            resizer: handle,
            isVertical,
            minSize: resizeMinSize,
            targetB,
            targetType: resizeTargetType
          });
          const handleResizeOnDragStart = getResizeOnDragStartHandler(isVertical);
          const handleResizeOnDragEnd = getResizeOnDragEndHandler(isVertical);
        
          handle.addEventListener("dragstart", handleResizeOnDragStart);
          handle.addEventListener("drag", handleResizeOnDrag);
          handle.addEventListener("dragend", handleResizeOnDragEnd);
    
          
        });
        
     
    
        function getResizeOnDragEndHandler(isVertical = true) {
          return function (ev) {
            draggingElement = null;
            this.dataset[`prev${isVertical ? "Y" : "X"}`] = this.dataset[
              isVertical ? "y" : "x"
            ] = "";
          };
        }
        
        function getResizeOnDragStartHandler(isVertical = true) {
          const indicator = isVertical ? "Y" : "X";
        
          return function (ev) {
            draggingElement = this;
            setDragImage(this, ev, document.createElement("div"));
            this.dataset[`prev${indicator}`] = ev[`page${indicator}`];
          };
        }
        
        function getResizeOnDragHandler({
          target,
          targetB,
          resizer,
          isVertical = true,
          targetType = "a",
          minSize = null
        }) {
          const lowerCaseIndicator = isVertical ? "y" : "x";
          const upperCaseIndicator = isVertical ? "Y" : "X";
          const dimension = isVertical ? "height" : "width";
        
          return function (ev) {
            const rect = target.getBoundingClientRect();
            const indicator = parseFloat(resizer.dataset[lowerCaseIndicator]);
            const prevIndicator = parseFloat(
              resizer.dataset[`prev${upperCaseIndicator}`]
            );
            const diff = isNaN(indicator) ? 0 : indicator - prevIndicator;
            let nextDimension = rect[dimension] + (targetType === "a" ? diff : -diff);
        
            resizer.dataset[`prev${upperCaseIndicator}`] =
              resizer.dataset[lowerCaseIndicator];
            resizer.dataset[lowerCaseIndicator] = ev[`page${upperCaseIndicator}`];
        
            if (minSize !== null && nextDimension < minSize) {
              nextDimension = minSize;
            }
            
            target.style[dimension] = nextDimension + "px";
        
            if (targetB) {
              targetB.style[dimension] = `calc(100% - ${nextDimension}px - 4px)`
            }
          };
        }
    
        function setDragImage(componentInstance, ev, imageElement = null) {
          const componentInstanceRect = componentInstance.getBoundingClientRect();
          const x = ev.pageX - componentInstanceRect.x;
          const y = ev.pageY - componentInstanceRect.y;
          const image = imageElement || componentInstance;
        
          ev.dataTransfer.setDragImage(image, x, y);
        }
    
  
     }



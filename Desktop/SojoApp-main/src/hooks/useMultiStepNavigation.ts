import {ReactElement, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {SelectStep} from "../reduxStore/StepReducer";


export function useMultiStepNavigation(steps:ReactElement[]){
     const currentStepIndex = useSelector(SelectStep)

     return {
          currentStepIndex,
          step: steps[currentStepIndex],
          steps,
          isFirstStep: currentStepIndex === 0,
          isLastStep: currentStepIndex === steps.length - 1,

     }
}

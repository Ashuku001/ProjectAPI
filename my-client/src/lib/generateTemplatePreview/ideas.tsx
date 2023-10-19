import { ComponentObj } from "../../../types"

const getComponentType = <T extends ComponentObj>(component: T): T => {
    return component
  }
  
  const componentParams = (components: any) => {
    for (const component in components) {
      console.log(">>", component)
    }
  }
  
  
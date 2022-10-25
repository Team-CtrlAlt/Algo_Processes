import { stage, local } from "./index";
function configs() {
  if (process.env.NODE_ENV == 'stage') {
    return stage;
  } else {
    return local;
  }
}

export const config: any = configs();

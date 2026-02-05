import { useContext } from "react";

import { ButtonGroupContext } from "./buttonGroup";

export const useButtonGroup = () => useContext(ButtonGroupContext);

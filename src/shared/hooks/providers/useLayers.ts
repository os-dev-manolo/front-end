import { createContext, useContext } from "react";
import LayersComponent from "../../providers/layers";

const layersContext = createContext(LayersComponent);

export const useLayers = () => useContext(layersContext);

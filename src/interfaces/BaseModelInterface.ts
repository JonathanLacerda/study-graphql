import { ModelsInterface } from "./ModelsInterface";

export interface BaseModelInterface{

    /**
     *  Serve para criar métodos de instância dos models
     */
    prototype?;
    /**
     *  Serve para associar models
     */
    associate? (models: ModelsInterface): void

}
import { getDataA } from "./data_A"
import { getDataB } from "./data_B"
import { getDataC } from "./data_C"

let models = [
    getDataA(),
    getDataB(),
    getDataC(),
]

export function getModels () {
    return models
}
export function persistModel(model){
    models.push(model)
}

import { StaticImageData } from "next/image";

export default interface indexPageItems {
    image: StaticImageData
    title: string
    text: string
    button_1_text?: string
    button_2_text?: string
}
import { Plugin } from "@nuxt/types";
import { initializeAxios } from "~/utils/api";

const acceser: Plugin = ({$axios}) => {
    initializeAxios($axios)
}

export default acceser
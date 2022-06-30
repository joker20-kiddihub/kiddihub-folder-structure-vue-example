import { Str } from "@support/Str.js";
import { Youtube } from "@support/Youtube.js";
import { uploader, Size } from "@support/Images.js";
import { Bee } from "./Bee.js";

const mediaSample = {
    id: '',
    title: null,
    thumbnail: '',
    src: '',
    width: null,
    height: null,
    type: null,
    description: ''
}
/**
 * @param {String} url Url of youtube video
 */
async function fromYoutube(url) {
    const { title, thumbnail_width, thumbnail_height, thumbnail_url, html } = await Youtube.getMeta(url);
    return {
        id: Youtube.idFromUrl(url),
        title,
        width: thumbnail_width,
        height: thumbnail_height,
        thumbnail: thumbnail_url,
        src: url,
        type: TYPES.EMBED_VIDEO
    }
}
/**
 * Encode File into media record
 * @param {FileList} files
 */
async function fromFiles(files) {
    const urls = await uploader(files);
    return urls.map(url => {
        return {...mediaSample, ...{
            id: Str.random(),
            title: null,
            thumbnail: url,
            src: url,
            type: TYPES.IMAGE
        }}
    });
}
async function fromLink(url) {
    const { data } = await Bee.get('/og', { url });
    const { title, image, description } = data;
    const { width, height } = Size.one(image);
    return {
        id: Str.random(),
        title,
        width,
        height,
        thumbnail: image,
        src: url,
        type: TYPES.LINK,
        description
    }
}
const TYPES = {
    IMAGE: process.env.MIX_MEDIA_TYPE_IMAGE,
    EMBED_VIDEO: process.env.MIX_MEDIA_TYPE_EMBED_VIDEO,
    LINK: process.env.MIX_MEDIA_TYPE_LINK
}
export { fromYoutube, fromFiles, fromLink, TYPES }

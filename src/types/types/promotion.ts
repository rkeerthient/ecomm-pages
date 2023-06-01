export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export default interface Ce_promotion {
	landingPageUrl?: string,
	name: string,
	c_photo?: Image,
	id: string,
}

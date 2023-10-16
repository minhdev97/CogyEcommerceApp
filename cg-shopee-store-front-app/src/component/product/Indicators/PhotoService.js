export const PhotoService = {
    getData() {
        return [
            {
                itemImageSrc: 'https://cf.shopee.vn/file/vn-50009109-112ac5ec8e3ceadd9d1ac9dac0a5506f_xxhdpi',
                thumbnailImageSrc: 'https://cf.shopee.vn/file/vn-50009109-112ac5ec8e3ceadd9d1ac9dac0a5506f_xxhdpi',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: 'https://cf.shopee.vn/file/vn-50009109-5fe7918cfcf5ba87b0be93ca06d7341e_xxhdpi',
                thumbnailImageSrc: 'https://cf.shopee.vn/file/vn-50009109-5fe7918cfcf5ba87b0be93ca06d7341e_xxhdpi',
                alt: 'Description for Image 2',
                title: 'Title 2'
            },
            {
                itemImageSrc: 'https://cf.shopee.vn/file/vn-50009109-30002bdd331a6d2562d9aa56f105f983_xxhdpi',
                thumbnailImageSrc: 'https://cf.shopee.vn/file/vn-50009109-30002bdd331a6d2562d9aa56f105f983_xxhdpi',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: 'https://cf.shopee.vn/file/vn-50009109-84b8524de90a4e929ad7f85ea89d7afb_xxhdpi',
                thumbnailImageSrc: 'https://cf.shopee.vn/file/vn-50009109-84b8524de90a4e929ad7f85ea89d7afb_xxhdpi',
                alt: 'Description for Image 4',
                title: 'Title 4'
            },
            {
                itemImageSrc: 'https://cf.shopee.vn/file/vn-50009109-e52c8ff278cac3e06c9be0ba5d421bf3_xxhdpi',
                thumbnailImageSrc: 'https://cf.shopee.vn/file/vn-50009109-e52c8ff278cac3e06c9be0ba5d421bf3_xxhdpi',
                alt: 'Description for Image 5',
                title: 'Title 5'
            },
            {
                itemImageSrc: 'https://cf.shopee.vn/file/vn-50009109-cd6232999f4f6081320780b951e0465d_xxhdpi',
                thumbnailImageSrc: 'https://cf.shopee.vn/file/vn-50009109-cd6232999f4f6081320780b951e0465d_xxhdpi',
                alt: 'Description for Image 6',
                title: 'Title 6'
            },
            {
                itemImageSrc: 'https://cf.shopee.vn/file/vn-50009109-33507d47ab90621908a135f12ef59431_xxhdpi',
                thumbnailImageSrc: 'https://cf.shopee.vn/file/vn-50009109-33507d47ab90621908a135f12ef59431_xxhdpi',
                alt: 'Description for Image 7',
                title: 'Title 7'
            },
        ];
    },

    getImages() {
        return Promise.resolve(this.getData());
    }
};
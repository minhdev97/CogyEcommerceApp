import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from "../util/firebaseConfig";

export const uploadImage = async (imageFile) => {
    let result = null;
    try {
        const storageRef = ref(storage, `/files/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        result = await new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Cập nhật trạng thái upload (optional)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Tiến trình upload: " + progress + "%");
                },
                (error) => {
                    console.log(error)
                    console.log("Lỗi storage: ");
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => {
                            console.log("URL tải xuống: ", url);
                            resolve(url);
                        })
                        .catch((error) => {
                            console.log("Lỗi getDownloadURL: ", error);
                            reject(error);
                        });
                }
            );
        });
    } catch (e) {
        console.log("API uploadImage to firebase has error: ");
        console.log(e);
    }
    return result;
};
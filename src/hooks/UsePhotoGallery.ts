import { useState } from "react";
import { IPhoto } from "../model/IPhoto";
import {
    Camera,
    CameraResultType,
    CameraSource,
    ImageOptions,
} from "@capacitor/camera";

export function usePhotoGallery() {

    const [photo, setPhoto] = useState<IPhoto>();

    const takePhoto = async () => {
        try {
            const config: ImageOptions = {
                quality: 100,
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera
            }
            const cameraPhoto = await Camera.getPhoto(config);
            const fileName = new Date().getTime() + ".jpeg";
            const imageData = await base64FromPath(cameraPhoto.webPath ? cameraPhoto.webPath : "");
            const photoInfo: IPhoto = {
                fileName: fileName,
                webFilePath: cameraPhoto.webPath,
                imageData
            }
            setPhoto(photoInfo);
        }
        catch (e) {
            console.log("closed")
        }
    }

    return {
        takePhoto,
        setPhoto,
        photo,
    };
}

export async function base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('method did not return a string')
            }
        };
        reader.readAsDataURL(blob);
    });
}
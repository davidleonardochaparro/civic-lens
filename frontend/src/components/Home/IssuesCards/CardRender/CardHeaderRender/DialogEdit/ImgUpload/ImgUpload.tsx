import { useState } from "react";
import type { ChangeEvent } from "react";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";

export default function ImgUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string>("");

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;
        setFile(event.target.files[0]);
        setUrl(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <>
            <input
                type="file"
                id="image-file"
                name="image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFile}
            />
            {file && (
                <Box>
                    <Box>
                        <DialogContentText>File name: {file.name}</DialogContentText>
                        <DialogContentText>Size: {(file.size/1024).toFixed(2)} KB</DialogContentText>
                        <DialogContentText>Type: {file.type}</DialogContentText>
                    </Box>
                    <Box>
                        <img src={url} style={{ maxWidth: "100%"}} />
                    </Box>
                </Box>
            )}
        </>
    );
}

import multer from "multer"
import { upload } from "./multer"

const multerError = (fieldName: string, maxAllowed: number) => `Please make sure you are uploading to \`${fieldName}\` field and not more than ${maxAllowed} file${maxAllowed > 1 ? 's' : ''}.`

// Docs: To catch errors specifically from Multer, you can call the middleware function by yourself: (src - https://www.npmjs.com/package/multer#error-handling)
export const newProductUploadMiddleware = (req: any, res: any, next: any) => {
    const fieldName = "photos"
    const maxAllowed = 2
    upload.array(fieldName, maxAllowed)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('A Multer error occurred when uploading.') // [E.g., MulterError: Unexpected field]
            if (err.name === "MulterError" && err.message === 'Unexpected field') {
                // Note: Images do not actually upload if this error happens.
                res.status(400).json({ success: false, message: multerError(fieldName, maxAllowed) });
            }
        } else if (err) {
            console.log('An unknown error occurred when uploading.')
        }
        next(err) // Everything went fine.
    })
}

// *! Note to Sahil: You never need to use `upload.single` for the use of single file upload but use `upload.array` with maxAllowed=1.
// Docs: To catch errors specifically from Multer, you can call the middleware function by yourself: (src - https://www.npmjs.com/package/multer#error-handling)
export const newUserUploadMiddleware = (req: any, res: any, next: any) => {
    const fieldName = "photo"
    upload.single(fieldName)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('A Multer error occurred when uploading.') // [E.g., MulterError: Unexpected field]
            if (err.name === "MulterError" && err.message === 'Unexpected field') {
                // Note: Images do not actually upload if this error happens.
                res.status(400).json({ success: false, message: multerError(fieldName, 1) });
            }
        } else if (err) {
            console.log('An unknown error occurred when uploading.')
        }
        next(err) // Everything went fine.
    })
}

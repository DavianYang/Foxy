const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");
const { Storage } = require('@google-cloud/storage');
const gcconfig = {
    projectId: "foxy-b9f5d",
    keyFilename: "foxy-b9f5d-firebase-adminsdk-939hn-4df0203fb1.json"
};
  
const gcs = new Storage({gcconfig});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.onFileFinalize = functions.storage.object().onFinalize(e => {
//     const bucket = e.bucket;
//     const contentType = e.contentType;
//     const filePath = e.name;
//     console.log('File change detected, function execution started');

//     if(path.basename(filePath).startsWith('resized-')) {
//         console.log('We already renamed that file!');
//         return; 
//     }

//     const destBucket = gcs.bucket(bucket);
//     const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
//     const metadata = { contentType: contentType };
    
//     return destBucket.file(filePath).download({
//         destination: tmpFilePath
//     }).then(() => {
//         return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath]).then(
//             () => {
//                 return destBucket.upload(tmpFilePath, {
//                     destination: 'resized-' + path.basename(filePath),
//                     metadata: metadata
//                 });
//             }
//         )
//     });
// });

// exports.uploadFile = functions.https.onRequest((req, res) => {
//     cors(req, res, () => {
//       if (req.method !== "POST") {
//         return res.status(500).json({
//           message: "Not allowed"
//         });
//       }
//       const busboy = new Busboy({ headers: req.headers });
//       let uploadData = null;
  
//       busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
//         const filepath = path.join(os.tmpdir(), filename);
//         uploadData = { file: filepath, type: mimetype };
//         file.pipe(fs.createWriteStream(filepath));
//       });
  
//       busboy.on("finish", () => {
//         const bucket = gcs.bucket("gs://foxy-b9f5d.appspot.com");
//         bucket
//           .upload(uploadData.file, {
//             uploadType: "media",
//             metadata: {
//               metadata: {
//                 contentType: uploadData.type
//               }
//             }
//           })
//           .then(() => {
//             return res.status(200).json({
//               message: "It worked!"
//             });
//           })
//           .catch(err => {
//             res.status(500).json({
//               error: err
//             });
//           });
//       });
//       busboy.end(req.rawBody);
//     });
//   });
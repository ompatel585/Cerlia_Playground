// //client/src/features/serviceNodes/hooks/useQRCode.js
// import { useMemo } from "react";
// import QRCode from "qrcode";

// export const useQRCode = (text) => {
//     const qrCodeUrl = useMemo(() => {
//         if (!text) return null;
//         try {
//             return QRCode.toDataURL(text);
//         } catch {
//             return null;
//         }
//     }, [text]);

//     return qrCodeUrl;
// };




// client/src/features/serviceNodes/hooks/useQRCode.js
import { useMemo } from "react";
import QRCode from "qrcode";

export const useQRCode = (text, options = {}) => {
    const qrCodeUrl = useMemo(() => {
        if (!text) return null;
        try {
            return QRCode.toDataURL(text, options);
        } catch {
            return null;
        }
    }, [text, JSON.stringify(options)]);

    return qrCodeUrl;
};
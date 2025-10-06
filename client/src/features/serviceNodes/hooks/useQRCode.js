import { useMemo } from "react";
import QRCode from "qrcode";

export const useQRCode = (text) => {
    const qrCodeUrl = useMemo(() => {
        if (!text) return null;
        try {
            return QRCode.toDataURL(text);
        } catch {
            return null;
        }
    }, [text]);

    return qrCodeUrl;
};

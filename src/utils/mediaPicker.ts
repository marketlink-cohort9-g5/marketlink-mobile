import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking, Platform } from "react-native";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "heic",
  "heif",
  "webp",
]);

const ALLOWED_IMAGE_MIMES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/heic",
  "image/heif",
  "image/webp",
]);

const ALLOWED_DOCUMENT_EXTENSIONS = new Set([
  ...ALLOWED_IMAGE_EXTENSIONS,
  "pdf",
]);

export interface PickedMediaFile {
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
  isImage: boolean;
}

export type MediaPickOutcome =
  | { status: "success"; file: PickedMediaFile }
  | { status: "canceled" }
  | { status: "denied"; message: string; canAskAgain: boolean }
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string };

/**
 * Formats byte count into a readable B, KB, or MB label matching MarketLink rows.
 */
export function formatFileSize(bytes?: number): string {
  if (bytes == null || !Number.isFinite(bytes) || bytes <= 0) {
    return "";
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Formats a picked media or document asset into "<name> · <size>" display text.
 */
export function formatFileLabel(file: PickedMediaFile | null): string {
  if (!file) {
    return "";
  }
  const sizeLabel = formatFileSize(file.size);
  return sizeLabel ? `${file.name} · ${sizeLabel}` : file.name;
}

function getFileExtension(name: string): string {
  const cleanName = name.split("?")[0]?.split("#")[0] ?? name;
  const lastDot = cleanName.lastIndexOf(".");
  if (lastDot === -1) {
    return "";
  }
  return cleanName.slice(lastDot + 1).toLowerCase();
}

function inferFileNameFromUri(uri: string, fallbackName: string): string {
  const rawSegment = uri.split("/").pop()?.split("?")[0]?.trim();
  if (!rawSegment || rawSegment.startsWith("blob:")) {
    return fallbackName;
  }
  return rawSegment;
}

function validateAndNormalizeAsset(params: {
  uri: string;
  rawName?: string | null;
  fallbackName: string;
  size?: number;
  mimeType?: string | null;
  allowPdf: boolean;
}): MediaPickOutcome {
  const name =
    params.rawName?.trim() ||
    inferFileNameFromUri(params.uri, params.fallbackName);
  const normalizedMime = params.mimeType
    ?.split(";")[0]
    ?.trim()
    .toLowerCase();
  const extension = getFileExtension(name);

  if (params.size != null && params.size > MAX_UPLOAD_BYTES) {
    return {
      status: "error",
      message:
        "File exceeds the 5MB maximum size. Please choose a smaller file.",
    };
  }

  const isPdf =
    normalizedMime === "application/pdf" ||
    ((!normalizedMime || normalizedMime === "application/octet-stream") &&
      extension === "pdf");

  const isAllowedImage =
    (normalizedMime && ALLOWED_IMAGE_MIMES.has(normalizedMime)) ||
    ((!normalizedMime || normalizedMime === "application/octet-stream") &&
      (!extension || ALLOWED_IMAGE_EXTENSIONS.has(extension)));

  if (params.allowPdf) {
    const extValid = !extension || ALLOWED_DOCUMENT_EXTENSIONS.has(extension);
    if ((!isPdf && !isAllowedImage) || (!normalizedMime && !extValid)) {
      return {
        status: "error",
        message: "Unsupported format. Please select a JPG, PNG, or PDF file.",
      };
    }

    return {
      status: "success",
      file: {
        uri: params.uri,
        name,
        size: params.size,
        mimeType: normalizedMime || undefined,
        isImage: !isPdf,
      },
    };
  }

  if (!isAllowedImage) {
    return {
      status: "error",
      message: "Unsupported format. Please select a JPG or PNG photo.",
    };
  }

  return {
    status: "success",
    file: {
      uri: params.uri,
      name,
      size: params.size,
      mimeType: normalizedMime || undefined,
      isImage: true,
    },
  };
}

function notifyPermissionDenied(
  kind: "camera" | "library",
  canAskAgain: boolean,
): string {
  const actionText =
    kind === "camera"
      ? "take a photo"
      : "choose a photo from your library";
  const title =
    kind === "camera"
      ? "Camera Permission Required"
      : "Photo Permission Required";
  const message = canAskAgain
    ? `Please allow access so MarketLink can ${actionText}.`
    : `Permission was denied. Enable ${kind === "camera" ? "Camera" : "Photos"} access in device Settings to ${actionText}.`;

  if (Platform.OS !== "web") {
    Alert.alert(
      title,
      message,
      canAskAgain
        ? [{ text: "OK" }]
        : [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => void Linking.openSettings(),
            },
          ],
    );
  }

  return message;
}

/**
 * Requests camera permission on native devices and launches the camera to snap a photo.
 */
export async function requestAndOpenCamera(
  fallbackName = "shop-photo.jpg",
): Promise<MediaPickOutcome> {
  if (Platform.OS !== "web") {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      return {
        status: "denied",
        canAskAgain: permission.canAskAgain,
        message: notifyPermissionDenied("camera", permission.canAskAgain),
      };
    }
  }

  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });

    if (result.canceled || !result.assets?.length) {
      return { status: "canceled" };
    }

    const asset = result.assets[0];
    return validateAndNormalizeAsset({
      uri: asset.uri,
      rawName: asset.fileName,
      fallbackName,
      size: asset.fileSize,
      mimeType: asset.mimeType,
      allowPdf: false,
    });
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : "";
    const isUnavailable = /simulator|unavailable|camera/i.test(rawMessage);
    if (isUnavailable) {
      return {
        status: "unavailable",
        message:
          "Camera is not available on this device. Choose a photo from your library instead.",
      };
    }
    return {
      status: "error",
      message: "Could not open camera. Please try again.",
    };
  }
}

/**
 * Requests photo library permission on native devices and launches the image gallery picker.
 */
export async function requestAndOpenPhotoLibrary(
  fallbackName = "selected-photo.jpg",
): Promise<MediaPickOutcome> {
  if (Platform.OS !== "web") {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return {
        status: "denied",
        canAskAgain: permission.canAskAgain,
        message: notifyPermissionDenied("library", permission.canAskAgain),
      };
    }
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.85,
    });

    if (result.canceled || !result.assets?.length) {
      return { status: "canceled" };
    }

    const asset = result.assets[0];
    return validateAndNormalizeAsset({
      uri: asset.uri,
      rawName: asset.fileName,
      fallbackName,
      size: asset.fileSize,
      mimeType: asset.mimeType,
      allowPdf: false,
    });
  } catch {
    return {
      status: "error",
      message: "Could not open photo library. Please try again.",
    };
  }
}

/**
 * Launches the system document picker for uploading JPG, PNG, or PDF ID documents.
 */
export async function pickIdDocument(): Promise<MediaPickOutcome> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "image/*", "application/pdf"],
      copyToCacheDirectory: true,
      multiple: false,
      base64: false,
    });

    if (result.canceled || !result.assets?.length) {
      return { status: "canceled" };
    }

    const asset = result.assets[0];
    return validateAndNormalizeAsset({
      uri: asset.uri,
      rawName: asset.name,
      fallbackName: "valid-id.pdf",
      size: asset.size,
      mimeType: asset.mimeType,
      allowPdf: true,
    });
  } catch {
    return {
      status: "error",
      message: "Could not open document picker. Please try again.",
    };
  }
}

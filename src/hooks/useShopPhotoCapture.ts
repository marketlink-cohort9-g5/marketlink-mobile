import { useState } from "react";
import { Alert, Platform } from "react-native";

import {
  requestAndOpenCamera,
  requestAndOpenPhotoLibrary,
  type MediaPickOutcome,
  type PickedMediaFile,
} from "@/utils/mediaPicker";

/**
 * Manages permission requests, camera capture, and photo-library fallback for snapping store photos.
 */
export function useShopPhotoCapture(
  defaultFileName: string,
  onSuccess?: () => void,
) {
  const [photoFile, setPhotoFile] = useState<PickedMediaFile | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraUnavailable, setCameraUnavailable] = useState(false);

  const chooseFromLibrary = async () => {
    setPhotoError(null);
    setIsCapturing(true);
    try {
      const outcome = await requestAndOpenPhotoLibrary(defaultFileName);
      applyOutcome(outcome);
    } finally {
      setIsCapturing(false);
    }
  };

  const applyOutcome = (outcome: MediaPickOutcome) => {
    if (outcome.status === "success") {
      setPhotoFile(outcome.file);
      setPhotoError(null);
      setCameraUnavailable(false);
      onSuccess?.();
      return;
    }

    if (outcome.status === "canceled") {
      return;
    }

    if (outcome.status === "unavailable") {
      setCameraUnavailable(true);
      setPhotoError(outcome.message);
      if (Platform.OS !== "web") {
        Alert.alert("Camera Unavailable", outcome.message, [
          { text: "Cancel", style: "cancel" },
          { text: "Choose Photo", onPress: () => void chooseFromLibrary() },
        ]);
      }
      return;
    }

    setPhotoError(outcome.message);
  };

  const captureFromCamera = async () => {
    setPhotoError(null);
    setIsCapturing(true);
    try {
      const outcome = await requestAndOpenCamera(defaultFileName);
      applyOutcome(outcome);
    } finally {
      setIsCapturing(false);
    }
  };

  return {
    photoFile,
    photoError,
    isCapturing,
    cameraUnavailable,
    captureFromCamera,
    chooseFromLibrary,
    setPhotoError,
  };
}

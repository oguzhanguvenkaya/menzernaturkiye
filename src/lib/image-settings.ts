export interface ImageSettings {
  overlay: number;
  position: string;
  brightness: number;
}

const DEFAULT_SETTINGS: ImageSettings = {
  overlay: 60,
  position: "center",
  brightness: 100,
};

export function parseImageSettings(body: string | null | undefined): ImageSettings {
  if (!body) return DEFAULT_SETTINGS;
  try {
    const parsed = JSON.parse(body);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

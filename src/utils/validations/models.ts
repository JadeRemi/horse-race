
export interface ImageInterface {
    src: string,
    speed?: number,
    frames?: number,
}

export interface AnimationInterface {
    framesPerSecond: number,
    animate: boolean,
    parallaxSpeed: number,
    backgroundPalette: string,
    focusSpeed: number,
}

export interface DimensionsInterface {
    width: number,
    height: number,
}

export interface SettingsInterface extends DimensionsInterface, AnimationInterface {
};

export interface PayloadSettings {
    duration: string,
    participants: string,
    biome: string,
    layout: string,
    length: string,
    focused: string,
}

export interface PayloadObstacle {
    id: string,
    name: string,
}

export interface PayloadPath {
    break: string,
    obstacle?: string,
    pass?: string,
    curve: string,
}

export interface PayloadParticipant {
    playerId: string,
    nickname: string,
    color: string,
    health: string,
    duration: string,
    place: string,
    speed: string,
    path: PayloadPath[],
}

export interface PayloadInterface {
    options: PayloadSettings,
    obstacles: PayloadObstacle[],
    participants: PayloadParticipant[],
}

export interface ConvertedSettings {
    duration: number,
    participants: number,
    biome: string,
    layout: string,
    length: number,
    focused: number,
}

export interface ConvertedObstacle {
    id: number,
    name: string,
}

export interface ConvertedPath {
    break: number,
    obstacle?: string,
    pass?: boolean,
    curve: string,
}

export interface ConvertedParticipant {
    playerId: number,
    nickname: string,
    color: string,
    health: number,
    duration: number,
    place: number,
    speed: number,
    path: ConvertedPath[],
}

export interface ConvertedInterface {
    options: ConvertedSettings,
    obstacles: ConvertedObstacle[],
    participants: ConvertedParticipant[],
}

export const optionsTypes = {
    duration: { type: "number", required: true },
    participants: { type: "number", required: true },
    biome: { type: "string", required: true },
    layout: { type: "string", required: true },
    length: { type: "number", required: true },
}

export const obstaclesTypes = {
    id: { type: "number", required: true },
    name: { type: "string", required: true },
    effects: { type: "array", required: false },
}

export const participantsTypes = {
    playerId: { type: "number", required: true },
    nickname: { type: "string", required: true },
    color: { type: "string", required: true },
    health: { type: "number", required: true },
    duration: { type: "number", required: true },
    place: { type: "number", required: true },
}
interface ContentEditorActions {
    updatePreviewUrl: (url: string) => void;
    safeReaction<T>(watchFunction: () => T, reactionFunction: (arg: T) => void, options?: {
        fireImmediately: true;
    }): void;
}
export declare const onContentEditorLoad: ({ safeReaction, updatePreviewUrl }: ContentEditorActions) => void;
export {};

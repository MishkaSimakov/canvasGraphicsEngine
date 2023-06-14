export interface GetSet<Type, This> {
    (): Type;
    (value: Type): This;
}

export interface Vector2 {
    x: number;
    y: number;
}

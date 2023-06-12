export interface GetSet<Type, This> {
    (): Type;
    (value: Type): This;
}

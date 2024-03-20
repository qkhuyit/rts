/** Merge attributes with the same name (overwriting) */
type MergePropertyTypes<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] : T[K];
} & U;

/** Convert union type to intersection type */
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/** eg: type result = StringToUnion<'abc'> result: 'a'|'b'|'c'*/
type StringToUnion<S extends string> = S extends `${infer S1}${infer S2}`
  ? S1 | StringToUnion<S2>
  : never;

/** String replacement, similar to the js string replace method */
type Replace<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}` ? `${Left}${To}${Right}` : Str;

/** String replacement, similar to js's string replaceAll method */
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}`
  ? Replace<Replace<`${Left}${To}${Right}`, From, To>, From, To>
  : Str;

/** eg: type result = CamelCase<'foo-bar-baz'>, result：fooBarBaz */
type CamelCase<S extends string> = S extends `${infer S1}-${infer S2}`
  ? S2 extends Capitalize<S2>
    ? `${S1}-${CamelCase<S2>}`
    : `${S1}${CamelCase<Capitalize<S2>>}`
  : S;

/** eg: type result = StringToArray<'abc'>, result：['a', 'b', 'c'] */
type StringToArray<S extends string, T extends any[] = []> = S extends `${infer S1}${infer S2}`
  ? StringToArray<S2, [...T, S1]>
  : T;

/** `RequiredKeys`is used to obtain all required fields, which are combined into a union type */
type RequiredKeys<T> = {
  [P in keyof T]: T extends Record<P, T[P]> ? P : never;
}[keyof T];

/** `OptionalKeys`is used to obtain all optional fields, which are combined into a union type */
type OptionalKeys<T> = {
  [P in keyof T]: {} extends Pick<T, P> ? P : never;
}[keyof T];

/** `GetRequired`It is used to obtain a new type composed of all required keys and their types in a type. */
type GetRequired<T> = {
  [P in RequiredKeys<T>]-?: T[P];
};

/** `GetOptional`It is used to obtain a new type composed of all optional keys and their types in a type. */
type GetOptional<T> = {
  [P in OptionalKeys<T>]?: T[P];
};

/**  type result1 = Includes<[1, 2, 3, 4], '4'> result： false; type result2 = Includes<[1, 2, 3, 4], 4> result： true */
type Includes<T extends any[], K> = K extends T[number] ? true : false;

/** eg:type result = MyConcat<[1, 2], [3, 4]>  result：[1, 2, 3, 4]*/
type MyConcat<T extends any[], U extends any[]> = [...T, ...U];
/** eg: type result1 = MyPush<[1, 2, 3], 4> result：[1, 2, 3, 4] */
type MyPush<T extends any[], K> = [...T, K];
/** eg: type result3 = MyPop<[1, 2, 3]>  result：[1, 2] */
type MyPop<T extends any[]> = T extends [...infer L, infer R] ? L : never; // eslint-disable-line

export type SamePropsHoc<P> = (i: React.ComponentType<P>) => React.ComponentType<P>
export type PickComponentTypeProps<T> = T extends React.ComponentType<infer P> ? P: any;

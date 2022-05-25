declare module '*.svg' {
  import type { ReactElement, SVGProps, ReactSVGElement } from 'react';
  import type { ViewStyle } from 'react-native';
  const content: (props: SVGProps<ReactSVGElement> | ViewStyle) => ReactElement;
  export default content;
}

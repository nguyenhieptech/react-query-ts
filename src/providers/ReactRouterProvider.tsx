import { BrowserRouter } from 'react-router-dom';
import { ChildrenProps } from './types';

export function ReactRouterProvider({ children }: ChildrenProps) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

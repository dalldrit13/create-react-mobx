import { useContext } from 'react';

import { State } from "../state"
import GlobalContext from '../contexts';

export default function useGlobalState(): State {
  return useContext<State>(GlobalContext)
}
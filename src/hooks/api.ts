import React, { useReducer, Dispatch } from 'react';
import { AxiosError } from 'axios'
import { IAppContext } from '../context/context';

export const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  PENDING: 'pending'
} as const;

interface InitialState {
  status: typeof Status[keyof typeof Status],
  data?: Partial<IAppContext> | null,
  error?: AxiosError | null
}

interface Action {
  data?: Partial<IAppContext>
  error?: AxiosError
  type: typeof Status[keyof typeof Status],
}

function apiReducer(state: InitialState, action: Action) {
  switch (action.type) {
    case Status.RESOLVED:
      return { status: Status.RESOLVED, data: action.data, error: null };
    case Status.REJECTED:
      return { status: Status.REJECTED, error: action.error };
    case Status.PENDING:
      return { status: Status.PENDING, data: null, error: null };
    case Status.IDLE:
      return { status: Status.IDLE, data: null, error: null };
  }
}

export default function useApi() {
  const [response, setResponse] = useReducer(apiReducer, { status: Status.IDLE, data: null, error: null });

  const run = (promise: Promise<Partial<IAppContext>>) => {
    if (!promise) {
      return;
    }

    setResponse({ type: Status.PENDING })

    promise
      .then(
        (data) => {
          setResponse({ type: Status.RESOLVED, data });
        },
        (error) => {
          setResponse({ type: Status.REJECTED, error });
        });

    return promise;
  };

  return { response, setResponse, run };
}

import * as React from 'react';

type Props = {
  children?: React.ReactNode;
  isActive: boolean;
};

export function Spinner(props: Props) {
  return (
    <>
      {props.isActive
        ?
        <div className="spinner">
          <svg>
            <use href="/img/icons.svg#icon-loader"></use>
          </svg>
        </div>
        : props.children
      }
    </>
  );
};

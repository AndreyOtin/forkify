import * as React from 'react';
type Props = {

};
export function Spinner(props: Props) {
  return (
    <div className="spinner">
      <svg>
        <use href="/img/icons.svg#icon-loader"></use>
      </svg>
    </div>
  );
};

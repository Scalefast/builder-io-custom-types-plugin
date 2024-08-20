/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { PropsWithChildren } from 'react';

export const CustomMedia = (props: any) => {
  // const { video } = props;
  console.log('Props: ', props);
  return (
    <h1>Test</h1>
  )
}

// export class CustomMedia extends React.Component<PropsWithChildren<any>> {

//   render() {
//     return (
//       <h1>Test</h1>
//     )
//   }
// }

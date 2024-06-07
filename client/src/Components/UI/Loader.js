import React from 'react'
import styled from 'styled-components'

const Loader = ({color, classProp}) => {
  return (
   <Wrapper><div className={`${classProp} loader`}></div></Wrapper>
  )
}

export default Loader

const Wrapper = styled.div`
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side,#000 94%,#0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, var(--primary-color));
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
  animation: l13 1s infinite linear;
}

.btn-loader{
  width: 25px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side,#fff 94%,#0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, #fff);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
  animation: l13 1s infinite linear;
}

.modal-loader{
  width: 100px;
}
@keyframes l13{ 
  100%{transform: rotate(1turn)}
}
`
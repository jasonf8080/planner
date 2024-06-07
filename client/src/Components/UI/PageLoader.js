import React from 'react'
import styled from 'styled-components'

const PageLoader = ({message}) => {
  return (
    <Wrapper>
        <div className="page-loader">
            <div className="loader"></div>
            <h3>{message}</h3>
        </div>
    </Wrapper>
  )
}

export default PageLoader

const Wrapper = styled.div`
    .page-loader{
        min-height: 100vh;
        max-height: 100vh;
        min-width: 100vw;
        max-width: 100vw;
        background: linear-gradient(155deg, #FFF 15.74%, rgba(7, 39, 153, 0.77) 98.45%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .loader {
        margin-bottom: 32px;
        width: 100px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: 
            radial-gradient(farthest-side,#000 94%,#0000) top/8px 8px no-repeat,
            conic-gradient(#0000 30%, var(--primary-color));
        -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
        animation: l13 1s infinite linear;
    }

    @keyframes l13{ 
  100%{transform: rotate(1turn)}
}


`